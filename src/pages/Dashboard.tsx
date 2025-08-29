import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { BiRegularMapPin } from "solid-icons/bi";
import { AiOutlineCamera, AiOutlineSafety, AiOutlineCreditCard } from "solid-icons/ai";
import { FaSolidChartLine, FaSolidEye, FaSolidShield, FaSolidWallet } from "solid-icons/fa";

// CSS animations for Dashboard
const dashboardStyles = `
  <style>
    .card-hover {
      transition: all 0.3s ease;
    }
    
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .metric-card-hover {
      transition: all 0.3s ease;
    }
    
    .metric-card-hover:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }
    
    .btn-hover {
      transition: all 0.3s ease;
    }
    
    .btn-hover:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    }
  </style>
`;

const Dashboard: Component = () => {
  const navigate = useNavigate();
  
  // Sample data for dashboard metrics
  const [dashboardData, setDashboardData] = createSignal({
    fieldOperations: {
      activeTechnicians: 12,
      completedTasks: 45,
      pendingTasks: 8,
      totalProgress: 85
    },
    photoReporting: {
      totalReports: 128,
      validPhotos: 115,
      rejectedPhotos: 13,
      validityRate: 89.8
    },
    clusterSecurity: {
      recognizedFaces: 856,
      guestAccess: 24,
      securityAlerts: 3,
      accessesToday: 142
    },
    payments: {
      monthlyRevenue: 45750000,
      paidMembers: 89,
      pendingPayments: 15,
      paymentRate: 85.6
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section class="flex-1 overflow-y-auto p-8 bg-gray-50">
      <div innerHTML={dashboardStyles}></div>
      <div class="max-w-7xl mx-auto">
        {/* Page Title */}
        <div class="mb-8 slide-in">
          <h1 class="text-3xl font-bold text-gray-800 mb-1">Dashboard Overview</h1>
          <p class="text-gray-600 text-sm">Monitor and manage your smart cluster system performance</p>
        </div>

        {/* Dashboard Cards Grid */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Field Operations Tracking Card */}
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <BiRegularMapPin class="w-6 h-6" style={{ color: "#3B82F6" }} />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Field Operations</h3>
                  <p class="text-sm text-gray-600">Real-time technician tracking</p>
                </div>
              </div>
              <FaSolidEye class="w-5 h-5 text-gray-400 cursor-pointer" 
                     onClick={() => navigate('/field-operations-tracking')} />
            </div>
            
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-50 rounded-lg p-3">
                  <div class="text-2xl font-bold text-blue-600">{dashboardData().fieldOperations.activeTechnicians}</div>
                  <div class="text-xs text-blue-700">Active Technicians</div>
                </div>
                <div class="bg-green-50 rounded-lg p-3">
                  <div class="text-2xl font-bold text-green-600">{dashboardData().fieldOperations.completedTasks}</div>
                  <div class="text-xs text-green-700">Completed Tasks</div>
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Overall Progress</span>
                <span class="text-sm font-medium text-gray-800">{dashboardData().fieldOperations.totalProgress}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                     style={`width: ${dashboardData().fieldOperations.totalProgress}%`}></div>
              </div>
            </div>
          </div>

          {/* Photo-based Reporting Card */}
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-purple-100 rounded-lg">
                  <AiOutlineCamera class="w-6 h-6" style={{ color: "#5F53BC" }} />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Photo Reporting</h3>
                  <p class="text-sm text-gray-600">AI-powered quality control</p>
                </div>
              </div>
              <FaSolidEye class="w-5 h-5 text-gray-400 cursor-pointer view-icon-hover" 
                     onClick={() => navigate('/photo-based-reporting')} />
            </div>
            
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-purple-50 rounded-lg p-3">
                  <div class="text-2xl font-bold text-purple-600">{dashboardData().photoReporting.totalReports}</div>
                  <div class="text-xs text-purple-700">Total Reports</div>
                </div>
                <div class="bg-red-50 rounded-lg p-3">
                  <div class="text-2xl font-bold text-red-600">{dashboardData().photoReporting.rejectedPhotos}</div>
                  <div class="text-xs text-red-700">Rejected Photos</div>
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Validity Rate</span>
                <span class="text-sm font-medium text-green-600">{dashboardData().photoReporting.validityRate}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-purple-500 h-2 rounded-full transition-all duration-300" 
                     style={`width: ${dashboardData().photoReporting.validityRate}%`}></div>
              </div>
            </div>
          </div>

          {/* Smart Cluster Security Card */}
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-green-100 rounded-lg">
                  <FaSolidShield class="w-6 h-6" style={{ color: "#10B981" }} />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Cluster Security</h3>
                  <p class="text-sm text-gray-600">Face recognition system</p>
                </div>
              </div>
              <FaSolidEye class="w-5 h-5 text-gray-400 cursor-pointer" 
                     onClick={() => navigate('/smart-cluster-security')} />
            </div>
            
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-green-50 rounded-lg p-3">
                  <div class="text-2xl font-bold text-green-600">{dashboardData().clusterSecurity.recognizedFaces}</div>
                  <div class="text-xs text-green-700">Recognized Faces</div>
                </div>
                <div class="bg-yellow-50 rounded-lg p-3">
                  <div class="text-2xl font-bold text-yellow-600">{dashboardData().clusterSecurity.securityAlerts}</div>
                  <div class="text-xs text-yellow-700">Security Alerts</div>
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Today's Access</span>
                <span class="text-sm font-medium text-gray-800">{dashboardData().clusterSecurity.accessesToday} entries</span>
              </div>
              <div class="flex justify-between text-xs text-gray-500">
                <span>Guest Access: {dashboardData().clusterSecurity.guestAccess}</span>
                <span>Status: <span class="text-green-600 font-medium">Active</span></span>
              </div>
            </div>
          </div>

          {/* Integrated Payments Card */}
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-orange-100 rounded-lg">
                  <FaSolidWallet class="w-6 h-6" style={{ color: "#F59E0B" }} />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Payment System</h3>
                  <p class="text-sm text-gray-600">Integrated financial management</p>
                </div>
              </div>
              <FaSolidEye class="w-5 h-5 text-gray-400 cursor-pointer" 
                     onClick={() => navigate('/integrated-payments')} />
            </div>
            
            <div class="space-y-4">
              <div class="bg-orange-50 rounded-lg p-4">
                <div class="text-2xl font-bold text-orange-600">
                  {formatCurrency(dashboardData().payments.monthlyRevenue)}
                </div>
                <div class="text-xs text-orange-700">Monthly Revenue</div>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center bg-green-50 rounded-lg p-2">
                  <div class="text-lg font-bold text-green-600">{dashboardData().payments.paidMembers}</div>
                  <div class="text-xs text-gray-600">Paid Members</div>
                </div>
                <div class="text-center bg-red-50 rounded-lg p-2">
                  <div class="text-lg font-bold text-red-600">{dashboardData().payments.pendingPayments}</div>
                  <div class="text-xs text-gray-600">Pending</div>
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Payment Rate</span>
                <span class="text-sm font-medium text-orange-600">{dashboardData().payments.paymentRate}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                     style={`width: ${dashboardData().payments.paymentRate}%`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div class="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
          <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <FaSolidChartLine class="w-5 h-5" style={{ color: "#5F53BC" }} />
            Quick Actions
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button 
              onClick={() => navigate('/field-operations/add')}
              class="flex flex-col items-center p-4 bg-blue-50 rounded-lg btn-hover text-sm"
            >
              <BiRegularMapPin class="w-8 h-8 text-blue-600 mb-2" />
              <span class="text-blue-700 font-medium">Add Task</span>
            </button>
            <button 
              onClick={() => navigate('/photo-reports/review')}
              class="flex flex-col items-center p-4 bg-purple-50 rounded-lg btn-hover text-sm"
            >
              <AiOutlineCamera class="w-8 h-8 text-purple-600 mb-2" />
              <span class="text-purple-700 font-medium">Review Photos</span>
            </button>
            <button 
              onClick={() => navigate('/security/alerts')}
              class="flex flex-col items-center p-4 bg-green-50 rounded-lg btn-hover text-sm"
            >
              <AiOutlineSafety class="w-8 h-8 text-green-600 mb-2" />
              <span class="text-green-700 font-medium">Security Alerts</span>
            </button>
            <button 
              onClick={() => navigate('/payments/manage')}
              class="flex flex-col items-center p-4 bg-orange-50 rounded-lg btn-hover text-sm"
            >
              <AiOutlineCreditCard class="w-8 h-8 text-orange-600 mb-2" />
              <span class="text-orange-700 font-medium">Manage Payments</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;