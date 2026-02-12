import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: ReactNode;
}

const Button = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {
    const baseStyles = 'btn-base font-sans font-medium transition-smooth focus:ring-accent-500';

    const variants = {
        primary: 'bg-primary-900 text-white hover:bg-primary-800 active:bg-primary-950',
        secondary: 'bg-accent-500 text-primary-900 hover:bg-accent-600 active:bg-accent-700 dark:text-stone-900',
        ghost: 'bg-transparent text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-900 dark:hover:text-primary-100 active:bg-primary-200 dark:active:bg-primary-700',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
        outline: 'bg-transparent border-2 border-primary-400 text-primary-800 hover:border-primary-600 hover:text-primary-900 hover:bg-primary-100 active:bg-primary-200 dark:border-primary-500 dark:text-primary-200 dark:hover:border-primary-400 dark:hover:text-primary-100 dark:hover:bg-primary-800',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </motion.button>
    );
};

export default Button;
