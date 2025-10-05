import React from 'react';

/**
 * TabNavigation Component
 * 
 * Responsive tab navigation for switching between Products and Cart views
 * 
 * Features:
 * - Clear visual indicators for active tab
 * - Cart badge with item count
 * - Smooth transitions and hover effects
 * - Fully responsive design
 * 
 * @param {Object} props - Component props
 * @param {string} props.activeTab - Currently active tab ('products' or 'cart')
 * @param {Function} props.setActiveTab - Function to set active tab
 * @param {number} props.cartItemsCount - Number of items in cart for badge
 * 
 * @returns {JSX.Element} Tab navigation component
 */
const TabNavigation = ({ activeTab, setActiveTab, cartItemsCount = 0 }) => {
  return (
    <div className="w-full bg-white/60 backdrop-blur-sm border border-slate-200/60 shadow-lg rounded-2xl p-3 sm:p-4">
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {/* Products Tab */}
        <button
          onClick={() => setActiveTab("products")}
          className={`
            relative rounded-xl font-semibold text-sm sm:text-base py-3 sm:py-4 transition-all duration-300
            flex items-center justify-center group border-2 mx-1
            ${
              activeTab === "products"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105 border-blue-500"
                : "text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300"
            }
          `}
          aria-pressed={activeTab === "products"}
          aria-label="Browse Products"
        >
          {/* Active Tab Indicator */}
          {activeTab === "products" && (
            <div 
              className="absolute top-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          )}

          {/* Tab Content */}
          <div className="flex items-center space-x-2 sm:space-x-3 px-2">
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                activeTab === "products"
                  ? "text-white"
                  : "text-slate-500 group-hover:text-slate-700"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="font-medium">Browse Products</span>
          </div>
        </button>

        {/* Cart Tab */}
        <button
          onClick={() => setActiveTab("cart")}
          className={`
            relative rounded-xl font-semibold text-sm sm:text-base py-3 sm:py-4 transition-all duration-300
            flex items-center justify-center group border-2 mx-1
            ${
              activeTab === "cart"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transform scale-105 border-emerald-500"
                : "text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300"
            }
          `}
          aria-pressed={activeTab === "cart"}
          aria-label={`Shopping Cart ${cartItemsCount > 0 ? `with ${cartItemsCount} items` : ''}`}
        >
          {/* Active Tab Indicator */}
          {activeTab === "cart" && (
            <div 
              className="absolute top-1 right-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          )}

          {/* Cart Badge */}
          {cartItemsCount > 0 && (
            <span
              className={`
                absolute top-1 right-1 px-1.5 min-w-[1.5rem] h-5 rounded-full flex items-center justify-center border border-white text-xs font-bold shadow-sm z-10
                ${
                  activeTab === "cart"
                    ? "bg-white text-emerald-700"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                }
              `}
              aria-label={`${cartItemsCount} items in cart`}
            >
              {cartItemsCount}
            </span>
          )}

          {/* Tab Content */}
          <div className="flex items-center space-x-2 sm:space-x-3 px-2">
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                activeTab === "cart"
                  ? "text-white"
                  : "text-slate-500 group-hover:text-slate-700"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="font-medium">Shopping Cart</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;