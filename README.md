# Kshitij.dev

A personal portfolio for Kshitij Garg, built with React, TypeScript, Vite, Tailwind CSS, React Router, Motion, and React Three Fiber.

## Getting started

```sh
npm install
npm run dev
```

## Public details

Copy `.env.example` to `.env.local` and add only public contact and profile details. GitHub and LinkedIn already use the public profile links supplied by Kshitij and may be overridden here:

```env
VITE_CONTACT_EMAIL=
VITE_GITHUB_URL=
VITE_LINKEDIN_URL=
VITE_RESUME_URL=/documents/resume.pdf
```

Place the real resume at `public/documents/resume.pdf`. The Resume page checks that the URL serves a PDF before showing View and Download links. `VITE_RESUME_URL` can override the default path. Values with the `VITE_` prefix are exposed in the browser bundle; never place secrets there.

## Updating portfolio content

Projects are managed in one local source file, `src/data/projects.ts`. This is a static, public read-only portfolio: visitors cannot add, edit, delete, or upload project content, and there is no project-management backend.

To add or update a project:

1. Open `src/data/projects.ts` in VS Code and copy an existing object.
2. Give it a unique `id` and fill in `title`, `shortDescription`, and `category`.
3. Add a longer `description` only when you have verified details to share. Leave it as an empty string to use the short description.
4. Add the actual `githubUrl` and `liveUrl`. Empty, malformed, non-web, and localhost URLs are not rendered as links.
5. Add only confirmed `technologies`, implemented `features`, and a `status` (`In Progress` or `Completed`) when known. Unknown fields can remain empty or unset.
6. To add an optional thumbnail, put the real image in `public/images/projects/` and set `thumbnail` to its public path, for example `/images/projects/my-project.png`. Missing or broken images fall back to the existing abstract project artwork.
7. Save the file and preview with `npm run dev` (Vite applies source changes automatically).
8. Run `npm run build`, then commit and deploy the updated source to publish the new portfolio version.

The Kisan Mantri entry already contains its supplied repository and deployed demo links. Other project URLs, technologies, features, full descriptions, statuses, and thumbnails remain blank until verified. The existing cinematic Projects route, category filters, detail modal, and Home project cards all render from this same file.

Profile and skills remain in `src/data/portfolio.ts`; verified certificates remain in `src/data/certificates.ts`. Resume and contact setup instructions are above. Vite `VITE_` values are public in the browser bundle and must never contain secrets.

## Build

```sh
npm run build
npm run preview
```

## Netlify deployment

Import the repository into Netlify. `netlify.toml` configures `npm run build`, publishes `dist`, and routes refreshed paths through the React app. Add any public `VITE_` values in the Netlify site environment settings, then redeploy.
