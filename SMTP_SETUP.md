# SMTP2GO contact form setup

The contact form posts to `/.netlify/functions/contact`.

Set these environment variables in Netlify:

- `CONTACT_FORM_RECIPIENT` - address that receives contact form messages
- `SMTP2GO_API_KEY` - SMTP2GO API key
- `SMTP2GO_SENDER` - verified SMTP2GO sender address

The function sends through the SMTP2GO `/email/send` API, sets a `Reply-To` custom header to the visitor email, and forwards one optional attachment as base64 `fileblob`.

For local testing with Netlify CLI:

```bash
netlify dev
```

Then submit the form at `/kontakt`.
