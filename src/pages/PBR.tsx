import { Component, createSignal, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { AiOutlineCamera, AiOutlineFileText, AiOutlineEye, AiOutlineCheckCircle, AiOutlineUser, AiOutlineSearch, AiOutlineFilter } from "solid-icons/ai";
import { BiRegularMapPin, BiRegularTime, BiRegularUser } from "solid-icons/bi";
import { FaSolidLocationDot, FaSolidClock, FaSolidCheck, FaSolidExclamation, FaSolidChevronDown } from "solid-icons/fa";

// CSS animations for PBR
const pbrStyles = `
  <style>
    .card-hover {
      transition: all 0.3s ease;
    }
    
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .dropdown-container {
      position: relative;
    }
    
    .dropdown-toggle {
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .dropdown-toggle:hover {
      background-color: #f3f4f6;
    }
    
    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 50;
      min-width: 150px;
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
      transition: all 0.2s ease-out;
      pointer-events: none;
    }
    
    .dropdown-menu.show {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    
    .dropdown-item {
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: background-color 0.15s ease;
      border-bottom: 1px solid #f3f4f6;
    }
    
    .dropdown-item:last-child {
      border-bottom: none;
    }
    
    .dropdown-item:hover {
      background-color: #f9fafb;
    }
    
    .dropdown-item.selected {
      background-color: #ede9fe;
      color: #7c3aed;
      font-weight: 500;
    }
    
    .chevron {
      transition: transform 0.2s ease;
    }
    
    .chevron.rotate {
      transform: rotate(180deg);
    }
  </style>
`;

const PBR: Component = () => {
  const navigate = useNavigate();

  // Sample data for photo-based reporting
  const [pbrData, setPbrData] = createSignal({
    summary: {
      totalPhotos: 2847,
      aiVerified: 1653,
      pendingReview: 342,
      issuesFound: 89,
      accuracyRate: 97.3,
      reportsToday: 45
    },
    photoTasks: [
      {
        id: 1,
        photographer: "Ahmad Rizki",
        status: "verified",
        location: "Cluster A - Blok 15",
        task: "Instalasi CCTV Unit 15A",
        progress: 85,
        photosCaptures: 12,
        totalPhotos: 15,
        target: "14:30",
        aiResult: "Verified"
      },
      {
        id: 2,
        photographer: "Budi Santoso",
        status: "verified",
        location: "Cluster B - Blok 22", 
        task: "Perbaikan Sistem Keamanan",
        progress: 65,
        photosCaptures: 8,
        totalPhotos: 10,
        target: "16:00",
        aiResult: "Verified"
      },
      {
        id: 3,
        photographer: "Sari Dewi",
        status: "pending",
        location: "Cluster C - Blok 8",
        task: "Maintenance Tower Fiber",
        progress: 75,
        photosCaptures: 6,
        totalPhotos: 8,
        target: "15:45",
        aiResult: "Pending Review"
      },
      {
        id: 4,
        photographer: "Andi Wijaya",
        status: "issues",
        location: "Cluster D - Blok 5",
        task: "Inspeksi Power Infrastructure",
        progress: 45,
        photosCaptures: 4,
        totalPhotos: 6,
        target: "13:15",
        aiResult: "Issues Found"
      }
    ]
  });

  const [searchQuery, setSearchQuery] = createSignal("");
  const [statusFilter, setStatusFilter] = createSignal("all");
  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);

  const filterOptions = [
    { value: "all", label: "Semua" },
    { value: "verified", label: "Verified" },
    { value: "pending", label: "Pending" },
    { value: "issues", label: "Issues" }
  ];

  const getSelectedLabel = () => {
    const selected = filterOptions.find(option => option.value === statusFilter());
    return selected ? selected.label : "Semua";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "issues": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "issues": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return FaSolidCheck;
      case "pending": return FaSolidClock;
      case "issues": return FaSolidExclamation;
      default: return BiRegularUser;
    }
  };

  // Close dropdown when clicking outside
  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    onCleanup(() => {
      document.removeEventListener('click', handleClickOutside);
    });
  });

  return (
    <section class="flex-1 overflow-y-auto p-8 bg-gray-50">
      <div innerHTML={pbrStyles}></div>
      <div class="max-w-7xl mx-auto">
        {/* Page Title */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Photo-Based Reporting</h1>
          <p class="text-gray-600">auto photo checks & reports</p>
        </div>

        {/* Statistics Cards */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg p-6 shadow-sm card-hover">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-blue-100 p-3 rounded-lg">
                <AiOutlineUser class="w-6 h-6 text-blue-600" />
              </div>
              <span class="text-2xl font-bold text-blue-600">2,847</span>
            </div>
            <h3 class="text-gray-600 text-sm">Total Photos</h3>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm card-hover">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-green-100 p-3 rounded-lg">
                <AiOutlineCheckCircle class="w-6 h-6 text-green-600" />
              </div>
              <span class="text-2xl font-bold text-green-600">1,653</span>
            </div>
            <h3 class="text-gray-600 text-sm">AI Verified</h3>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm card-hover">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-yellow-100 p-3 rounded-lg">
                <BiRegularTime class="w-6 h-6 text-yellow-600" />
              </div>
              <span class="text-2xl font-bold text-yellow-600">342</span>
            </div>
            <h3 class="text-gray-600 text-sm">Pending Review</h3>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm card-hover">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-red-100 p-3 rounded-lg">
                <AiOutlineEye class="w-6 h-6 text-red-600" />
              </div>
              <span class="text-2xl font-bold text-red-600">89</span>
            </div>
            <h3 class="text-gray-600 text-sm">Issues Found</h3>
          </div>
        </div>

        {/* Statistics Cards */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Photos */}
          <div class="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500 card-hover">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Total Photos</p>
                <p class="text-3xl font-bold text-blue-600">{pbrData().summary.totalPhotos.toLocaleString()}</p>
                <p class="text-green-500 text-xs mt-1">↗ +127 today</p>
              </div>
              <div class="bg-blue-100 p-3 rounded-lg">
                <AiOutlineCamera class="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* AI Verified */}
          <div class="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500 card-hover">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">AI Verified</p>
                <p class="text-3xl font-bold text-green-600">{pbrData().summary.aiVerified.toLocaleString()}</p>
                <p class="text-green-500 text-xs mt-1">↗ 94.8% rate</p>
              </div>
              <div class="bg-green-100 p-3 rounded-lg">
                <AiOutlineCheckCircle class="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Pending Review */}
          <div class="bg-white rounded-lg p-6 shadow-sm border-l-4 border-yellow-500 card-hover">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Pending Review</p>
                <p class="text-3xl font-bold text-yellow-600">{pbrData().summary.pendingReview}</p>
                <p class="text-yellow-500 text-xs mt-1">↗ +23 cases</p>
              </div>
              <div class="bg-yellow-100 p-3 rounded-lg">
                <BiRegularTime class="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Issues Found */}
          <div class="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-500 card-hover">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Issues Found</p>
                <p class="text-3xl font-bold text-red-600">{pbrData().summary.issuesFound}</p>
                <p class="text-green-500 text-xs mt-1">↘ -12 resolved</p>
              </div>
              <div class="bg-red-100 p-3 rounded-lg">
                <AiOutlineEye class="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Photo Analysis Tasks Section */}
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-xl font-semibold text-gray-800">Photo Analysis Tasks</h3>
                <p class="text-gray-600 text-sm mt-1">Status real-time dan lokasi foto</p>
              </div>
              
              <div class="flex items-center gap-4">
                {/* Search */}
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Cari foto..."
                    value={searchQuery()}
                    onInput={(e) => setSearchQuery(e.target.value)}
                    class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <AiOutlineSearch class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                
                {/* Custom Dropdown Filter */}
                <div class="dropdown-container">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen())}
                    class="dropdown-toggle flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                  >
                    <span class="text-sm">{getSelectedLabel()}</span>
                    <FaSolidChevronDown class={`w-3 h-3 text-gray-400 chevron ${isDropdownOpen() ? 'rotate' : ''}`} />
                  </button>
                  
                  <div class={`dropdown-menu ${isDropdownOpen() ? 'show' : ''}`}>
                    {filterOptions.map((option) => (
                      <div
                        class={`dropdown-item text-sm ${statusFilter() === option.value ? 'selected' : ''}`}
                        onClick={() => {
                          setStatusFilter(option.value);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Tasks List */}
          <div class="p-6">
            <div class="space-y-4">
              {pbrData().photoTasks.map((task) => (
                <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow card-hover">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                      <div class={`p-3 rounded-lg ${task.status === 'verified' ? 'bg-green-100' : task.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                        <BiRegularUser class={`w-6 h-6 ${task.status === 'verified' ? 'text-green-600' : task.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`} />
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-800">{task.photographer}</h4>
                        <div class="flex items-center gap-2 text-sm text-gray-500">
                          <FaSolidLocationDot class="w-4 h-4" />
                          <span>{task.location}</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.aiResult}
                      </span>
                      <AiOutlineEye class="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <p class="text-sm text-gray-700 mb-2">{task.task}</p>
                    <div class="flex items-center justify-between text-sm text-gray-500">
                      <div class="flex items-center gap-4">
                        <div class="flex items-center gap-1">
                          <span class={`inline-block w-2 h-2 rounded-full ${getProgressColor(task.status)}`}></span>
                          <span>Target: {task.target}</span>
                        </div>
                        <span>Photos captured: {task.photosCaptures}/{task.totalPhotos}</span>
                      </div>
                      <span class={`font-medium ${task.status === 'verified' ? 'text-green-600' : task.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                        {task.progress}%
                      </span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        class={`h-2 rounded-full transition-all duration-300 ${getProgressColor(task.status)}`}
                        style={`width: ${task.progress}%`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PBR;