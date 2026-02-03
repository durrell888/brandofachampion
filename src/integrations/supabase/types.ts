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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      coach_access_logs: {
        Row: {
          access_type: string
          created_at: string
          id: string
          school_id: string
          user_id: string
        }
        Insert: {
          access_type?: string
          created_at?: string
          id?: string
          school_id: string
          user_id: string
        }
        Update: {
          access_type?: string
          created_at?: string
          id?: string
          school_id?: string
          user_id?: string
        }
        Relationships: []
      }
      coaching_sessions: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          preferred_date: string | null
          preferred_time: string | null
          status: string
          team_member: string
          topic: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string
          team_member: string
          topic: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          status?: string
          team_member?: string
          topic?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      dchs_participants: {
        Row: {
          created_at: string
          forty_yard: number | null
          grade: number
          hundred_meter: number | null
          id: string
          name: string
          position: string | null
          status: string
          updated_at: string
          vertical: number | null
        }
        Insert: {
          created_at?: string
          forty_yard?: number | null
          grade: number
          hundred_meter?: number | null
          id?: string
          name: string
          position?: string | null
          status?: string
          updated_at?: string
          vertical?: number | null
        }
        Update: {
          created_at?: string
          forty_yard?: number | null
          grade?: number
          hundred_meter?: number | null
          id?: string
          name?: string
          position?: string | null
          status?: string
          updated_at?: string
          vertical?: number | null
        }
        Relationships: []
      }
      georgia_daily_polls: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          option_a: string
          option_b: string
          poll_date: string
          question: string
          votes_a: number
          votes_b: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          option_a: string
          option_b: string
          poll_date?: string
          question: string
          votes_a?: number
          votes_b?: number
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          option_a?: string
          option_b?: string
          poll_date?: string
          question?: string
          votes_a?: number
          votes_b?: number
        }
        Relationships: []
      }
      georgia_media: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_featured: boolean
          thumbnail_url: string | null
          title: string
          video_url: string | null
          view_count: number
          youtube_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          thumbnail_url?: string | null
          title: string
          video_url?: string | null
          view_count?: number
          youtube_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          thumbnail_url?: string | null
          title?: string
          video_url?: string | null
          view_count?: number
          youtube_id?: string | null
        }
        Relationships: []
      }
      georgia_player_votes: {
        Row: {
          class_year: string | null
          created_at: string
          id: string
          player_name: string
          position: string
          school: string | null
          updated_at: string
          vote_count: number
          voter_id: string | null
        }
        Insert: {
          class_year?: string | null
          created_at?: string
          id?: string
          player_name: string
          position: string
          school?: string | null
          updated_at?: string
          vote_count?: number
          voter_id?: string | null
        }
        Update: {
          class_year?: string | null
          created_at?: string
          id?: string
          player_name?: string
          position?: string
          school?: string | null
          updated_at?: string
          vote_count?: number
          voter_id?: string | null
        }
        Relationships: []
      }
      georgia_poll_votes: {
        Row: {
          chosen_option: string
          created_at: string
          id: string
          poll_id: string
          voter_id: string
        }
        Insert: {
          chosen_option: string
          created_at?: string
          id?: string
          poll_id: string
          voter_id: string
        }
        Update: {
          chosen_option?: string
          created_at?: string
          id?: string
          poll_id?: string
          voter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "georgia_poll_votes_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "georgia_daily_polls"
            referencedColumns: ["id"]
          },
        ]
      }
      georgia_position_votes: {
        Row: {
          created_at: string
          id: string
          player_id: string
          position: string
          visitor_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          player_id: string
          position: string
          visitor_id: string
        }
        Update: {
          created_at?: string
          id?: string
          player_id?: string
          position?: string
          visitor_id?: string
        }
        Relationships: []
      }
      georgia_visitor_streaks: {
        Row: {
          created_at: string
          current_streak: number
          id: string
          last_visit_date: string
          longest_streak: number
          total_visits: number
          updated_at: string
          visitor_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number
          id?: string
          last_visit_date?: string
          longest_streak?: number
          total_visits?: number
          updated_at?: string
          visitor_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number
          id?: string
          last_visit_date?: string
          longest_streak?: number
          total_visits?: number
          updated_at?: string
          visitor_id?: string
        }
        Relationships: []
      }
      message_threads: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ncaa_football_schools: {
        Row: {
          city: string | null
          conference: string
          created_at: string
          division_level: string | null
          id: string
          logo_url: string | null
          mascot: string | null
          name: string
          stadium: string | null
          state: string
          updated_at: string
          website: string | null
        }
        Insert: {
          city?: string | null
          conference: string
          created_at?: string
          division_level?: string | null
          id?: string
          logo_url?: string | null
          mascot?: string | null
          name: string
          stadium?: string | null
          state: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          city?: string | null
          conference?: string
          created_at?: string
          division_level?: string | null
          id?: string
          logo_url?: string | null
          mascot?: string | null
          name?: string
          stadium?: string | null
          state?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      password_rate_limits: {
        Row: {
          attempt_count: number
          blocked_until: string | null
          first_attempt_at: string
          id: string
          ip_address: string
          last_attempt_at: string
        }
        Insert: {
          attempt_count?: number
          blocked_until?: string | null
          first_attempt_at?: string
          id?: string
          ip_address: string
          last_attempt_at?: string
        }
        Update: {
          attempt_count?: number
          blocked_until?: string | null
          first_attempt_at?: string
          id?: string
          ip_address?: string
          last_attempt_at?: string
        }
        Relationships: []
      }
      saved_scholarships: {
        Row: {
          created_at: string
          id: string
          scholarship_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          scholarship_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          scholarship_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_scholarships_scholarship_id_fkey"
            columns: ["scholarship_id"]
            isOneToOne: false
            referencedRelation: "scholarships"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarships: {
        Row: {
          amount_max: number | null
          amount_min: number | null
          application_url: string | null
          category: string | null
          created_at: string
          deadline: string | null
          description: string | null
          eligibility: string | null
          gpa_requirement: number | null
          grade_levels: string[] | null
          id: string
          name: string
          provider: string
          source_url: string | null
          states: string[] | null
          updated_at: string
        }
        Insert: {
          amount_max?: number | null
          amount_min?: number | null
          application_url?: string | null
          category?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          gpa_requirement?: number | null
          grade_levels?: string[] | null
          id?: string
          name: string
          provider: string
          source_url?: string | null
          states?: string[] | null
          updated_at?: string
        }
        Update: {
          amount_max?: number | null
          amount_min?: number | null
          application_url?: string | null
          category?: string | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          gpa_requirement?: number | null
          grade_levels?: string[] | null
          id?: string
          name?: string
          provider?: string
          source_url?: string | null
          states?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      school_coaches: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          role: string
          school_id: string
          twitter: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          role: string
          school_id: string
          twitter?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          role?: string
          school_id?: string
          twitter?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_coaches_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "ncaa_football_schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_contact_interest: {
        Row: {
          created_at: string
          id: string
          school_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          school_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          school_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_contact_interest_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "ncaa_football_schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_contacts: {
        Row: {
          contacted_at: string
          id: string
          school_id: string
          user_id: string
        }
        Insert: {
          contacted_at?: string
          id?: string
          school_id: string
          user_id: string
        }
        Update: {
          contacted_at?: string
          id?: string
          school_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_contacts_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "ncaa_football_schools"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      subscription_status: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          product_id: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          product_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          product_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      thread_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_team_response: boolean
          media_urls: string[] | null
          team_member_name: string | null
          thread_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_team_response?: boolean
          media_urls?: string[] | null
          team_member_name?: string | null
          thread_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_team_response?: boolean
          media_urls?: string[] | null
          team_member_name?: string | null
          thread_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "thread_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "message_threads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      subscription_status_safe: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string | null
          product_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string | null
          product_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string | null
          product_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_coach_access_rate_limit: {
        Args: { _user_id: string }
        Returns: boolean
      }
      has_active_subscription: {
        Args: { check_user_id: string }
        Returns: boolean
      }
      has_product_subscription: {
        Args: { check_product_id: string; check_user_id: string }
        Returns: boolean
      }
      has_school_interest: {
        Args: { _school_id: string; _user_id: string }
        Returns: boolean
      }
      increment_poll_vote: {
        Args: { _option: string; _poll_id: string; _voter_id: string }
        Returns: Json
      }
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
