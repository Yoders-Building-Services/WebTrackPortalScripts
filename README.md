# WebTrack Portal Scripts

Static files for the Yoder's Building Services WebTrack customer portal
(`wt.goyoders.com`). WebTrack pulls these in through its header/footer
sections. Served free via GitHub Pages.

**Why this exists:** the portal used to load these from Dropbox. Dropbox
stopped serving shared-link files in a browser-usable way (wrong
content-type, sandboxed), so the portal broke. Everything moved here.

## Layout

- `css/` — header and footer stylesheets
- `js/` — header and footer scripts
- `content/` — About / Home / Help page bodies (loaded via jQuery `.load()`)
- `images/` — logos, favicon, page images
- `webtrack-snippets/` — the header/footer blocks pasted into WebTrack itself
  (reference; not served as part of the site)

## Live URL base

`https://yoders-building-services.github.io/WebTrackPortalScripts/`

## Updating a file

Edit it, commit, push. GitHub Pages redeploys in a minute or two. The URLs
don't change, so nothing in WebTrack needs touching.
