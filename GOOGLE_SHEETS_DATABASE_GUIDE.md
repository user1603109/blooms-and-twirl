# Google Sheets & 5TB Google Drive Database Guide
**Store:** Blooms&Twirl by Shaira  
**Deployment Target:** Vercel

---

## 🌸 Overview
This web application is built with a dual database engine:
1. **Instant Reactive Local Engine:** Operates without setup, persisting orders, inventory, and status in browser storage (`localStorage` / offline state).
2. **Google Cloud Engine (Sheets + 5TB Drive):** Allows Shaira to use Google Sheets as a live relational database and Google Drive (5TB) as an asset CDN for high-resolution flower photography.

---

## 🚀 5-Minute Setup Instructions

### Step 1: Create the Google Sheet
1. Log into your Google account (with your 5TB Google Drive storage).
2. Create a new Google Spreadsheet and title it **`Bloom&Twirl_Database`**.
3. Note the Spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/`**`<YOUR_SPREADSHEET_ID>`**`/edit`

### Step 2: Install the Apps Script Webhook
1. In your Google Sheet, click **Extensions > Apps Script**.
2. Delete any boilerplate code in `Code.gs`.
3. Open the file [google-apps-script/Code.gs](file:///d:/Bloom&Twirl/google-apps-script/Code.gs) in this project and paste the contents into the Apps Script editor.
4. Run the function `setupDatabase` once. Google will ask for permission authorization. Click **Advanced > Go to Untitled (unsafe) > Allow**. This auto-creates and formats all 8 tables:
   - `Orders`
   - `Products`
   - `Inventory`
   - `Customers`
   - `Deliveries`
   - `Promotions`
   - `Reviews`
   - `Settings`

### Step 3: Deploy as a Web App
1. In the top right of the Apps Script editor, click **Deploy > New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set the following options:
   - **Description:** `Blooms&Twirl API Webhook`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone`
4. Click **Deploy**.
5. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/.../exec`).

### Step 4: Link in Bloom&Twirl Admin Settings
1. Open the Bloom&Twirl admin console.
2. Navigate to **Settings** in the left sidebar.
3. Under the **Google Sheets & 5TB Drive Integration** card:
   - Paste your **Google Apps Script Web App URL**.
   - Paste your **Google Sheet ID**.
   - *(Optional)* Create a folder in your 5TB Google Drive named `BloomsTwirl_Images` and paste its Folder ID.
4. Click **"Save changes"** and click **"Test Connection"**.
5. You are live! Any order placed on the customer storefront will automatically append a row to your Google Sheet!

---

## 📸 Using 5TB Google Drive for Flower Photography
When you upload or link an image from Google Drive:
- File URLs stored as `https://lh3.googleusercontent.com/d/{FILE_ID}` serve as direct, cached image links across Vercel with no bandwidth caps.
- You can store tens of thousands of high-resolution RAW or JPEG arrangement photos across your 5TB quota at ₱0 extra hosting cost.
