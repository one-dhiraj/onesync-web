import { useState, useEffect } from 'react';
import { signInWithGoogle, loginWithEmail, signupWithEmail } from "../services/auth";
import appLogo from "../assets/icon.png";
import googleLogo from "../assets/google-white-icon.png";

export default function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      const result = isSignup
        ? await signupWithEmail(email, password)
        : await loginWithEmail(email, password);
      onLogin(result.user);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 text-gray-800 relative">

      {/* Card */}
      <div className="max-w-[90vw] md:h-[80vh] max-h-md px-8 rounded-2xl bg-white shadow-lg text-center flex flex-col md:flex-row justify-evenly items-center">

        <div className="flex-1">
          {/* Logo */}
          <img
            src={appLogo}
            alt="logo"
            className="w-32 h-32 md:w-60 md:h-60 mx-auto"
          />

          <h1 className="text-3xl font-bold mb-2">One Sync</h1>

          <p className="text-gray-700 mb-2 text-md">
            Sync your notifications across devices.
            <br />
            Stay focused. Stay updated.
          </p>
          {!isMobile && <p className="text-sm text-gray-500 mb-12">
            Works with your Android app instantly ⚡
          </p>
          }
        </div>
        <div className="md:max-w-[45%] pt-6 md:pt-10">
          {/* Button */}
          {isMobile ? (
            <>
              <a
                href="https://github.com/one-dhiraj/onesync/releases/latest"
                target="_blank"
                className="w-full inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 pt-4 pb-3 rounded-lg font-semibold"
              >
                Download Android App
              </a>

              <p className="text-sm text-gray-400 mt-4">
                Login is available on desktop only
              </p>
            </>
          ) : (
          <div>
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 px-3 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-3 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Email login/signup */}
          <button
            onClick={handleEmailAuth}
            className={`w-full py-3 rounded-lg font-semibold ${isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          {/* Divider */}
          <div className="text-gray-700 text-md my-2">or</div>
          <button
            onClick={handleGoogleLogin}
            className={`w-full flex items-center justify-center gap-3 transition px-4 pt-3 pb-2 rounded-lg font-semibold ${isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
          >
            <img
              src={googleLogo}
              alt="logo"
              className="w-5 h-5 -mt-1.5"
            />
            Continue with Google
          </button>
          {/* Toggle */}
          <p className="text-sm text-gray-500 mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="ml-1 text-indigo-600"
            >
              {isSignup ? "Login" : "Sign up"}
            </button>
          </p>
          </div>
          )
          }
        </div>
        {isMobile && <p className="text-sm text-gray-500 my-2">
          Works with your Android app instantly ⚡
        </p>
        }
      </div>

      {/* Features */}
      {/* <div className="absolute bottom-10 flex gap-4 text-sm text-gray-500">
        <div className="bg-white px-3 pt-2 pb-1 rounded-full shadow-md">⚡ Real-time</div>
        <div className="bg-white px-3 pt-2 pb-1 rounded-full shadow-md">🔒 Secure</div>
        <div className="bg-white px-3 pt-2 pb-1 rounded-full shadow-md">💻 Multi-device</div>
      </div> */}
    </div>
  );
}


// export default function Login({ onLogin }) {

  

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg text-center">

//         <img src={appLogo} className="w-16 mx-auto mb-4" />

//         <h1 className="text-2xl font-bold mb-2">
//           {isSignup ? "Create Account" : "Welcome Back"}
//         </h1>

//         <p className="text-gray-500 mb-6">
//           OneSync Web Dashboard
//         </p>

//         {/* Email input */}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-3 px-3 py-2 border rounded-lg"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* Password input */}
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 px-3 py-2 border rounded-lg"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         {/* Email login/signup */}
//         <button
//           onClick={handleEmailAuth}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg mb-4"
//         >
//           {isSignup ? "Sign Up" : "Login"}
//         </button>

//         {/* Divider */}
//         <div className="text-gray-400 text-sm mb-4">or</div>

//         {/* Google login */}
//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg"
//         >
//           <img src={googleLogo} className="w-5 h-5" />
//           Continue with Google
//         </button>

//         {/* Toggle */}
//         <p className="text-sm text-gray-500 mt-4">
//           {isSignup ? "Already have an account?" : "Don't have an account?"}
//           <button
//             onClick={() => setIsSignup(!isSignup)}
//             className="ml-1 text-indigo-600"
//           >
//             {isSignup ? "Login" : "Sign up"}
//           </button>
//         </p>

//       </div>
//     </div>
//   );
// }
