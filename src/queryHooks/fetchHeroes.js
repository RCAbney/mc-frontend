import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export const useHeroes = () => {
  return useQuery({
    queryKey: ['heroes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('player_cards')
        .select('*')
        .eq('type_code', 'hero');

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
