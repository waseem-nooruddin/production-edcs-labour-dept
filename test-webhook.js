/**
 * Simple webhook test script to verify Teams webhook connectivity
 */
require('dotenv').config();

const webhookUrl = process.env.TEAMS_WEBHOOK_URL;

if (!webhookUrl) {
    console.error('❌ TEAMS_WEBHOOK_URL not found in environment variables');
    process.exit(1);
}

console.log('🔍 Testing Teams webhook...');
console.log('📍 Webhook URL:', webhookUrl.substring(0, 50) + '...');

const testPayload = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: 'Test Message from Playwright Reporter',
    themeColor: '28a745',
    sections: [
        {
            activityTitle: '✅ Webhook Test Message',
            activitySubtitle: 'Testing webhook connectivity',
            facts: [
                { name: 'Status:', value: 'Testing' },
                { name: 'Timestamp:', value: new Date().toISOString() }
            ],
            markdown: true
        }
    ]
};

async function testWebhook() {
    try {
        console.log('📤 Sending test payload...');
        console.log('Payload:', JSON.stringify(testPayload, null, 2));

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testPayload)
        });

        console.log('📊 Response status:', response.status, response.statusText);

        const responseText = await response.text();
        console.log('📄 Response body:', responseText);

        if (response.ok) {
            console.log('✅ Webhook test SUCCESSFUL!');
        } else {
            console.error('❌ Webhook test FAILED!');
            console.error('Status:', response.status);
            console.error('Response:', responseText);
        }
    } catch (error) {
        console.error('❌ Error testing webhook:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
    }
}

testWebhook();
