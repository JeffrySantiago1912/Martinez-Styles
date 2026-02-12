// Core Product Type
export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
    color?: string;
    style?: string;
}

// Outfit Builder Types
export interface OutfitItem {
    id: string;
    product: Product;
    position: { x: number; y: number };
    zIndex: number;
}

export interface Outfit {
    id: string;
    name: string;
    items: OutfitItem[];
    totalPrice: number;
    createdAt: Date;
    thumbnail?: string;
}

// Cart Types
export type CartItemType = 'product' | 'outfit';

export interface CartItem {
    id: string;
    type: CartItemType;
    data: Product | Outfit;
    quantity: number;
}

// Filter Types
export interface FilterState {
    category: string;
    colors: string[];
    priceRange: [number, number];
    styles: string[];
    searchQuery: string;
}

// API Response Types
export interface APIProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

// UI State Types
export interface UIState {
    isCartOpen: boolean;
    isSaveModalOpen: boolean;
    isLoading: boolean;
    error: string | null;
}
