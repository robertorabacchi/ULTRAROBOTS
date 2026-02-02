
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length) {
            process.env[key.trim()] = valueParts.join('=').trim();
        }
    });
}

const username = process.env.SITE_USERNAME || 'admin';
const password = process.env.SITE_PASSWORD || 'ultrarobots2025';
const calendarId = process.env.GOOGLE_CALENDAR_ID;
const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

console.log('--- DIAGNOSTIC START ---');
console.log('Username:', username);
console.log('Calendar ID:', calendarId);
console.log('Service Account Length:', serviceAccountJson ? serviceAccountJson.length : 'MISSING');

if (serviceAccountJson) {
    try {
        // Try to parse it straight away
        const parsed = JSON.parse(serviceAccountJson);
        console.log('Service Account JSON: VALID (Direct parse)');
        console.log('Project ID:', parsed.project_id);
        console.log('Client Email:', parsed.client_email);
    } catch (e) {
        console.error('Service Account JSON: INVALID (Direct parse)');
        console.error('Error:', e.message);

        // Try cleaning as the route does
        try {
            const cleaned = serviceAccountJson.replace(/^["']|["']$/g, '').replace(/\\"/g, '"').replace(/\\n/g, '\n');
            const parsedCleaned = JSON.parse(cleaned);
            console.log('Service Account JSON (Cleaned): VALID');
            console.log('Project ID:', parsedCleaned.project_id);
        } catch (e2) {
            console.error('Service Account JSON (Cleaned): STILL INVALID');
            console.error('Error:', e2.message);
            console.log('Raw string (first 100 char):', serviceAccountJson.substring(0, 100));
        }
    }
}

console.log('--- DIAGNOSTIC END ---');
