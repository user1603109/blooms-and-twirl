-- ==============================================================================
-- BLOOMS & TWIRL BY SHAIRA - SUPABASE DATABASE SCHEMA & REALTIME CONFIGURATION
-- ==============================================================================
-- Run this script in your Supabase SQL Editor to initialize all tables,
-- storage buckets, and realtime synchronization channels.
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. ARRANGEMENTS TABLE (Floral Catalogue & Cold Room Stock)
create table if not exists public.arrangements (
    id text primary key,
    name text not null,
    tag text default 'Signature',
    category text default 'Signature',
    price numeric not null default 0,
    cold_room_count integer default 5,
    sold_30d integer default 0,
    rating numeric default 5.0,
    image text,
    description text,
    stems jsonb default '[]'::jsonb,
    is_featured boolean default false,
    is_low_stock boolean default false,
    product_type text default 'arranged',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDERS TABLE (Metro Manila & Northern Luzon Delivery Tracker)
create table if not exists public.orders (
    id text primary key,
    date text not null,
    customer_name text not null,
    email text,
    phone text,
    region text default 'Cordillera (CAR)',
    province_city text,
    barangay text,
    street text,
    address text,
    arrangement_name text,
    items jsonb default '[]'::jsonb,
    total numeric not null default 0,
    payment_method text default 'GCash',
    payment_status text default 'Paid',
    status text default 'Order Received',
    tracking_step integer default 1,
    courier_name text,
    due_time text,
    delivery_slot text,
    card_message text,
    notes text,
    channel text default 'Online Storefront',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. INVENTORY TABLE (Cold Room Stems, Vases, Paper Wrapping)
create table if not exists public.inventory (
    id text primary key,
    name text not null,
    type text default 'Stems',
    in_stock integer default 0,
    needed integer default 0,
    unit text default 'stems',
    is_low boolean default false,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. CUSTOMERS DIRECTORY
create table if not exists public.customers (
    id text primary key,
    name text not null,
    initials text default 'CL',
    email text,
    phone text,
    segment text default 'Weekend',
    orders_count integer default 1,
    lifetime_value numeric default 0,
    last_order_date text,
    customer_since_date text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. DELIVERIES (Courier Runs)
create table if not exists public.deliveries (
    id text primary key,
    run_id text not null,
    time text,
    recipient text not null,
    location text not null,
    courier text,
    status text default 'Queued',
    order_id text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. PROMOTIONS TABLE
create table if not exists public.promotions (
    id text primary key,
    code text unique not null,
    description text,
    discount text,
    status text default 'Active',
    uses integer default 0
);

-- 8. REVIEWS & TESTIMONIALS
create table if not exists public.reviews (
    id text primary key,
    customer_name text not null,
    quote text not null,
    rating integer default 5,
    badge text default 'Verified Bride',
    date text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. SHOP SETTINGS & CONFIGURATION
create table if not exists public.settings (
    key text primary key,
    value jsonb not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 10. ENABLE ROW LEVEL SECURITY (RLS) & OPEN ACCESS FOR PUBLIC STOREFRONT
-- ==============================================================================
alter table public.arrangements enable row level security;
alter table public.orders enable row level security;
alter table public.inventory enable row level security;
alter table public.customers enable row level security;
alter table public.deliveries enable row level security;
alter table public.promotions enable row level security;
alter table public.reviews enable row level security;
alter table public.settings enable row level security;

-- Public read policies (Storefront & Mobile Visitors)
create policy "Allow public read arrangements" on public.arrangements for select using (true);
create policy "Allow public insert/update arrangements" on public.arrangements for all using (true);

create policy "Allow public read orders" on public.orders for select using (true);
create policy "Allow public insert/update orders" on public.orders for all using (true);

create policy "Allow public read inventory" on public.inventory for select using (true);
create policy "Allow public insert/update inventory" on public.inventory for all using (true);

create policy "Allow public read customers" on public.customers for select using (true);
create policy "Allow public insert/update customers" on public.customers for all using (true);

create policy "Allow public read deliveries" on public.deliveries for select using (true);
create policy "Allow public insert/update deliveries" on public.deliveries for all using (true);

create policy "Allow public read promotions" on public.promotions for select using (true);
create policy "Allow public insert/update promotions" on public.promotions for all using (true);

create policy "Allow public read reviews" on public.reviews for select using (true);
create policy "Allow public insert/update reviews" on public.reviews for all using (true);

create policy "Allow public read settings" on public.settings for select using (true);
create policy "Allow public insert/update settings" on public.settings for all using (true);

-- ==============================================================================
-- 11. ENABLE REALTIME PUBLICATION (INSTANT SYNC MOBILE <-> LAPTOP)
-- ==============================================================================
-- This allows WebSockets to broadcast changes to any open mobile or desktop browser!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table public.arrangements;
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.inventory;
alter publication supabase_realtime add table public.deliveries;
alter publication supabase_realtime add table public.settings;

-- ==============================================================================
-- 12. STORAGE BUCKET FOR FLOWER PHOTOGRAPHY (Replaces Local IndexedDB)
-- ==============================================================================
insert into storage.buckets (id, name, public) 
values ('bouquet-images', 'bouquet-images', true)
on conflict (id) do nothing;

create policy "Allow public bouquet image viewing" on storage.objects 
for select using (bucket_id = 'bouquet-images');

create policy "Allow public bouquet image uploads" on storage.objects 
for insert with check (bucket_id = 'bouquet-images');

create policy "Allow public bouquet image updates" on storage.objects 
for update using (bucket_id = 'bouquet-images');

create policy "Allow public bouquet image deletes" on storage.objects 
for delete using (bucket_id = 'bouquet-images');

-- ==============================================================================
-- AUTOMATIC STORAGE GARBAGE COLLECTION TRIGGERS (PREVENTS DATABASE FLOODING)
-- ==============================================================================
-- 1. Automatically delete image from storage bucket when an arrangement is deleted
create or replace function public.handle_deleted_arrangement_image()
returns trigger as $$
begin
  if old.image is not null and old.image like '%/bouquet-images/%' then
    delete from storage.objects
    where bucket_id = 'bouquet-images'
      and name = split_part(split_part(old.image, '/bouquet-images/', 2), '?', 1);
  end if;
  return old;
end;
$$ language plpgsql security definer;

drop trigger if exists on_arrangement_deleted on public.arrangements;
create trigger on_arrangement_deleted
  after delete on public.arrangements
  for each row execute function public.handle_deleted_arrangement_image();

-- 2. Automatically delete old image from storage bucket when arrangement photo is replaced
create or replace function public.handle_updated_arrangement_image()
returns trigger as $$
begin
  if old.image is not null 
     and old.image like '%/bouquet-images/%' 
     and (new.image is null or new.image <> old.image) then
    delete from storage.objects
    where bucket_id = 'bouquet-images'
      and name = split_part(split_part(old.image, '/bouquet-images/', 2), '?', 1);
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_arrangement_image_updated on public.arrangements;
create trigger on_arrangement_image_updated
  after update of image on public.arrangements
  for each row execute function public.handle_updated_arrangement_image();

-- ==============================================================================
-- 13. SEED INITIAL PRODUCTS (Curated Artisanal Benguet & Baguio Collections)
-- ==============================================================================
insert into public.arrangements (id, name, tag, category, price, cold_room_count, sold_30d, rating, image, description, stems, is_featured, is_low_stock)
values
('arr-1', 'Petal Parade', 'Signature', 'Signature', 2450, 14, 96, 4.9, 'https://images.unsplash.com/photo-1587556930799-8dca6a737e5e?auto=format&fit=crop&w=800&q=80', 'Our signature bouquet featuring Benguet highland roses in peach and cream, accented with white astilbe and sweet Italian ruscus.', '["Highland roses", "Peach ranunculus", "Cream astilbe"]'::jsonb, true, false),
('arr-2', 'Fuchsia Fable', 'Statement', 'Statement', 1990, 5, 78, 4.8, 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80', 'Vibrant burst of lush deep magenta peonies, ruby ranunculus, and silvery seeded eucalyptus in satin wrapping.', '["Peonies", "Ranunculus", "Eucalyptus"]'::jsonb, false, true),
('arr-3', 'Dusk & Dried', 'Dried', 'Dried', 1640, 3, 51, 4.7, 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80', 'Everlasting artisanal arrangement with dusty rose, pampas grass, lavender, and terracotta accents in ceramic vase.', '["Dusty rose", "Pampas grass", "Terracotta blooms"]'::jsonb, false, true),
('arr-4', 'Twirl Orchid', 'Houseplant', 'Houseplant', 3290, 8, 34, 5.0, 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80', 'Cascading spikes of pure white and blush Phalaenopsis orchids in handcrafted rose ceramic.', '["Phalaenopsis orchid", "Sphagnum moss"]'::jsonb, false, false),
('arr-5', 'Sweet Blush Box', 'Box', 'Box', 2850, 6, 62, 4.9, 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=800&q=80', 'Luxury round hatbox with Dutch hydrangeas, cappuccino roses, and blush carnations.', '["Hydrangeas", "Cappuccino roses", "Blush carnations"]'::jsonb, true, false),
('arr-6', 'Bridal Serenade', 'Bridal', 'Bridal', 4800, 4, 29, 5.0, 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', 'Couture bridal bouquet with cascading White O’Hara garden roses, fragrant sweet peas, and pure silk ribbon.', '["White O’Hara roses", "Sweet peas", "Calla lilies"]'::jsonb, false, true),
('arr-7', 'Sunny Gerbera', 'Cheerful', 'Cheerful', 1550, 11, 84, 4.8, 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80', 'Sun-drenched golden gerbera daisies, coral spray roses, and fresh chamomile buds.', '["Golden gerberas", "Coral spray roses", "Chamomile"]'::jsonb, false, false),
('arr-8', 'Velvet Romance', 'Signature', 'Signature', 3100, 9, 40, 4.9, 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80', 'Two dozen deep red velvet Ecuadorian roses wrapped in black and blush bespoke papers with satin ribbon.', '["Ecuadorian red roses", "Eucalyptus gunnii"]'::jsonb, false, false)
on conflict (id) do nothing;
