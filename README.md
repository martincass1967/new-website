# mCw Connect: production launch export

Prepared 13 October 2026 for https://mcwconnect.com from approved Sites source commit `c97a59fed26ad0c56febc106f66ba9c7c3ae2dc8`. This is a standalone static HTML/CSS/JavaScript project. No framework, package.json, installation, build step, environment variables or API credentials are required. The approved raster logo is included unchanged. Fonts use the existing system-font stacks; there are no font downloads.

## Included files

- `public/`: complete editable website and production files, including the homepage, Inside, Origin, existing retained Connect file and the About route alias.
- `netlify.toml`: publish configuration, slashless route rewrites and legacy Connect redirects.
- `.gitignore`: local state and secret-file exclusions.
- `VERIFICATION.json`: checks performed and remaining verification limits.
- `EXPORT-MANIFEST.json`: SHA-256 hashes and source provenance.

No Sites access controls, account credentials or infrastructure files are included. The public site renders independently of ChatGPT Sites. The previous Sites preview has not been changed by this production export.

## Routes and existing architecture

| URL | Behavior |
| --- | --- |
| `/` | Existing homepage |
| `/inside` | Existing Inside document |
| `/origin` | Existing Origin document |
| `/about` | Alias of the existing homepage document that opens its existing founder section |
| `/connect`, `/connect/` | Permanent redirects to `/inside` |

About is not a newly designed standalone page: its generated HTML retains the homepage architecture and copy, adds About metadata and opens the founders section on entry. Canonical metadata points to each requested production URL. Trailing slash versions of the named routes redirect to slashless versions. Experience and Enquiries remain existing homepage anchors. No public Experience page or credentials download was added.

## Preview locally

```sh
python3 -m http.server 8080 --directory public
```

Open http://localhost:8080/. Python's basic server does not interpret netlify.toml; it can serve `/inside/`, `/origin/` and `/about/` with directory index files, but it may redirect a slashless request to its slash version. Netlify applies the supplied slashless rewrites after deployment. The local server cannot receive Netlify Forms submissions; submission failure there is expected. Do not claim receipt from a local test.

## Commit to Martin's private GitHub repository

Unzip into a local folder. The repository root should directly contain `README.md`, `netlify.toml`, `.gitignore`, the verification/manifests, and `public/`. Keep it private. If the repository already exists with commits, clone it, copy these files into that checkout, then commit and push without overwriting other work or force-pushing.

For a new empty repository:

```sh
git init
git add .
git commit -m "Prepare mCw Connect production launch"
git branch -M main
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

Use the real owner and repository name, and authenticate as your invited collaborator. No direct GitHub push was performed by this export. Do not store access tokens or passwords in project files.

## Netlify deployment

1. In the company-owned Netlify account, select **Add new project > Import an existing project**.
2. Choose GitHub and grant access to the specific private repository.
3. Select its `main` branch. Leave the base directory and build command blank. Set publish directory to `public`; netlify.toml already declares it.
4. Before the production deployment, open the project's **Forms** area and enable form detection if it is disabled. Deploy/redeploy the repository so Netlify parses the static form markup.
5. Verify that **mcw-enquiry** appears under active forms. Confirm the honeypot is recognized. Both homepage and About alias contain the same static form name and fields.
6. On the Netlify URL, directly open and refresh `/`, `/inside`, `/origin`, and `/about`. Check desktop/mobile layouts and menu navigation, all CTA selections and the approved logo.
7. Complete the live form and email test below before declaring the enquiry feature active.

There are no dependencies to install or build command to run. Netlify publishes the existing files. Do not add an SPA catch-all redirect.

## Production domain and HTTPS

In Netlify **Domain management**, add `mcwconnect.com` as the production domain and add/verify `www.mcwconnect.com` as needed. Use the exact DNS values shown by Netlify in the iwantmyname domain account. Preserve all existing MX, SPF, DKIM and other email-related records. Choose the desired primary domain, wait for DNS verification and HTTPS provisioning, then verify apex/www redirects and certificates. The export declares production metadata but does not register the domain, change DNS, provision a mailbox or configure HTTPS.

The private GitHub repository does not make the deployed site private. The previous owner-only Sites access restriction does not transfer. Use Netlify's supported access controls for a private prelaunch preview if needed.

## Enquiry implementation

The existing enquiry area now contains the required name/email fields, optional company/message fields and the four approved interest choices. The form is present in static HTML, named **mcw-enquiry**, with `data-netlify="true"`, a hidden matching `form-name` field and a `bot-field` honeypot. All fields are included in the URL-encoded AJAX POST to `/`.

CTAs keep their wording/styling:
- Discuss Inside selects **Inside / Private Buying Desk**.
- Discuss Origin selects **Origin / Private Marketplace**.
- Request credentials and the homepage detailed-credentials link select **Request credentials**.
- Get in touch selects **General enquiry**.

Cross-page selection uses an `interest` query parameter and the existing `#enquiry` destination. Native required/email validation is retained. Submit is disabled during the request, a 20-second timeout prevents indefinite waiting, and failure leaves entered values available for retry. The client displays the requested thank-you text only after an HTTP success response. This is not proof of inbox delivery. A timeout can leave receipt uncertain; the error message explicitly says submission could not be confirmed.

No external form service, credentials PDF, gated-content system or CMS has been introduced. The request sends nothing to Netlify until a visitor submits the deployed form.

## Configure notifications to info@mcwconnect.com

1. Verify the `info@mcwconnect.com` mailbox exists and can receive mail; the export does not create it.
2. In the deployed project's Netlify dashboard, go to **Forms > Submission notifications**.
3. Select **Add notification**, choose an email notification, select **mcw-enquiry** (or the applicable form-specific scope), and enter **info@mcwconnect.com** as recipient. Save it. The exact picker labels may vary with the account UI.
4. Submit a clearly labeled test enquiry through the deployed website using a real accessible email address. Verify the on-page confirmation, the corresponding verified submission in Netlify and its arrival in info@mcwconnect.com (including spam/junk checks).
5. Confirm the selected interest, message and sender fields are present in both dashboard and email; repeat the four CTA intent checks on mobile.
6. Only after those checks succeed report email delivery as active. If a submission is absent, inspect form detection, spam filtering and the response before retrying. If it is present but email is absent, investigate the notification and mailbox configuration.

The input named `email` enables Netlify's Reply-to behavior. Notifications are configured in Netlify, not hardcoded as a hidden recipient in the website. No environment variables are required.

Official references:
- https://docs.netlify.com/manage/forms/setup/
- https://docs.netlify.com/manage/forms/spam-filters/
- https://docs.netlify.com/manage/forms/notifications/
- https://docs.netlify.com/start/quickstarts/deploy-from-repository/
- https://docs.netlify.com/build/configure-builds/file-based-configuration/

## Metadata and assets

Includes requested homepage metadata, page-specific titles/descriptions/canonicals, Open Graph and Twitter tags, a 1200×630 social image using the approved logo, an approved-letterform favicon crop, robots.txt and a four-route sitemap. No logo geometry, color or spacing was changed. Social crawlers will require a publicly reachable deployment to fetch the preview image. The favicon/social assets are separate metadata assets and do not alter the on-page logo.

## Future text changes

Edit text in `public/index.html`, `public/inside/index.html`, and `public/origin/index.html`, preserving tags/classes/IDs. About is a static homepage alias: keep its document in sync with homepage edits while preserving its own About metadata and `data-about-entry` marker. Shared presentation remains in `public/style.css`; page-specific CSS remains in the existing folders. Content separation/CMS is deferred to avoid changing the approved architecture.

## Verification and remaining work

Verified locally: JS syntax; required/email validation; all four CTA interest selections; URL-encoded payload and honeypot; simulated success/error/network-error recovery; mobile-menu state; all local asset/page/fragment targets; four route rewrites and repeated direct requests in a local config simulation; metadata; unchanged approved non-enquiry section text and order; unchanged responsive CSS except functional form-state rules; identical logo bytes; and ZIP integrity.

Not verified: live Netlify form detection/receipt/email, production DNS/HTTPS, social crawler rendering, or browser visual QA at desktop/mobile widths. Responsive styles are preserved, but that is not a live layout test. No Netlify deployment, GitHub push, DNS change, mailbox creation or external test enquiry was performed. Those are the remaining launch steps.
