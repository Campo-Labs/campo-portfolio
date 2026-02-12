# Campo Portfolio

**AI-powered portfolio tracker and intelligence tool.** Built by [Campo Labs](https://campolabs.ai).

![Campo Portfolio Screenshot](https://via.placeholder.com/1200x600/0d1117/58a6ff?text=Campo+Portfolio+Screenshot)

## Features

- **Portfolio Tracking** — Add positions manually or import via CSV. Live prices from Yahoo Finance.
- **AI Portfolio Analyst** — Chat with Claude about your portfolio. BYOK (Bring Your Own Key).
- **Bloomberg-style UI** — Dark terminal aesthetic, responsive, zero dependencies.
- **Prompt Injection Hardened** — System prompt built to resist manipulation. A Campo Labs security showcase.
- **100% Client-Side** — No backend, no server, no build step. Your data stays in your browser.

## Quick Start

```bash
# Clone and open
git clone https://github.com/Campo-Labs/campo-portfolio.git
open campo-portfolio/index.html
```

That's it. No `npm install`. No build. Just HTML.

## Deploy

**Cloudflare Pages:**
```bash
npx wrangler pages deploy . --project-name=campo-portfolio
```

**Vercel:**
```bash
npx vercel --prod
```

**Netlify:**
```bash
npx netlify deploy --prod --dir=.
```

## BYOK — Bring Your Own Key

Campo Portfolio uses the Anthropic API directly from your browser for AI analysis. You provide your own API key, which is:

- Stored only in your browser's localStorage
- Sent only to `api.anthropic.com`
- Never transmitted to Campo Labs or any other server

## Security

The AI analyst system prompt is hardened against prompt injection:

1. **Strict role boundaries** — The AI only discusses portfolio analysis and finance
2. **Input sanitization** — XML-like tags stripped from user messages
3. **Message length limits** — 500 character cap per message
4. **Rate limiting** — 20 messages per session
5. **Context isolation** — Portfolio data and user messages are clearly delineated
6. **Injection detection** — Attempts to override instructions are caught and deflected

This is a showcase of Campo Labs' approach to building secure AI applications.

## Tech Stack

- Pure HTML/CSS/JavaScript (single file)
- Yahoo Finance API for live prices
- Anthropic Claude API for AI analysis
- localStorage for persistence
- Canvas API for charts

## License

MIT — [Campo Labs](https://campolabs.ai)
