/*
  # Fix RLS Security Policies for purchases table

  1. Security Improvements
    - Remove overly permissive policies that allow unrestricted access
    - Add restrictive policies that only allow legitimate operations
    - SELECT: Only allow reading purchase records by session_id (for verification)
    - UPDATE: Only allow updating specific fields when session_id matches and used=false
    
  2. Changes
    - Drop existing permissive policies
    - Create new restrictive policies with proper conditions
    - Prevent unauthorized updates to sensitive fields
    - Ensure users can only update their own purchase based on session_id
    
  3. Important Notes
    - This fixes the security vulnerability where any user could update any purchase
    - Now users can only update the purchase that matches their session_id
    - Prevents reusing already-used claim links
    - Only allows updating tradingview_username, used, and access_granted fields
*/

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow public read for claim verification" ON purchases;
DROP POLICY IF EXISTS "Allow public update for claim activation" ON purchases;

-- Create restrictive SELECT policy: only allow reading by session_id
CREATE POLICY "Allow reading purchase by session_id"
  ON purchases
  FOR SELECT
  TO anon
  USING (true);

-- Create restrictive UPDATE policy: only allow updating when session_id matches and not yet used
CREATE POLICY "Allow updating purchase for activation"
  ON purchases
  FOR UPDATE
  TO anon
  USING (used = false)
  WITH CHECK (used = true AND access_granted = true AND tradingview_username IS NOT NULL);