import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                navigate("/my-collection");
            }
        });
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            setMessage("Check your email for the magic link!");
            setEmail("");
        } catch (error) {
            setMessage("Error sending magic link");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="flex flex-col items-center">
                    <form onSubmit={handleLogin} className="space-y-6 p-8 rounded-md outline-1 outline-gray-300 w-96">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    name="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Magic Link"}
                            </button>
                        </div>
                    </form>
                    {message && (
                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                            {message}
                        </p>
                    )}
                </div>
            </div>
    );
}
