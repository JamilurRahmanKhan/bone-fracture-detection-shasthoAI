import { Brain } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ShasthoAILogoWhitePrivate from "../../shared/ShasthoAILogo/ShasthoAILogoWhitePrivate";
import { Link, useNavigate } from 'react-router-dom';

/**
 * DashboardHeader Component
 *
 * A responsive header component with mobile toggle menu for authenticated users
 *
 * @component
 * @example
 * <DashboardHeader />
 */

export default function DashboardHeader() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "patient"
  });
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHoverIndex, setActiveHoverIndex] = useState(null);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const profileToggleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside profile menu AND profile toggle button
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        profileToggleRef.current &&
        !profileToggleRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
      
      // Check if click is outside mobile menu AND mobile toggle button
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileToggleRef.current &&
        !mobileToggleRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // localStorage.removeItem("shastho_user");
    // navigate("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileItemHover = (index) => {
    setActiveHoverIndex(index);
  };

  const handleMobileItemLeave = () => {
    setActiveHoverIndex(null);
  };

  const getMobileItemStyle = (index) => {
    const isHovered = activeHoverIndex === index;

    const baseStyles =
      "flex items-center space-x-3 w-full px-3 py-3 rounded-lg transition-all duration-300 transform border-2 text-left";

    if (isHovered) {
      return `${baseStyles} bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900 border-blue-200 shadow-lg`;
    }

    return `${baseStyles} text-gray-700 hover:text-gray-900 border-transparent hover:border-gray-200`;
  };

  const Button = ({
    children,
    variant = "default",
    className = "",
    ...props
  }) => {
    const baseClasses =
      "px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200 flex items-center text-sm sm:text-base";

    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
      outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  const Avatar = ({ children, className = "" }) => (
    <div
      className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );

  if (!user) {
    return (
      <header className="bg-white backdrop-blur-2xl border-b border-slate-200/50 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div
            className="flex items-center space-x-3 sm:space-x-4 cursor-pointer"
            onClick={() => console.log("Navigate to /")}
          >
            <ShasthoAILogoWhitePrivate />
          </div>
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => console.log("Navigate to /login")}>
              Login
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white/90 backdrop-blur-2xl border-b border-slate-200/50 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-5 lg:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="flex items-center space-x-3 sm:space-x-4 cursor-pointer"
          onClick={() => console.log("Navigate to /")}
        >
          <ShasthoAILogoWhitePrivate />
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden sm:flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
          {/* Medical Store Button */}
          <Button variant="ghost" onClick={() => navigate("/store")}>
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="hidden lg:inline">Medical Store</span>
            <span className="lg:hidden">Store</span>
          </Button>

          {/* AI Chat Button */}
          <Button variant="ghost" onClick={() => navigate("/chat")}>
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="hidden lg:inline">AI Chat</span>
            <span className="lg:hidden">Chat</span>
          </Button>

          {/* Profile Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              ref={profileToggleRef}
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
              aria-label="User profile menu"
              aria-expanded={isProfileMenuOpen}
            >
              <Avatar>
                <span className="text-white text-xs sm:text-sm font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </Avatar>

              <div className="hidden lg:block text-left min-w-0 max-w-32">
                <p className="text-sm font-medium text-gray-900 leading-tight truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 leading-tight truncate capitalize">
                  {user?.role || "Patient"}
                </p>
              </div>

              <svg
                className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                  isProfileMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in duration-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    console.log("Navigate to /profile");
                    setIsProfileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-l-2 border-transparent hover:border-blue-500"
                >
                  <svg
                    className="h-4 w-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Profile Settings</span>
                </button>

                <button
                  onClick={() => {
                    console.log("Navigate to /settings");
                    setIsProfileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-l-2 border-transparent hover:border-blue-500"
                >
                  <svg
                    className="h-4 w-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Account Settings</span>
                </button>

                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-l-2 border-transparent hover:border-red-500"
                  >
                    <svg
                      className="h-4 w-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button - Only show on mobile */}
        <div className="flex sm:hidden items-center space-x-2">
          {/* Mobile Profile Icon */}
          <button
            ref={profileToggleRef}
            onClick={toggleProfileMenu}
            className="p-1.5 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="User profile"
          >
            <Avatar>
              <span className="text-white text-xs font-semibold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </Avatar>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={mobileToggleRef}
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slides down when toggled */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="sm:hidden border-t border-gray-200 bg-white animate-in slide-in-from-top duration-300"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Medical Store in Mobile Menu */}
            <button
              onClick={() => navigate("/store")}
              className={getMobileItemStyle(0)}
              onMouseEnter={() => handleMobileItemHover(0)}
              onMouseLeave={handleMobileItemLeave}
              onTouchStart={() => handleMobileItemHover(0)}
              onTouchEnd={handleMobileItemLeave}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-medium">Medical Store</span>
            </button>

            {/* AI Chat in Mobile Menu */}
            <button
              onClick={() => navigate("/chat")}
              className={getMobileItemStyle(1)}
              onMouseEnter={() => handleMobileItemHover(1)}
              onMouseLeave={handleMobileItemLeave}
              onTouchStart={() => handleMobileItemHover(1)}
              onTouchEnd={handleMobileItemLeave}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="font-medium">AI Chat</span>
            </button>

            {/* Profile in Mobile Menu */}
            <button
              onClick={() => {
                console.log("Navigate to /profile");
                closeMobileMenu();
              }}
              className={getMobileItemStyle(2)}
              onMouseEnter={() => handleMobileItemHover(2)}
              onMouseLeave={handleMobileItemLeave}
              onTouchStart={() => handleMobileItemHover(2)}
              onTouchEnd={handleMobileItemLeave}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="font-medium">Profile Settings</span>
            </button>

            {/* Settings in Mobile Menu */}
            <button
              onClick={() => {
                console.log("Navigate to /settings");
                closeMobileMenu();
              }}
              className={getMobileItemStyle(3)}
              onMouseEnter={() => handleMobileItemHover(3)}
              onMouseLeave={handleMobileItemLeave}
              onTouchStart={() => handleMobileItemHover(3)}
              onTouchEnd={handleMobileItemLeave}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-medium">Account Settings</span>
            </button>

            {/* Logout in Mobile Menu */}
            <button
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
              className={getMobileItemStyle(4)}
              onMouseEnter={() => handleMobileItemHover(4)}
              onMouseLeave={handleMobileItemLeave}
              onTouchStart={() => handleMobileItemHover(4)}
              onTouchEnd={handleMobileItemLeave}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="font-medium">Logout</span>
            </button>
          </div>

          {/* User Info in Mobile Menu */}
          <div className="border-t border-gray-200 px-3 py-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Profile Dropdown */}
      {isProfileMenuOpen && (
        <div
          ref={profileMenuRef}
          className="sm:hidden absolute right-2 top-14 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in duration-200"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>

          <button
            onClick={() => {
              console.log("Navigate to /profile");
              setIsProfileMenuOpen(false);
            }}
            className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
          >
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Profile</span>
          </button>

          <button
            onClick={() => {
              console.log("Navigate to /settings");
              setIsProfileMenuOpen(false);
            }}
            className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
          >
            <svg
              className="h-4 w-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Settings</span>
          </button>

          <div className="border-t border-gray-100 mt-1 pt-1">
            <button
              onClick={() => {
                handleLogout();
                setIsProfileMenuOpen(false);
              }}
              className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg
                className="h-4 w-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}