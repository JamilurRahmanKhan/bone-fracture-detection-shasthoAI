import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

/**
 * StoreHeader Component
 *
 * Responsive header for the medical store with cart functionality
 *
 * Features:
 * - Store branding with logo
 * - Navigation to dashboard
 * - Cart counter with badge
 * - Sticky positioning
 * - Responsive design for all screen sizes
 *
 * @param {Object} props - Component props
 * @param {number} props.cartItemsCount - Number of items in cart
 *
 * @returns {JSX.Element} Store header component
 */
const StoreHeader = ({ cartItemsCount = 0 }) => {
  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              ShasthoAI Store
            </span>
            <div className="text-xs font-semibold text-emerald-600 tracking-wide">
              MEDICAL STORE
            </div>
          </div>
        </Link>

        {/* Navigation and Cart */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            to="/dashboard"
            className="text-slate-600 hover:text-slate-900 text-sm sm:text-base font-medium py-2 px-3 rounded-lg transition-colors hover:bg-gray-50"
          >
            Dashboard
          </Link>
          <button className="relative flex items-center space-x-2 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 bg-transparent text-sm sm:text-base font-medium py-2 px-3 rounded-lg transition-colors text-slate-900">
            <ShoppingCart className="w-4 h-4 text-slate-900" />
            <span className="text-slate-900">Cart ({cartItemsCount})</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
