import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const useFetchCard = (code) => {
    return useQuery({
        queryKey: ["card", code],
        queryFn: async () => {
            // Try player cards first
            let { data, error } = await supabase
              .from('player_cards')
              .select('*')
              .eq('code', code)
              .single();
      
            if (error && error.code === 'PGRST116') { // No rows returned
                // If not found, try encounter cards
                ({ data, error } = await supabase
                    .from('encounter_cards')
                    .select('*')
                    .eq('code', code)
                    .single());
            }
      
            if (error && error.code !== 'PGRST116') {
                throw new Error(error.message);
            }
      
            return data || null;
        },
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};