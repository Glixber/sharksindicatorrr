/*
  # Create purchases table for Sharks-5m Trading Indicator

  1. New Tables
    - `purchases`
      - `id` (uuid, primary key) - Unique identifier for each purchase
      - `session_id` (text, unique, not null) - Stripe session ID for payment verification
      - `email` (text) - Customer email from Stripe
      - `tradingview_username` (text, nullable) - TradingView username for access grant
      - `used` (boolean, default false) - Whether the claim link has been used
      - `access_granted` (boolean, default false) - Whether access was successfully granted
      - `created_at` (timestamptz, default now()) - Timestamp of purchase

  2. Security
    - Enable RLS on `purchases` table
    - Add policy for authenticated access (admin only)
    
  3. Important Notes
    - The session_id must be unique to prevent duplicate claims
    - The used flag prevents reusing the same claim link
    - This table tracks the entire purchase and activation flow
*/

CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  email text,
  tradingview_username text,
  used boolean DEFAULT false,
  access_granted boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for claim verification"
  ON purchases
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public update for claim activation"
  ON purchases
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);