-- Supabase policy for the profiles table
-- Allow authenticated users to manage only their own profile row.

-- Insert own profile row
create policy "Allow authenticated user to insert own profile" on profiles
  for insert
  with check (auth.uid() = id);

-- Select own profile row
create policy "Allow authenticated user to select own profile" on profiles
  for select
  using (auth.uid() = id);

-- Update own profile row
create policy "Allow authenticated user to update own profile" on profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
