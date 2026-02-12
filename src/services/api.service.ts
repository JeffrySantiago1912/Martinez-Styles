import axios from 'axios';
import type { APIProduct, Product } from '../shared/types';

const API_BASE_URL = 'https://fakestoreapi.com';

// Transform API product to internal product model
const transformProduct = (apiProduct: APIProduct): Product => ({
    id: apiProduct.id.toString(),
    name: apiProduct.title,
    price: apiProduct.price,
    category: apiProduct.category,
    image: apiProduct.image,
    description: apiProduct.description,
    // Extract color from description or assign based on category
    color: extractColor(apiProduct.description),
    // Assign style based on category
    style: mapCategoryToStyle(apiProduct.category),
});

// Helper to extract color hints from description
const extractColor = (description: string): string => {
    const colorKeywords = ['black', 'white', 'blue', 'red', 'green', 'yellow', 'gray', 'brown'];
    const lowerDesc = description.toLowerCase();

    for (const color of colorKeywords) {
        if (lowerDesc.includes(color)) {
            return color;
        }
    }

    return 'neutral';
};

// Map category to style
const mapCategoryToStyle = (category: string): string => {
    const styleMap: Record<string, string> = {
        "men's clothing": 'casual',
        "women's clothing": 'elegant',
        'jewelery': 'luxury',
        'electronics': 'modern',
    };

    return styleMap[category] || 'casual';
};

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<APIProduct[]>(`${API_BASE_URL}/products`);
        return response.data.map(transformProduct);
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products. Please try again later.');
    }
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        const response = await axios.get<APIProduct[]>(
            `${API_BASE_URL}/products/category/${category}`
        );
        return response.data.map(transformProduct);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Failed to fetch products. Please try again later.');
    }
};

// Fetch all categories
export const fetchCategories = async (): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>(`${API_BASE_URL}/products/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories.');
    }
};
