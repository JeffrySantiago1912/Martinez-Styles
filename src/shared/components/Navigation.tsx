import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';

const Navigation = () => {
    const { cart, ui, setUIState } = useStore();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const cartItemCount = cart.length;
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    const navLinks = [
        { name: t('nav.catalog'), path: '/catalog' },
        { name: t('nav.create'), path: '/builder' },
        { name: t('nav.saved'), path: '/saved-outfits' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary-200 shadow-lg"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <motion.span
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl drop-shadow-md"
                        >
                            🌻
                        </motion.span>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="text-2xl font-display font-bold text-primary-900 dark:text-white drop-shadow-sm"
                        >
                            Martinez Styles
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-semibold transition-colors relative group ${location.pathname === link.path ? 'text-accent-500 dark:text-accent-400' : 'text-primary-700 dark:text-primary-100 hover:text-primary-900 dark:hover:text-white'
                                    }`}
                            >
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-500"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="p-2 text-primary-800 dark:text-primary-100 hover:text-primary-900 dark:hover:text-white hover:bg-primary-100 dark:hover:bg-primary-700 rounded-full transition-all font-semibold text-sm w-10 h-10 flex items-center justify-center border-2 border-primary-300 dark:border-primary-600 hover:border-accent-500 dark:hover:border-accent-400 shadow-sm"
                            title="Switch Language"
                        >
                            {i18n.language === 'es' ? 'ES' : 'EN'}
                        </button>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 text-primary-800 dark:text-primary-100 hover:text-primary-900 dark:hover:text-white hover:bg-primary-100 dark:hover:bg-primary-700 rounded-full transition-all border-2 border-primary-300 dark:border-primary-600 hover:border-accent-500 dark:hover:border-accent-400 shadow-sm"
                            title={isDarkMode ? t('nav.titles.color') : t('nav.titles.bw')}
                        >
                            {isDarkMode ? (
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-accent-400">
                                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06a.996.996 0 000 1.41.996.996 0 001.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06a.996.996 0 000 1.41c.39.39 1.03.39 1.41 0l1.06-1.06z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
                                </svg>
                            )}
                        </button>

                        {/* Cart Icon */}
                        <button
                            onClick={() => setUIState({ isCartOpen: !ui.isCartOpen })}
                            className="relative p-2 hover:bg-primary-100 dark:hover:bg-primary-700 rounded-lg transition-all text-primary-800 dark:text-primary-100 hover:text-primary-900 dark:hover:text-white border-2 border-primary-300 dark:border-primary-600 hover:border-accent-500 dark:hover:border-accent-400 shadow-sm"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartItemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-accent-500 text-primary-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    {cartItemCount}
                                </motion.span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-primary-800 dark:text-primary-100 border-2 border-primary-300 dark:border-primary-600 rounded-lg shadow-sm hover:bg-primary-100 dark:hover:bg-primary-700"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-primary-200 dark:border-primary-700 bg-white/95 dark:bg-primary-900/95 backdrop-blur-md overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${location.pathname === link.path
                                        ? 'bg-accent-50 dark:bg-accent-500/20 text-accent-900 dark:text-accent-400'
                                        : 'text-primary-600 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-800'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navigation;
