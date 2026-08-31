# VS Code Portfolio

An interactive developer portfolio built around a VS Code-inspired workspace. Visitors navigate profile content through an explorer, tabs, a source-control view, a simulated terminal, and an optional AI chat panel.

## Interaction model

- The activity bar switches between portfolio views.
- The file explorer opens profile sections as editor tabs.
- The tab bar preserves the active-document metaphor.
- The terminal implements a simulated command environment rather than a real shell.
- The source-control panel retrieves public GitHub repository and language data.
- The account and contact panels expose profile and contact information.

## UI architecture

`src/app/page.js` coordinates the workspace state and composes the main panels. Reusable interface elements live in `src/components`, while `src/components/tabs` contains the editor content views. `src/components/data/me.js` is the central profile-data source. Route handlers provide GitHub proxying, portfolio chat, and contact email behavior.

## Technology

- Next.js 15 and React 19
- JavaScript and Tailwind CSS 4
- Monaco Editor
- React Markdown with GFM and math plugins
- VS Code Codicons
- Vercel Analytics and Speed Insights
- Gemini for the optional portfolio chat route
- Resend for the contact route

## Local development

Requirements:

- Node.js 20.9 or newer
- npm

```bash
git clone https://github.com/HazemHassine/vscode-portfolio.git
cd vscode-portfolio
npm install
npm run dev
```

Open `http://localhost:3000`.

The portfolio shell can run without external service keys, but the chat and email routes require their corresponding server-side configuration. Inspect the route handlers before enabling those features and keep credentials in an ignored local environment file.

## Checks

```bash
npm run lint
npm run build
```

No automated component or end-to-end test suite is currently committed.

## Deployment

The application can be deployed as a Next.js service on Vercel or another compatible Node.js host. Configure external service credentials in the provider rather than in source control.

The GitHub repository homepage currently points to `hazem-porfolio.vercel.app`. The `porfolio` spelling appears accidental. Source data also references `vscode-portfolio.vercel.app`, which currently serves a different person's portfolio. Confirm the canonical deployment before publishing or changing either URL.

## Accessibility

Primary interactive controls include ARIA labels, selected and expanded states, and descriptive image alternative text. The interface should still be tested with keyboard-only navigation, focus visibility, reduced motion, screen readers, narrow screens, and color-contrast tooling before claiming conformance with an accessibility standard.

## Known limitations

- The terminal is a simulation and does not execute system commands.
- Several profile sections are static data and can become outdated.
- GitHub panels depend on public API availability and rate limits.
- Chat and contact features depend on external services and environment configuration.
- The dense desktop metaphor may require further mobile and keyboard testing.
- There is no committed automated test suite.

## Project status

Active portfolio project. Profile facts and project links should be reviewed whenever education, work, or deployment details change.
