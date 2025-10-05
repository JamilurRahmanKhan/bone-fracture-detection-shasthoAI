import React, { useState } from "react";
import { Search, ShoppingCart, Sparkles } from "lucide-react";

// =============================================================================
// COMPONENT IMPORTS
// =============================================================================

// Layout and UI Components
import StoreHeader from "../StoreHeader/StoreHeader";           // Store header with logo and cart
import StoreHero from "../StoreHero/StoreHero";                 // Hero section with store branding
import LoadingSpinner from "../../Dashboard/LoadingSpinner/LoadingSpinner"; // Loading animation

// Product Browsing Components
import SearchFilters from "../ProductGrid/SearchFilters/SearchFilters"; // Search and filter controls
import ProductCard from "../ProductGrid/ProductCard/ProductCard";       // Individual product display

// Shopping Cart Components
import CartItem from "../ShoppingCart/CartItem/CartItem";               // Single cart item with controls
import OrderSummary from "../ShoppingCart/OrderSummary/OrderSummary";   // Cart total and checkout

// Navigation Components
import TabNavigation from "../TabNavigation/TabNavigation";             // Products vs Cart tabs

// Data Management
import { useStore } from "../hooks/useStore";                          // Custom hook for store state

// =============================================================================
// MAIN STORE COMPONENT
// =============================================================================

/**
 * Store Page Component
 * 
 * Main medical store interface providing comprehensive product browsing and 
 * shopping cart functionality. Features a dual-tab interface for seamless 
 * switching between product discovery and cart management.
 * 
 * 🏪 KEY FEATURES:
 * - Advanced product search and filtering system
 * - Real-time shopping cart with persistent storage
 * - Responsive grid layout for optimal viewing on all devices
 * - Professional healthcare-focused UI/UX design
 * - Empty state handling for both products and cart
 * - Smooth tab-based navigation between browsing and cart
 * 
 * 🎯 USER FLOW:
 * 1. Users land on Products tab with search/filter capabilities
 * 2. Browse medications using search, category filters, and sorting
 * 3. Add items to cart which persists across sessions
 * 4. Switch to Cart tab to review, modify, and checkout
 * 5. Return to Products tab to continue shopping
 * 
 * 📱 RESPONSIVE BEHAVIOR:
 * - Mobile: Stacked layout, full-width components
 * - Tablet: 2-column product grid, optimized filters
 * - Desktop: 3-column product grid, side-by-side cart layout
 * 
 * @component
 * @example
 * <Store />
 * 
 * @returns {JSX.Element} Fully rendered medical store interface
 */
const Store = () => {
  // ===========================================================================
  // STATE MANAGEMENT & DATA HOOKS
  // ===========================================================================
  
  /**
   * Custom hook providing complete store state management
   * Manages products, cart, filters, and all store operations
   */
  const {
    // Product Data & Filtering
    medications,              // Array of filtered medication products
    searchTerm,               // Current search query string
    setSearchTerm,            // Update search term function
    selectedCategory,         // Currently selected category filter
    setSelectedCategory,      // Update category filter function
    sortBy,                   // Current sorting criteria
    setSortBy,                // Update sorting criteria function
    
    // Shopping Cart
    cart,                     // Array of items in shopping cart
    addToCart,                // Function to add product to cart
    updateQuantity,           // Function to update cart item quantity
    
    // UI State & Data
    isLoading,                // Loading state for initial data fetch
    categories,               // Available product categories for filtering
    
    // Utility Functions
    getTotalPrice,            // Calculate total cart price
    getTotalItems,            // Calculate total items in cart
  } = useStore();

  /**
   * Active tab state management
   * Controls which main view is displayed: Products or Shopping Cart
   * @state {string} activeTab - Current active tab ('products' | 'cart')
   */
  const [activeTab, setActiveTab] = useState("products");

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================

  /**
   * Reset all search and filter criteria to default values
   * Clears search term, resets category to 'all', and sets default sorting
   * 
   * @handler
   * @usage Called when user clicks "Clear Filters" in empty state
   */
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("name");
  };

  /**
   * Navigate user from Cart tab back to Products tab
   * Provides seamless continuation of shopping experience
   * 
   * @handler
   * @usage Called when user clicks "Browse Products" in empty cart state
   */
  const handleContinueShopping = () => {
    setActiveTab("products");
  };

  // ===========================================================================
  // LOADING STATE
  // ===========================================================================

  /**
   * Display loading spinner while store data is being initialized
   * Prevents rendering incomplete UI during data fetch
   */
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ===========================================================================
  // MAIN COMPONENT RENDER
  // ===========================================================================

  return (
    /**
     * Main container with gradient background for visual appeal
     * Uses healthcare-appropriate colors (blue/indigo) for brand consistency
     */
    <div className="min-h-screen bg-[#FCFDFF] from-slate-50 via-blue-50/30 to-indigo-50/20">
      
      {/* Store Header */}
      <StoreHeader cartItemsCount={getTotalItems()} />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
        
        {/* Hero Section */}
        <StoreHero />

        {/* Main Content Area - Tabs & Content */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* Tab Navigation Component */}
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cartItemsCount={getTotalItems()}
          />

          {/* Products Tab Content */}
          {activeTab === "products" && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Search and Filters Component */}
              <SearchFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={categories}
              />

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {medications.map((medication) => (
                  <ProductCard
                    key={medication.id}
                    medication={medication}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>

              {/* Empty Products State */}
              {medications.length === 0 && (
                <div className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 text-center">
                  {/* Empty state icon */}
                  <Search className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4 sm:mb-6" />
                  
                  {/* Empty state heading */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                    No products found
                  </h3>
                  
                  {/* Helpful guidance text */}
                  <p className="text-slate-600 text-base sm:text-lg mb-6 sm:mb-8">
                    Try adjusting your search or filter criteria
                  </p>
                  
                  {/* Clear filters action button */}
                  <button
                    onClick={handleClearFilters}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center mx-auto"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cart Tab Content */}
          {activeTab === "cart" && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Empty Cart State */}
              {cart.length === 0 ? (
                <div className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-12 text-center">
                  {/* Empty cart icon */}
                  <ShoppingCart className="w-16 h-16 sm:w-20 sm:h-20 text-slate-400 mx-auto mb-6 sm:mb-8" />
                  
                  {/* Empty cart heading */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
                    Your cart is empty
                  </h3>
                  
                  {/* Encouraging text */}
                  <p className="text-slate-600 mb-6 sm:mb-8 text-lg sm:text-xl">
                    Add some medications to get started
                  </p>
                  
                  {/* Continue shopping action button */}
                  <button
                    onClick={handleContinueShopping}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center mx-auto text-base sm:text-lg"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Browse Products
                  </button>
                </div>
              ) : (
                /* Cart With Items */
                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                  
                  {/* Cart Items List - 2/3 width on desktop */}
                  <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                      />
                    ))}
                  </div>

                  {/* Order Summary - 1/3 width on desktop, full on mobile */}
                  <OrderSummary
                    totalPrice={getTotalPrice()}
                    totalItems={getTotalItems()}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;