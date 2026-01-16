
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hcqpgfyebbxdjmzarnfn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjcXBnZnllYmJ4ZGptemFybmZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NzgwNDMsImV4cCI6MjA1MjQ1NDA0M30.CbetDcMKTTJAOJa19zrj48w3JIfLIezPjQKIn9n803I';

export const supabase = createClient(supabaseUrl, supabaseKey);
