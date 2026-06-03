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

### Critical last step: Synchronize

After you paste and save the scripts, switch to the **`Sync Data`** tab (same tab
level as Page Content) and click **`Synchronize`**.

**Saving alone does nothing to the live site.** The customer portal reads a
*synced copy* of these scripts, not the ones you just saved. Until you click
Synchronize, your edit sits in BisTrack and `wt.goyoders.com` keeps serving the
old version. This one cost hours of debugging: the save looked successful, the
page never changed, because the sync had not run.

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

## Browse the hosted files

This README is served on GitHub Pages, so the links below open the live files.
Use your browser Back button to return here (the script files can't link back to
this page on their own).

**Page content** (the bodies the portal injects)
- [About page](content/YoderAboutPage.html)
- [Home page](content/YoderHomePage.html)
- [Help page](content/YoderHelpPage.html)

**Stylesheets**
- [Header CSS](css/YoderHeaderCSS.css)
- [Footer CSS](css/YoderFooterCSS.css)

**Scripts**
- [Header JS](js/YoderHeaderJS.js)
- [Footer JS](js/YoderFooterJS.js)

**Images**
- [Favicon](images/Yoder-Favicon.png)
- [Yoder WebTrack logo](images/Yoder-Webtrack-Logo.png) / [Yoders Building Services logo](images/Yoders-Building-Services-Logo.png)
- [Nav logo](images/output-onlinepngtools.png) / [Nav logo (alt)](images/output-onlinepngtools-21.png)
- About: [image 1](images/About_Page1.jpg) / [image 2](images/About_Page_Image_2.jpg) / [image 3](images/About_Page3.jpg)
- Home: [image 1](images/Home_Page_Image_1.jpg) / [image 2](images/Home_Page_Image_2.jpg) / [image 3](images/Home_Page_Image_3.jpg)

**WebTrack paste-in blocks** (go into BisTrack, not served as part of the site)
- [Header scripts block](webtrack-snippets/YoderHeaderScripts.html)
- [Footer scripts block](webtrack-snippets/YoderFooterScripts.html)

## Live URL base

`https://yoders-building-services.github.io/WebTrackPortalScripts/`

## Updating a file

Edit it, commit, push. GitHub Pages redeploys in a minute or two. The URLs
don't change, so nothing in WebTrack needs touching.
