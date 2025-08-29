import { Component, JSX, createSignal } from "solid-js";
import { useLocation } from "@solidjs/router";
import { BiRegularUser } from "solid-icons/bi";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

interface AppProps {
  children: JSX.Element;
}

const App: Component<AppProps> = (props) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = createSignal(true);

  const HeaderRoutes = [
    "/profile",
    "/dashboard",
    "/field-operations-tracking",
    "/photo-based-reporting",
    "/integrated-payments",
    "/smart-cluster-security",
    "/edit-profile", 
    "/change-password",
  ];

  const SidebarRoutes = [
    "/dashboard",
    "/field-operations-tracking",
    "/photo-based-reporting",
    "/integrated-payments",
    "/smart-cluster-security",
    "/profile",
    "/edit-profile",
    "/change-password",
  ];

  const getPageConfig = () => {
    switch (location.pathname) {
      case "/profile":
        return {
          title: "Profile",
          icon: BiRegularUser,
          showSearch: true,
          showDateTime: true,
          showBackButton: false
        };
      case "/photo-reports":
        return {
          title: "Photo-Based Reporting",
          icon: BiRegularUser,
          showSearch: true,
          showDateTime: true,
          showBackButton: false
        };
      case "/edit-profile":
        return {
          title: "Edit Profile", 
          icon: BiRegularUser,
          showSearch: false,
          showDateTime: true,
          showBackButton: true,
          onBackClick: () => {
            // Handle navigation back to profile
            window.history.back();
          }
        };
      case "/change-password":
        return {
          title: "Change Password",
          icon: BiRegularUser,
          showSearch: false, 
          showDateTime: true,
          showBackButton: true,
          onBackClick: () => {
            // Handle navigation back to profile
            window.history.back();
          }
        };
      default:
        return {
          title: "App",
          icon: BiRegularUser,
          showSearch: false,
          showDateTime: false,
          showBackButton: false
        };
    }
  };

  const showHeader = () => HeaderRoutes.includes(location.pathname);
  const showSidebar = () => SidebarRoutes.includes(location.pathname);
  const pageConfig = getPageConfig();

  // Render layout for pages with sidebar and header
  if (showSidebar() && showHeader()) {
    return (
      <div class="flex h-screen bg-gray-50 font-sans">
        <Sidebar isOpen={isOpen()} onToggle={() => setIsOpen(!isOpen())} />
        
        <main class="flex-1 flex flex-col">
          <Header 
            title={pageConfig.title}
            showSearch={pageConfig.showSearch}
            showDateTime={pageConfig.showDateTime}
          />
          {props.children}
        </main>
      </div>
    );
  }

  // Render layout for pages with only header
  if (showHeader()) {
    return (
      <div class="min-h-screen bg-gray-50 flex flex-col">
        <Header 
          title={pageConfig.title}
          showSearch={pageConfig.showSearch}
          showDateTime={pageConfig.showDateTime}
        />
        <main class="flex-grow">{props.children}</main>
      </div>
    );
  }

  // Default layout for other pages
  return (
    <div class="min-h-screen bg-gradient-to-br from-rose-100 to-white flex flex-col">
      <main class="flex-grow">{props.children}</main>
    </div>
  );
};

export default App;