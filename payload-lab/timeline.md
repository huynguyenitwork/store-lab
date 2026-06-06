## research
* thử nghiệm cơ bản trước dùng phiên bản cũ cách đây 2 tháng `v3.75.0 (2026-02-05)`
* tìm kiếm theo từ khóa `-t ecommerce` trang [release](https://github.com/payloadcms/payload/releases?q=-t+ecommerce&expanded=true)

## pipeline quick start
### cli runner
```bash
#1
pnpx create-payload-app@3.75.0 store -t ecommerce
cd ./store
#2
pnpm run dev
```
### details
#### 1
```bash
√ Choose which packages to build (Press <space> to select, <a> to toggle all, <i> to invert selection) · @swc/core
√ The next packages will now be built: @swc/core.
Do you approve? (y/N) · true
┌   create-payload-app 
│
◇   ────────────────────────────────────────────╮
│                                               │
│  Welcome to Payload. Let's create a project!  │
│                                               │
├───────────────────────────────────────────────╯
│
◇  Select a database
│  SQLite
│
◇  Enter SQLite connection string
│  file:./store.db
│
◇  Found latest version of Payload 3.85.0
│
◇  Using pnpm.
│  
│
■  Error installing dependencies: Command failed with exit code 1: pnpm install
│  [WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.onlyBuiltDependencies". See https://pnpm.io/settings for the new home of each setting.
│  Progress: resolved 1, reused 0, downloaded 0, added 0
│  Progress: resolved 18, reused 1, downloaded 8, added 0
│  Progress: resolved 21, reused 1, downloaded 19, added 0
│  Progress: resolved 25, reused 1, downloaded 21, added 0
│  Progress: resolved 37, reused 1, downloaded 29, added 0
│  Progress: resolved 50, reused 1, downloaded 39, added 0
│  Progress: resolved 56, reused 1, downloaded 48, added 0
│  Progress: resolved 60, reused 1, downloaded 54, added 0
│  Progress: resolved 62, reused 1, downloaded 56, added 0
│  Progress: resolved 64, reused 1, downloaded 58, added 0
│  Progress: resolved 67, reused 1, downloaded 59, added 0
│  Progress: resolved 69, reused 1, downloaded 63, added 0
│  Progress: resolved 69, reused 1, downloaded 64, added 0
│  Progress: resolved 71, reused 1, downloaded 65, added 0
│  Progress: resolved 117, reused 6, downloaded 96, added 0
│  Progress: resolved 142, reused 6, downloaded 128, added 0
│  Progress: resolved 183, reused 8, downloaded 163, added 0
│  Progress: resolved 214, reused 8, downloaded 190, added 0
│  Progress: resolved 232, reused 8, downloaded 211, added 0
│  Progress: resolved 241, reused 8, downloaded 219, added 0
│  Progress: resolved 253, reused 8, downloaded 225, added 0
│  Progress: resolved 264, reused 8, downloaded 239, added 0
│  Progress: resolved 280, reused 8, downloaded 258, added 0
│  Progress: resolved 298, reused 8, downloaded 273, added 0
│  Progress: resolved 308, reused 8, downloaded 278, added 0
│  Progress: resolved 313, reused 8, downloaded 285, added 0
│  Progress: resolved 326, reused 8, downloaded 300, added 0
│  Progress: resolved 354, reused 8, downloaded 302, added 0
│  Progress: resolved 391, reused 18, downloaded 317, added 0
│  [WARN] Request took 11731ms: https://registry.npmjs.org/playwright
│  Progress: resolved 398, reused 18, downloaded 331, added 0
│  Progress: resolved 427, reused 18, downloaded 359, added 0
│  Progress: resolved 462, reused 21, downloaded 387, added 0
│  Progress: resolved 491, reused 21, downloaded 391, added 0
│  Progress: resolved 513, reused 21, downloaded 413, added 0
│  [WARN] Request took 16466ms: https://registry.npmjs.org/@lexical%2Freact
│  Progress: resolved 515, reused 21, downloaded 423, added 0
│  Progress: resolved 538, reused 21, downloaded 438, added 0
│  Progress: resolved 561, reused 21, downloaded 452, added 0
│  Progress: resolved 623, reused 22, downloaded 480, added 0
│  Progress: resolved 644, reused 23, downloaded 505, added 0
│  Progress: resolved 657, reused 23, downloaded 518, added 0
│  Progress: resolved 679, reused 23, downloaded 534, added 0
│  Progress: resolved 751, reused 29, downloaded 596, added 0
│  Progress: resolved 823, reused 31, downloaded 629, added 0
│  Progress: resolved 907, reused 32, downloaded 670, added 0
│  Progress: resolved 927, reused 32, downloaded 682, added 0
│  Progress: resolved 952, reused 34, downloaded 705, added 0
│  Progress: resolved 995, reused 35, downloaded 743, added 0
│  Progress: resolved 1065, reused 38, downloaded 792, added 0
│  Progress: resolved 1079, reused 38, downloaded 832, added 0
│  Progress: resolved 1087, reused 38, downloaded 848, added 0
│  [WARN] 3 deprecated subdependencies found: @esbuild-kit/core-utils@3.3.2, @esbuild-kit/esm-loader@2.6.5, node-domexception@1.0.0
│  Progress: resolved 1110, reused 38, downloaded 852, added 0
│  Packages: +886
│  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
│  Progress: resolved 1110, reused 38, downloaded 853, added 0
│  Progress: resolved 1110, reused 38, downloaded 853, added 67
│  Progress: resolved 1110, reused 38, downloaded 853, added 113
│  Progress: resolved 1110, reused 38, downloaded 853, added 153
│  Progress: resolved 1110, reused 38, downloaded 853, added 221
│  Progress: resolved 1110, reused 38, downloaded 853, added 288
│  Progress: resolved 1110, reused 38, downloaded 853, added 354
│  Progress: resolved 1110, reused 38, downloaded 853, added 371
│  Progress: resolved 1110, reused 38, downloaded 853, added 385
│  Progress: resolved 1110, reused 38, downloaded 853, added 411
│  Progress: resolved 1110, reused 38, downloaded 853, added 490
│  Progress: resolved 1110, reused 38, downloaded 853, added 530
│  Progress: resolved 1110, reused 38, downloaded 853, added 540
│  Progress: resolved 1110, reused 38, downloaded 853, added 556
│  Progress: resolved 1110, reused 38, downloaded 853, added 560
│  Progress: resolved 1110, reused 38, downloaded 853, added 569
│  Progress: resolved 1110, reused 38, downloaded 853, added 625
│  Progress: resolved 1110, reused 38, downloaded 853, added 651
│  Progress: resolved 1110, reused 38, downloaded 853, added 686
│  Progress: resolved 1110, reused 38, downloaded 853, added 696
│  Progress: resolved 1110, reused 38, downloaded 853, added 697
│  Progress: resolved 1110, reused 38, downloaded 853, added 725
│  Progress: resolved 1110, reused 38, downloaded 853, added 756
│  Progress: resolved 1110, reused 38, downloaded 853, added 759
│  Progress: resolved 1110, reused 38, downloaded 853, added 766
│  Progress: resolved 1110, reused 38, downloaded 853, added 767
│  Progress: resolved 1110, reused 38, downloaded 853, added 773
│  Progress: resolved 1110, reused 38, downloaded 853, added 777
│  Progress: resolved 1110, reused 38, downloaded 853, added 779
│  Progress: resolved 1110, reused 38, downloaded 853, added 780
│  Progress: resolved 1110, reused 38, downloaded 853, added 783
│  Progress: resolved 1110, reused 38, downloaded 853, added 794
│  Progress: resolved 1110, reused 38, downloaded 853, added 833
│  Progress: resolved 1110, reused 38, downloaded 853, added 849
│  Progress: resolved 1110, reused 38, downloaded 853, added 873
│  Progress: resolved 1110, reused 38, downloaded 853, added 883
│  Progress: resolved 1110, reused 38, downloaded 853, added 884
│  Progress: resolved 1110, reused 38, downloaded 853, added 885
│  Progress: resolved 1110, reused 38, downloaded 853, added 886
│  Progress: resolved 1110, reused 38, downloaded 853, added 886, done
│  [WARN] Issues with peer dependencies found. Run "pnpm peers check" to list them.
│  
│  dependencies:
│  + @payloadcms/admin-bar 3.85.0
│  + @payloadcms/db-sqlite 3.85.0
│  + @payloadcms/email-nodemailer 3.85.0
│  + @payloadcms/live-preview-react 3.85.0
│  + @payloadcms/next 3.85.0
│  + @payloadcms/plugin-ecommerce 3.85.0
│  + @payloadcms/plugin-form-builder 3.85.0
│  + @payloadcms/plugin-seo 3.85.0
│  + @payloadcms/richtext-lexical 3.85.0
│  + @payloadcms/translations 3.85.0
│  + @payloadcms/ui 3.85.0
│  + @radix-ui/react-accordion 1.2.11 (1.2.12 is available)
│  + @radix-ui/react-checkbox 1.3.3
│  + @radix-ui/react-dialog 1.1.15
│  + @radix-ui/react-label 2.1.8
│  + @radix-ui/react-select 2.2.6
│  + @radix-ui/react-slot 1.2.4
│  + @stripe/react-stripe-js 3.10.0 (6.6.0 is available)
│  + @stripe/stripe-js 4.10.0 (9.7.0 is available)
│  + class-variance-authority 0.7.1
│  + clsx 2.1.1
│  + cross-env 10.1.0
│  + date-fns 4.4.0
│  + dotenv 8.6.0 (17.4.2 is available)
│  + embla-carousel-auto-scroll 8.6.0
│  + embla-carousel-react 8.6.0
│  + geist 1.7.2
│  + graphql 16.14.1
│  + jsonwebtoken 9.0.1 (9.0.3 is available)
│  + lucide-react 0.563.0 (1.17.0 is available)
│  + next 16.2.6 (16.2.7 is available)
│  + next-themes 0.4.6
│  + payload 3.85.0
│  + prism-react-renderer 2.4.1
│  + qs-esm 8.0.1
│  + react 19.2.6 (19.2.7 is available)
│  + react-dom 19.2.6 (19.2.7 is available)
│  + react-hook-form 7.71.1 (7.77.0 is available)
│  + sharp 0.34.2 (0.34.5 is available)
│  + sonner 1.7.4 (2.0.7 is available)
│  + stripe 18.5.0 (22.2.0 is available)
│  + tailwind-merge 3.6.0
│  
│  devDependencies:
│  + @eslint/eslintrc 3.3.5
│  + @next/eslint-plugin-next 15.5.19 (16.2.7 is available)
│  + @playwright/test 1.59.1 (1.60.0 is available)
│  + @tailwindcss/postcss 4.1.18 (4.3.0 is available)
│  + @tailwindcss/typography 0.5.19
│  + @testing-library/react 16.3.0 (16.3.2 is available)
│  + @types/jsonwebtoken 9.0.10
│  + @types/node 24.12.3 (25.9.1 is available)
│  + @types/react 19.2.14 (19.2.16 is available)
│  + @types/react-dom 19.2.3
│  + @vercel/git-hooks 1.0.0
│  + @vitejs/plugin-react 4.5.2 (6.0.2 is available)
│  + eslint 9.39.4 (10.4.1 is available)
│  + eslint-config-next 16.2.6 (16.2.7 is available)
│  + eslint-plugin-jsx-a11y 6.10.2
│  + eslint-plugin-react 7.37.5
│  + eslint-plugin-react-hooks 5.2.0 (7.1.1 is available)
│  + jsdom 28.0.0 (29.1.1 is available)
│  + lint-staged 15.5.2 (17.0.7 is available)
│  + postcss 8.5.15
│  + prettier 3.8.3
│  + prettier-plugin-tailwindcss 0.6.14 (0.8.0 is available)
│  + tailwindcss 4.3.0
│  + tsx 4.22.4
│  + tw-animate-css 1.4.0
│  + typescript 6.0.3
│  + vite-tsconfig-paths 6.0.5 (6.1.1 is available)
│  + vitest 4.1.6 (4.1.8 is available)
│
◇  Payload project successfully created!
│
◇   Next Steps 
│
│  
│  Launch Application:
│  
│    - cd ./store
│    - pnpm dev or follow directions in README.md
│  
│  Documentation:
│  
│    - Getting Started: https://payloadcms.com/docs/getting-started/what-is-payload
│    - Configuration: https://payloadcms.com/docs/configuration/overview
│  
│  
│
└   Have feedback?  Visit us on GitHub: https://github.com/payloadcms/payload.
```
#### 2
```bash
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.onlyBuiltDependencies". See https://pnpm.io/settings for the new home of each setting.
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The following keys were ignored: "pnpm.onlyBuiltDependencies". See https://pnpm.io/settings for the new home of each setting.
Lockfile is up to date, resolution step is skipped
Already up to date

   ╭──────────────────────────────────────────────╮
   │                                              │
   │      Update available! 11.3.0 → 11.5.1.      │
   │     Changelog: https://pnpm.io/v/11.5.1      │
   │   To update, run: corepack use pnpm@11.5.1   │
   │                                              │
   ╰──────────────────────────────────────────────╯

node_modules/.pnpm/sharp@0.34.5/node_modules/sharp: Running install script, done in 291ms
node_modules/.pnpm/sharp@0.34.2/node_modules/sharp: Running install script, done in 298ms
Done in 7.1s using pnpm v11.3.0
$ cross-env NODE_OPTIONS=--no-deprecation next dev
▲ Next.js 16.2.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.1.106:3000
- Environments: .env
✓ Ready in 971ms
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry

- Experiments (use with caution):
  ⨯ turbopackServerFastRefresh

○ Compiling / ...
[✓] Pulling schema from database...
[17:52:46] WARN: No email adapter provided. Email will be written to console. More info at https://payloadcms.com/docs/email/overview.
 GET / 200 in 21.9s (next.js: 11.3s, application-code: 10.6s)
 GET / 200 in 327ms (next.js: 10ms, application-code: 317ms)
 GET / 200 in 267ms (next.js: 10ms, application-code: 257ms)
○ Compiling /[slug] ...
 GET /favicon.svg 200 in 9.3s
[⣷] Pulling schema from database...
[✓] Pulling schema from database...
[17:53:01] WARN: No email adapter provided. Email will be written to console. More info at https://payloadcms.com/docs/email/overview.
 GET /api/users/me 200 in 12.9s (next.js: 12.8s, application-code: 94ms)
 GET /api/users/me?depth=0&select%5Bid%5D=true&select%5Bcart%5D=true 200 in 12.9s (next.js: 12.8s, application-code: 98ms)
 GET /favicon.svg 404 in 5.7s (next.js: 4.6s, application-code: 1082ms)
 GET /api/users/me 200 in 98ms (next.js: 83ms, application-code: 15ms)
 GET /favicon.svg 404 in 14.3s (next.js: 13.1s, application-code: 1257ms)
 GET /favicon.ico 404 in 519ms (next.js: 30ms, application-code: 489ms)
[⣷] Pulling schema from database...
[✓] Pulling schema from database...
[17:53:09] WARN: No email adapter provided. Email will be written to console. More info at https://payloadcms.com/docs/email/overview.
 GET /favicon.svg 404 in 213ms (next.js: 28ms, application-code: 185ms)
○ Compiling /admin/[[...segments]] ...
[⣷] Pulling schema from database...
[✓] Pulling schema from database...
[17:56:45] WARN: No email adapter provided. Email will be written to console. More info at https://payloadcms.com/docs/email/overview.
 GET /admin 200 in 22.1s (next.js: 20.0s, application-code: 2.2s)
 GET /favicon.svg 404 in 359ms (next.js: 29ms, application-code: 330ms)
 GET /api/users/me 200 in 59ms (next.js: 35ms, application-code: 24ms)
 GET /api/payload-preferences/nav 200 in 40ms (next.js: 6ms, application-code: 34ms)
 GET /api/payload-preferences/nav 200 in 58ms (next.js: 28ms, application-code: 31ms)
 GET /admin/login 200 in 482ms (next.js: 34ms, application-code: 448ms)
 GET /admin/login 200 in 505ms (next.js: 41ms, application-code: 464ms)
 GET /admin/create-first-user 200 in 1040ms (next.js: 11ms, application-code: 1029ms)
 GET /admin/create-first-user 200 in 541ms (next.js: 11ms, application-code: 530ms)
[⣷] Pulling schema from database...
[✓] Pulling schema from database...
[17:57:13] WARN: No email adapter provided. Email will be written to console. More info at https://payloadcms.com/docs/email/overview.
```
### docs flat
```txt
payload ecommerce template

goal
├─ admin ecommerce có sẵn
├─ website ecommerce có sẵn
├─ không cần tự xây từ đầu

collections
├─ users
├─ products
├─ variants
├─ categories
├─ carts
├─ addresses
├─ orders
├─ transactions
├─ pages
└─ media

globals
├─ header
└─ footer

core features
├─ authentication
├─ access control
├─ seo
├─ search
├─ draft
├─ live preview
├─ revalidation
├─ stripe payment
├─ user account
├─ guest checkout
├─ scheduled publish
└─ layout builder

frontend
├─ next.js
├─ typescript
├─ tailwind
├─ shadcn/ui
└─ react-hook-form

database
├─ postgres
├─ push=true (dev)
├─ migration:create
└─ migration

commands
├─ create
│  └─ pnpx create-payload-app my-project -t ecommerce
├─ dev
│  └─ pnpm dev
├─ migration:create
│  └─ pnpm payload migrate:create
├─ migration:run
│  └─ pnpm payload migrate
├─ build
│  └─ pnpm build
└─ start
   └─ pnpm start

third-party
└─ stripe

important
├─ template đang beta
├─ schema ecommerce đã có sẵn
├─ admin panel đã có sẵn
├─ website đã có sẵn
├─ migration vẫn phải tự quản lý
└─ phù hợp nếu muốn ecommerce chạy nhanh
```