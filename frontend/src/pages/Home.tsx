import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  onExplore: () => void;
}
import InstagramFeatures from '../components/InstagramFeatures';

const Home = ({ onExplore }: HomeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="home min-h-screen" ref={containerRef}>
      <motion.section className="hero" style={{ y, opacity }}>
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            DEFINE YOUR
            <br />
            <span className="hero-title-accent">AURA</span>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Premium streetwear that speaks volumes
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link to="/categories" className="hero-button cursor-hover" onClick={onExplore}>
              EXPLORE COLLECTION
              <ArrowRight className="button-icon" />
            </Link>
          </motion.div>
        </div>
        <div className="hero-image-wrapper">
          <motion.img
            src="/herobg.jpeg"
            alt="Fashion model"
            className="hero-image"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </motion.section>

      <section className="min-h-screen flex flex-col md:flex-row bg-black border-t border-gray-900">
        {/* Left Side - Video */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10" />
          <video
            src="/Clip1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl space-y-8 relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              WHERE
              <span className="block text-red-600">FASHION</span>
              MEETS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                REBELLION.
              </span>
            </h2>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Redolic isn't just a brand; it's a movement. We blend premium aesthetics
              with raw, unfiltered energy to create pieces that don't just fit—they make a statement.
              Designed for those who dare to stand out.
            </p>

            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-white border-b border-red-600 pb-1 hover:text-red-500 hover:border-red-500 transition-all text-lg group"
              onClick={onExplore}
            >
              DISCOVER MORE
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Background decorative elements for right side */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-800/10 blur-[100px] rounded-full" />
        </div>
      </section>

      <section className="statement-section">
        <motion.div
          className="statement-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <h2 className="statement-text">
            NOT JUST CLOTHES.
            <br />
            IT'S AN <span className="text-accent">IDENTITY</span>.
          </h2>
        </motion.div>
      </section>

      <section className="gallery-section">
        <div className="gallery-grid">
          {/* Gallery images removed */}
        </div>
      </section>

      <InstagramFeatures />
    </div>
  );
};

export default Home;
