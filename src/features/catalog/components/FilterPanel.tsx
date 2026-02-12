import { useState } from 'react';
import { motion } from 'framer-motion';

interface FilterPanelProps {
    onFilterChange: (filters: {
        category?: string;
        colors?: string[];
        priceRange?: [number, number];
        searchQuery?: string;
    }) => void;
}

const categories = [
    "men's clothing",
    "women's clothing",
    'jewelery',
    'electronics',
];

const colors = [
    { name: 'Negro', value: 'black' },
    { name: 'Blanco', value: 'white' },
    { name: 'Azul', value: 'blue' },
    { name: 'Rojo', value: 'red' },
    { name: 'Verde', value: 'green' },
    { name: 'Gris', value: 'gray' },
];

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategoryChange = (category: string) => {
        const newCategory = selectedCategory === category ? '' : category;
        setSelectedCategory(newCategory);
        onFilterChange({ category: newCategory, colors: selectedColors, priceRange, searchQuery });
    };

    const handleColorToggle = (color: string) => {
        const newColors = selectedColors.includes(color)
            ? selectedColors.filter((c) => c !== color)
            : [...selectedColors, color];
        setSelectedColors(newColors);
        onFilterChange({ category: selectedCategory, colors: newColors, priceRange, searchQuery });
    };

    const handlePriceChange = (value: number, index: 0 | 1) => {
        const newRange: [number, number] = [...priceRange];
        newRange[index] = value;
        setPriceRange(newRange);
        onFilterChange({ category: selectedCategory, colors: selectedColors, priceRange: newRange, searchQuery });
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        onFilterChange({ category: selectedCategory, colors: selectedColors, priceRange, searchQuery: query });
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedColors([]);
        setPriceRange([0, 1000]);
        setSearchQuery('');
        onFilterChange({});
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-soft p-6 sticky top-24"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-xl text-primary-900">Filtros</h2>
                <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-900 transition-colors"
                >
                    Limpiar
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-primary-700 mb-2">
                    Buscar
                </label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
            </div>

            {/* Categories */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-primary-700 mb-3">
                    Categoría
                </label>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === category
                                    ? 'bg-primary-900 text-white'
                                    : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-primary-700 mb-3">
                    Color
                </label>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => handleColorToggle(color.value)}
                            className={`px-3 py-1.5 rounded-full text-sm transition-all ${selectedColors.includes(color.value)
                                    ? 'bg-primary-900 text-white'
                                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                                }`}
                        >
                            {color.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-primary-700 mb-3">
                    Rango de Precio
                </label>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                            className="w-full px-3 py-2 border border-primary-200 rounded-lg"
                            min="0"
                        />
                        <span className="text-primary-500">-</span>
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                            className="w-full px-3 py-2 border border-primary-200 rounded-lg"
                            min="0"
                        />
                    </div>
                    <div className="text-sm text-primary-600">
                        ${priceRange[0]} - ${priceRange[1]}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FilterPanel;
