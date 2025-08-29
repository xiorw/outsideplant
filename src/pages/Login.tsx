import { Component, createSignal, createEffect, onMount } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";
import { userStore } from "../components/userstore";

const Login: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form states
  const [loginType, setLoginType] = createSignal<"user" | "admin">("user");
  const [company, setCompany] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [rememberMe, setRememberMe] = createSignal(false);
  const [errors, setErrors] = createSignal<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);
  const [rightSideVisible, setRightSideVisible] = createSignal(false);
  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);
  const [emailFocused, setEmailFocused] = createSignal(false);
  const [passwordFocused, setPasswordFocused] = createSignal(false);

  const successMessage = new URLSearchParams(location.search).get("success") === "1";

  // Company options for dropdown
  const companies = [
    "PT Smartelco Solusi Teknologi",
    "PT Akusara Barindo Jaya",
  ];

  // Load saved credentials on mount
  onMount(() => {
    // Initialize user store if available
    if (typeof userStore !== 'undefined') {
      userStore.init();
      
      // If already authenticated, redirect
      if (userStore.isAuthenticated) {
        const dashboardPath = userStore.isAdmin ? "/admin/dashboard" : "/dashboard";
        navigate(dashboardPath);
        return;
      }
    }

    // Staggered animations - only on page load
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setRightSideVisible(true), 300);
  });

  const updateFormData = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "company") setCompany(value);
    
    const newErrors = { ...errors() };
    delete newErrors[field];
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (loginType() === "admin" && !company()) {
      newErrors.company = "Company is required for admin login";
    }
    
    if (!email().trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email())) newErrors.email = "Invalid email format";
    
    if (!password()) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: Event) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate login process for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate based on login type
      const dashboardPath = loginType() === "admin" ? "/admin/dashboard" : "/dashboard";
      navigate(dashboardPath);
      
    } catch (error: any) {
      setErrors({ api: error.message || "Login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      class="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative"
      style={{
        "background-image": "url('src/assets/login-bg.png')"
      }}
    >
      {/* Background overlay for better contrast */}
      <div class="absolute inset-0 bg-black/50" />
      
      {/* Main Container */}
      <div class="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-center lg:justify-between">
        
        {/* Left Side - Login Form */}
        <div class={`w-full max-w-sm transition-all duration-700 ease-out transform ${
          isVisible() ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}>
          
          {/* Login Card */}
          <div class="bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-lg">
            
            {/* Header */}
            <div class="text-center mb-6">
              {/* Logo Image */}
              <div class="mb-3">
                <img 
                  src="src/assets/outsideplant-short.png" 
                  alt="outsideplant" 
                  class="h-10 mx-auto"
                />
              </div>
              <h1 class="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h1>
              <p class="text-gray-600 text-xs">
                Login to your <span class="text-purple-700 font-medium">outsideplant.</span> account
              </p>
            </div>

            {/* User/Admin Toggle */}
            <div class="flex mb-5 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginType("user");
                  setCompany(""); // Reset company when switching to user
                  setErrors({});
                }}
                class={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-300 ${
                  loginType() === "user" 
                    ? "bg-purple-700 text-white shadow-sm transform scale-105" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginType("admin");
                  setErrors({});
                }}
                class={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-300 ${
                  loginType() === "admin" 
                    ? "bg-purple-700 text-white shadow-sm transform scale-105" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div class="bg-green-50 border border-green-200 text-green-800 px-3 py-2 mb-4 text-sm rounded-lg animate-pulse">
                Account created successfully!
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} class="space-y-4">
              
              {/* Company Field (User only) */}
              <div class={`transition-all duration-500 ${
                loginType() === "user" 
                  ? "max-h-32 opacity-100 transform translate-y-0" 
                  : "max-h-0 opacity-0 transform -translate-y-2 overflow-hidden"
              }`}>
                {loginType() === "user" && (
                  <>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class={`w-4 h-4 transition-colors duration-300 ${
                          isDropdownOpen() ? 'text-purple-700' : 'text-gray-400'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <select
                        value={company()}
                        onChange={(e) => updateFormData("company", e.currentTarget.value)}
                        onFocus={() => setIsDropdownOpen(true)}
                        onBlur={() => setIsDropdownOpen(false)}
                        class={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent bg-white transition-all text-sm ${
                          errors().company 
                            ? "border-red-300 focus:ring-red-500" 
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{
                          "appearance": "none",
                          "-webkit-appearance": "none",
                          "-moz-appearance": "none",
                          "background-image": "none"
                        }}
                      >
                        <option value="" disabled selected>Select your company</option>
                        {companies.map((comp) => (
                          <option value={comp}>{comp}</option>
                        ))}
                      </select>
                      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg class={`w-4 h-4 transition-all duration-300 ${
                          isDropdownOpen() 
                            ? 'text-purple-700 rotate-180' 
                            : 'text-gray-400 rotate-0'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors().company && <p class="text-red-600 text-xs mt-1">{errors().company}</p>}
                  </>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class={`w-4 h-4 transition-colors duration-300 ${
                      emailFocused() ? 'text-purple-700' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email()}
                    onInput={(e) => updateFormData("email", e.currentTarget.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder="Your email"
                    class={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition-all text-sm ${
                      errors().email 
                        ? "border-red-300 focus:ring-red-500" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                </div>
                {errors().email && <p class="text-red-600 text-xs mt-1">{errors().email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class={`w-4 h-4 transition-colors duration-300 ${
                      passwordFocused() ? 'text-purple-700' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword() ? "text" : "password"}
                    value={password()}
                    onInput={(e) => updateFormData("password", e.currentTarget.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="Your password"
                    class={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition-all text-sm ${
                      errors().password 
                        ? "border-red-300 focus:ring-red-500" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                  <button 
                    type="button" 
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" 
                    onClick={() => setShowPassword(!showPassword())}
                  >
                    {showPassword() ? (
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors().password && <p class="text-red-600 text-xs mt-1">{errors().password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div class="flex items-center justify-between">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe()}
                    onChange={(e) => setRememberMe(e.currentTarget.checked)}
                    class="w-3 h-3 border-gray-300 rounded focus:ring-purple-700 focus:ring-2 text-purple-700 transition-all"
                  />
                  <span class="ml-2 text-xs text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  class="text-xs text-purple-700 hover:text-purple-900 font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Error Message */}
              {errors().api && (
                <div class="bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-lg text-xs animate-shake">
                  {errors().api}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading()}
                class="w-full bg-purple-700 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-purple-900 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-sm"
              >
                {isLoading() ? (
                  <>
                    <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="8" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Login</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>

            {/* Google Login Button (Only for User) */}
            {loginType() === "user" && (
              <>
                {/* Divider */}
                <div class="relative my-4">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                  </div>
                  <div class="relative flex justify-center text-xs">
                    <span class="px-3 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Google Login Button */}
                <button 
                  onClick={() => alert("Google login placeholder - not implemented in demo")}
                  class="w-full border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-50 hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Login with Google</span>
                </button>
              </>
            )}

            {/* Register Link */}
            <p class="text-center text-gray-600 mt-4 text-xs">
              Don't have an account?{" "}
              <button
                onClick={() => navigate('/register')}
                class="text-purple-700 hover:text-purple-900 font-medium transition-colors"
              >
                Register here
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Welcome Content (Hidden on mobile, visible on large screens) */}
        <div class={`hidden lg:flex lg:flex-1 lg:max-w-xxl lg:ml-50 items-center transition-all duration-1000 ease-out transform ${
          rightSideVisible() ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <div class="text-white">
            <h1 class="text-4xl lg:text-5xl font-bold mb-7 text-white">
              Welcome to{" "}
              <img 
                src="src/assets/outsideplant-long-white.png" 
                alt="outsideplant" 
                class="inline-block h-9 lg:h-15 align-middle"
              />
            </h1>
            <p class="text-lg text-white mb-8 leading-relaxed">
              an integrated platform for managing field operations, technician reporting, and smart cluster solutions to enhance efficiency and security.
            </p>

            {/* Features List */}
            <div class="space-y-6">
              <FeatureItem
                icon="🚀"
                title="Field Operations Tracking"
                description="Monitor and manage technician activities in real-time."
                delay="0.1s"
              />
              <FeatureItem
                icon="📸"
                title="Photo-based Reporting"
                description="Automatic quality checks and structured reports."
                delay="0.2s"
              />
              <FeatureItem
                icon="🔐"
                title="Smart Cluster Security"
                description="Face recognition, gate access, and monitoring."
                delay="0.3s"
              />
              <FeatureItem
                icon="💳"
                title="Integrated Payments"
                description="Seamless transactions for fees and services."
                delay="0.4s"
              />
            </div>

            <div class="mt-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 animate-pulse">
              <p class="text-lg font-medium text-center text-white italic">
                "Simplify your workflow and double your efficiency with outsideplant."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feature Item Component with Icons
const FeatureItem = (props: { icon: string; title: string; description: string; delay: string }) => (
  <div 
    class="flex items-start space-x-4 animate-fade-in-up"
    style={{ "animation-delay": props.delay }}
  >
    <div class="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 hover:scale-110 transition-transform duration-300">
      <span class="text-2xl" role="img" aria-label={props.title}>
        {props.icon}
      </span>
    </div>
    <div>
      <h3 class="text-xl font-semibold mb-2 text-white">{props.title}</h3>
      <p class="text-white leading-relaxed">{props.description}</p>
    </div>
  </div>
);

export default Login;