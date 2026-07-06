
-- Allow signed-in members who completed onboarding to view other completed profiles
CREATE POLICY "Members can view other completed profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (
    onboarding_completed = true
    AND id <> auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.profiles me
      WHERE me.id = auth.uid() AND me.onboarding_completed = true
    )
  );

-- Interests (directional "I'm interested")
CREATE TABLE public.interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (from_user, to_user),
  CHECK (from_user <> to_user)
);

CREATE INDEX interests_to_user_idx ON public.interests(to_user);
CREATE INDEX interests_from_user_idx ON public.interests(from_user);

GRANT SELECT, INSERT, DELETE ON public.interests TO authenticated;
GRANT ALL ON public.interests TO service_role;

ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members read interests involving them"
  ON public.interests FOR SELECT TO authenticated
  USING (auth.uid() = from_user OR auth.uid() = to_user);

CREATE POLICY "Members send their own interest"
  ON public.interests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = from_user);

CREATE POLICY "Members withdraw their own interest"
  ON public.interests FOR DELETE TO authenticated
  USING (auth.uid() = from_user);
