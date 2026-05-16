"use client";

import { Send, Upload } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

type AttachmentPayload = {
  filename: string;
  fileblob: string;
  mimetype: string;
};

const fields = [
  { label: "Vaše meno", type: "text", name: "name", required: true },
  { label: "Váš email", type: "email", name: "email", required: true },
  { label: "Váš tel. kontakt", type: "tel", name: "phone", required: false },
  { label: "Predmet", type: "text", name: "subject", required: false }
];

const maxAttachmentSize = 8 * 1024 * 1024;

export function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<AttachmentPayload | null>(null);
  const [attachmentName, setAttachmentName] = useState("");

  async function onAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    setAttachment(null);
    setAttachmentName("");

    if (!file) return;

    if (file.size > maxAttachmentSize) {
      setState("error");
      setMessage("Príloha je príliš veľká. Maximálna veľkosť je 8 MB.");
      event.currentTarget.value = "";
      return;
    }

    const fileblob = await fileToBase64(file);
    setAttachment({
      filename: file.name,
      fileblob,
      mimetype: file.type || "application/octet-stream"
    });
    setAttachmentName(file.name);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      attachments: attachment ? [attachment] : []
    };

    try {
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Správu sa nepodarilo odoslať.");
      }

      setState("success");
      setMessage(result.message || "Správa bola odoslaná. Ďakujeme.");
      setAttachment(null);
      setAttachmentName("");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Správu sa nepodarilo odoslať.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded border border-line bg-white p-5 md:p-6">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="grid gap-2 text-sm font-bold text-ink">
            {field.label}
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              className="h-12 rounded border border-line px-4 text-sm font-semibold outline-none transition focus:border-redline"
            />
          </label>
        ))}
      </div>

      <label className="mt-4 grid gap-2 text-sm font-bold text-ink">
        Príloha
        <span className="flex h-12 items-center gap-2 rounded border border-dashed border-line px-4 text-sm font-semibold text-muted">
          <Upload aria-hidden="true" size={17} />
          {attachmentName || "jpg, pdf, jpeg, png, docx"}
        </span>
        <input
          type="file"
          name="attachment"
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          className="sr-only"
          onChange={onAttachmentChange}
        />
      </label>

      <label className="mt-4 grid gap-2 text-sm font-bold text-ink">
        Vaša správa
        <textarea
          name="message"
          rows={7}
          required
          className="rounded border border-line px-4 py-3 text-sm font-semibold outline-none transition focus:border-redline"
        />
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-redline px-5 text-sm font-extrabold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-muted md:w-auto"
      >
        {state === "loading" ? "Odosielam..." : "Odoslať správu"}
        <Send aria-hidden="true" size={17} />
      </button>

      {message ? (
        <p
          className={`mt-4 rounded border px-4 py-3 text-sm font-bold ${
            state === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(new Error("Prílohu sa nepodarilo načítať."));
    reader.readAsDataURL(file);
  });
}
