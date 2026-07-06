export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      partner_preferences: {
        Row: {
          age_max: number | null
          age_min: number | null
          created_at: string
          deal_breakers: string[] | null
          education_min: string | null
          marriage_timeline: string | null
          must_haves: string[] | null
          preferred_ethnicities: string[] | null
          preferred_locations: string[] | null
          preferred_religions: string[] | null
          religiosity_importance: string | null
          updated_at: string
          user_id: string
          wants_children: string | null
        }
        Insert: {
          age_max?: number | null
          age_min?: number | null
          created_at?: string
          deal_breakers?: string[] | null
          education_min?: string | null
          marriage_timeline?: string | null
          must_haves?: string[] | null
          preferred_ethnicities?: string[] | null
          preferred_locations?: string[] | null
          preferred_religions?: string[] | null
          religiosity_importance?: string | null
          updated_at?: string
          user_id: string
          wants_children?: string | null
        }
        Update: {
          age_max?: number | null
          age_min?: number | null
          created_at?: string
          deal_breakers?: string[] | null
          education_min?: string | null
          marriage_timeline?: string | null
          must_haves?: string[] | null
          preferred_ethnicities?: string[] | null
          preferred_locations?: string[] | null
          preferred_religions?: string[] | null
          religiosity_importance?: string | null
          updated_at?: string
          user_id?: string
          wants_children?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          about_me: string | null
          avatar_url: string | null
          communication_style: string | null
          core_values: string[] | null
          created_at: string
          date_of_birth: string | null
          education: string | null
          ethnicity: string | null
          full_name: string | null
          gender: string | null
          has_children: string | null
          id: string
          languages: string[] | null
          lifestyle: Json | null
          location_city: string | null
          location_country: string | null
          marriage_timeline: string | null
          occupation: string | null
          onboarding_completed: boolean
          phone: string | null
          phone_verified: boolean
          religion: string | null
          religiosity: string | null
          updated_at: string
          wants_children: string | null
        }
        Insert: {
          about_me?: string | null
          avatar_url?: string | null
          communication_style?: string | null
          core_values?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          education?: string | null
          ethnicity?: string | null
          full_name?: string | null
          gender?: string | null
          has_children?: string | null
          id: string
          languages?: string[] | null
          lifestyle?: Json | null
          location_city?: string | null
          location_country?: string | null
          marriage_timeline?: string | null
          occupation?: string | null
          onboarding_completed?: boolean
          phone?: string | null
          phone_verified?: boolean
          religion?: string | null
          religiosity?: string | null
          updated_at?: string
          wants_children?: string | null
        }
        Update: {
          about_me?: string | null
          avatar_url?: string | null
          communication_style?: string | null
          core_values?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          education?: string | null
          ethnicity?: string | null
          full_name?: string | null
          gender?: string | null
          has_children?: string | null
          id?: string
          languages?: string[] | null
          lifestyle?: Json | null
          location_city?: string | null
          location_country?: string | null
          marriage_timeline?: string | null
          occupation?: string | null
          onboarding_completed?: boolean
          phone?: string | null
          phone_verified?: boolean
          religion?: string | null
          religiosity?: string | null
          updated_at?: string
          wants_children?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
