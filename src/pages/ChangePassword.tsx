import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { FaSolidLock, FaSolidEye, FaSolidEyeSlash } from "solid-icons/fa";

const ChangePassword: Component = () => {
  const navigate = useNavigate();
  
  const [showCurrentPassword, setShowCurrentPassword] = createSignal(false);
  const [showNewPassword, setShowNewPassword] = createSignal(false);
  const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);
  
  const [passwords, setPasswords] = createSignal({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = createSignal({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const handleSubmit = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };

    if (!passwords().currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    const passwordError = validatePassword(passwords().newPassword);
    if (passwordError) {
      newErrors.newPassword = passwordError;
    }

    if (passwords().newPassword !== passwords().confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (!newErrors.currentPassword && !newErrors.newPassword && !newErrors.confirmPassword) {
      alert("Password changed successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      navigate('/profile');
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <section class="p-10 h-[calc(100vh-4rem)] overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        {/* Page Title */}
        <div class="mb-4">
          <h1 class="text-3xl font-bold text-gray-800 mb-1">Change Password</h1>
          <p class="text-gray-600 text-sm">Update your password to keep your account secure</p>
        </div>

        {/* Security Tips */}
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <h3 class="text-sm font-semibold text-blue-800 mb-1">Password Security Tips:</h3>
          <div class="grid grid-cols-2 gap-1 text-xs text-blue-700">
            <div>• Use at least 8 characters</div>
            <div>• Include uppercase and lowercase letters</div>
            <div>• Add numbers and special characters</div>
            <div>• Avoid common words or personal information</div>
          </div>
        </div>

        {/* Form */}
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form class="space-y-4">
            <div>
              <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                <FaSolidLock class="w-5 h-5 text-purple-700" />
                Password Change
              </h2>
            </div>

            {/* Current Password */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div class="relative">
                <input
                  type={showCurrentPassword() ? "text" : "password"}
                  value={passwords().currentPassword}
                  onInput={(e) => handleInputChange('currentPassword', e.currentTarget.value)}
                  class={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${
                    errors().currentPassword
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-purple-700 focus:border-purple-700'
                  }`}
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword())}
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword() ? (
                    <FaSolidEyeSlash class="w-4 h-4" />
                  ) : (
                    <FaSolidEye class="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors().currentPassword && (
                <p class="mt-1 text-xs text-red-600">{errors().currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div class="relative">
                <input
                  type={showNewPassword() ? "text" : "password"}
                  value={passwords().newPassword}
                  onInput={(e) => handleInputChange('newPassword', e.currentTarget.value)}
                  class={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${
                    errors().newPassword
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-purple-700 focus:border-purple-700'
                  }`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword())}
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword() ? (
                    <FaSolidEyeSlash class="w-4 h-4" />
                  ) : (
                    <FaSolidEye class="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors().newPassword && (
                <p class="mt-1 text-xs text-red-600">{errors().newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div class="relative">
                <input
                  type={showConfirmPassword() ? "text" : "password"}
                  value={passwords().confirmPassword}
                  onInput={(e) => handleInputChange('confirmPassword', e.currentTarget.value)}
                  class={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${
                    errors().confirmPassword
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-purple-700 focus:border-purple-700'
                  }`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword())}
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword() ? (
                    <FaSolidEyeSlash class="w-4 h-4" />
                  ) : (
                    <FaSolidEye class="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors().confirmPassword && (
                <p class="mt-1 text-xs text-red-600">{errors().confirmPassword}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div class="flex flex-wrap justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                class="px-6 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-all text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                class="flex items-center gap-2 px-6 py-2 text-white rounded-lg font-medium hover:opacity-80 transition-all text-sm bg-purple-700"
              >
                <FaSolidLock class="w-4 h-4" />
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
