import { useState, useEffect } from 'react';

/**
 * Custom hook for managing store state and operations
 * 
 * Features:
 * - Cart management with localStorage persistence
 * - Product filtering and sorting
 * - Search functionality
 * - Category management
 * 
 * @returns {Object} Store state and methods
 */
export const useStore = () => {
  const [medications, setMedications] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isLoading, setIsLoading] = useState(true);

  // Static medication data
  const sampleMedications = [
    {
      id: "1",
      name: "Ibuprofen 400mg",
      description: "Anti-inflammatory pain reliever for bone and joint pain",
      price: 12.99,
      originalPrice: 15.99,
      category: "pain-relief",
      rating: 4.5,
      reviews: 128,
      inStock: true,
      image: "/placeholder.svg?height=200&width=200",
      prescription: false,
      dosage: "400mg tablets",
      manufacturer: "PharmaCorp",
    },
    {
      id: "2",
      name: "Acetaminophen 500mg",
      description: "Effective pain relief and fever reducer",
      price: 8.99,
      category: "pain-relief",
      rating: 4.3,
      reviews: 95,
      inStock: true,
      image: "/placeholder.svg?height=200&width=200",
      prescription: false,
      dosage: "500mg tablets",
      manufacturer: "MediCare",
    },
    {
      id: "3",
      name: "Calcium Carbonate 600mg",
      description: "Essential calcium supplement for bone health",
      price: 16.99,
      category: "supplements",
      rating: 4.7,
      reviews: 203,
      inStock: true,
      image: "/placeholder.svg?height=200&width=200",
      prescription: false,
      dosage: "600mg tablets",
      manufacturer: "HealthPlus",
    },
    {
      id: "4",
      name: "Diclofenac Gel 1%",
      description: "Topical anti-inflammatory gel for localized pain",
      price: 22.99,
      category: "topical",
      rating: 4.4,
      reviews: 67,
      inStock: true,
      image: "/placeholder.svg?height=200&width=200",
      prescription: true,
      dosage: "50g tube",
      manufacturer: "TopicalMed",
    },
    {
      id: "5",
      name: "Vitamin D3 2000 IU",
      description: "Supports bone health and calcium absorption",
      price: 14.99,
      category: "supplements",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      image: "/placeholder.svg?height=200&width=200",
      prescription: false,
      dosage: "2000 IU softgels",
      manufacturer: "VitaHealth",
    },
    {
      id: "6",
      name: "Tramadol 50mg",
      description: "Prescription pain medication for moderate to severe pain",
      price: 45.99,
      category: "prescription",
      rating: 4.2,
      reviews: 89,
      inStock: true,
      image: "/placeholder.svg?height=200&width=200",
      prescription: true,
      dosage: "50mg tablets",
      manufacturer: "PharmaRx",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "pain-relief", label: "Pain Relief" },
    { value: "supplements", label: "Supplements" },
    { value: "topical", label: "Topical" },
    { value: "prescription", label: "Prescription" },
  ];

  // Initialize store data
  useEffect(() => {
    const savedCart = localStorage.getItem("shastho_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setMedications(sampleMedications);
    setIsLoading(false);
  }, []);

  // Filter and sort medications
  const filteredMedications = medications
    .filter((med) => {
      const matchesSearch =
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || med.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Cart operations
  const addToCart = (medication) => {
    const existingItem = cart.find((item) => item.id === medication.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map((item) => 
        item.id === medication.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...medication, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem("shastho_cart", JSON.stringify(newCart));
  };

  const updateQuantity = (id, change) => {
    const newCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean);

    setCart(newCart);
    localStorage.setItem("shastho_cart", JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    medications: filteredMedications,
    cart,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    isLoading,
    categories,
    addToCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  };
};