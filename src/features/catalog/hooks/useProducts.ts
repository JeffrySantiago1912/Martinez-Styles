import { useState, useEffect } from 'react';
import { fetchProducts } from '../../../services/api.service';
import type { Product } from '../../../shared/types';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                const data = await fetchProducts();
                // Filter out electronics to focus on fashion
                const fashionItems = data.filter(item => item.category !== 'electronics');
                setProducts(fashionItems);
                setFilteredProducts(fashionItems);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load products');
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    const filterProducts = (filters: {
        category?: string;
        colors?: string[];
        priceRange?: [number, number];
        searchQuery?: string;
    }) => {
        let filtered = [...products];

        if (filters.category) {
            filtered = filtered.filter((p) => p.category === filters.category);
        }

        if (filters.colors && filters.colors.length > 0) {
            filtered = filtered.filter((p) =>
                p.color && filters.colors!.includes(p.color)
            );
        }

        if (filters.priceRange) {
            const [min, max] = filters.priceRange;
            filtered = filtered.filter((p) => p.price >= min && p.price <= max);
        }

        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(query) ||
                p.description?.toLowerCase().includes(query)
            );
        }

        setFilteredProducts(filtered);
    };

    return {
        products,
        filteredProducts,
        isLoading,
        error,
        filterProducts,
    };
};
