# Editorial visual system

The homepage and case studies share a near-black experience surface (#080808) and a warm off-white documentation surface (#F7F6F3). Shared text, border, surface and focus colors live in src/editorial.css. Light bands extend to the viewport edges without clipping sticky content.

- VIBROFEST: intro, question, concept, interactive chapters and final experience/reflection are dark. Development and detailed testing/documentation are light. The chapter viewer keeps one dark surface rather than changing backgrounds as chapters advance.
- Arena: introduction and proposed interaction system are dark. Research and the unchanged review stack share one light band. Journey diagrams and prototype documentation share another light band. The closing outcome/reflection is dark.
- Architecture: cover/overview and render galleries are dark. Each project's existing descriptive introduction and plan form a light documentation section. Nested containers were flattened to allow independent full-width backgrounds; existing images, copy and sequence are retained.

Desktop two-column and phone single-column architecture galleries remain. The mobile hero controls, 3D model rendering, viewport-aware videos, review animation and chapter navigation remain in place. Existing review screenshots and source images retain their original colors.

Validation: production build, ESLint, and whitespace checks; Chrome checks at 390, 768 and 1440 pixels across all three projects confirmed the intended theme variables, readable foreground colors, and no horizontal overflow.
