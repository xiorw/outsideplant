import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { BiRegularUser } from "solid-icons/bi";
import { AiOutlineMail } from "solid-icons/ai";

const Profile: Component = () => {
  const navigate = useNavigate();

  const navigateToEditProfile = () => {
    navigate('/edit-profile');
  };

  const navigateToChangePassword = () => {
    navigate('/change-password');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Logic for logout
      alert('Logged out successfully!');
      navigate('/');
    }
  };

  return (
    <section class="flex-1 overflow-y-auto p-8 bg-gray-50">
      <div class="flex items-center gap-6 mb-8">
        <div class="relative">
          <div class="w-30 h-30 rounded-full bg-gray-300 border-4 border-purple-700" />
        </div>
        <div class="text-left">
          <h2 class="text-3xl font-bold text-gray-800 mt-8 mb-1">Userrrrr</h2>
          <p class="text-gray-600 mb-1">user123@gmail.com</p>
          <p class="text-sm font-medium mb-10 text-purple-700">User</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-10x1 mx-auto">
        {/* Personal Info */}
        <div class="text-white rounded-2xl p-6 bg-purple-700">
          <h3 class="flex items-center gap-2 text-lg font-semibold mb-6">
            <BiRegularUser class="w-6 h-6" /> Personal Information
          </h3>
          <div class="space-y-4">
            <div>
              <div class="text-sm text-white/70">Username</div>
              <div class="font-medium">User</div>
            </div>
            <div>
              <div class="text-sm text-white/70">Age</div>
              <div class="font-medium">18 years old</div>
            </div>
            <div>
              <div class="text-sm text-white/70">Gender</div>
              <div class="font-medium">Male</div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div class="text-white rounded-2xl p-6 bg-purple-700">
          <h3 class="flex items-center gap-2 text-lg font-semibold mb-6">
            <AiOutlineMail class="w-6 h-6" /> Contact & Info
          </h3>
          <div class="space-y-4">
            <div>
              <div class="text-sm text-white/70">Email Address</div>
              <div class="font-medium">user123@gmail.com</div>
            </div>
            <div>
              <div class="text-sm text-white/70">Member Since</div>
              <div class="font-medium">August 15, 2025</div>
            </div>
            <div>
              <div class="text-sm text-white/70">Last Updated</div>
              <div class="font-medium">August 20, 2025</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div class="flex flex-wrap justify-center gap-4 mt-8 max-w-4xl mx-auto">
        <button 
          onClick={navigateToEditProfile}
          class="px-8 py-3 bg-white rounded-lg font-medium border hover:opacity-80 transition-all border-purple-700 text-purple-700" 
        >
          Edit Profile
        </button>
        <button 
          onClick={navigateToChangePassword}
          class="px-8 py-3 bg-white rounded-lg font-medium border hover:opacity-80 transition-all border-purple-700 text-purple-700" 
        >
          Change Password
        </button>
        <button 
          onClick={handleLogout}
          class="px-8 py-3 text-white rounded-lg font-medium hover:opacity-80 transition-all bg-purple-700" 
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;
