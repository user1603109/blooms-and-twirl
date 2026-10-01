# 🌸 Blooms&Twirl by Shaira

> **Artisanal Flower Studio & E-Commerce Platform**  
> Designed for Metro Manila flower deliveries, bespoke bridal styling, and studio operations.  
> Directly matches the design system, metrics, and workflows from the reference studio console.

---

## ✨ Features Overview

### 1. Admin Studio Console (1:1 Reference Match)
* **Overview / Shop Floor:**
  * Greeting bar ("Good morning, Shaira") with morning order counts and pending bridal consults.
  * 4 Primary stat cards: Revenue today (₱68,420), Orders today (38), Average basket (₱1,801), New bouquets booked (9) with sparklines.
  * Interactive Takings Area Chart (7 days / 30 days / 90 days filter).
  * "What sold today" arrangement sales donut chart.
  * Latest Orders book with live status chips.
  * "Today's Runs" courier schedule (Yuna Park, Santo Tomas Cafe, Dra. Cristina Alegre) with status tracking (`Done`, `Rolling`, `Queued`).
  * "Blooms moving this week" bestsellers grid with cold-room level bars and instant Restock buttons.
  * Studio Diary feed of the last 24 hours & "All Saints' week" upcoming prep card.
  * Cold room 4°C widget with direct supplier line quick-link.
* **Orders (`/orders`):**
  * Metrics: Still to make (3), On the road (2), Delivered today (6).
  * Filter pills: All, Fresh, Arranging, In transit, Delivered, Cancelled.
  * Searchable table with channels (Online, Instagram, Phone), due times, customer avatars, and status dropdown.
* **Arrangements / Catalogue (`/bouquets`):**
  * Sold in 30 days, Bench valuation (₱1,096,530), Restock alerts.
  * Category tags: *Signature, Statement, Dried, Houseplant, Box, Bridal, Cheerful*.
  * "+ New arrangement" modal to publish new designs to both Admin and Customer Storefront.
* **Inventory (`/inventory`):**
  * Cold room stem lines, Below-need alerts, Vases (118), Wrap rolls (26).
  * Stock vs Need tracker with one-click "+ Check In" action.
* **Deliveries (`/deliveries`):**
  * Runs today, Done, On the road, Late alerts with Metro Manila courier run schedule.
* **Customers (`/customers`):**
  * Segments: Bride, Subscriber, Corporate, Weekend.
  * Customer directory with order count, lifetime value, and order history.
* **Promotions (`/promotions`):**
  * Discount code manager (ALLSAINTS15, TWIRLFIRST, BRIDE2027) with redemption counts.
* **Reviews (`/reviews`):**
  * 4.9★ aggregate rating, 5-star ratio, customer testimonials and reply actions.
* **Reports (`/reports`):**
  * Monthly sales, gross margin (56%), repeat rate (38%), courier on-time rate.
* **Staff (`/staff`):**
  * Team schedule, shifts, hours, and permission tiers (Admin vs Staff).
* **Settings (`/settings`):**
  * Flat-rate delivery fee, operating hours, payment toggles, and live Google Sheets + 5TB Google Drive sync connector.

---

### 2. Customer Storefront
* **Announcement Bar:** Same-day delivery across Metro Manila for orders placed before 1:00 PM.
* **Hero Banner:** Editorial aesthetic with bespoke typography (*Fraunces* serif + *Plus Jakarta Sans*).
* **Flower Catalogue:** Interactive category filter with real-time stem recipes and pricing.
* **Slide-over Basket / Cart:** Quantity modifiers, promo code voucher application (`TWIRLFIRST` or `ALLSAINTS15`), subtotal, and Metro Manila delivery calculations.
* **Multi-Step Checkout:**
  * Recipient details and Metro Manila delivery address.
  * Delivery time slot selection (Morning, Afternoon, Rush).
  * Payment options: GCash (mobile/QR), Maya, Credit Card, Cash on Delivery.
  * Complimentary handwritten dedication card message.
  * Automatically creates the order (e.g. `BT-2042`) and feeds it directly into the Admin Order Book and Customer Tracker!

---

### 3. Customer Dashboard & Order Tracker
* **Real-time Order Stepper:** 4-stage tracking (`Order Received` ➔ `On Florist Bench` ➔ `Courier En Route` ➔ `Delivered`).
* **Live Courier Details:** Shows assigned courier (e.g. Nino / Jom) and estimated window.
* **Card Dedication Preview:** Displays the personalized dedication message attached to the bouquet.
* **Bridal Consultation Booking Form:** Direct booking request for brides planning weddings in 2026/2027.

---

## 🗄️ Google Sheets & 5TB Google Drive Database

This application utilizes a dual-engine database:
1. **Local Persistent Engine:** Ready out of the box with zero configuration (persists in browser `localStorage`).
2. **Google Sheets + 5TB Google Drive Live Engine:**
   * Full Apps Script backend provided in `google-apps-script/Code.gs`.
   * Automatically initializes 8 relational sheets: `Orders`, `Products`, `Inventory`, `Customers`, `Deliveries`, `Promotions`, `Reviews`, `Settings`.
   * High-capacity 5TB Google Drive asset folder serves direct, unlimited image URLs (`https://lh3.googleusercontent.com/d/{FILE_ID}`) for all bouquet photography at ₱0 hosting cost.
   * See [GOOGLE_SHEETS_DATABASE_GUIDE.md](file:///d:/Bloom&Twirl/GOOGLE_SHEETS_DATABASE_GUIDE.md) for 5-minute setup instructions.

---

## 🚀 Instant Local Preview & Vercel Deployment

### Local Preview
Simply double-click [index.html](file:///d:/Bloom&Twirl/index.html) in your browser! No Node.js build process is required to run and test every single feature.

Alternatively, run a static server:
```bash
npx serve .
```

### Deploy to Vercel (1 Click)
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Keep the Framework Preset as **"Other"** or leave as default.
5. Click **"Deploy"**. The site will be live instantly with global CDN acceleration and HTTPS!
