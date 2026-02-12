import type { ReactNode } from 'react';
import Navigation from './Navigation';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-primary-50">
            <Navigation />
            <main className="pt-16 md:pt-20">
                {children}
            </main>
            <footer className="footer-theme py-12 mt-20 border-t border-primary-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="font-display text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent-500 to-accent-700">
                        Martinez Styles
                    </p>
                    <p className="text-primary-600 max-w-md mx-auto mb-8 font-light">
                        {t('nav.footer.desc') || 'Define tu estilo. Crea tu combinación.'}
                    </p>
                    <div className="flex justify-center gap-6 mb-8 text-primary-400">
                        {/* Social dummy icons */}
                        <span className="hover:text-accent-500 cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-accent-500 cursor-pointer transition-colors">Twitter</span>
                        <span className="hover:text-accent-500 cursor-pointer transition-colors">Facebook</span>
                    </div>
                    <p className="text-xs text-primary-500 mt-8 opacity-60">
                        © 2026 Martinez Styles. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
