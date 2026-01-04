
# Vertex — Professional Task Management

A lightweight React + Vite task manager. This workspace was migrated from TypeScript to plain JavaScript/JSX.

**Quick Start**

- Install dependencies:

```bash
npm install
```

- Run the dev server:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
```

**Important files**

- Project entry: [index.html](index.html)
- Client entry: [index.jsx](index.jsx)
- Root app: [App.jsx](App.jsx)
- Vite config: [vite.config.js](vite.config.js)
- Mock API: [services/mockApi.js](services/mockApi.js)
- Types (simple JS enums): [types.js](types.js)
- Package manifest: [package.json](package.json)

**Notes**

- This repository was converted from TypeScript (.ts/.tsx) to JavaScript (.js/.jsx). If you previously saw a Vite error about `/index.tsx`, it was caused by `index.html` still referencing the old file — that reference has been updated to `/index.jsx`.
- The TypeScript config (`tsconfig.json`) and TypeScript devDependencies were removed.

**Troubleshooting**

- If Vite warns about a missing entry point, ensure the `<script type="module" src="/index.jsx"></script>` line is present in [index.html](index.html).
- If you change file extensions, restart the dev server and clear the browser cache (Ctrl+F5).

**Want help?**

If you'd like, I can:
- Start the dev server and keep it running, or
- Create additional documentation or tests.

Enjoy — and tell me what you'd like next.
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/19h0FcF3jSysffoVehrB2PmrGprA_OBHN

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
