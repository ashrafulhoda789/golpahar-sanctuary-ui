import { useState } from "react";
import { authClient } from "../../lib/auth-client";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                setErrorMessage(error.message || "Invalid credentials! Please try again.");
                setLoading(false);
                return;
            }

            // console.log(data);

            const userRole = data?.user?.role;
            if (userRole === "super_admin") {
                navigate('/admin/dashboard', { replace: true });

            } else {
                navigate('/user/dashboard', { replace: true });
            }



        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            // console.log(err);
            setErrorMessage("Network error! Unable to connect to server.");
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FDFBF7]">

            <div className="hidden lg:flex lg:w-[45%] bg-[#5c060c] text-white flex-col justify-center p-8 lg:p-16">
                <div className="max-w-md">

                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 shadow-inner mb-8 ">
                        <span className="text-3xl text-amber-400 font-heading font-bold select-none">
                            ॐ
                        </span>
                    </div>

                    <h1 className="text-3xl lg:text-[55px] font-heading font-extrabold tracking-tight leading-snug mb-4">
                        Administration
                    </h1>

                    <p className="text-gray-300 text-sm font-sans lg:text-base leading-relaxed mb-8">
                        Secure management portal for Super Admins and Content Editors. Oversee operations, notices, and institutional records with absolute reliability.
                    </p>

                    <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-black/20 rounded-xl text-xs text-orange-200 border border-white/5">
                        <Lock className="w-4 h-4" />
                        <span>Protected Workspace</span>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[55%] min-h-screen lg:min-h-0 bg-[#FDFBF7] flex items-center justify-center p-6 sm:p-8 lg:p-16">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-stone-200">

                    <div className="mb-8">
                        <h2 className="text-2xl font-heading font-bold text-gray-800">
                            Welcome Back
                        </h2>
                        <p className="text-sm font-sans text-gray-500 mt-1">
                            Please enter your credentials to sign in
                        </p>
                    </div>

                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSignIn} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5c060c] focus:border-[#5c060c] outline-none transition text-sm bg-gray-50/50"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <a
                                    href="/forgot-password"
                                    className="text-xs font-medium text-[#5c060c] hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5c060c] focus:border-[#5c060c] outline-none transition text-sm bg-gray-50/50"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#5c060c] hover:bg-[#450409] text-white font-semibold py-3 rounded-xl shadow-md transition duration-200 disabled:opacity-50 flex justify-center items-center text-sm"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    Signing In...
                                </span>
                            ) : (
                                "Sign In to Portal"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-xs text-gray-400">
                        Golpahar Moheshmoshan Kali Mondir &copy; 2026
                    </div>
                </div>
            </div>

        </div>
    );
}