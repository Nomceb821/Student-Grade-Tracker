const SUPABASE_URL =
    "https://hnpyyafijkiijhzlmjaq.supabase.co";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhucHl5YWZpamtpaWpoemxtamFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzOTAwNDAsImV4cCI6MjA5NTk2NjA0MH0.YuWoxwdSrw_YANjwyLBN434xQ2yfTJjwHKxT-sfH8ho";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );