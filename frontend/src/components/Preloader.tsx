import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="preloader-content">
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.img
            src="/h.png"
            alt="Logo"
            className="logo-image w-64 h-64 object-contain"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(212, 0, 0, 0.8))',
                'drop-shadow(0 0 40px rgba(212, 0, 0, 1))',
                'drop-shadow(0 0 20px rgba(212, 0, 0, 0.8))',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="progress-text">{progress}%</p>
      </div>
    </motion.div>
  );
};

export default Preloader;
