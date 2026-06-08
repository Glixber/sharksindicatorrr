export type Database = {
  public: {
    Tables: {
      purchases: {
        Row: {
          id: string;
          session_id: string;
          email: string | null;
          tradingview_username: string | null;
          used: boolean;
          access_granted: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          email?: string | null;
          tradingview_username?: string | null;
          used?: boolean;
          access_granted?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          email?: string | null;
          tradingview_username?: string | null;
          used?: boolean;
          access_granted?: boolean;
          created_at?: string;
        };
      };
    };
  };
};
