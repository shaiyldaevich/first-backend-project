"scripts": {
    "dev": "ts-node-dev --respawn index.ts",
    "build": "npx prisma generate && tsc",
    "commit": "git status && git add . && powershell -Command \"$msg = Read-Host 'Enter commit message'; git commit -m $msg; $branch = Read-Host 'Enter branch name'; git push -u origin $branch\"",
    "start": " npx prisma generate && node dist/index.js",
    "vercel-build": "npm run build && npx prisma generate"
  },
