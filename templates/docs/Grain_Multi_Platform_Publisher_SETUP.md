# Grain Multi-Platform Publisher v1 - Setup Guide

## Overview

This workflow automates social media publishing across multiple platforms (Instagram, Facebook, LinkedIn, Twitter) using a Google Sheets content calendar and AI-generated platform-specific captions.

```
WORKFLOW FLOW:
Schedule Trigger (30 min)
    → Read Google Sheets
    → Filter approved & unpublished
    → Check scheduled time
    → AI Generate Captions (per platform)
    → Post to platforms (parallel)
    → Update Sheet status
    → Slack notification
```

---

## 1. Google Sheets Setup

### Create Content Calendar Sheet

Create a new Google Spreadsheet with a sheet named `Content_Calendar`.

### Required Columns

| Column | Field Name | Description | Example |
|--------|-----------|-------------|---------|
| A | post_id | Unique identifier | AUTO-001 |
| B | client_name | Client/brand name | Cafe Aroma |
| C | industry | Business sector | cafe, hotel, restaurant |
| D | scheduled_datetime | Publish time | 2025-01-20 14:00 |
| E | platforms | Target platforms (comma-separated) | instagram,facebook,linkedin |
| F | content_type | Media type | image / video / carousel |
| G | media_url | Public URL to media | https://... |
| H | original_caption | Base content text | Yeni kahvemiz |
| I | status | Approval status | draft / pending / approved |
| J | published | Published flag | TRUE / FALSE |
| K | published_at | Auto-filled timestamp | 2025-01-20 14:05:23 |
| L | instagram_post_id | Auto-filled | 17... |
| M | facebook_post_id | Auto-filled | 123... |
| N | linkedin_post_id | Auto-filled | urn:li:share:... |
| O | twitter_post_id | Auto-filled | 1234... |
| P | published_platforms | Auto-filled | instagram, facebook |
| Q | notes | Optional notes | - |

### Platform Aliases

The workflow recognizes these aliases:
- Instagram: `instagram`, `ig`
- Facebook: `facebook`, `fb`
- Twitter: `twitter`, `tw`
- LinkedIn: `linkedin`, `li`
- TikTok: `tiktok`, `tt`

### Sample Data Row

```
AUTO-001 | Cafe Aroma | cafe | 2025-01-20 10:00 | instagram,fb,linkedin | image | https://example.com/img.jpg | Yeni sezon kahvelerimiz geldi! | approved | FALSE | | | | | |
```

---

## 2. n8n Credentials Setup

### 2.1 Google Sheets OAuth2

1. Go to **n8n** → **Settings** → **Credentials** → **Add Credential**
2. Search for "Google Sheets OAuth2"
3. Click **"Sign in with Google"**
4. Select your Google account
5. Grant permissions for:
   - Google Sheets (read/write)
   - Google Drive (read)
6. Save credential

### 2.2 OpenAI API

1. Get API key from [platform.openai.com](https://platform.openai.com)
2. In n8n: **Settings** → **Credentials** → **Add Credential**
3. Search for "OpenAI"
4. Enter your API key: `sk-...`
5. Save credential

### 2.3 Meta (Instagram/Facebook) Setup

#### Prerequisites:
- Facebook Business Page
- Instagram Business/Creator Account connected to Facebook Page
- Meta Developer App

#### Steps:
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create or select your app
3. Add "Instagram Graph API" and "Pages API" products
4. Generate long-lived access token with permissions:
   - `instagram_basic`
   - `instagram_content_publish`
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`

### 2.4 LinkedIn OAuth2

1. Go to [linkedin.com/developers](https://www.linkedin.com/developers/)
2. Create an app
3. Request access to:
   - Share on LinkedIn (w_member_social)
   - Sign In with LinkedIn (r_liteprofile)
4. In n8n: **Settings** → **Credentials** → **Add Credential**
5. Search for "OAuth2 API"
6. Configure with LinkedIn OAuth endpoints

### 2.5 Twitter/X OAuth2

1. Go to [developer.twitter.com](https://developer.twitter.com)
2. Create a project and app
3. Enable OAuth 2.0
4. Set callback URL to your n8n instance
5. In n8n: **Settings** → **Credentials** → **Add Credential**
6. Search for "Twitter OAuth2"
7. Enter Client ID and Secret

### 2.6 Slack (Optional)

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create new app → From scratch
3. Add Bot Token Scopes: `chat:write`, `chat:write.public`
4. Install to workspace
5. Copy Bot User OAuth Token: `xoxb-...`
6. In n8n: Add Slack credential with this token

---

## 3. Environment Variables

In n8n, go to **Settings** → **Variables** and add:

| Variable | Description | Example |
|----------|-------------|---------|
| IG_BUSINESS_ID | Instagram Business Account ID | 17841... |
| FB_PAGE_ID | Facebook Page ID | 1234567890 |
| META_ACCESS_TOKEN | Meta Graph API Token | EAABc... |
| LINKEDIN_ORG_ID | LinkedIn Organization ID | 12345678 |

### How to Find These IDs:

**Instagram Business ID:**
```
GET https://graph.facebook.com/v18.0/me/accounts?access_token={TOKEN}
→ Select your page → Get instagram_business_account.id
```

**Facebook Page ID:**
```
GET https://graph.facebook.com/v18.0/me/accounts?access_token={TOKEN}
→ Copy "id" field
```

**LinkedIn Organization ID:**
- Go to your company page
- URL format: linkedin.com/company/12345678
- The number is your Organization ID

---

## 4. Import Workflow

1. In n8n, click **"..."** menu → **Import from file**
2. Select `Grain_Multi_Platform_Publisher_v1.json`
3. Click **Import**
4. Connect your credentials to each node:
   - Google Sheets nodes → Google Sheets OAuth2
   - OpenAI node → OpenAI API
   - Slack node → Slack credential

---

## 5. Testing

### Add Test Data

In your Google Sheet, add a row:

```
TEST-001 | Test Client | cafe | [current datetime] | instagram | image | https://picsum.photos/1080/1080 | Test post content | approved | FALSE
```

### Run Test

1. In n8n, click **"Test Workflow"**
2. Check each node's output
3. Verify:
   - Google Sheets data is read correctly
   - Filter passes approved items
   - AI generates captions
   - Platform routing works

### Debug Tips

- If Google Sheets fails: Check OAuth scopes
- If OpenAI fails: Verify API key and balance
- If Instagram fails: Check media URL is publicly accessible
- If posting fails: Verify environment variables

---

## 6. Production Setup

### Enable Schedule

1. Toggle the workflow **Active**
2. The schedule trigger runs every 30 minutes

### Recommended Settings

- Set error handling to continue on error
- Add error notification to Slack
- Consider adding rate limiting for high-volume accounts

### Monitoring

Check execution history in n8n for:
- Successful posts
- Failed posts (check error messages)
- Skipped items (not approved or wrong time)

---

## 7. Roadmap - Additional Modules

This is Module 1 of the Grain Automation Suite:

| Module | Name | Status |
|--------|------|--------|
| 1 | Multi-Platform Publisher | Ready |
| 2 | Content Calendar + AI Caption | Planned |
| 3 | Analytics & Reporting | Planned |
| 4 | Review Monitoring & Crisis Alert | Planned |
| 5 | Budget Guardian | Planned |
| 6 | Churn Predictor | Planned |

---

## Support

For issues or feature requests, check the repository or contact the development team.
