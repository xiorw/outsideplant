import { Component, createSignal, createEffect, onMount } from "solid-js";
import { useNavigate, useLocation } from "@solidjs/router";

const Register: Component = () => {
  const navigate = useNavigate();
  
  // Form states
  const [company, setCompany] = createSignal("");
  const [fullName, setFullName] = createSignal("");
  const [age, setAge] = createSignal("");
  const [gender, setGender] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);
  const [agreeToTerms, setAgreeToTerms] = createSignal(false);
  const [errors, setErrors] = createSignal<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);
  const [rightSideVisible, setRightSideVisible] = createSignal(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = createSignal(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = createSignal(false);
  
  // Focus states for styling
  const [companyFocused, setCompanyFocused] = createSignal(false);
  const [fullNameFocused, setFullNameFocused] = createSignal(false);
  const [ageFocused, setAgeFocused] = createSignal(false);
  const [genderFocused, setGenderFocused] = createSignal(false);
  const [emailFocused, setEmailFocused] = createSignal(false);
  const [passwordFocused, setPasswordFocused] = createSignal(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = createSignal(false);

  // Company options for dropdown
  const companies = [
    "PT Smartelco Solusi Teknologi",
    "PT Abarindo",
  ];

  // Gender options
  const genderOptions = [
    "Male",
    "Female",
    "Other"
  ];

  // Load animations on mount
  onMount(() => {
    // Staggered animations - only on page load
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setRightSideVisible(true), 300);
  });

  const updateFormData = (field: string, value: string) => {
    if (field === "company") setCompany(value);
    if (field === "fullName") setFullName(value);
    if (field === "age") setAge(value);
    if (field === "gender") setGender(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
    
    const newErrors = { ...errors() };
    delete newErrors[field];
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!company()) newErrors.company = "Company is required";
    if (!fullName().trim()) newErrors.fullName = "Full name is required";
    if (!age()) newErrors.age = "Age is required";
    else if (isNaN(Number(age())) || Number(age()) < 16 || Number(age()) > 100) {
      newErrors.age = "Please enter a valid age (16-100)";
    }
    if (!gender()) newErrors.gender = "Gender is required";
    if (!email().trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email())) newErrors.email = "Invalid email format";
    if (!password()) newErrors.password = "Password is required";
    else if (password().length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!confirmPassword()) newErrors.confirmPassword = "Please confirm your password";
    else if (password() !== confirmPassword()) newErrors.confirmPassword = "Passwords do not match";
    if (!agreeToTerms()) newErrors.terms = "You must agree to the Terms & Conditions and Privacy Policy";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: Event) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate registration process for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to login with success message
      navigate("/?success=1");
      
    } catch (error: any) {
      setErrors({ api: error.message || "Registration failed" });
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
        
        {/* Left Side - Register Form */}
        <div class={`w-full max-w-sm transition-all duration-700 ease-out transform ${
          isVisible() ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}>
          
          {/* Register Card */}
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
              <h1 class="text-2xl font-bold text-gray-900 mb-1">Let's Begin</h1>
              <p class="text-gray-600 text-xs">
                Create your <span class="text-purple-700 font-medium">outsideplant.</span> account
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleRegister} class="space-y-4">
              
              {/* Company Field */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class={`w-4 h-4 transition-colors duration-300 ${
                      isCompanyDropdownOpen() ? 'text-purple-700' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <select
                    value={company()}
                    onChange={(e) => updateFormData("company", e.currentTarget.value)}
                    onFocus={() => setIsCompanyDropdownOpen(true)}
                    onBlur={() => setIsCompanyDropdownOpen(false)}
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
                      isCompanyDropdownOpen() 
                        ? 'text-purple-700 rotate-180' 
                        : 'text-gray-400 rotate-0'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors().company && <p class="text-red-600 text-xs mt-1">{errors().company}</p>}
              </div>

              {/* Full Name Field */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class={`w-4 h-4 transition-colors duration-300 ${
                      fullNameFocused() ? 'text-purple-700' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={fullName()}
                    onInput={(e) => updateFormData("fullName", e.currentTarget.value)}
                    onFocus={() => setFullNameFocused(true)}
                    onBlur={() => setFullNameFocused(false)}
                    placeholder="Enter full name"
                    class={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition-all text-sm ${
                      errors().fullName 
                        ? "border-red-300 focus:ring-red-500" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                </div>
                {errors().fullName && <p class="text-red-600 text-xs mt-1">{errors().fullName}</p>}
              </div>

              {/* Age and Gender Row */}
              <div class="flex space-x-4">
                {/* Age Field */}
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class={`w-4 h-4 transition-colors duration-300 ${
                        ageFocused() ? 'text-purple-700' : 'text-gray-400'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="number"
                      value={age()}
                      onInput={(e) => updateFormData("age", e.currentTarget.value)}
                      onFocus={() => setAgeFocused(true)}
                      onBlur={() => setAgeFocused(false)}
                      placeholder="25"
                      min="16"
                      max="100"
                      class={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition-all text-sm ${
                        errors().age 
                          ? "border-red-300 focus:ring-red-500" 
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    />
                  </div>
                  {errors().age && <p class="text-red-600 text-xs mt-1">{errors().age}</p>}
                </div>

                {/* Gender Field */}
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    </div>
                    <select
                      value={gender()}
                      onChange={(e) => updateFormData("gender", e.currentTarget.value)}
                      onFocus={() => setIsGenderDropdownOpen(true)}
                      onBlur={() => setIsGenderDropdownOpen(false)}
                      class={`w-full pl-3 pr-8 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent bg-white transition-all text-sm ${
                        errors().gender 
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
                      <option value="" disabled selected>Select</option>
                      {genderOptions.map((option) => (
                        <option value={option}>{option}</option>
                      ))}
                    </select>
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg class={`w-4 h-4 transition-all duration-300 ${
                        isGenderDropdownOpen() 
                          ? 'text-purple-700 rotate-180' 
                          : 'text-gray-400 rotate-0'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors().gender && <p class="text-red-600 text-xs mt-1">{errors().gender}</p>}
                </div>
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

              {/* Confirm Password Field */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class={`w-4 h-4 transition-colors duration-300 ${
                      confirmPasswordFocused() ? 'text-purple-700' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword() ? "text" : "password"}
                    value={confirmPassword()}
                    onInput={(e) => updateFormData("confirmPassword", e.currentTarget.value)}
                    onFocus={() => setConfirmPasswordFocused(true)}
                    onBlur={() => setConfirmPasswordFocused(false)}
                    placeholder="Your password"
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

              {/* Terms & Conditions */}
              <div class="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeToTerms()}
                  onChange={(e) => setAgreeToTerms(e.currentTarget.checked)}
                  class="w-3 h-3 border-gray-300 rounded focus:ring-purple-700 focus:ring-2 text-purple-700 transition-all mt-0.5"
                />
                <label class="ml-2 text-xs text-gray-600">
                  I agree to the{" "}
                  <button
                    type="button"
                    class="text-purple-700 hover:text-purple-900 font-medium transition-colors"
                  >
                    Terms & Conditions
                  </button>
                  {" "}and{" "}
                  <button
                    type="button"
                    class="text-purple-700 hover:text-purple-900 font-medium transition-colors"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>
              {errors().terms && <p class="text-red-600 text-xs mt-1">{errors().terms}</p>}

              {/* Error Message */}
              {errors().api && (
                <div class="bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-lg text-xs animate-shake">
                  {errors().api}
                </div>
              )}

              {/* Register Button */}
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
                    <span>Register</span>
                  </>
                ) : (
                  <span>Register</span>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p class="text-center text-gray-600 mt-4 text-xs">
              Already have an account?{" "}
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
              Let's join{" "}
              <img 
                src="src/assets/outsideplant-long-white.png" 
                alt="outsideplant" 
                class="inline-block h-9 lg:h-15 align-middle"
              />
            </h1>
            <p class="text-lg text-white mb-8 leading-relaxed">
              Start smarter operations with outsideplant, the integrated platform for field management and smart cluster solutions.
            </p>

            {/* Features List */}
            <div class="space-y-6">
              <FeatureItem
                icon="💡"
                title="Smarter Operations"
                description="Track and manage fieldwork with real-time visibility."
                delay="0.1s"
              />
              <FeatureItem
                icon="📊"
                title="Reliable Reporting"
                description="Ensure quality with photo-based documentation and auto checks."
                delay="0.2s"
              />
              <FeatureItem
                icon="🔐"
                title="Enhanced Security"
                description="Protect communities with face recognition and smart gate access."
                delay="0.3s"
              />
            </div>

            <div class="mt-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 animate-pulse">
              <p class="text-lg font-medium text-center text-white italic">
                "Start smarter operations and unlock new efficiency with outsideplant."
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

export default Register;