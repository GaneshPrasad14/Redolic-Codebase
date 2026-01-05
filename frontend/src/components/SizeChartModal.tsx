
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeChartModal = ({ isOpen, onClose }: SizeChartModalProps) => {
  const sizeData = [
    { id: 1, size: 'XS', chest: 40, length: 26, shoulder: 19, sleeve: 7 },
    { id: 2, size: 'S', chest: 42, length: 27, shoulder: 19.5, sleeve: 8 },
    { id: 3, size: 'M', chest: 44, length: 28, shoulder: 20.5, sleeve: 9 },
    { id: 4, size: 'L', chest: 46, length: 29, shoulder: 21, sleeve: 9.5 },
    { id: 5, size: 'XL', chest: 48, length: 30, shoulder: 21.5, sleeve: 10 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
          >
            <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-2xl w-full relative overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Size Chart</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4 text-gray-300 font-semibold uppercase text-sm bg-gray-800/50">Size</th>
                      <th className="py-3 px-4 text-gray-300 font-semibold uppercase text-sm bg-gray-800/50">Chest</th>
                      <th className="py-3 px-4 text-gray-300 font-semibold uppercase text-sm bg-gray-800/50">Length</th>
                      <th className="py-3 px-4 text-gray-300 font-semibold uppercase text-sm bg-gray-800/50">Shoulder</th>
                      <th className="py-3 px-4 text-gray-300 font-semibold uppercase text-sm bg-gray-800/50">Sleeve</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {sizeData.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="py-3 px-4 text-white font-medium">{row.size}</td>
                        <td className="py-3 px-4 text-gray-300">{row.chest}</td>
                        <td className="py-3 px-4 text-gray-300">{row.length}</td>
                        <td className="py-3 px-4 text-gray-300">{row.shoulder}</td>
                        <td className="py-3 px-4 text-gray-300">{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-sm text-gray-400 text-center">
                  All measurements are in inches.
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SizeChartModal;
