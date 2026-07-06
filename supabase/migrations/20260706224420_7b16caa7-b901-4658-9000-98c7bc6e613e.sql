
DROP POLICY IF EXISTS "Members can view other completed profiles" ON public.profiles;

CREATE OR REPLACE FUNCTION public.current_user_onboarded()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND onboarding_completed = true
  );
$$;

REVOKE EXECUTE ON FUNCTION public.current_user_onboarded() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.current_user_onboarded() TO authenticated;

CREATE POLICY "Members can view other completed profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (
    onboarding_completed = true
    AND id <> auth.uid()
    AND public.current_user_onboarded()
  );
