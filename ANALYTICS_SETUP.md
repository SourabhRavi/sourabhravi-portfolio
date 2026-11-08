# Portfolio analytics setup

The portfolio sends interaction events to the Google Tag Manager data layer. GTM must forward those events to the GA4 property before they appear in GA4 reports.

## 1. Confirm the base Google tag

In Google Tag Manager, open the portfolio container (the site currently loads container `GTM-PX88BS99`).

Create or verify one **Google tag**:
- Tag ID: the GA4 web stream Measurement ID (`G-XXXXXXXXXX`)
- Trigger: **All Pages**
- Publish the container.

Do not install a second hard-coded GA4 tag in the site while GTM is managing the Google tag.

## 2. Forward portfolio interaction events

Create one **Google Analytics: GA4 Event** tag:
- Name: `GA4 - Portfolio interactions`
- Event name: `{{Event}}` (the built-in GTM Event variable)
- Google tag / Configuration tag: select the Google tag from step 1.
- Trigger: a **Custom Event** trigger named `Portfolio custom events`.
- Event name (enable **Use regex matching**):

```regex
^(project_view|project_click|resume_open|contact_click|social_click|outbound_click|cta_click|navigation_click|portfolio_interaction|section_view|scroll_depth)$
```

This is intentionally an allow-list. Do not use `.*`, which can fire for unrelated GTM and Google tag events.

Save and publish the container.

## 3. Add event parameters (recommended)

Create GTM Data Layer Variables (Version 2) for the following names, then map them as event parameters on the GA4 Event tag. You can add all of them to the tag; GA4 will receive the values that exist for each event.

| Event parameter | Data Layer Variable name |
| --- | --- |
| `project_name` | `project_name` |
| `project_url` | `project_url` |
| `link_text` | `link_text` |
| `link_location` | `link_location` |
| `contact_method` | `contact_method` |
| `platform` | `platform` |
| `link_url` | `link_url` |
| `link_domain` | `link_domain` |
| `cta_text` | `cta_text` |
| `cta_location` | `cta_location` |
| `destination` | `destination` |
| `navigation_label` | `navigation_label` |
| `section_id` | `section_id` |
| `section_name` | `section_name` |
| `element_type` | `element_type` |
| `percent_scrolled` | `percent_scrolled` |
| `open_in_new_tab` | `open_in_new_tab` |

For example, the `project_name` event parameter should use the GTM variable `{{DLV - project_name}}`, where that variable's Data Layer Variable Name is exactly `project_name`.

## 4. Enable useful GA4 enhanced measurement

In GA4: **Admin → Data streams → your web stream → Enhanced measurement**.

Keep Page views and Scrolls enabled. Enable Outbound clicks and File downloads. Form interactions can remain off until the site has a real form. GA4's automatic scroll event fires at 90%; the portfolio's separate `scroll_depth` event records 25%, 50%, 75% and 90%.

The resume route is `/api/resume` (no .pdf suffix), so the portfolio also sends `resume_open` when a resume link is clicked. This measures the click/open intent, not proof that a visitor read the document.

## 5. Test before relying on reports

1. In GTM, click **Preview** and connect to `https://sourabhravi.site`.
2. Visit the page, scroll through the project cards, click a project, open the resume, and click the email / social links.
3. In the Tag Assistant preview, confirm **GA4 - Portfolio interactions** fires for the custom events.
4. In GA4, open **Reports → Realtime** (or **Admin → DebugView** while debugging) and verify the events arrive.
5. Submit/publish the GTM workspace when the preview is correct.

Standard GA4 reports can take 24–48 hours to fully populate. Realtime and DebugView are the right places for immediate testing.

## What this measures

- Audience: users, sessions, new users, returning users, geography, device and traffic source (subject to consent, browser settings and GA4 processing).
- Content: page views, section views and scroll depth.
- Work: project impressions (`project_view`) and project opens (`project_click`).
- Job search: resume opens (`resume_open`), LinkedIn and GitHub clicks (`social_click`).
- Freelancing: Upwork clicks (`social_click`), email / phone intent (`contact_click`) and other outbound links.
- Navigation and calls to action: `navigation_click`, `cta_click`.

The site does not currently contain a contact form, so it must not report `generate_lead` or `form_submit` as if a lead was successfully submitted. An email link click is intent, not a confirmed lead.

## Privacy

Do not send email addresses, names typed by visitors, message contents, or other personally identifiable information to GA4. The click tracker deliberately strips query strings and fragments from tracked URLs. Configure an appropriate privacy/consent approach for the regions and audiences you serve.
