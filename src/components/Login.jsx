import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        // Cleanup subscription
        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    if (user) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-xs">{user.email}</span>
                <button className="px-2 py-1 rounded-sm bg-blue-500 text-white cursor-pointer hover:bg-blue-600" onClick={handleLogout}>Logout</button>
            </div>
        )
    }

    return (
        <div className="login">
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    )
}