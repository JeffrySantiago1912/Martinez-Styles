import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: "✨",
            title: t('features.dragDrop.title'),
            description: t('features.dragDrop.desc'),
            color: "bg-accent-100/20 text-accent-600"
        },
        {
            icon: "💾",
            title: t('features.save.title'),
            description: t('features.save.desc'),
            color: "bg-primary-100/50 text-primary-600"
        },
        {
            icon: "🛒",
            title: t('features.cart.title'),
            description: t('features.cart.desc'),
            color: "bg-accent-50/20 text-accent-500"
        },
        {
            icon: "📱",
            title: t('features.mobile.title'),
            description: t('features.mobile.desc'),
            color: "bg-primary-200/50 text-primary-700"
        }
    ];

    return (
        <section className="py-24 bg-primary-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display font-bold text-3xl md:text-4xl text-primary-900 mb-4"
                    >
                        {t('features.sectionTitle')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-primary-600 text-lg max-w-2xl mx-auto"
                    >
                        {t('features.sectionDesc')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-primary-100/50 backdrop-blur-sm p-8 rounded-2xl shadow-soft border border-primary-200/50 hover:shadow-soft-lg transition-all"
                        >
                            <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center text-3xl mb-6`}>
                                {feature.icon}
                            </div>
                            <h3 className="font-display font-semibold text-xl text-primary-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-primary-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
