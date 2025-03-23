import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        // Cleanup subscription
        return () => subscription.unsubscribe()
    }, [])

    // Show loading state while checking authentication
    if (loading) {
        return <div>Loading...</div>
    }

    // If user is not authenticated, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // If user is authenticated, render the protected route
    return <Outlet />
}