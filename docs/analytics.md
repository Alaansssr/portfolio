# Vercel Web Analytics

Installed `@vercel/analytics` and mounted its React component once in `src/App.jsx`.
Only production builds render Analytics. No cookies, local storage identifiers, custom
visitor IDs, or other analytics services have been added.

## Page navigation

Home and About share a pathname and use hash navigation. Explicit SDK route/path
props report `/` for Home and `/about` for About (an analytics label, not a new URL).
Passing route disables automatic page views, so each actual page change sends only
one view. Repeated Home links and hero rotation do not generate extra views.
Reported paths are fixed strings, with no visitor-provided query or hash values.
The component stays mounted across both pages.

## Plan limitations checked October 16, 2026

The authenticated Vercel teams API reports Hobby for `alaa-suliman-s-projects`.
Vercel supports custom events only on Pro and Enterprise:
https://vercel.com/docs/analytics/custom-events

Project selection changes local React state without changing the URL. Project-open
and link-click events are deliberately not implemented on this plan; they are not
misreported as page views. The existing Contact mail link remains unchanged. No CV
download or external portfolio links currently exist in the React app.

After a supported upgrade, add project-open events when the selected case study is
actually viewed (not for every icon rotation), and link-click events in the relevant
handlers. Use fixed project/link labels only, never email addresses, destination
query strings, visitor IDs, or free text. Recheck plan support before implementing.

## Enable and deploy

1. Open https://vercel.com/alaa-suliman-s-projects and select the portfolio project.
2. Open Analytics / Web Analytics and click Enable if it is not already enabled.
3. Deploy these code changes to production using the existing Git deployment flow.
4. Visit the production website and navigate Home -> About -> Home. In the browser
   Network panel, confirm the Vercel insights script loads and page-view requests
   succeed. The local Vite preview does not provide Vercel collection endpoints.
5. Return to Analytics to see page views, visitors, countries, devices, browsers,
   and referrers. Referrer information depends on what the referring browser sends;
   analytics cannot identify individual recruiters.

No environment variables, API keys, or changes to vercel.json are required.
Normal automatic collection supplies the standard audience metrics; there are no
separate custom events for countries or devices.

Documentation: https://vercel.com/docs/analytics/quickstart

## Validation

- `npm run lint`
- `npm run build`
- `npm ci --dry-run --ignore-scripts` (lockfile / deployment install check)

Initial package installation used `--legacy-peer-deps` because npm tried to resolve
an optional Remix peer against this React 19 app. The resulting lockfile passes the
normal npm ci dry run; no permanent npm configuration changes were needed.
Production collection still requires the dashboard enablement and deployment above.
