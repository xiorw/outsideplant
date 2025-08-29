import { Component, createSignal, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { AiOutlineCreditCard, AiOutlineSearch, AiOutlineFilter, AiOutlineDownload } from "solid-icons/ai";
import { FaSolidWallet, FaSolidChartLine, FaSolidCalendar, FaSolidCircle, FaSolidClock, FaSolidExclamation, FaSolidChevronDown } from "solid-icons/fa";
import { BiRegularReceipt } from "solid-icons/bi";

// CSS animations for IP
const ipStyles = `
  <style>
    .card-hover {
      transition: all 0.3s ease;
    }
    
    .card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
  </style>
`;

interface PaymentRecord {
  id: string;
  residentName: string;
  unit: string;
  paymentType: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  method?: string;
}

interface PaymentSummary {
  totalRevenue: number;
  paidCount: number;
  pendingCount: number;
  overdueCount: number;
  collectionRate: number;
}

const IP: Component = () => {
  const navigate = useNavigate();
  
  // Sample payment data
  const [paymentSummary, setPaymentSummary] = createSignal<PaymentSummary>({
    totalRevenue: 125750000,
    paidCount: 89,
    pendingCount: 15,
    overdueCount: 8,
    collectionRate: 79.5
  });

  const [paymentRecords, setPaymentRecords] = createSignal<PaymentRecord[]>([
    {
      id: "PAY-001",
      residentName: "Ahmad Wijaya",
      unit: "A-12",
      paymentType: "Iuran Keamanan",
      amount: 150000,
      status: "paid",
      dueDate: "2025-08-15",
      paidDate: "2025-08-12",
      method: "Transfer Bank"
    },
    {
      id: "PAY-002",
      residentName: "Sari Dewi",
      unit: "B-05",
      paymentType: "Iuran Kebersihan",
      amount: 75000,
      status: "pending",
      dueDate: "2025-08-20",
    },
    {
      id: "PAY-003",
      residentName: "Budi Santoso",
      unit: "C-08",
      paymentType: "Iuran Keamanan",
      amount: 150000,
      status: "overdue",
      dueDate: "2025-08-10",
    },
    {
      id: "PAY-004",
      residentName: "Maya Sari",
      unit: "A-03",
      paymentType: "Parkir Tambahan",
      amount: 100000,
      status: "paid",
      dueDate: "2025-08-25",
      paidDate: "2025-08-22",
      method: "E-Wallet"
    },
    {
      id: "PAY-005",
      residentName: "Rudi Hermawan",
      unit: "B-15",
      paymentType: "Iuran Kebersihan",
      amount: 75000,
      status: "pending",
      dueDate: "2025-08-28",
    }
  ]);

  const [searchTerm, setSearchTerm] = createSignal("");
  const [filterStatus, setFilterStatus] = createSignal("all");
  const [isDropdownOpen, setIsDropdownOpen] = createSignal(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <FaSolidCircle class="w-4 h-4 text-green-500" />;
      case 'pending':
        return <FaSolidClock class="w-4 h-4 text-yellow-500" />;
      case 'overdue':
        return <FaSolidExclamation class="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = () => {
    let filtered = paymentRecords();
    
    if (searchTerm()) {
      filtered = filtered.filter(record => 
        record.residentName.toLowerCase().includes(searchTerm().toLowerCase()) ||
        record.unit.toLowerCase().includes(searchTerm().toLowerCase()) ||
        record.paymentType.toLowerCase().includes(searchTerm().toLowerCase())
      );
    }
    
    if (filterStatus() !== "all") {
      filtered = filtered.filter(record => record.status === filterStatus());
    }
    
    return filtered;
  };

  return (
    <section class="flex-1 overflow-y-auto p-8 bg-gray-50">
      <div innerHTML={ipStyles}></div>
      <div class="max-w-7xl mx-auto">
        {/* Page Title */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-1">Integrated Payments</h1>
          <p class="text-gray-600 text-sm">Kelola sistem pembayaran terintegrasi untuk semua layanan cluster</p>
        </div>

        {/* Payment Summary Cards */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-green-100 rounded-lg">
                <FaSolidWallet class="w-6 h-6" style={{ color: "#10B981" }} />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Total Revenue</h3>
                <p class="text-sm text-gray-600">Bulan ini</p>
              </div>
            </div>
            <div class="text-2xl font-bold text-green-600">
              {formatCurrency(paymentSummary().totalRevenue)}
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-blue-100 rounded-lg">
                <FaSolidCircle class="w-6 h-6" style={{ color: "#3B82F6" }} />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Pembayaran Lunas</h3>
                <p class="text-sm text-gray-600">Total transaksi</p>
              </div>
            </div>
            <div class="text-2xl font-bold text-blue-600">{paymentSummary().paidCount}</div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-yellow-100 rounded-lg">
                <FaSolidClock class="w-6 h-6" style={{ color: "#F59E0B" }} />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Pending</h3>
                <p class="text-sm text-gray-600">Menunggu pembayaran</p>
              </div>
            </div>
            <div class="text-2xl font-bold text-yellow-600">{paymentSummary().pendingCount}</div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div class="flex items-center gap-3 mb-4">
              <div class="p-2 bg-red-100 rounded-lg">
                <FaSolidExclamation class="w-6 h-6" style={{ color: "#EF4444" }} />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Overdue</h3>
                <p class="text-sm text-gray-600">Terlambat bayar</p>
              </div>
            </div>
            <div class="text-2xl font-bold text-red-600">{paymentSummary().overdueCount}</div>
          </div>
        </div>

        {/* Collection Rate Chart */}
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 card-hover">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-purple-100 rounded-lg">
                <FaSolidChartLine class="w-6 h-6" style={{ color: "#8B5CF6" }} />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800">Tingkat Penagihan</h3>
                <p class="text-sm text-gray-600">Persentase pembayaran tepat waktu</p>
              </div>
            </div>
            <span class="text-2xl font-bold text-purple-600">{paymentSummary().collectionRate}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="bg-purple-500 h-4 rounded-full transition-all duration-300" 
                 style={`width: ${paymentSummary().collectionRate}%`}></div>
          </div>
        </div>

        {/* Payment Records Table */}
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 card-hover">
          {/* Table Header */}
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-800">Riwayat Pembayaran</h2>
              <div class="flex gap-2">
                <button class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm">
                  <AiOutlineDownload class="w-4 h-4" />
                  Export
                </button>
                <button 
                  onClick={() => navigate('/payments/add')}
                  class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm"
                >
                  <AiOutlineCreditCard class="w-4 h-4" />
                  Tambah Tagihan
                </button>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div class="flex gap-4">
              <div class="flex-1 relative">
                <AiOutlineSearch class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama, unit, atau jenis pembayaran..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                  value={searchTerm()}
                  onInput={(e) => setSearchTerm(e.currentTarget.value)}
                />
              </div>
              {/* Custom Select with Animation */}
              <div class="relative">
                <select
                  value={filterStatus()}
                  onChange={(e) => setFilterStatus(e.currentTarget.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setIsDropdownOpen(false)}
                  class="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-800 focus:border-purple-800 w-32 bg-white cursor-pointer"
                  style={{
                    background: 'white',
                    '-webkit-appearance': 'none',
                    '-moz-appearance': 'none'
                  }}
                >
                  <option value="all">Semua</option>
                  <option value="paid">Lunas</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaSolidChevronDown 
                    class={`w-3 h-3 transition-all duration-200 ${
                      isDropdownOpen() ? 'rotate-180 text-purple-800' : 'rotate-0 text-gray-400'
                    }`} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warga</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Pembayaran</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jatuh Tempo</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <For each={filteredRecords()}>
                  {(record) => (
                    <tr class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.id}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{record.residentName}</div>
                        {record.method && (
                          <div class="text-xs text-gray-500">via {record.method}</div>
                        )}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.unit}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.paymentType}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(record.amount)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                            {record.status === 'paid' ? 'Lunas' : 
                             record.status === 'pending' ? 'Pending' : 'Overdue'}
                          </span>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{formatDate(record.dueDate)}</div>
                        {record.paidDate && (
                          <div class="text-xs text-green-600">Dibayar: {formatDate(record.paidDate)}</div>
                        )}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <div class="flex gap-2">
                          <button 
                            class="text-blue-600 hover:text-blue-900 font-medium"
                            onClick={() => navigate(`/payments/detail/${record.id}`)}
                          >
                            Detail
                          </button>
                          {record.status !== 'paid' && (
                            <button 
                              class="text-green-600 hover:text-green-900 font-medium"
                              onClick={() => navigate(`/payments/pay/${record.id}`)}
                            >
                              Bayar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div class="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
          <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
            <FaSolidWallet class="w-5 h-5" style={{ color: "#F59E0B" }} />
            Aksi Cepat
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button 
              onClick={() => navigate('/payments/bulk-invoice')}
              class="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all text-sm"
            >
              <BiRegularReceipt class="w-8 h-8 text-blue-600 mb-2" />
              <span class="text-blue-700 font-medium">Tagihan Massal</span>
            </button>
            <button 
              onClick={() => navigate('/payments/reminder')}
              class="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-all text-sm"
            >
              <FaSolidClock class="w-8 h-8 text-yellow-600 mb-2" />
              <span class="text-yellow-700 font-medium">Kirim Reminder</span>
            </button>
            <button 
              onClick={() => navigate('/payments/report')}
              class="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all text-sm"
            >
              <FaSolidChartLine class="w-8 h-8 text-purple-600 mb-2" />
              <span class="text-purple-700 font-medium">Laporan Keuangan</span>
            </button>
            <button 
              onClick={() => navigate('/payments/settings')}
              class="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all text-sm"
            >
              <AiOutlineCreditCard class="w-8 h-8 text-green-600 mb-2" />
              <span class="text-green-700 font-medium">Pengaturan</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IP;