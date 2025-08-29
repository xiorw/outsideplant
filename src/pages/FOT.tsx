import { Component, createSignal, For, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { BiRegularMapPin, BiRegularUser, BiRegularTime, BiRegularCheckCircle } from "solid-icons/bi";
import { AiOutlineSearch, AiOutlineFilter, AiOutlinePlus, AiOutlineEye } from "solid-icons/ai";
import { FaSolidLocationDot, FaSolidClock, FaSolidCheck, FaSolidExclamation, FaSolidChevronDown } from "solid-icons/fa";

// CSS animations for FOT
const fotStyles = `
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
      min-width: 120px;
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
const FOT: Component = () => {
  const navigate = useNavigate();
  
  // Sample data for field operations
  const [fieldData, setFieldData] = createSignal({
    summary: {
      activeTechnicians: 12,
      completedTasks: 45,
      pendingTasks: 8,
      overdueTasksCount: 2,
      totalProgress: 85.2
    },
    technicians: [
      {
        id: 1,
        name: "Ahmad Rizki",
        status: "active",
        location: "Cluster A - Blok 15",
        currentTask: "Instalasi CCTV Unit 15A",
        progress: 75,
        estimatedCompletion: "14:30",
        tasksToday: 3,
        completedToday: 2
      },
      {
        id: 2,
        name: "Budi Santoso",
        status: "active",
        location: "Cluster B - Blok 22",
        currentTask: "Perbaikan Sistem Keamanan",
        progress: 45,
        estimatedCompletion: "16:00",
        tasksToday: 2,
        completedToday: 1
      },
      {
        id: 3,
        name: "Indra Wijaya",
        status: "break",
        location: "Cluster C - Area Parkir",
        currentTask: "Maintenance Kamera Parkir",
        progress: 90,
        estimatedCompletion: "13:45",
        tasksToday: 4,
        completedToday: 3
      },
      {
        id: 4,
        name: "Fajar Pratama",
        status: "overdue",
        location: "Cluster A - Blok 8",
        currentTask: "Instalasi Access Control",
        progress: 60,
        estimatedCompletion: "12:00",
        tasksToday: 2,
        completedToday: 0
      }
    ],
    recentTasks: [
      {
        id: 101,
        title: "Instalasi CCTV Blok 12",
        technician: "Ahmad Rizki",
        status: "completed",
        location: "Cluster A - Blok 12",
        completedAt: "11:30",
        duration: "2h 30m"
      },
      {
        id: 102,
        title: "Perbaikan Sistem Akses",
        technician: "Budi Santoso",
        status: "in-progress",
        location: "Cluster B - Pintu Utama",
        startedAt: "09:15",
        progress: 65
      },
      {
        id: 103,
        title: "Maintenance Kamera Taman",
        technician: "Indra Wijaya",
        status: "completed",
        location: "Cluster C - Taman Bermain",
        completedAt: "10:45",
        duration: "1h 15m"
      }
    ]
  });

  const [searchQuery, setSearchQuery] = createSignal("");
  const [statusFilter, setStatusFilter] = createSignal("all");
  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);

  const filterOptions = [
    { value: "all", label: "Semua" },
    { value: "active", label: "Aktif" },
    { value: "break", label: "Istirahat" },
    { value: "overdue", label: "Terlambat" }
  ];

  const getSelectedLabel = () => {
    const selected = filterOptions.find(option => option.value === statusFilter());
    return selected ? selected.label : "Semua";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-50";
      case "break": return "text-yellow-600 bg-yellow-50";
      case "overdue": return "text-red-600 bg-red-50";
      case "completed": return "text-blue-600 bg-blue-50";
      case "in-progress": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Aktif";
      case "break": return "Istirahat";
      case "overdue": return "Terlambat";
      case "completed": return "Selesai";
      case "in-progress": return "Berlangsung";
      default: return "Unknown";
    }
  };

  const filteredTechnicians = () => {
    return fieldData().technicians.filter(tech => {
      const matchesSearch = tech.name.toLowerCase().includes(searchQuery().toLowerCase()) ||
                           tech.location.toLowerCase().includes(searchQuery().toLowerCase());
      const matchesStatus = statusFilter() === "all" || tech.status === statusFilter();
      return matchesSearch && matchesStatus;
    });
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
      <div innerHTML={fotStyles}></div>
      <div class="max-w-7xl mx-auto">
        {/* Page Title */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-1">Field Operations Tracking</h1>
          <p class="text-gray-600 text-sm">Pantau dan kelola aktivitas teknisi di lapangan secara real-time</p>
        </div>

        {/* Summary Cards - All same width */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-24 card-hover">
            <div class="flex items-center gap-3 h-full">
              <div class="p-2 bg-blue-100 rounded-lg">
                <BiRegularUser class="w-5 h-5" style={{ color: "#3B82F6" }} />
              </div>
              <div class="flex-1">
                <div class="text-2xl font-bold text-blue-600">{fieldData().summary.activeTechnicians}</div>
                <div class="text-xs text-gray-600">Teknisi Aktif</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-24 card-hover">
            <div class="flex items-center gap-3 h-full">
              <div class="p-2 bg-green-100 rounded-lg">
                <BiRegularCheckCircle class="w-5 h-5" style={{ color: "#10B981" }} />
              </div>
              <div class="flex-1">
                <div class="text-2xl font-bold text-green-600">{fieldData().summary.completedTasks}</div>
                <div class="text-xs text-gray-600">Tugas Selesai</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-24 card-hover">
            <div class="flex items-center gap-3 h-full">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <BiRegularTime class="w-5 h-5" style={{ color: "#F59E0B" }} />
              </div>
              <div class="flex-1">
                <div class="text-2xl font-bold text-yellow-600">{fieldData().summary.pendingTasks}</div>
                <div class="text-xs text-gray-600">Tugas Pending</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-24 card-hover">
            <div class="flex items-center gap-3 h-full">
              <div class="p-2 bg-red-100 rounded-lg">
                <FaSolidExclamation class="w-5 h-5" style={{ color: "#EF4444" }} />
              </div>
              <div class="flex-1">
                <div class="text-2xl font-bold text-red-600">{fieldData().summary.overdueTasksCount}</div>
                <div class="text-xs text-gray-600">Tugas Terlambat</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Technician List */}
          <div class="xl:col-span-2">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Header with Search and Filter */}
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 class="text-xl font-semibold text-gray-800 mb-1">Teknisi Aktif</h2>
                  <p class="text-sm text-gray-600">Status real-time dan lokasi teknisi</p>
                </div>
                <div class="flex gap-3 w-full sm:w-auto">
                  <div class="relative flex-1 sm:flex-initial">
                    <AiOutlineSearch class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari teknisi..."
                      value={searchQuery()}
                      onInput={(e) => setSearchQuery(e.currentTarget.value)}
                      class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-700 focus:border-purple-700 w-full sm:w-48"
                    />
                  </div>
                  {/* Custom Dropdown with Animation */}
                  <div class="dropdown-container">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen())}
                      class="dropdown-toggle flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm w-32"
                    >
                      <span>{getSelectedLabel()}</span>
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

              {/* Technician Cards */}
              <div class="space-y-4">
                <For each={filteredTechnicians()}>
                  {(technician) => (
                    <div class="border border-gray-200 rounded-lg p-5 card-hover">
                      <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <BiRegularUser class="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 class="font-semibold text-gray-800">{technician.name}</h3>
                            <div class="flex items-center gap-2 text-sm text-gray-600">
                              <FaSolidLocationDot class="w-3 h-3" />
                              <span>{technician.location}</span>
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(technician.status)}`}>
                            {getStatusText(technician.status)}
                          </span>
                          <button 
                            onClick={() => navigate(`/field-operations/${technician.id}`)}
                            class="p-1 hover:bg-gray-100 rounded"
                          >
                            <AiOutlineEye class="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      <div class="mb-3">
                        <p class="text-sm text-gray-700 mb-2">{technician.currentTask}</p>
                        <div class="flex justify-between items-center mb-1">
                          <span class="text-xs text-gray-600">Progress</span>
                          <span class="text-xs font-medium text-gray-800">{technician.progress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            class="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                            style={`width: ${technician.progress}%`}
                          ></div>
                        </div>
                      </div>

                      <div class="flex justify-between items-center text-sm">
                        <div class="flex items-center gap-4">
                          <span class="text-gray-600">
                            <FaSolidClock class="w-3 h-3 inline mr-1" />
                            Target: {technician.estimatedCompletion}
                          </span>
                          <span class="text-gray-600">
                            Tugas hari ini: {technician.completedToday}/{technician.tasksToday}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Tasks & Quick Actions */}
          <div class="space-y-6">
            {/* Recent Tasks - Same height as left column */}
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-auto card-hover">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terkini</h2>
              <div class="space-y-4">
                <For each={fieldData().recentTasks}>
                  {(task) => (
                    <div class="border-l-4 border-blue-200 pl-4 py-2">
                      <div class="flex items-center justify-between mb-1">
                        <h4 class="font-medium text-gray-800 text-sm">{task.title}</h4>
                        <span class={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                      </div>
                      <p class="text-xs text-gray-600 mb-1">{task.technician} • {task.location}</p>
                      <div class="text-xs text-gray-500">
                        {task.status === "completed" 
                          ? `Selesai: ${task.completedAt} (${task.duration})`
                          : `Dimulai: ${task.startedAt} • ${task.progress}%`
                        }
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>

            {/* Quick Actions - Same width as other right column items */}
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
              <div class="space-y-3">
                <button 
                  onClick={() => navigate('/field-operations/add-task')}
                  class="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-left"
                >
                  <AiOutlinePlus class="w-5 h-5 text-blue-600" />
                  <span class="text-blue-700 font-medium">Tambah Tugas Baru</span>
                </button>
                
                <button 
                  onClick={() => navigate('/field-operations/assign')}
                  class="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-lg text-left"
                >
                  <BiRegularMapPin class="w-5 h-5 text-purple-600" />
                  <span class="text-purple-700 font-medium">Assign Teknisi</span>
                </button>
                
                <button 
                  onClick={() => navigate('/field-operations/reports')}
                  class="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg text-left"
                >
                  <BiRegularCheckCircle class="w-5 h-5 text-green-600" />
                  <span class="text-green-700 font-medium">Lihat Laporan</span>
                </button>
              </div>
            </div>

            {/* Overall Progress - Same width as other right column items */}
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Progress Keseluruhan</h2>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 mb-2">{fieldData().summary.totalProgress}%</div>
                <div class="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    class="bg-blue-500 h-3 rounded-full transition-all duration-300" 
                    style={`width: ${fieldData().summary.totalProgress}%`}
                  ></div>
                </div>
                <p class="text-sm text-gray-600">Target harian tercapai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FOT;