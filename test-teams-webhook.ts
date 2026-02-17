import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const webhookUrl = process.env.TEAMS_WEBHOOK_URL;

if (!webhookUrl) {
    console.error('❌ TEAMS_WEBHOOK_URL not found in environment variables');
    process.exit(1);
}

console.log('🔍 Testing Teams webhook with axios...');
console.log('📍 Webhook URL:', webhookUrl.substring(0, 60) + '...');

const testPayload = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: 'Test Message from Playwright Reporter',
    themeColor: '28a745',
    sections: [
        {
            activityTitle: '✅ Webhook Test Message',
            activitySubtitle: 'Testing webhook connectivity with axios',
            facts: [
                { name: 'Status:', value: 'Testing' },
                { name: 'Timestamp:', value: new Date().toISOString() },
                { name: 'HTTP Client:', value: 'Axios with 30s timeout' }
            ],
            markdown: true
        }
    ]
};

async function testWebhook() {
    try {
        console.log('📤 Sending test payload...');

        const response = await axios.post(webhookUrl, testPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 30000, // 30 second timeout
        });

        console.log('✅ Webhook test SUCCESSFUL!');
        console.log('📊 Response status:', response.status, response.statusText);
        console.log('📄 Response data:', response.data);
    } catch (error) {
        console.error('❌ Webhook test FAILED!');

        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                console.error('⏱️ Request timeout - the webhook endpoint did not respond within 30 seconds');
            } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
                console.error('🌐 Network error - cannot reach the webhook endpoint');
            } else if (error.response) {
                console.error('📊 Response status:', error.response.status);
                console.error('📄 Response data:', error.response.data);
            } else if (error.request) {
                console.error('📡 No response received from webhook endpoint');
            }
            console.error('🔍 Error code:', error.code);
            console.error('🔍 Error message:', error.message);
        } else if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Stack trace:', error.stack);
        }
        process.exit(1);
    }
}

testWebhook();
