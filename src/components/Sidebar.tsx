import { Component } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { AiOutlineHome } from "solid-icons/ai";
import { BiRegularMapPin } from "solid-icons/bi";
import { AiOutlineCamera } from "solid-icons/ai";
import { AiOutlineLock } from "solid-icons/ai";
import { AiOutlineCreditCard } from "solid-icons/ai";
import { AiOutlineRight } from "solid-icons/ai";
import outsideplantLogo from "../assets/outsideplant-long.png";
import opLogo from "../assets/outsideplant-short.png";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: Component<SidebarProps> = (props) => {
  const location = useLocation();

  // Helper function to check if current route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Navigation items configuration
  const navigationItems = [
    {
      path: "/dashboard",
      icon: AiOutlineHome,
      title: "Dashboard",
      subtitle: "overview and summary"
    },
    {
      path: "/field-operations-tracking",
      icon: BiRegularMapPin,
      title: "Field Operation Tracking",
      subtitle: "real-time technician tracking"
    },
    {
      path: "/photo-based-reporting",
      icon: AiOutlineCamera,
      title: "Photo-Based Reporting",
      subtitle: "auto photo checks & reports"
    },
    {
      path: "/smart-cluster-security",
      icon: AiOutlineLock,
      title: "Smart Cluster Security",
      subtitle: "face ID, gate control, alerts"
    },
    {
      path: "/integrated-payments",
      icon: AiOutlineCreditCard,
      title: "Integrated Payments",
      subtitle: "fast, unified payments"
    }
  ];

  return (
    <aside
      class={`${props.isOpen ? "w-64" : "w-16"} bg-white shadow-sm flex flex-col border-r border-gray-200 transition-all duration-500 ease-in-out`}
    >
      {/* Header */}
      <div
        class={`h-16 flex items-center justify-between ${
          props.isOpen ? "px-6" : "px-2"
        } text-xl font-bold text-gray-800 border-b border-gray-200 transition-all duration-500 ease-in-out`}
      >
        {props.isOpen ? (
          <>
            <img
              src={outsideplantLogo}
              alt="outsideplant"
              class="h-6 w-auto transition-all duration-500 ease-in-out"
            />
            <button
              onClick={props.onToggle}
              class="p-1 hover:bg-gray-100 rounded transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <AiOutlineRight class="w-5 h-5 text-gray-600 transition-transform duration-300 rotate-180" />
            </button>
          </>
        ) : (
          <button
            onClick={props.onToggle}
            class="p-3 hover:bg-gray-100 rounded transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <AiOutlineRight class="w-5 h-5 text-gray-600 transition-transform duration-500" />
          </button>
        )}
      </div>

      {/* Sidebar body */}
      <div class="flex-1 flex flex-col items-center relative">
        {/* Logo kecil muncul saat sidebar tertutup */}
        {!props.isOpen && (
          <div class="mt-5 transition-all duration-300 hover:scale-110">
            <img src={opLogo} alt="op" class="w-10 h-10 rounded-full" />
          </div>
        )}

        {/* Navigation */}
        <nav
          class={`flex-1 py-4 space-y-2 w-full ${
            props.isOpen ? "px-4" : "px-2"
          } transition-all duration-500 ease-in-out`}
        >
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            const isCurrentActive = isActive(item.path);
            
            return (
              <A
                href={item.path}
                class={`flex items-center gap-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
                  props.isOpen ? "px-3" : "px-2 justify-center"
                } ${
                  isCurrentActive 
                    ? "bg-purple-50 text-purple-700 border-l-4 border-purple-700 shadow-sm" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                title={!props.isOpen ? item.title : ""}
              >
                <IconComponent 
                  class={`${isCurrentActive ? "w-5 h-5" : "w-5 h-5"} flex-shrink-0 transition-all duration-300 ${
                    isCurrentActive ? "text-purple-700" : "text-gray-600"
                  }`} 
                />
                {props.isOpen && (
                  <div class="transition-all duration-500 ease-in-out">
                    <div class={`${isCurrentActive ? "font-semibold" : "font-semibold"} ${
                      isCurrentActive ? "text-purple-700" : "text-gray-800"
                    }`}>
                      {item.title}
                    </div>
                    <div class={`${isCurrentActive ? "text-xs" : "text-xs"} ${
                      isCurrentActive ? "text-purple-700" : "text-gray-500"
                    }`}>
                      {item.subtitle}
                    </div>
                  </div>
                )}
                
                {/* Active indicator dot when sidebar is closed */}
                {!props.isOpen && isCurrentActive && (
                  <div class="absolute right-1 w-2 h-2 bg-purple-700 rounded-full"></div>
                )}
              </A>
            );
          })}
        </nav>
      </div>

      {/* Footer user info */}
      {props.isOpen ? (
        <A
          href="/profile"
          class="bg-purple-700 text-white p-4 flex items-center gap-3 m-4 rounded-lg transition-all duration-500 ease-in-out transform translate-y-0 opacity-100 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
        >
          <div class="w-10 h-10 rounded-full bg-white/20 transition-all duration-300 hover:bg-white/30 flex items-center justify-center">
            <span class="text-white font-semibold text-sm">U</span>
          </div>
          <div class="transition-all duration-500 ease-in-out">
            <p class="text-sm font-semibold">Userrrrr</p>
            <p class="text-xs text-white/70">user123@gmail.com</p>
            <p class="text-xs text-white/70">User</p>
          </div>
        </A>
      ) : (
        <A
          href="/profile"
          class="p-4 flex justify-center transition-all duration-500 ease-in-out"
        >
          <div class="w-10 h-10 rounded-full bg-purple-700 transition-all duration-300 hover:scale-110 hover:shadow-md flex items-center justify-center cursor-pointer">
            <span class="text-white font-semibold text-sm">U</span>
          </div>
        </A>
      )}
    </aside>
  );
};

export default Sidebar;
