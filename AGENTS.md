<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Publication control

No information becomes public merely because it exists. This repository is the public website only.

- Never place official Family documents (Constitution, Codex, Government, Capital System, Marriage Protocol, Chronicle, Path) or any internal record in `public/`, `app/`, `components/`, or `lib/`. Keep originals in secure storage outside this project.
- Publish only approved, high-level institutional content. When classification is uncertain, treat it as non-public.
- Never publish member identities, genealogy, minors' data, financial data, governance deliberations, addresses, or credentials.
- `npm run check:publication` runs before every build and fails if non-approved file types, internal-looking document names, or secret patterns are found.

## Languages

The site supports Spanish (default), English, Italian and French, mirroring augustovalmont.com and valmontacademy.com. The choice is stored in the HttpOnly `vf_locale` cookie by the `setLanguage` server action (`app/actions.ts`) and pages render server-side from it, so URLs never change. All copy lives in `lib/dictionaries/{es,en,it,fr}.ts` (typed by `types.ts`); add new text to all four. The official motto "The Sovereign Creates" stays in English in every language.
