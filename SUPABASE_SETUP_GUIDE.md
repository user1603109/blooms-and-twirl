# 🌸 Supabase Database & Realtime Setup Guide
**Store:** Blooms&Twirl by Shaira  
**Purpose:** Permanent fix for mobile ↔ laptop discrepancies, broken device-bound images, and realtime order tracking.

---

## ⚡ Why Supabase Kills the Problem
1. **Unified Postgres Cloud:** Orders and flower arrangements created on your laptop are immediately queryable on your phone, and vice versa.
2. **WebSocket Realtime Subscriptions:** When Shaira moves an order to *"On Florist Bench"* or *"In Transit"* on her laptop, the customer's phone status stepper advances **instantly** without reloading.
3. **Global CDN Image Storage:** Uploading a photo saves to the Supabase `bouquet-images` bucket. Both phones and laptops load the exact same high-speed link—ending the local `IndexedDB` trap forever.

---

## 🚀 3-Minute Setup Instructions

### Step 1: Create a Free Supabase Project
1. Go to [supabase.com](https://supabase.com) and click **"Start your project"** (Sign in with GitHub or Email).
2. Click **"New project"**.
3. Name your project: **`Blooms-and-Twirl`**.
4. Set a database password and choose your nearest region (e.g., **Singapore** for lowest latency to the Philippines).
5. Click **"Create new project"** (takes ~1 minute to provision).

---

### Step 2: Run the SQL Schema
1. In your new Supabase dashboard, click **SQL Editor** on the left menu (or the terminal icon).
2. Click **"New query"**.
3. Open the file [supabase/schema.sql](file:///d:/Bloom&Twirl/supabase/schema.sql) in this repository, copy its entire contents, and paste it into the Supabase SQL editor.
4. Click the green **Run** button (or press `Ctrl + Enter`).
5. All 8 relational tables (`arrangements`, `orders`, `inventory`, `customers`, `deliveries`, `promotions`, `reviews`, `settings`), the `bouquet-images` storage bucket, and Realtime publications are created instantly!

---

### Step 3: Copy Your API Keys
1. In your Supabase dashboard, click the gear icon **Project Settings** at the bottom of the left sidebar.
2. Click **API** under Configuration.
3. Copy two values:
   - **Project URL** (looks like: `https://xyzcompany.supabase.co`)
   - **anon / public key** (a long string starting with `eyJh...`)

---

### Step 4: Paste into Blooms&Twirl Admin Console
1. Open your Blooms&Twirl Admin Console (either by clicking the top right **Admin** button or going to `/admin/`).
2. Navigate to **Settings** in the sidebar.
3. Look for the **"Supabase Cloud Database & Realtime Sync"** card:
   - Paste your **Project URL**.
   - Paste your **Anon Key**.
   - Toggle **"Enable Supabase Cloud Sync"** to ON.
4. Click **"Save Supabase Config"** and then click **"Test Connection"**.
5. *(Optional)* Click **"Push Local Data to Supabase"** to automatically migrate any existing flower arrangements and orders up to your cloud database!

---

## 📱 Verifying Mobile & Laptop Sync
1. Open the website on your **Laptop**.
2. Open the same URL on your **Mobile Phone**.
3. Place a test bouquet order on your mobile phone.
4. Watch your laptop Admin Console: **The new order appears in realtime!**
5. Change the order status to *"Courier En Route"* on your laptop: your mobile phone screen updates instantly!
