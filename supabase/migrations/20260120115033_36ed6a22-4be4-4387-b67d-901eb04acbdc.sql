-- Fix user_roles security: Only allow users to see their own roles
DROP POLICY IF EXISTS "User roles viewable by authenticated" ON public.user_roles;

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);