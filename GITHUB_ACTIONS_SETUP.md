# GitHub Actions Setup Guide

This guide explains how to configure GitHub Actions to run your Playwright automation tests on a schedule.

## 🚀 Quick Start

Your workflow is now configured to run:
- **Daily at 4:00 AM IST** (10:30 PM UTC previous day)
- **On every push** to main/master branches
- **On pull requests** to main/master branches
- **Manually** from the GitHub Actions UI

## 📋 Required Setup Steps

### 1. Add GitHub Repository Secrets

To enable Teams notifications in CI, you need to add your webhook URL as a secret:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name | Description | Required |
|-------------|-------------|----------|
| `TEAMS_WEBHOOK_URL` | Your Microsoft Teams incoming webhook URL | ✅ Yes |
| `PLAYWRIGHT_REPORT_URL` | URL to published HTML report (optional) | ❌ No |

**To get your Teams webhook URL:**
1. Open Microsoft Teams
2. Go to your channel → **⋯** (More options) → **Connectors**
3. Search for "Incoming Webhook" → **Configure**
4. Give it a name (e.g., "Playwright Test Results") → **Create**
5. Copy the webhook URL

### 2. Verify Workflow Configuration

The workflow file is located at: `.github/workflows/playwright.yml`

Key features:
- ✅ Scheduled execution using cron: `30 22 * * *` (4 AM IST)
- ✅ Manual trigger option via `workflow_dispatch`
- ✅ Environment variables configured from GitHub secrets
- ✅ Playwright report artifacts uploaded (30-day retention)

## 🎯 How to Use

### Manual Trigger

To run tests manually:
1. Go to **Actions** tab in your GitHub repository
2. Select **Playwright Tests** workflow
3. Click **Run workflow** button
4. Select branch and click **Run workflow**

### View Results

After a workflow run:
1. Go to **Actions** tab
2. Click on the workflow run
3. View the test results in the job logs
4. Download the Playwright HTML report from **Artifacts** section
5. Check your Teams channel for the automated notification

## 📅 Cron Schedule Explained

```yaml
schedule:
  - cron: '30 22 * * *'
```

- **Format**: `minute hour day month weekday`
- **`30 22 * * *`**: Runs at 22:30 UTC every day
- **IST Conversion**: 22:30 UTC = 04:00 AM IST (next day)

**To change the schedule:**
- Edit the cron expression in `.github/workflows/playwright.yml`
- Use [crontab.guru](https://crontab.guru/) to validate your cron expression
- Remember: GitHub Actions uses UTC timezone

## 🔍 Troubleshooting

### Tests not running at scheduled time
- Verify the cron expression is correct
- GitHub Actions scheduled workflows may have a delay of up to 15 minutes during high load
- Check the **Actions** tab for any workflow run failures

### Teams notifications not working
- Verify `TEAMS_WEBHOOK_URL` secret is set correctly
- Test the webhook URL manually using the `test-teams-webhook.ts` script
- Check workflow logs for any error messages related to Teams reporter

### Workflow not triggering
- Ensure the workflow file is in the `main` or `master` branch
- Scheduled workflows only run on the default branch
- Check repository settings to ensure Actions are enabled

## 📊 Environment Variables

The workflow automatically sets these environment variables:

| Variable | Source | Purpose |
|----------|--------|---------|
| `TEAMS_WEBHOOK_URL` | GitHub Secret | Teams notification endpoint |
| `PLAYWRIGHT_REPORT_URL` | GitHub Secret | Link to published report |
| `CI` | GitHub Actions | Indicates CI environment |
| `GITHUB_REF` | GitHub Actions | Branch/tag reference |
| `GITHUB_SHA` | GitHub Actions | Commit SHA |
| `GITHUB_RUN_NUMBER` | GitHub Actions | Workflow run number |

These are automatically detected by your Teams reporter for rich notifications.

## 🎨 Next Steps

1. **Set up GitHub Secrets** (see step 1 above)
2. **Test manual trigger** to verify everything works
3. **Wait for scheduled run** or adjust cron time for immediate testing
4. **Monitor Teams notifications** to ensure reports are being sent

## 📝 Notes

- Workflow runs are retained for 90 days
- Artifacts (HTML reports) are retained for 30 days
- You can view up to 1000 workflow runs in the Actions tab
- Scheduled workflows are automatically disabled after 60 days of repository inactivity
