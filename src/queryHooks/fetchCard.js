import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const useFetchCard = (code) => {
    // Clean the code by removing non-numeric suffix if present
    const cleanCode = code.replace(/[0-9]+([^0-9]*)$/, (match, group) => {
        return group ? match.replace(group, '') : match;
    });

    return useQuery({
        queryKey: ["card", cleanCode],
        queryFn: async () => {
            // Try player cards first
            let { data, error } = await supabase
              .from('player_cards')
              .select('*')
              .like('code', `${cleanCode}%`)
              .order('code')

            if (error) throw new Error(error.message);
            
            // If no player cards found, try encounter cards
            if (!data || data.length === 0) {
                ({ data, error } = await supabase
                    .from('encounter_cards')
                    .select('*')
                    .like('code', `${cleanCode}%`)
                    .order('code'));
                
                if (error) throw new Error(error.message);
            }
      
            return data || null;
        },
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};