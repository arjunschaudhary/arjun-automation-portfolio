# AI Automation & Business Systems Portfolio

A portfolio of AI automation and business systems, with architecture diagrams, operational workflows, and live product examples.

**Live site:** [arjun-automation-portfolio-jhld.vercel.app](https://arjun-automation-portfolio-jhld.vercel.app)

The site presents six sanitized system case studies, verified integration experience, architecture-led process visuals, and a public Solar EPC application using synthetic data.

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS 4
- Server-rendered Next.js app with a contact API route
- Vercel hosting

## Development

```bash
pnpm install
pnpm dev
```

Create a production build with:

```bash
pnpm build
```

## Contact form

The Contact page posts to `/api/contact`, which uses Resend to deliver plain-text messages to the portfolio email address. The API key stays server-side; visitors' addresses are used only as Reply-To. The route validates fields, checks a honeypot and submission timing, and restricts browser requests to the site's own origin.

To enable delivery, verify a sending domain in [Resend](https://resend.com/domains), create a sending API key, and set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (for example, `Portfolio <contact@yourdomain.com>`) in Vercel's server-side environment settings. Use the same values in `.env.local` for local development; `.env.example` lists them without real credentials. Redeploy after setting production variables. Until configured, the form shows an error and the existing email link remains available.

## Privacy

No real leads, candidate records, credentials, internal URLs, production configuration, customer details or private repository links are included. Internal system interfaces are recreated with synthetic data.

## Attribution

The visual foundation was adapted from the MIT-licensed [Magic UI Portfolio template](https://github.com/magicuidesign/portfolio). The original MIT license is preserved in [LICENSE](./LICENSE).
