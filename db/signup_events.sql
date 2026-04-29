-- Signup tracking table for Supabase

create table if not exists signup_events (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  full_name text,
  email text not null,
  phone text,
  role text not null,
  accepted boolean not null default true,
  created_at timestamptz default now()
);
