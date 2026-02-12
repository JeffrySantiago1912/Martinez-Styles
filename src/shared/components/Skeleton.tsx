import { motion } from 'framer-motion';

interface SkeletonProps {
    variant?: 'text' | 'card' | 'image' | 'circle';
    className?: string;
    count?: number;
}

const Skeleton = ({ variant = 'text', className = '', count = 1 }: SkeletonProps) => {
    const baseStyles = 'bg-gradient-to-r from-primary-200 via-primary-100 to-primary-200 bg-[length:200%_100%] animate-pulse';

    const variants = {
        text: 'h-4 rounded',
        card: 'h-64 rounded-xl',
        image: 'aspect-square rounded-lg',
        circle: 'rounded-full aspect-square',
    };

    const skeletons = Array.from({ length: count }, (_, i) => (
        <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        />
    ));

    return count === 1 ? skeletons[0] : <div className="space-y-3">{skeletons}</div>;
};

export default Skeleton;
