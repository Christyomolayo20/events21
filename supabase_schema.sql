-- ====================================================================
-- Events 21 (Royalty Twenty One Events) - Supabase Cloud Database Schema
-- Project Reference: kmkvhypdcsabnvwytvug
-- Target Database: https://kmkvhypdcsabnvwytvug.supabase.co
-- ====================================================================

-- 1. Consultations Table
CREATE TABLE IF NOT EXISTS public.consultations (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_type TEXT NOT NULL,
    consultation_date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    message TEXT DEFAULT '',
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Event Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_date TEXT DEFAULT '',
    event_location TEXT DEFAULT '',
    guest_count TEXT DEFAULT '',
    budget_range TEXT DEFAULT '',
    message TEXT DEFAULT '',
    status TEXT DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Custom Gift Requests Table (Gifts by Adeola)
CREATE TABLE IF NOT EXISTS public.gift_requests (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    recipient_name TEXT DEFAULT '',
    occasion TEXT DEFAULT '',
    budget TEXT DEFAULT '',
    items_requested TEXT DEFAULT '',
    delivery_date TEXT DEFAULT '',
    delivery_address TEXT DEFAULT '',
    personal_message TEXT DEFAULT '',
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to allow clean re-runs
DROP POLICY IF EXISTS "Allow public insert consultations" ON public.consultations;
DROP POLICY IF EXISTS "Allow public insert enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow public insert gift_requests" ON public.gift_requests;
DROP POLICY IF EXISTS "Allow select consultations" ON public.consultations;
DROP POLICY IF EXISTS "Allow select enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow select gift_requests" ON public.gift_requests;

-- Allow Public Insert Policies (for website visitors submitting forms)
CREATE POLICY "Allow public insert consultations" ON public.consultations
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public insert enquiries" ON public.enquiries
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public insert gift_requests" ON public.gift_requests
    FOR INSERT TO public WITH CHECK (true);

-- Allow Select Policies (for viewing/syncing in admin)
CREATE POLICY "Allow select consultations" ON public.consultations
    FOR SELECT TO public USING (true);

CREATE POLICY "Allow select enquiries" ON public.enquiries
    FOR SELECT TO public USING (true);

CREATE POLICY "Allow select gift_requests" ON public.gift_requests
    FOR SELECT TO public USING (true);
