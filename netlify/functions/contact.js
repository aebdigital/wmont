const smtp2goEndpoint = "https://api.smtp2go.com/v3/email/send";

const jsonHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: jsonHeaders,
      body: ""
    };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { message: "Metóda nie je povolená." });
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const validationError = validatePayload(data);
    if (validationError) {
      return jsonResponse(400, { message: validationError });
    }

    if (data.website) {
      return jsonResponse(200, { message: "Správa bola odoslaná. Ďakujeme." });
    }

    const configError = getConfigError();
    if (configError) {
      return jsonResponse(500, { message: configError });
    }

    const subject = data.subject || "Kontaktný formulár - W-Mont";
    const textBody = [
      `Meno: ${data.name}`,
      `Email: ${data.email}`,
      `Telefón: ${data.phone || "-"}`,
      `Predmet: ${subject}`,
      "",
      "Správa:",
      data.message
    ].join("\n");

    const htmlBody = `
      <h2>Nová správa z webu W-Mont</h2>
      <p><strong>Meno:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Telefón:</strong> ${escapeHtml(data.phone || "-")}</p>
      <p><strong>Predmet:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Správa:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    `;

    const response = await fetch(smtp2goEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-Smtp2go-Api-Key": process.env.SMTP2GO_API_KEY
      },
      body: JSON.stringify({
        sender: process.env.SMTP2GO_SENDER,
        to: [process.env.CONTACT_FORM_RECIPIENT],
        subject,
        text_body: textBody,
        html_body: htmlBody,
        custom_headers: [
          {
            header: "Reply-To",
            value: `${data.name} <${data.email}>`
          },
          {
            header: "X-WMont-Contact-Form",
            value: "website"
          }
        ],
        attachments: Array.isArray(data.attachments) ? data.attachments.slice(0, 1) : []
      })
    });

    const result = await response.json();
    const succeeded = result?.data?.succeeded;

    if (!response.ok || succeeded !== 1) {
      console.error("SMTP2GO error", result);
      return jsonResponse(502, {
        message: "Správu sa nepodarilo odoslať. Skúste to prosím neskôr."
      });
    }

    return jsonResponse(200, { message: "Správa bola odoslaná. Ďakujeme." });
  } catch (error) {
    console.error(error);
    return jsonResponse(500, {
      message: "Správu sa nepodarilo odoslať. Skúste to prosím neskôr."
    });
  }
};

function getConfigError() {
  const required = ["CONTACT_FORM_RECIPIENT", "SMTP2GO_API_KEY", "SMTP2GO_SENDER"];
  const missing = required.filter((key) => !process.env[key]);
  return missing.length ? `Chýbajú environment premenné: ${missing.join(", ")}.` : "";
}

function validatePayload(data) {
  if (!data.name || String(data.name).trim().length < 2) return "Vyplňte prosím meno.";
  if (!isEmail(data.email)) return "Vyplňte prosím platný email.";
  if (!data.message || String(data.message).trim().length < 5) {
    return "Vyplňte prosím správu.";
  }

  if (Array.isArray(data.attachments)) {
    for (const attachment of data.attachments) {
      if (!attachment.filename || !attachment.fileblob || !attachment.mimetype) {
        return "Príloha nemá správny formát.";
      }
    }
  }

  return "";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: jsonHeaders,
    body: JSON.stringify(body)
  };
}
