import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pricing from "../../Pricing/Pricing/Pricing";

import { 
  Brain, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Upload, 
  FileText, 
  BarChart3, 
  Stethoscope,
  Home,
  CreditCard,
  Phone,
  Info
} from "lucide-react";
import ShasthoAILogoWhite from "../ShasthoAILogo/ShasthoAILogoWhite";

// =============================================================================
// CONSTANTS AND CONFIGURATION
// =============================================================================

/**
 * Authentication state - Toggle this to test different states
 * Set to false to see logged out state, true for logged in state
 */
// const IS_AUTHENTICATED = true;
const IS_AUTHENTICATED = false;

/**
 * Mock user data for demonstration
 */
const MOCK_USER = {
  name: "John Doe",
  email: "john@example.com",
  role: "patient" // Change to "clinician" to test different views
};

// const MOCK_USER = {
//   name: "Dr. Sarah Smith",
//   email: "sarah@example.com",
//   role: "clinician" // 👈 Changed from "patient" to "clinician"
// };

/**
 * Navigation configurations for different user states
 */
const NAVIGATION_CONFIG = {
  unauthenticated: [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Pricing", href: "/pricing", icon: CreditCard },
    { name: "Contact", href: "/contact", icon: Phone },
  ],
  
  patient: [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Upload X-ray", href: "/upload", icon: Upload },
    { name: "My Reports", href: "/reports", icon: FileText },
    // { name: "AI Chat", href: "/chat", icon: Brain },
  ],
  
  clinician: [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Patient Reviews", href: "/reviews", icon: Stethoscope },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Reports", href: "/reports", icon: FileText },
  ],
};

/**
 * Profile actions configuration
 */
const PROFILE_ACTIONS = [
  { name: "Profile", href: "/profile", icon: User, color: "blue" },
  { name: "Settings", href: "/settings", icon: Settings, color: "gray" },
];

// =============================================================================
// CUSTOM HOOKS
// =============================================================================

/**
 * Custom hook for handling scroll effects
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {boolean} Whether the scroll threshold has been exceeded
 */
const useScrollEffect = (threshold = 10) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};

/**
 * Custom hook for handling click outside events
 * @param {React.RefObject} ref - Reference to the element to watch
 * @param {Function} handler - Handler function to call on outside click
 * @param {boolean} enabled - Whether the hook is enabled
 */
const useClickOutside = (ref, handler, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    // Use capture phase for better reliability
    document.addEventListener("mousedown", handleClickOutside, true);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [ref, handler, enabled]);
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const Navbar = () => {
  // ===========================================================================
  // STATE MANAGEMENT
  // ===========================================================================
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeHoverIndex, setActiveHoverIndex] = useState(null);
  
  // ===========================================================================
  // HOOKS AND ROUTING
  // ===========================================================================
  
  const location = useLocation();
  const navigate = useNavigate();
  const isScrolled = useScrollEffect(10);
  
  // ===========================================================================
  // REFS
  // ===========================================================================
  
  const profileDropdownRef = useRef(null);
  
  // ===========================================================================
  // MEMOIZED VALUES
  // ===========================================================================
  
  /**
   * Get current user based on authentication state
   */
  const user = useMemo(() => {
    return IS_AUTHENTICATED ? MOCK_USER : null;
  }, []);

  /**
   * Get navigation links based on user authentication and role
   */
  const navigationLinks = useMemo(() => {
    if (!IS_AUTHENTICATED) {
      return NAVIGATION_CONFIG.unauthenticated;
    }

    switch (user?.role) {
      case 'patient':
        return NAVIGATION_CONFIG.patient;
      case 'clinician':
        return NAVIGATION_CONFIG.clinician;
      default:
        return [{ name: "Dashboard", href: "/dashboard", icon: BarChart3 }];
    }
  }, [user?.role]);

  // ===========================================================================
  // EFFECTS
  // ===========================================================================
  
  /**
   * Close mobile menu and reset states when route changes
   */
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setActiveHoverIndex(null);
  }, [location.pathname]);

  /**
   * Setup click outside handler for profile dropdown
   */
  useClickOutside(
    profileDropdownRef,
    useCallback(() => {
      setIsProfileOpen(false);
    }, []),
    isProfileOpen
  );

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================
  
  /**
   * Handle user logout
   */
  const handleLogout = useCallback(() => {
    console.log("Logging out...");
    setIsProfileOpen(false);
    navigate("/");
  }, [navigate]);

  /**
   * Check if a path is currently active
   * @param {string} path - Path to check
   * @returns {boolean} Whether the path is active
   */
  const isActivePath = useCallback((path) => {
    return location.pathname === path;
  }, [location.pathname]);

  /**
   * Handle mobile item hover interactions
   * @param {number} index - Index of the hovered item
   */
  const handleMobileItemHover = useCallback((index) => {
    setActiveHoverIndex(index);
  }, []);

  const handleMobileItemLeave = useCallback(() => {
    setActiveHoverIndex(null);
  }, []);

  // ===========================================================================
  // STYLE GENERATORS
  // ===========================================================================
  
  /**
   * Generate mobile item styles based on state
   * @param {Object} link - Navigation link object
   * @param {number} index - Index of the link
   * @returns {string} CSS classes for the mobile item
   */
  const getMobileItemStyle = useCallback((link, index) => {
    const isActive = isActivePath(link.href);
    const isHovered = activeHoverIndex === index;

    const baseStyles = "flex items-center space-x-3 px-4 py-4 rounded-2xl text-base font-medium transition-all duration-300 transform border-2";
    
    if (isActive) {
      return `${baseStyles} bg-blue-100 text-blue-700 border-blue-300 shadow-md scale-105`;
    }
    
    if (isHovered) {
      return `${baseStyles} bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900 border-blue-200 shadow-lg scale-105`;
    }
    
    return `${baseStyles} text-gray-700 hover:text-gray-900 border-transparent`;
  }, [isActivePath, activeHoverIndex]);

  /**
   * Generate mobile icon styles based on state
   * @param {Object} link - Navigation link object
   * @param {number} index - Index of the link
   * @returns {string} CSS classes for the mobile icon
   */
  const getMobileIconStyle = useCallback((link, index) => {
    const isActive = isActivePath(link.href);
    const isHovered = activeHoverIndex === index;

    const baseStyles = "p-2 rounded-xl bg-white shadow-sm transition-all duration-300";
    
    if (isActive) {
      return `${baseStyles} text-blue-600 scale-110`;
    }
    
    if (isHovered) {
      return `${baseStyles} text-blue-500 scale-110`;
    }
    
    return `${baseStyles} text-gray-500`;
  }, [isActivePath, activeHoverIndex]);

  // ===========================================================================
  // RENDER FUNCTIONS
  // ===========================================================================
  
  /**
   * Render desktop navigation links
   * @returns {JSX.Element} Desktop navigation component
   */
  const renderDesktopNavigation = () => (
    <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
      {navigationLinks.map((link) => {
        const Icon = link.icon;
        const isActive = isActivePath(link.href);
        
        return (
          <Link
            key={link.name}
            to={link.href}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              isActive
                ? "bg-blue-100 text-blue-700 shadow-sm border-blue-200"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent hover:border-gray-200"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {Icon && <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />}
            <span className="whitespace-nowrap">{link.name}</span>
          </Link>
        );
      })}
    </div>
  );

  /**
   * Render desktop authentication section
   * @returns {JSX.Element} Desktop auth component
   */
  const renderDesktopAuth = () => (
    <div className="hidden lg:flex items-center space-x-3">
      {IS_AUTHENTICATED ? (
        <div className="relative profile-dropdown" ref={profileDropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
            aria-label="User menu"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <div 
              className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <span className="text-white text-xs font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-left hidden xl:block">
              <p className="text-sm font-medium text-gray-900 leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize leading-tight">{user?.role}</p>
            </div>
          </button>

          {isProfileOpen && (
            <div 
              className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in duration-200"
              role="menu"
              aria-orientation="vertical"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              {PROFILE_ACTIONS.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors border-l-2 border-transparent hover:border-blue-500"
                  onClick={() => setIsProfileOpen(false)}
                  role="menuitem"
                >
                  <action.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{action.name}</span>
                </Link>
              ))}

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-l-2 border-transparent hover:border-red-500"
                  role="menuitem"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Link 
            to="/login" 
            className="text-gray-600 hover:text-gray-900 font-medium py-2 px-3 rounded-lg transition-colors hover:bg-gray-50 border border-transparent hover:border-gray-200"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border-2 border-transparent hover:border-blue-500"
          >
            Get Started
          </Link>
        </div>
      )}
    </div>
  );

  /**
   * Render mobile navigation links
   * @returns {JSX.Element} Mobile navigation component
   */
  const renderMobileNavigation = () => (
    <div className="py-3 space-y-2 px-2">
      {navigationLinks.map((link, index) => {
        const Icon = link.icon;
        const isActive = isActivePath(link.href);
        
        return (
          <Link
            key={link.name}
            to={link.href}
            className={getMobileItemStyle(link, index)}
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={() => handleMobileItemHover(index)}
            onMouseLeave={handleMobileItemLeave}
            onTouchStart={() => handleMobileItemHover(index)}
            onTouchEnd={handleMobileItemLeave}
            aria-current={isActive ? "page" : undefined}
          >
            {Icon && (
              <div className={getMobileIconStyle(link, index)}>
                <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              </div>
            )}
            <span className="font-semibold tracking-wide">{link.name}</span>
            
            {(isActive || activeHoverIndex === index) && (
              <div 
                className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </div>
  );

  /**
   * Render mobile authentication section
   * @returns {JSX.Element} Mobile auth component
   */
  const renderMobileAuth = () => (
    <div className="border-t border-gray-200 pt-4 pb-5">
      {IS_AUTHENTICATED ? (
        <>
          <div className="flex items-center space-x-3 px-4 py-4 mx-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100 shadow-sm mb-3">
            <div 
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
              aria-hidden="true"
            >
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-600 capitalize truncate bg-white px-2 py-1 rounded-full inline-block mt-1">
                {user?.role}
              </p>
            </div>
          </div>

          <div className="space-y-2 px-2">
            {PROFILE_ACTIONS.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-3 px-4 py-3 mx-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-gray-200 hover:shadow-sm"
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={() => handleMobileItemHover(navigationLinks.length + index)}
                onMouseLeave={handleMobileItemLeave}
              >
                <div className={`p-2 rounded-lg bg-${item.color}-50`}>
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 mx-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-red-200 hover:shadow-sm text-left"
              onMouseEnter={() => handleMobileItemHover(navigationLinks.length + 2)}
              onMouseLeave={handleMobileItemLeave}
            >
              <div className="p-2 rounded-lg bg-red-50">
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </>
      ) : (
        <div className="px-3 space-y-3">
          <Link
            to="/login"
            className="block w-full text-center px-4 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-xl border-2 border-gray-200 transition-all duration-200 hover:border-blue-300 hover:shadow-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="font-semibold">Login to Your Account</span>
          </Link>
          <Link
            to="/register"
            className="block w-full text-center px-4 py-4 text-base font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-blue-400 transform hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="font-bold">Get Started Free</span>
          </Link>
        </div>
      )}
    </div>
  );

  // ===========================================================================
  // MAIN RENDER
  // ===========================================================================
  
  return (
    <nav 
      className={`bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-xl' : 'shadow-md'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <ShasthoAILogoWhite />

          {/* Desktop Navigation */}
          {renderDesktopNavigation()}

          {/* Desktop Auth Section */}
          {renderDesktopAuth()}

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {IS_AUTHENTICATED && (
              <div className="md:hidden flex items-center">
                <div 
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2 shadow-sm"
                  aria-hidden="true"
                >
                  <span className="text-white text-xs font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden border-t border-gray-200 bg-white animate-in slide-in-from-top duration-300"
            role="menu"
          >
            {renderMobileNavigation()}
            {renderMobileAuth()}

            {/* Footer Note */}
            <div className="border-t border-gray-100 pt-3 pb-2 px-4">
              <p className="text-xs text-gray-500 text-center">
                ShasthoAI - Medical Intelligence Platform
              </p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;