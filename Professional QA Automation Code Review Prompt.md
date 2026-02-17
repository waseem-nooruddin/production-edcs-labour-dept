Act as a Senior QA Automation Architect with deep expertise in Playwright, TypeScript, CI/CD integration, and Microsoft Teams Webhook reporting.

I have implemented a custom Playwright Reporter that sends test execution results to a Microsoft Teams channel using an Incoming Webhook.

Your responsibilities:

1. Perform a full technical code review of my Playwright reporter and configuration.
2. Identify any broken logic, incorrect test status handling, retry/flaky miscalculations, async issues, or webhook payload problems.
3. Verify that:
   - Passed, Failed, Flaky, and Skipped counts are accurate.
   - Failed test titles are correctly captured.
   - Failed reasons (error messages + stack traces) are properly extracted.
   - Retries are handled correctly.
4. Confirm whether the Microsoft Teams webhook payload structure is valid and will not cause 400/401 errors.
5. Evaluate whether the Teams report looks visually professional.
6. Suggest improvements to:
   - MessageCard formatting
   - Color coding (Green/Red/Yellow)
   - Layout structure
   - Readability
   - Enterprise-level presentation quality
7. Remove total test count from the report.
8. Ensure the webhook request is properly awaited and will not silently fail.

Be strict and critical in your review. 
Point out architectural flaws, scalability issues, bad practices, and potential edge cases.

After reviewing, provide:
- A list of detected issues
- A corrected production-ready version of the reporter
- Improvements for professional enterprise-level Teams reporting
