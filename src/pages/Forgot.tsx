import { Component, createSignal, createEffect, onMount } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";

const Forgot: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form states
  const [step, setStep] = createSignal<1 | 2>(1);
  const [email, setEmail] = createSignal("");
  const [newPassword, setNewPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [showNewPassword, setShowNewPassword] = createSignal(false);
  const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);
  const [errors, setErrors] = createSignal<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);
  const [rightSideVisible, setRightSideVisible] = createSignal(false);
  const [emailFocused, setEmailFocused] = createSignal(false);
  const [newPasswordFocused, setNewPasswordFocused] = createSignal(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = createSignal(false);

  // Load animations on mount
  onMount(() => {
    // Staggered animations - only on page load
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setRightSideVisible(true), 300);
  });

  const updateFormData = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    if (field === "newPassword") setNewPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
    
    const newErrors = { ...errors() };
    delete newErrors[field];
    setErrors(newErrors);
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!email().trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email())) newErrors.email = "Invalid email format";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!newPassword()) newErrors.newPassword = "New password is required";
    else if (newPassword().length < 6) newErrors.newPassword = "Password must be at least 6 characters";
    
    if (!confirmPassword()) newErrors.confirmPassword = "Please confirm your password";
    else if (newPassword() !== confirmPassword()) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendResetLink = async (e: Event) => {
    e.preventDefault();

    if (!validateStep1()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate sending reset link
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Move to step 2
      setStep(2);
      
    } catch (error: any) {
      setErrors({ api: error.message || "Failed to send reset link" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: Event) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to login with success message
      navigate('/?passwordReset=1');
      
    } catch (error: any) {
      setErrors({ api: error.message || "Failed to change password" });
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
        
        {/* Left Side - Form */}
        <div class={`w-full max-w-sm transition-all duration-700 ease-out transform ${
          isVisible() ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}>
          
          {/* Form Card */}
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
              <h1 class="text-2xl font-bold text-gray-900 mb-1">
                {step() === 1 ? "Forgot Your Password?" : "Reset Password"}
              </h1>
              <p class="text-gray-600 text-xs">
                {step() === 1 
                  ? "Enter your email to receive a password reset link" 
                  : "Enter your new password"
                }
              </p>
            </div>

            {/* Step Indicator */}
            <div class="flex items-center justify-center mb-6">
              <div class="flex items-center space-x-4">
                <div class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step() === 1 
                    ? "bg-purple-700 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  1
                </div>
                <div class="w-16 h-1 bg-purple-700 rounded-full"></div>
                <div class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step() === 2 
                    ? "bg-purple-700 text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  2
                </div>
              </div>
            </div>

            {/* Step 1: Email Input */}
            {step() === 1 && (
              <form onSubmit={handleSendResetLink} class="space-y-4">
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
                      placeholder="Enter your email"
                      class={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition-all text-sm ${
                        errors().email 
                          ? "border-red-300 focus:ring-red-500" 
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                  </div>
                  {errors().email && <p class="text-red-600 text-xs mt-1">{errors().email}</p>}
                </div>

                {/* Error Message */}
                {errors().api && (
                  <div class="bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-lg text-xs animate-shake">
                    {errors().api}
                  </div>
                )}

                {/* Send Reset Link Button */}
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
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>
              </form>
            )}

            {/* Step 2: New Password */}
            {step() === 2 && (
              <form onSubmit={handleChangePassword} class="space-y-4">
                {/* New Password Field */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class={`w-4 h-4 transition-colors duration-300 ${
                        newPasswordFocused() ? 'text-purple-700' : 'text-gray-400'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showNewPassword() ? "text" : "password"}
                      value={newPassword()}
                      onInput={(e) => updateFormData("newPassword", e.currentTarget.value)}
                      onFocus={() => setNewPasswordFocused(true)}
                      onBlur={() => setNewPasswordFocused(false)}
                      placeholder="Enter your new password"
                      class={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition-all text-sm ${
                        errors().newPassword 
                          ? "border-red-300 focus:ring-red-500" 
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                    <button 
                      type="button" 
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" 
                      onClick={() => setShowNewPassword(!showNewPassword())}
                    >
                      {showNewPassword() ? (
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
                  {errors().newPassword && <p class="text-red-600 text-xs mt-1">{errors().newPassword}</p>}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class={`w-4 h-4 transition-colors duration-300 ${
                        confirmPasswordFocused() ? 'text-purple-700' : 'text-gray-400'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showConfirmPassword() ? "text" : "password"}
                      value={confirmPassword()}
                      onInput={(e) => updateFormData("confirmPassword", e.currentTarget.value)}
                      onFocus={() => setConfirmPasswordFocused(true)}
                      onBlur={() => setConfirmPasswordFocused(false)}
                      placeholder="Confirm your new password"
                      class={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition-all text-sm ${
                        errors().confirmPassword 
                          ? "border-red-300 focus:ring-red-500" 
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                    <button 
                      type="button" 
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword())}
                    >
                      {showConfirmPassword() ? (
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
                  {errors().confirmPassword && <p class="text-red-600 text-xs mt-1">{errors().confirmPassword}</p>}
                </div>

                {/* Error Message */}
                {errors().api && (
                  <div class="bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-lg text-xs animate-shake">
                    {errors().api}
                  </div>
                )}

                {/* Change Password Button */}
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
                      <span>Changing...</span>
                    </>
                  ) : (
                    <span>Change Password</span>
                  )}
                </button>
              </form>
            )}

            {/* Back to Login Link */}
            <p class="text-center text-gray-600 mt-4 text-xs">
              Remembered your password?{" "}
              <button
                onClick={() => navigate('/')}
                class="text-purple-700 hover:text-purple-900 font-medium transition-colors"
              >
                Login here
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
              Forgot your password?
            </h1>
            <p class="text-lg text-white mb-8 leading-relaxed">
              No problem. Just enter the email address linked to your OutsidePlant account and we'll send you a secure link to reset your password. Once you've created a new one, you can log back in and continue managing your operations without interruption.
            </p>

            <div class="mt-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 animate-pulse">
              <p class="text-lg font-medium text-center text-white italic">
                "outsideplant. unifies field operations, reporting, and smart cluster management in one powerful platform."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;