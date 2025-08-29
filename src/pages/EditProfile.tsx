import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { FaSolidFloppyDisk } from "solid-icons/fa";
import { BiRegularUser } from "solid-icons/bi";
import { AiOutlineMail } from "solid-icons/ai";

const EditProfile: Component = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = createSignal({
    username: "User",
    fullName: "Userrrrr",
    email: "user123@gmail.com",
    age: "18",
    gender: "Male",
    phone: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <section class="p-10 h-[calc(100vh-4rem)] overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        {/* Page Title */}
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800 mb-1">Edit Profile</h1>
          <p class="text-gray-600 text-sm">Update your personal information and preferences</p>
        </div>

        {/* Form */}
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form class="space-y-6">
            {/* Personal Information */}
            <div class="p-4 rounded-lg border border-gray-100">
              <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                <BiRegularUser class="w-5 h-5 text-purple-700" />
                Personal Information
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={formData().username}
                    onInput={(e) => handleInputChange('username', e.currentTarget.value)}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 transition-all text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData().fullName}
                    onInput={(e) => handleInputChange('fullName', e.currentTarget.value)}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 transition-all text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={formData().age}
                    onInput={(e) => handleInputChange('age', e.currentTarget.value)}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 transition-all text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={formData().gender}
                    onChange={(e) => handleInputChange('gender', e.currentTarget.value)}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 transition-all text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div class="p-4 rounded-lg border border-gray-100">
              <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
                <AiOutlineMail class="w-5 h-5 text-purple-700" />
                Contact Information
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData().email}
                    onInput={(e) => handleInputChange('email', e.currentTarget.value)}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 transition-all text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData().phone}
                    onInput={(e) => handleInputChange('phone', e.currentTarget.value)}
                    placeholder="Enter your phone number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 transition-all text-sm"
                  />
                </div>
              </div>
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
                onClick={handleSave}
                class="flex items-center gap-2 px-6 py-2 text-white rounded-lg font-medium hover:opacity-80 transition-all text-sm bg-purple-700"
              >
                <FaSolidFloppyDisk class="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
