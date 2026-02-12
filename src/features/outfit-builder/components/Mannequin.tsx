import { motion } from 'framer-motion';

interface MannequinProps {
    gender: 'male' | 'female';
}

const Mannequin = ({ gender }: MannequinProps) => {
    return (
        <div className="absolute inset-x-0 bottom-0 top-10 flex justify-center items-end opacity-20 pointer-events-none select-none">
            <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewBox="0 0 200 600"
                className="h-full w-auto max-w-full text-primary-900"
                fill="currentColor"
            >
                {gender === 'female' ? (
                    // Simple schematic female silhouette
                    <path d="M100 20 C 120 20 135 35 135 60 C 135 75 125 85 115 90 C 130 100 150 110 150 140 C 150 180 140 220 140 250 C 155 260 160 280 160 350 L 150 580 L 130 580 L 135 380 L 100 350 L 65 380 L 70 580 L 50 580 L 40 350 C 40 280 45 260 60 250 C 60 220 50 180 50 140 C 50 110 70 100 85 90 C 75 85 65 75 65 60 C 65 35 80 20 100 20 Z" />
                ) : (
                    // Simple schematic male silhouette
                    <path d="M100 20 C 120 20 130 35 130 60 C 130 75 120 85 115 90 C 140 100 160 110 160 150 C 160 220 150 280 150 320 L 145 580 L 120 580 L 125 350 L 100 330 L 75 350 L 80 580 L 55 580 L 50 320 C 50 280 40 220 40 150 C 40 110 60 100 85 90 C 80 85 70 75 70 60 C 70 35 80 20 100 20 Z" />
                )}
            </motion.svg>
        </div>
    );
};

export default Mannequin;
