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

The Contact page posts to `/api/contact`, which forwards validated submissions to FormSubmit for email delivery to the portfolio address. The provider uses visitors' addresses as Reply-To. The route checks a honeypot and submission timing, and restricts browser requests to the site's own origin.

No sending domain or API key is required. The first submission triggers an activation email to the portfolio address; the mailbox owner must confirm it before visitor messages are delivered. The contact email link remains available as a fallback.

## Privacy

No real leads, candidate records, credentials, internal URLs, production configuration, customer details or private repository links are included. Internal system interfaces are recreated with synthetic data.

## Attribution

The visual foundation was adapted from the MIT-licensed [Magic UI Portfolio template](https://github.com/magicuidesign/portfolio). The original MIT license is preserved in [LICENSE](./LICENSE).
