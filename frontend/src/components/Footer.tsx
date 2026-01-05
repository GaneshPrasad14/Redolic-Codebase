import { Instagram } from 'lucide-react';
import Particles from './Particles';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`footer bg-white text-black py-8 relative ${className}`}>
      <Particles />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-8">
          <img src="/h.png" alt="Logo" className="w-auto h-16 object-contain" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <a
            href="https://www.instagram.com/redolic.in?igsh=YWF6dXF6bDNoeXRi&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
          >
            <Instagram size={24} />
            <span>Follow us on Instagram</span>
          </a>

          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-300 transition-colors">Terms & Conditions</a>
            <a href="/shipping" className="hover:text-gray-300 transition-colors">Shipping Policy</a>
            <a href="/refund" className="hover:text-gray-300 transition-colors">Refund Policy</a>
          </div>

          <a
            href="mailto:redolicinfo@gmail.com"
            className="hover:text-gray-300 transition-colors"
          >
            redolicinfo@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;