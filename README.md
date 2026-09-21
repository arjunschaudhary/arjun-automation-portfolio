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

The Contact page posts to `/api/contact`, which sends validated submissions to the portfolio inbox through Resend. The visitor's address is set as Reply-To. The route checks a honeypot and submission timing, and restricts browser requests to the site's own origin.

Set `RESEND_API_KEY` as a server-only environment variable on the Vercel portfolio project (Production scope), then redeploy. The Resend account must be registered with the portfolio inbox: Resend's `onboarding@resend.dev` sender can deliver only to the account's own email address without a verified domain. A custom domain is needed to send to other recipients. Do not expose the key as a `NEXT_PUBLIC_` variable or commit it to Git. The contact email link remains available if email service is not configured.

## Privacy

No real leads, candidate records, credentials, internal URLs, production configuration, customer details or private repository links are included. Internal system interfaces are recreated with synthetic data.

## Attribution

The visual foundation was adapted from the MIT-licensed [Magic UI Portfolio template](https://github.com/magicuidesign/portfolio). The original MIT license is preserved in [LICENSE](./LICENSE).
