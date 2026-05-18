import { NextResponse } from "next/server";

const smtp2goEndpoint = "https://api.smtp2go.com/v3/email/send";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Honeypot check for spam bots
    if (data.website) {
      return NextResponse.json({ message: "Správa bola odoslaná. Ďakujeme." });
    }

    // Validation
    if (!data.name || String(data.name).trim().length < 2) {
      return NextResponse.json({ message: "Vyplňte prosím meno." }, { status: 400 });
    }
    if (!data.email || !isEmail(data.email)) {
      return NextResponse.json({ message: "Vyplňte prosím platný email." }, { status: 400 });
    }
    if (!data.message || String(data.message).trim().length < 5) {
      return NextResponse.json({ message: "Vyplňte prosím správu." }, { status: 400 });
    }

    if (Array.isArray(data.attachments)) {
      for (const attachment of data.attachments) {
        if (!attachment.filename || !attachment.fileblob || !attachment.mimetype) {
          return NextResponse.json({ message: "Príloha nemá správny formát." }, { status: 400 });
        }
      }
    }

    // Check configuration
    const requiredEnv = ["CONTACT_FORM_RECIPIENT", "SMTP2GO_API_KEY", "SMTP2GO_SENDER"];
    const missing = requiredEnv.filter((key) => !process.env[key]);
    if (missing.length) {
      console.error(`Missing environment variables: ${missing.join(", ")}`);
      return NextResponse.json(
        { message: "Chyba konfigurácie servera. Skúste to prosím neskôr." },
        { status: 500 }
      );
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
        "X-Smtp2go-Api-Key": process.env.SMTP2GO_API_KEY || ""
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
      console.error("SMTP2GO error details:", result);
      return NextResponse.json(
        { message: "Správu sa nepodarilo odoslať. Skúste to prosím neskôr." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Správa bola odoslaná. Ďakujeme." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Správu sa nepodarilo odoslať. Skúste to prosím neskôr." },
      { status: 500 }
    );
  }
}
