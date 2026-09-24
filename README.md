# Meraj & Urooj — invitation source

This is the latest source (including the envelope, seal glow, curtain opening, music, all three events, Walima RSVP, and host page). It does not include the live guest response database. Editing this copy will not automatically change the currently hosted Site.

## Run in VS Code on Linux Mint

1. Extract the ZIP in your Home folder (e.g. `/home/meraj/meraj-urooj-invitation`).
2. In VS Code, choose **File > Open Folder** and select the extracted `meraj-urooj-invitation` folder.
3. Open VS Code's terminal (**Terminal > New Terminal**). Install Node.js 22.13+ first if `node -v` shows an older version. Run:

```bash
corepack enable
pnpm install
pnpm build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_long_aaron_stack.sql
pnpm dev
```

4. Open the local address printed in the terminal (usually `http://localhost:5173`). Stop the server with Ctrl+C.

The D1 migration is needed once per new local database, not every launch. Next time, use `pnpm dev`. `node_modules`, build output, and the local database are excluded from Git.

## GitHub

Create an empty **private** repository on GitHub, then run these commands from this project's VS Code terminal:

```bash
git init
git branch -M main
git add .
git commit -m "Add wedding invitation"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO`. Sign into GitHub when prompted. Never commit `.env` files or credentials.

## Important differences from the hosted Site

The RSVP backend uses Cloudflare D1. This project's `/manage` access checks for Meraj's ChatGPT sign-in email, which is supplied by Sites hosting; standalone local browsing does not supply that identity, so `/manage` cannot authenticate you locally. Do not disable its check and deploy publicly. For independent Netlify/Cloudflare hosting, set up a new protected owner login and production database first. Merely uploading the folder to GitHub or Netlify will not preserve existing guest responses or enable the host dashboard.

Key files: `templates/invitation.html` (guest layout and styles), `public/invitation.js` (opening and form), `public/` (art and music), `app/api/` (event and RSVP endpoints), `templates/manage.html` (host UI), and `drizzle/` (database migration).
# Groom-Wed-Invitation
