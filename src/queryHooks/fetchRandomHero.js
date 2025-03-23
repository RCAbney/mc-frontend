import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import React from "react";

export const useRandomHero = () => {
    // Create a stable random ID that won't change on re-renders
    const [randomId] = React.useState(() => Math.random());

    const query = useQuery({
        queryKey: ["randomHero", randomId],
        queryFn: async () => {
            // First, get all base hero codes
            const { data: heroes, error: heroesError } = await supabase
                .from('player_cards')
                .select('code')
                .eq('type_code', 'hero')
                .filter('code', 'not.like', '%[a-z]%');

            if (heroesError) throw new Error(heroesError.message);
            
            // Randomly select one hero
            const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
            
            // Then fetch all cards related to this hero
            const { data, error } = await supabase
                .from('player_cards')
                .select('*')
                .like('code', `${randomHero.code}%`)
                .order('code');

            if (error) throw new Error(error.message);
            return data || null;
        },
        refetchOnWindowFocus: false,
    });

    // Function to get a new random hero
    const getNewRandomHero = () => {
        query.refetch();
    };

    return { ...query, getNewRandomHero };
};