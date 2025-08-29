import { Component, createSignal } from "solid-js";
import { BiRegularBell, BiRegularTime } from "solid-icons/bi";
import { AiOutlineEye, AiOutlineSafety, AiOutlineCamera, AiOutlineAlert } from "solid-icons/ai";
import { FaSolidShield, FaSolidUserCheck, FaSolidDoorOpen, FaSolidEye } from "solid-icons/fa";

// CSS Animations
const styles = `
  .card-hover {
    transition: all 0.3s ease;
  }
  
  .card-hover:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
const SCS: Component = () => {
  }
  
  @keyframes icon-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

const SCS: Component = () => {
  const [securityData, setSecurityData] = createSignal({
    faceRecognition: { totalRecognized: 1247, residentsDetected: 856, guestsDetected: 391, accuracyRate: 97.3 },
    gateAccess: { todayEntries: 142, autoOpenings: 135, manualOverrides: 7, rejectedAccess: 3 },
    securityAlerts: { todayAlerts: 5, suspiciousActivity: 2, unrecognizedFaces: 3, resolvedAlerts: 4 },
    realTimeStatus: { activeCameras: 12, systemUptime: 99.8, lastIncident: "2 hours ago", currentStatus: "Secure" }
  });

  const [selectedAction, setSelectedAction] = createSignal("");

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  return (
    <section class="flex-1 overflow-y-auto p-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        {/* Page Title */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-1">Smart Cluster Security</h1>
          <p class="text-gray-600 text-sm">Tingkatkan keamanan perumahan dengan teknologi pengenalan wajah dan monitoring real-time</p>
        </div>

        {/* Summary Cards - All same width */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-24 card-hover">
            <div class="flex items-center gap-3 h-full">
              <div class="p-2 bg-blue-100 rounded-lg">
                <AiOutlineEye class="w-5 h-5" style={{ color: "#3B82F6" }} />
              </div>
              <div class="flex-1">
                <div class="text-2xl font-bold text-blue-600">{securityData().faceRecognition.residentsDetected}</div>
                <div class="text-xs text-gray-600">Warga Terdeteksi</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-24 card-hover">
            <div class="flex items-center gap-3 h-full">
              <div class="p-2 bg-green-100 rounded-lg">
                <FaSolidDoorOpen class="w-5 h-5" style={{ color: "#10B981" }} />
              </div>
              <div class="flex-1">
                <div class="text-2xl font-bold text-green-600">{securityData().gateAccess.autoOpenings}</div>
                <div class="text-xs text-gray-600">Buka Otomatis</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-24 card-hover">
            <div class="flex items-center gap-3 h-full">
              <div class="p-2 bg-red-100 rounded-lg">
                <AiOutlineAlert class="w-5 h-5" style={{ color: "#EF4444" }} />
              </div>
              <div class="flex-1">
                <div class="text-2xl font-bold text-red-600">{securityData().securityAlerts.todayAlerts}</div>
                <div class="text-xs text-gray-600">Alert Hari Ini</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-24 card-hover">
            <div class="flex items-center gap-3 h-full">
              <div class="p-2 bg-purple-100 rounded-lg">
                <AiOutlineCamera class="w-5 h-5" style={{ color: "#7C3AED" }} />
              </div>
              <div class="flex-1">
                <div class="text-2xl font-bold text-purple-600">{securityData().realTimeStatus.activeCameras}</div>
                <div class="text-xs text-gray-600">Kamera Aktif</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Security Metrics */}
          <div class="xl:col-span-2">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-1">Detail Keamanan</h2>
                <p class="text-sm text-gray-600">Monitoring sistem keamanan real-time</p>
              </div>

              {/* Metrics Grid */}
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Face Recognition Card */}
                <div class="border border-gray-200 rounded-lg p-5 card-hover">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div class="p-2 bg-blue-100 rounded-lg"><AiOutlineEye class="w-6 h-6" style={{ color: "#3B82F6" }} /></div>
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">Face Recognition</h3>
                        <p class="text-sm text-gray-600">Sistem pengenalan wajah otomatis</p>
                      </div>
                    </div>
                    <FaSolidEye class="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500" />
                  </div>
                  <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div class="bg-blue-50 rounded-lg p-3">
                        <div class="text-2xl font-bold text-blue-600">{securityData().faceRecognition.residentsDetected}</div>
                        <div class="text-xs text-blue-700">Warga Terdeteksi</div>
                      </div>
                      <div class="bg-green-50 rounded-lg p-3">
                        <div class="text-2xl font-bold text-green-600">{securityData().faceRecognition.guestsDetected}</div>
                        <div class="text-xs text-green-700">Tamu Terdeteksi</div>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">Tingkat Akurasi</span>
                      <span class="text-sm font-medium text-gray-800">{formatPercentage(securityData().faceRecognition.accuracyRate)}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full transition-all duration-300 progress-bar" style={{ width: `${securityData().faceRecognition.accuracyRate}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Gate Access Card */}
                <div class="border border-gray-200 rounded-lg p-5 card-hover">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div class="p-2 bg-green-100 rounded-lg"><FaSolidDoorOpen class="w-6 h-6" style={{ color: "#10B981" }} /></div>
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">Gerbang Otomatis</h3>
                        <p class="text-sm text-gray-600">Kontrol akses masuk otomatis</p>
                      </div>
                    </div>
                    <FaSolidEye class="w-5 h-5 text-gray-400 cursor-pointer hover:text-green-500" />
                  </div>
                  <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div class="bg-green-50 rounded-lg p-3">
                        <div class="text-2xl font-bold text-green-600">{securityData().gateAccess.autoOpenings}</div>
                        <div class="text-xs text-green-700">Buka Otomatis</div>
                      </div>
                      <div class="bg-red-50 rounded-lg p-3">
                        <div class="text-2xl font-bold text-red-600">{securityData().gateAccess.rejectedAccess}</div>
                        <div class="text-xs text-red-700">Akses Ditolak</div>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">Total Masuk Hari Ini</span>
                      <span class="text-sm font-medium text-green-600">{securityData().gateAccess.todayEntries} kali</span>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500">
                      <span>Manual Override: {securityData().gateAccess.manualOverrides}</span>
                      <span>Status: <span class="text-green-600 font-medium">Normal</span></span>
                    </div>
                  </div>
                </div>

                {/* Security Alerts Card */}
                <div class="border border-gray-200 rounded-lg p-5 card-hover">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div class="p-2 bg-red-100 rounded-lg"><AiOutlineAlert class="w-6 h-6" style={{ color: "#EF4444" }} /></div>
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">Peringatan Keamanan</h3>
                        <p class="text-sm text-gray-600">Notifikasi aktivitas mencurigakan</p>
                      </div>
                    </div>
                    <FaSolidEye class="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500" />
                  </div>
                  <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div class="bg-yellow-50 rounded-lg p-3">
                        <div class="text-2xl font-bold text-yellow-600">{securityData().securityAlerts.suspiciousActivity}</div>
                        <div class="text-xs text-yellow-700">Aktivitas Mencurigakan</div>
                      </div>
                      <div class="bg-orange-50 rounded-lg p-3">
                        <div class="text-2xl font-bold text-orange-600">{securityData().securityAlerts.unrecognizedFaces}</div>
                        <div class="text-xs text-orange-700">Wajah Tak Dikenal</div>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">Peringatan Hari Ini</span>
                      <span class="text-sm font-medium text-gray-800">{securityData().securityAlerts.todayAlerts} alert</span>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500">
                      <span>Terselesaikan: {securityData().securityAlerts.resolvedAlerts}</span>
                      <span>Status: <span class="text-yellow-600 font-medium">Monitoring</span></span>
                    </div>
                  </div>
                </div>

                {/* Real-time Monitoring Card */}
                <div class="border border-gray-200 rounded-lg p-5 card-hover">
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div class="p-2 bg-purple-100 rounded-lg"><AiOutlineCamera class="w-6 h-6" style={{ color: "#7C3AED" }} /></div>
                      <div>
                        <h3 class="text-lg font-semibold text-gray-800">Monitoring Real-time</h3>
                        <p class="text-sm text-gray-600">Status sistem dan kamera</p>
                      </div>
                    </div>
                    <FaSolidEye class="w-5 h-5 text-gray-400 cursor-pointer hover:text-purple-500" />
                  </div>
                  <div class="space-y-4">
                    <div class="bg-purple-50 rounded-lg p-4">
                      <div class="text-2xl font-bold text-purple-600">{securityData().realTimeStatus.activeCameras}</div>
                      <div class="text-xs text-purple-700">Kamera Aktif</div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div class="text-center">
                        <div class="text-lg font-bold text-green-600">{formatPercentage(securityData().realTimeStatus.systemUptime)}</div>
                        <div class="text-xs text-gray-600">System Uptime</div>
                      </div>
                      <div class="text-center">
                        <div class="text-lg font-bold text-blue-600">{securityData().realTimeStatus.lastIncident}</div>
                        <div class="text-xs text-gray-600">Insiden Terakhir</div>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm text-gray-600">Status Sistem</span>
                      <span class="text-sm font-medium text-green-600">{securityData().realTimeStatus.currentStatus}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-purple-500 h-2 rounded-full transition-all duration-300 progress-bar" style={{ width: `${securityData().realTimeStatus.systemUptime}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Recent Activity */}
          <div class="space-y-6">
            {/* Security Actions */}
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
              <h2 class="text-lg font-semibold text-gray-800 mb-4">Aksi Keamanan</h2>
              <div class="space-y-3">
                <button 
                  class="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all text-left btn-hover" 
                  onClick={() => setSelectedAction("Daftarkan Wajah")}
                >
                  <FaSolidUserCheck class="w-5 h-5 text-blue-600 icon-float" />
                  <span class="text-blue-700 font-medium">Daftarkan Wajah</span>
                </button>
                
                <button 
                  class="w-full flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all text-left btn-hover" 
                  onClick={() => setSelectedAction("Kelola Kamera")}
                >
                  <AiOutlineCamera class="w-5 h-5 text-purple-600 icon-float" />
                  <span class="text-purple-700 font-medium">Kelola Kamera</span>
                </button>
                
                <button 
                  class="w-full flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all text-left btn-hover" 
                  onClick={() => setSelectedAction("Review Alert")}
                >
                  <AiOutlineSafety class="w-5 h-5 text-red-600 icon-float" />
                  <span class="text-red-700 font-medium">Review Alert</span>
                </button>
                
                <button 
                  class="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all text-left btn-hover" 
                  onClick={() => setSelectedAction("Pengaturan")}
                >
                  <BiRegularBell class="w-5 h-5 text-green-600 icon-float" />
                  <span class="text-green-700 font-medium">Pengaturan</span>
                </button>
              </div>
            </div>

            {/* Selected Action Details */}
            {selectedAction() && (
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
                <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  {selectedAction() === "Daftarkan Wajah" && <FaSolidUserCheck class="w-5 h-5 text-blue-600" />}
                  {selectedAction() === "Kelola Kamera" && <AiOutlineCamera class="w-5 h-5 text-purple-600" />}
                  {selectedAction() === "Review Alert" && <AiOutlineSafety class="w-5 h-5 text-red-600" />}
                  {selectedAction() === "Pengaturan" && <BiRegularBell class="w-5 h-5 text-green-600" />}
                  {selectedAction()}
                </h3>

                {selectedAction() === "Daftarkan Wajah" && (
                  <div>
                    <p class="text-gray-600 mb-3">Form untuk mendaftarkan wajah baru:</p>
                    <input type="text" placeholder="Nama Warga" class="border rounded-lg p-2 w-full mb-2" />
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Upload Foto</button>
                  </div>
                )}

                {selectedAction() === "Kelola Kamera" && (
                  <div>
                    <p class="text-gray-600 mb-3">Kontrol kamera:</p>
                    <ul class="list-disc list-inside text-sm text-gray-700">
                      <li>Lihat status kamera</li>
                      <li>Restart kamera</li>
                      <li>Atur sudut pandang</li>
                    </ul>
                  </div>
                )}

                {selectedAction() === "Review Alert" && (
                  <div>
                    <p class="text-gray-600 mb-3">Daftar alert keamanan:</p>
                    <div class="p-2 bg-red-50 border border-red-200 rounded mb-2">🚨 Wajah tidak dikenal terdeteksi</div>
                    <div class="p-2 bg-yellow-50 border border-yellow-200 rounded">⚠ Aktivitas mencurigakan terdeteksi</div>
                  </div>
                )}

                {selectedAction() === "Pengaturan" && (
                  <div>
                    <p class="text-gray-600 mb-3">Atur preferensi sistem keamanan:</p>
                    <label class="flex items-center gap-2 mb-2">
                      <input type="checkbox" class="form-checkbox" /> Notifikasi real-time
                    </label>
                    <label class="flex items-center gap-2">
                      <input type="checkbox" class="form-checkbox" /> Auto-open gerbang untuk warga
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Recent Activities */}
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
              <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BiRegularTime class="w-5 h-5 icon-float shimmer-effect" style={{ color: "#6B7280" }} />
                Aktivitas Terkini
              </h2>
              <div class="space-y-4">
                <div class="border-l-4 border-green-200 pl-4 py-2 alert-card-hover">
                  <div class="flex items-center justify-between mb-1">
                    <h4 class="font-medium text-gray-800 text-sm">Warga berhasil dikenali</h4>
                    <span class="px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-50">
                      Selesai
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 mb-1">Gerbang terbuka otomatis</p>
                  <div class="text-xs text-gray-500">2 menit yang lalu</div>
                </div>
                
                <div class="border-l-4 border-yellow-200 pl-4 py-2 alert-card-hover">
                  <div class="flex items-center justify-between mb-1">
                    <h4 class="font-medium text-gray-800 text-sm">Wajah tidak dikenal terdeteksi</h4>
                    <span class="px-2 py-1 rounded-full text-xs font-medium text-yellow-600 bg-yellow-50">
                      Alert
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 mb-1">Notifikasi dikirim ke security</p>
                  <div class="text-xs text-gray-500">15 menit yang lalu</div>
                </div>
                
                <div class="border-l-4 border-blue-200 pl-4 py-2 alert-card-hover">
                  <div class="flex items-center justify-between mb-1">
                    <h4 class="font-medium text-gray-800 text-sm">Sistem backup kamera</h4>
                    <span class="px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-50">
                      Update
                    </span>
                  </div>
                  <p class="text-xs text-gray-600 mb-1">Berhasil diperbarui</p>
                  <div class="text-xs text-gray-500">1 jam yang lalu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SCS;