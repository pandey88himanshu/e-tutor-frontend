"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface SuccessToastProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const SuccessToast = ({ isOpen, message, onClose }: SuccessToastProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className='flex h-64 w-64 flex-col items-center justify-center rounded-xl bg-white shadow-2xl'
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            {/* Animated Check */}
            <motion.div
              className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}>
              <Check size={32} className='text-white' />
            </motion.div>

            {/* Message */}
            <motion.p
              className='px-6 text-center text-lg font-semibold text-gray-800'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}>
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;
