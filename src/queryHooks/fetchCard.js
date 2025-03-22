import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const useFetchCard = (code) => {
    return useQuery({
        queryKey: ["card", code],
        queryFn: async () => {
            const { data, error } = await supabase
              .from('player_cards')
              .select('*')
              .eq('code', code);
      
            if (error) {
              throw new Error(error.message);
            }
      
            return data;
          },
          refetchOnWindowFocus: false,
          staleTime: Infinity,
    });
};