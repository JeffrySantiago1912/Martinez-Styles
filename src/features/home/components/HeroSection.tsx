import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../../shared/components/Button';

const HeroSection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-50 py-20">
            {/* Animated background elements - Sunflower Theme */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-accent-200/40 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-accent-300/30 rounded-full blur-[80px]"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-900 text-sm font-semibold mb-6 border border-accent-200"
                    >
                        {t('hero.newCollection')}
                    </motion.div>

                    <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-primary-900 mb-6 leading-tight">
                        {t('hero.title')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-accent-700">
                            {t('hero.subtitle')}
                        </span>
                    </h1>

                    <p className="text-xl text-primary-700 mb-8 font-normal max-w-lg leading-relaxed">
                        {t('hero.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => navigate('/builder')}
                            className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold shadow-lg shadow-accent-500/30 border-2 border-accent-600"
                        >
                            {t('hero.cta.create')}
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate('/catalog')}
                            className="border-2 border-primary-400 dark:border-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:border-primary-600 dark:hover:border-primary-100 text-primary-800 dark:text-primary-100 hover:text-primary-900 dark:hover:text-white font-semibold shadow-sm"
                        >
                            {t('hero.cta.explore')}
                        </Button>
                    </div>
                </motion.div>

                {/* Visual Content (Right Side) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative block mt-12 md:mt-0"
                >
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-soft-lg border-4 md:border-8 border-white">
                        {/* Fashion Video */}
                        <div className="aspect-[3/4] bg-primary-200 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary-200">
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent-900/10 to-transparent z-10"></div>
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover opacity-90"
                                    poster="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                                >
                                    <source src="https://cdn.coverr.co/videos/coverr-walking-in-a-fashion-show-2656/1080p.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* Floating cards UI concept */}
                            <motion.div
                                animate={{
                                    y: [-10, 10, -10],
                                    rotate: [-2, 2, -2]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute top-10 right-10 bg-white/95 dark:bg-primary-800/95 backdrop-blur-md p-3 rounded-xl shadow-lg border-2 border-white/50 dark:border-primary-600/50 z-20"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2 w-2 rounded-full bg-accent-500 animate-pulse"></span>
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-primary-600 dark:text-primary-300">
                                        {t('hero.floating.newStyles')}
                                    </span>
                                </div>
                                <div className="text-sm font-bold text-primary-900 dark:text-primary-100 mt-1">{t('hero.floating.collection')}</div>
                            </motion.div>

                            <motion.div
                                animate={{
                                    y: [10, -10, 10],
                                    rotate: [2, -2, 2]
                                }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute bottom-20 left-10 bg-white/95 dark:bg-primary-800/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-3 z-20 border-2 border-white/50 dark:border-primary-600/50"
                            >
                                <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-500/20 flex items-center justify-center text-accent-600 dark:text-accent-400 shadow-inner">
                                    <motion.span
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >✨</motion.span>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-primary-900 dark:text-primary-100">{t('hero.features.unique')}</div>
                                    <div className="text-xs text-primary-600 dark:text-primary-300">{t('hero.features.trending')}</div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: [0, -5, 0],
                                    y: [0, -5, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                                className="absolute top-1/2 -right-6 bg-accent-500 text-stone-900 px-3 py-1 rounded-full shadow-lg z-30 text-[10px] font-bold uppercase tracking-tighter"
                            >
                            </motion.div>
                        </div>
                    </div>
                    {/* Decorative back shapes - Animated & more aesthetic */}
                    <motion.div
                        animate={{
                            rotate: [0, 5, 0],
                            scale: [1, 1.02, 1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -z-10 top-6 -right-6 w-full h-full border-2 border-accent-200/50 rounded-2xl"
                    ></motion.div>
                    <motion.div
                        animate={{
                            rotate: [0, -3, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -z-10 -bottom-6 -left-6 w-full h-full bg-accent-100/30 rounded-2xl blur-sm"
                    ></motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="w-6 h-10 border-2 border-primary-300 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-2 bg-primary-400 rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
