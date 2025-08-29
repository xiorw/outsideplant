import { Component } from "solid-js";
import { FaSolidBell } from "solid-icons/fa";
import { BiRegularUser, BiRegularMapPin } from "solid-icons/bi";
import { AiOutlineLock, AiOutlineHome, AiOutlineCamera, AiOutlineCreditCard } from "solid-icons/ai";
import { useLocation } from "@solidjs/router";

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  showDateTime?: boolean;
}

const Header: Component<HeaderProps> = (props) => {
  const location = useLocation();

  // Tentukan icon dan title sesuai halaman
  const getPageConfig = () => {
    switch (location.pathname) {
      case "/dashboard":
        return { icon: AiOutlineHome, title: "Dashboard" };
      case "/field-operations-tracking":
        return { icon: BiRegularMapPin, title: "Field Operations Tracking" };
      case "/photo-based-reporting":
        return { icon: AiOutlineCamera, title: "Photo-based Reporting" };
      case "/smart-cluster-security":
        return { icon: AiOutlineLock, title: "Smart Cluster Security" };
      case "/integrated-payments":
        return { icon: AiOutlineCreditCard, title: "Integrated Payments" };
      case "/profile":
      case "/edit-profile":
        return { icon: BiRegularUser, title: props.title };
      case "/change-password":
        return { icon: AiOutlineLock, title: props.title };
      default:
        return { icon: null, title: props.title };
    }
  };

  const pageConfig = getPageConfig();
  const Icon = pageConfig.icon;
  const displayTitle = pageConfig.title;
  
  const shouldShowDateTime = () => {
    const allowedRoutes = [
      "/dashboard",
      "/field-operations-tracking",
      "/photo-based-reporting",
      "/smart-cluster-security",
      "/integrated-payments"
    ];
    
    return props.showDateTime || allowedRoutes.includes(location.pathname);
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <header
      class="flex items-center justify-between h-16 px-6 text-white flex-shrink-0 bg-purple-700"
    >
      <div class="flex items-center gap-3 min-w-0">
        {Icon && (
          <div class="flex-shrink-0">
            <Icon class="w-6 h-6 text-white" />
          </div>
        )}
        <h1 class="font-semibold text-lg text-white truncate">{displayTitle}</h1>
      </div>

      <div class="flex items-center gap-3 flex-shrink-0">
        {/* Search bar (selalu ada) */}
        <div class="relative">
          <input
            type="text"
            placeholder="Search here"
            class="px-4 py-2 rounded-full bg-white text-black outline-none w-64 text-sm placeholder-gray-400"
          />
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              class="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {shouldShowDateTime() && (
          <>
            <div class="bg-white/20 px-3 py-2 rounded-full text-sm text-white whitespace-nowrap">
              {getCurrentDate()}
            </div>
            <div class="bg-white/20 px-3 py-2 rounded-full text-sm text-white whitespace-nowrap">
              {getCurrentTime()}
            </div>
          </>
        )}

        <button class="p-1 hover:bg-white/20 rounded transition-colors">
          <FaSolidBell class="w-5 h-5 text-white" />
        </button>
        <div class="w-8 h-8 rounded-full bg-white/30 hover:bg-white/40 transition-colors cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
