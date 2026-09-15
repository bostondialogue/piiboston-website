# Peace Islands Institute Boston Replica

This repository is an Eleventy replica of the public `piiboston.org` website. The current implementation keeps the existing content structure and uses local assets from `src/assets/images`.

## Local development

Requirements:

- Node.js LTS and npm

Commands from the project root:

```bash
npm install
npm run serve
```

Open `http://localhost:8080` in a browser. To create a production build, run `npm run build`; Eleventy writes the output to `_site`.

## Current focus: homepage slider

The live homepage was reviewed on September 14, 2026. The landing page reference has:

- A slim contact and social bar above the primary navigation.
- A centered logo and a short primary menu.
- A full-width image slider immediately below the menu.
- A dark photo overlay with a small category label and large centered white headline.
- Previous/next arrow controls at the lower left and right edges.
- A rotating presentation of community and advocacy imagery.

The local replica implements that slider in `src/index.njk`, with presentation in `src/assets/css/style.css` and behavior in `src/assets/js/main.js`.

### Slider behavior

- Four local image slides are included from the live carousel: Peace, Advocacy, Interfaith, and Community.
- Slides autoplay every six seconds.
- Previous, next, and dot controls are keyboard accessible.
- Autoplay pauses while the pointer is over the slider or keyboard focus is inside it.
- Slide state is exposed with `aria-hidden` and `aria-selected` attributes.

## Reference boundaries

This project is a functional visual replica, not a copy of the WordPress implementation. Keep future homepage work focused on matching the public layout, spacing, imagery, typography, and interaction patterns while preserving the local Eleventy architecture.

The live HTTPS site currently reports a certificate-date warning in some browser environments. The public page was still inspected through the browser-rendered homepage and its HTTP entry point.
