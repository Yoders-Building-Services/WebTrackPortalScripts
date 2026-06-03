# WebTrack Portal Scripts

Static files for the Yoder's Building Services WebTrack customer portal
(`wt.goyoders.com`). WebTrack pulls these in through its header/footer
sections. Served free via GitHub Pages.

**Why this exists:** the portal used to load these from Dropbox. Dropbox
stopped serving shared-link files in a browser-usable way (wrong
content-type, sandboxed), so the portal broke. Everything moved here.

## Where to paste the header/footer scripts (in BisTrack)

The two files in `webtrack-snippets/` are the blocks that go into BisTrack.
Navigate to:

> System Manager -> eBusiness -> eBusiness Taskpad -> WebTrack Manager
> -> **Page Content** tab -> **Page Header Scripts** / **Page Footer Scripts**

- `webtrack-snippets/YoderHeaderScripts.html` goes in **Page Header Scripts**
- `webtrack-snippets/YoderFooterScripts.html` goes in **Page Footer Scripts**

The page bodies (the "Please wait while content loads" placeholder divs in
`webtrack-snippets/*Div.html`) live in the WebTrack page content itself, where
the header script's `.load()` calls inject the real About/Home/Help content.

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
