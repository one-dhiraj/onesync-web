import { useState, useEffect } from "react";
import {
    signInWithGoogle,
    loginWithEmail,
    signupWithEmail,
} from "../services/auth";

import appLogo from "../assets/icon.png";
import googleLogo from "../assets/google-white-icon.png";
import googleLogoBlack from "../assets/google-black-icon.png";

export default function Landing({ onLogin }) {
    const [isSignup, setIsSignup] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const [isDark, setIsDark] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const listener = (e) => {
            setIsDark(e.matches);
        };

        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, []);

    // Theme classes
    const bgClass = isDark
        ? "bg-[#0f172a] text-white"
        : "bg-[#f8fafc] text-gray-900";

    const cardClass = isDark
        ? "bg-white/5 border-white/10"
        : "bg-white border-gray-200 shadow-xl";

    const secondaryText = isDark ? "text-gray-300" : "text-gray-600";

    const mutedText = isDark ? "text-gray-400" : "text-gray-500";

    const inputClass = isDark
        ? "bg-white/10 border-white/10 text-white placeholder:text-gray-400"
        : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500";

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();

        const mobile =
            /android|iphone|ipad|ipod|opera mini|iemobile|mobile/.test(ua);

        setIsMobile(mobile);
    }, []);

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            const result = await signInWithGoogle();
            onLogin(result.user);
        } catch (err) {
            alert("Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailAuth = async () => {
        try {
            setIsLoading(true);

            const result = isSignup
                ? await signupWithEmail(email, password)
                : await loginWithEmail(email, password);

            onLogin(result.user);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        < div className={`min-h-screen overflow-hidden transition-colors duration-300 ${bgClass}`}>
            {/* Background Glow */}
            <div className={`absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-indigo-500/20" : "bg-indigo-300/40"}`} />
            <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-purple-500/20" : "bg-purple-300/40"}`}
            />

            {/* Navbar */}
            <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
                <div className="flex items-end gap-3">
                    <img
                        src={appLogo}
                        alt="OneSync"
                        className="w-10 h-10 rounded-xl"
                    />

                    <h1 className="text-2xl font-bold">OneSync</h1>
                </div>

                {!isMobile && (
                    <button
                        onClick={() => setShowAuth(true)}
                        className={`bg-white/10 hover:bg-white/20 border ${!isDark && "border-black/20"} px-5 pt-2 pb-1 rounded-xl transition`}
                    >
                        Login
                    </button>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 px-6 md:px-12 py-10 md:py-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    {/* Left */}
                    <div>
                        < div
                            className={`inline-flex items-center gap-2 rounded-full px-4 pt-2 pb-1 text-sm mb-6 border ${isDark
                                ? "bg-white/10 border-white/10 text-gray-300"
                                : "bg-indigo-50 border-indigo-100 text-indigo-700"
                                }`}
                        >
                            ⚡ Open Source • Android ↔ Desktop • Multi - device
                        </div >

                        < h1 className="text-5xl md:text-7xl font-black leading-tight" >
                            Sync notifications
                            < span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent" >
                                {" "}
                                across all your devices.
                            </span >
                        </h1 >

                        < p className={`${secondaryText} text - lg mt - 6 max - w - xl leading - relaxed`}>
                            OneSync lets you sync Android notifications between desktops,
                            laptops, and Android devices in real time — so you never miss
                            important alerts while staying focused.
                        </p >

                        <div className="flex flex-wrap gap-4 mt-10">
                            <a
                                href={`https://github.com/one-dhiraj/onesync/releases/download/${import.meta.env.VITE_RELEASE_TAG}/OneSync_${import.meta.env.VITE_RELEASE_TAG}.apk`}
                                target="_blank"
                                className={`bg-indigo-600 hover:bg-indigo-700 px-6 pt-4 pb-3 rounded-2xl font-semibold transition shadow-lg shadow-indigo-500/20 text-white`}
                            >
                                Download Android App
                            </a>

                            {!isMobile && (
                                <button
                                    onClick={() => setShowAuth(true)}
                                    className={`border px-6 pt-4 pb-3 rounded-2xl font-semibold transition ${isDark ? "bg-white/10 hover:bg-white/20 border-white/10" : "border-blue-100 hover:bg-blue-100"}`}
                                >
                                    Login to Dashboard
                                </button>
                            )}
                        </div>

                        {/* Small Features */}
                        <div className="flex flex-wrap gap-3 mt-10">
                            < div
                                className={`px-4 pt-2 pb-1 rounded-full text-sm border ${isDark
                                    ? "bg-white/10 border-white/10 text-gray-300"
                                    : "bg-white border-gray-200 text-gray-700 shadow-sm"
                                    } `}
                            >
                                📱 Android ↔ Android
                            </div >

                            <div
                                className={`px-4 pt-2 pb-1 rounded-full text-sm border ${isDark
                                    ? "bg-white/10 border-white/10 text-gray-300"
                                    : "bg-white border-gray-200 text-gray-700 shadow-sm"
                                    } `}
                            >
                                💻 Android ↔ Desktop
                            </div>

                            <div
                                className={`px-4 pt-2 pb-1 rounded-full text-sm border ${isDark
                                    ? "bg-white/10 border-white/10 text-gray-300"
                                    : "bg-white border-gray-200 text-gray-700 shadow-sm"
                                    } `}
                            >
                                ⚡ Real-time Sync
                            </div>
                        </div>
                    </div>

                    {/* Right Mockup */}

                    <div className="relative">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                            {/* Desktop Mock */}
                            < div
                                className={`rounded-2xl p-5 space-y-4 ${isDark ? "bg-[#111827]" : "bg-gray-100"}`}>
                                <div className="text-gray-400 text-sm mb-4">
                                    Incoming Notifications
                                </div>

                                <NotificationCard
                                    app="WhatsApp"
                                    message="John: Are you joining the meeting?"
                                />

                                <NotificationCard
                                    app="Gmail"
                                    message="Build failed on production server"
                                />

                                <NotificationCard
                                    app="Slack"
                                    message="New deployment completed successfully"
                                />
                            </div>
                        </div>

                        {/* Floating Phone */}
                        <div className={`absolute -bottom-10 -right-5 border border-white/10 rounded-[2rem] w-40 h-72 shadow-2xl rotate-6 hidden md:block ${isDark ? "bg-slate-800" : "bg-slate-400"}`}>
                            <div className="p-4 space-y-3 mt-8">
                                <div className="bg-white/30 rounded-xl h-12" />
                                <div className="bg-white/30 rounded-xl h-12" />
                                <div className="bg-white/30 rounded-xl h-12" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10 px-6 md:px-12 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">
                        Why use OneSync?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        < FeatureCard
                            isDark={isDark}
                            icon="⚡"
                            title="Real-time Sync"
                            desc="Receive notifications instantly across all connected devices."
                        />

                        <FeatureCard
                            isDark={isDark}
                            icon="📱"
                            title="Android Device Sync"
                            desc="Sync notifications seamlessly between multiple Android devices."
                        />

                        <FeatureCard
                            isDark={isDark}
                            icon="💻"
                            title="Desktop Productivity"
                            desc="Receive mobile notifications directly on your desktop while working."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            < section className="relative z-10 px-6 md:px-12 pb-24" >
                <div
                    className={`max-w-5xl mx-auto rounded-3xl p-10 border ${isDark
                        ? "bg-white/5 border-white/10"
                        : "bg-white border-gray-200 shadow-2xl"
                        } `}
                >
                    <h2 className="text-4xl font-bold text-center mb-12">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10 text-center">
                        <Step
                            number="1"
                            title="Sign In Everywhere"
                            desc="Login on all devices using the same account."
                            isDark={isDark}
                        />

                        <Step
                            number="2"
                            title="Enable Sync"
                            desc="Grant permissions and choose send/receive mode."
                            isDark={isDark}
                        />

                        <Step
                            number="3"
                            title="Choose Apps"
                            desc="Select which apps should sync notifications."
                            isDark={isDark}
                        />
                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer
                className={`border-t px-6 md:px-12 py-8 text-sm ${isDark
                    ? "border-white/10 text-gray-400"
                    : "border-gray-200 text-gray-500"}`}
            >
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4">
                    <div>© 2026 OneSync</div>

                    <div className="flex gap-6">
                        <a
                            href="https://github.com/one-dhiraj/onesync"
                            target="_blank"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>

            {/* Auth Modal */}
            {showAuth && !isMobile && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowAuth(false)}
                >
                    < div
                        className={`rounded-3xl p-8 w-full max-w-md border ${isDark
                            ? "bg-[#111827] border-white/10"
                            : "bg-white border-gray-200 shadow-2xl"
                            } `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-end gap-3 mb-6">
                            <img src={appLogo} alt="logo" className="w-10 h-10" />
                            <h2 className="text-2xl font-bold">OneSync</h2>
                        </div>

                        <input
                            type="email"
                            placeholder="Email"
                            className={`w-full mb-3 px-4 pt-3 pb-2 rounded-xl border outline-none ${inputClass}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className={`w-full mb-3 px-4 pt-3 pb-2 rounded-xl border outline-none ${inputClass}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            onClick={handleEmailAuth}
                            disabled={isLoading}
                            className={`w-full transition pt-4 pb-3 rounded-xl font-semibold ${isLoading
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                }`}
                        >
                            {isSignup ? "Sign Up" : "Login"}
                        </button>

                        <div className="text-center text-gray-400 my-4">or</div>

                        <button
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className={`${isLoading
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : isDark ? "bg-white/10 hover:bg-white/20 border-white/10 items-start" : "bg-blue-200 hover:bg-blue-100 items-center"} w-full border transition pt-4 pb-3 rounded-xl font-semibold flex justify-center gap-3`}
                        >
                            <img src={isDark ? googleLogo : googleLogoBlack} alt="google" className="w-5 h-5" />
                            Continue with Google
                        </button>

                        <p className="text-sm text-gray-400 mt-5 text-center">
                            {isSignup
                                ? "Already have an account?"
                                : "Don't have an account?"}

                            <button
                                onClick={() => setIsSignup(!isSignup)}
                                className="ml-2 text-indigo-400"
                            >
                                {isSignup ? "Login" : "Sign up"}
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function NotificationCard({ app, message }) {
    return (
        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4">
            <div className="text-sm text-indigo-500 font-semibold">
                {app}
            </div>

            <div className="text-sm mt-1 opacity-80">
                {message}
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc, isDark }) {
    return (
        <div
            className={`rounded-3xl p-8 backdrop-blur-xl border transition ${isDark
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-200 shadow-xl"
                } `}
        >
            <div className="text-4xl mb-5">{icon}</div>

            <h3 className="text-2xl font-bold mb-3">{title}</h3>

            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                {desc}
            </p>
        </div>
    );
}

function Step({ number, title, desc, isDark }) {
    return (
        <div>
            <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold mx-auto mb-5 text-white">
                {number}
            </div>

            <h3 className="text-xl font-semibold mb-3">
                {title}
            </h3>

            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                {desc}
            </p>
        </div>
    );
}