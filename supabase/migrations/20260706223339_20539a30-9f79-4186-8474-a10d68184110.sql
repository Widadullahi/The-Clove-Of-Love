
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  gender TEXT CHECK (gender IN ('male','female')),
  date_of_birth DATE,
  location_city TEXT,
  location_country TEXT,
  religion TEXT,
  religiosity TEXT,
  ethnicity TEXT,
  education TEXT,
  occupation TEXT,
  marriage_timeline TEXT CHECK (marriage_timeline IN ('6_months','1_year','2_years','flexible')),
  has_children TEXT,
  wants_children TEXT,
  languages TEXT[] DEFAULT '{}',
  core_values TEXT[] DEFAULT '{}',
  lifestyle JSONB DEFAULT '{}'::jsonb,
  communication_style TEXT,
  about_me TEXT,
  avatar_url TEXT,
  phone TEXT,
  phone_verified BOOLEAN NOT NULL DEFAULT false,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can delete own profile" ON public.profiles
  FOR DELETE TO authenticated USING (auth.uid() = id);

-- Partner preferences
CREATE TABLE public.partner_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  age_min INT,
  age_max INT,
  preferred_locations TEXT[] DEFAULT '{}',
  preferred_religions TEXT[] DEFAULT '{}',
  religiosity_importance TEXT,
  preferred_ethnicities TEXT[] DEFAULT '{}',
  marriage_timeline TEXT CHECK (marriage_timeline IN ('6_months','1_year','2_years','flexible')),
  wants_children TEXT,
  education_min TEXT,
  deal_breakers TEXT[] DEFAULT '{}',
  must_haves TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_preferences TO authenticated;
GRANT ALL ON public.partner_preferences TO service_role;

ALTER TABLE public.partner_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own preferences" ON public.partner_preferences
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER prefs_set_updated_at BEFORE UPDATE ON public.partner_preferences
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile + preferences on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  INSERT INTO public.partner_preferences (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
