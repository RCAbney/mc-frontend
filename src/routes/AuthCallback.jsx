import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we're authenticated
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                // If authenticated, redirect to my-collection
                navigate('/my-collection');
            } else {
                // If not authenticated, redirect to login
                navigate('/login');
            }
        });
    }, [navigate]);

    return (
        <div>
            Completing login...
        </div>
    );
} 