import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, OutfitItem, Outfit, CartItem, FilterState, UIState } from '../shared/types';

interface StoreState {
    // Products
    products: Product[];
    setProducts: (products: Product[]) => void;

    // Filters
    filters: FilterState;
    setFilters: (filters: Partial<FilterState>) => void;
    resetFilters: () => void;

    // Current Outfit Builder
    currentOutfit: OutfitItem[];
    addToOutfit: (product: Product, position: { x: number; y: number }) => void;
    removeFromOutfit: (itemId: string) => void;
    updateItemPosition: (itemId: string, position: { x: number; y: number }) => void;
    clearCurrentOutfit: () => void;

    // Saved Outfits
    savedOutfits: Outfit[];
    saveOutfit: (name: string) => void;
    deleteOutfit: (outfitId: string) => void;
    loadOutfit: (outfitId: string) => void;

    // Cart
    cart: CartItem[];
    addToCart: (item: Product | Outfit, type: 'product' | 'outfit') => void;
    removeFromCart: (itemId: string) => void;
    updateCartQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;

    // UI State
    ui: UIState;
    setUIState: (state: Partial<UIState>) => void;
}

const defaultFilters: FilterState = {
    category: '',
    colors: [],
    priceRange: [0, 1000],
    styles: [],
    searchQuery: '',
};

const defaultUIState: UIState = {
    isCartOpen: false,
    isSaveModalOpen: false,
    isLoading: false,
    error: null,
};

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            // Products
            products: [],
            setProducts: (products) => set({ products }),

            // Filters
            filters: defaultFilters,
            setFilters: (newFilters) =>
                set((state) => ({
                    filters: { ...state.filters, ...newFilters }
                })),
            resetFilters: () => set({ filters: defaultFilters }),

            // Current Outfit
            currentOutfit: [],
            addToOutfit: (product, position) => {
                const newItem: OutfitItem = {
                    id: `${product.id}-${crypto.randomUUID()}`,
                    product,
                    position,
                    zIndex: get().currentOutfit.length,
                };
                set((state) => ({
                    currentOutfit: [...state.currentOutfit, newItem]
                }));
            },
            removeFromOutfit: (itemId) =>
                set((state) => ({
                    currentOutfit: state.currentOutfit.filter((item) => item.id !== itemId),
                })),
            updateItemPosition: (itemId, position) =>
                set((state) => ({
                    currentOutfit: state.currentOutfit.map((item) =>
                        item.id === itemId ? { ...item, position } : item
                    ),
                })),
            clearCurrentOutfit: () => set({ currentOutfit: [] }),

            // Saved Outfits
            savedOutfits: [],
            saveOutfit: (name) => {
                const { currentOutfit } = get();
                if (currentOutfit.length === 0) return;

                const totalPrice = currentOutfit.reduce(
                    (sum, item) => sum + item.product.price,
                    0
                );

                const newOutfit: Outfit = {
                    id: `outfit-${Date.now()}`,
                    name,
                    items: currentOutfit,
                    totalPrice,
                    createdAt: new Date(),
                };

                set((state) => ({
                    savedOutfits: [...state.savedOutfits, newOutfit],
                }));
            },
            deleteOutfit: (outfitId) =>
                set((state) => ({
                    savedOutfits: state.savedOutfits.filter((outfit) => outfit.id !== outfitId),
                })),
            loadOutfit: (outfitId) => {
                const outfit = get().savedOutfits.find((o) => o.id === outfitId);
                if (outfit) {
                    set({ currentOutfit: outfit.items });
                }
            },

            // Cart
            cart: [],
            addToCart: (data, type) => {
                const newCartItem: CartItem = {
                    id: `cart-${Date.now()}`,
                    type,
                    data,
                    quantity: 1,
                };
                set((state) => ({ cart: [...state.cart, newCartItem] }));
            },
            removeFromCart: (itemId) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== itemId),
                })),
            updateCartQuantity: (itemId, quantity) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === itemId ? { ...item, quantity } : item
                    ),
                })),
            clearCart: () => set({ cart: [] }),

            // UI State
            ui: defaultUIState,
            setUIState: (newState) =>
                set((state) => ({
                    ui: { ...state.ui, ...newState },
                })),
        }),
        {
            name: 'martinez-styles-storage',
            partialize: (state) => ({
                savedOutfits: state.savedOutfits,
                cart: state.cart,
            }),
        }
    )
);
