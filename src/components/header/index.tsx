import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <header className='bg-white shadow-md dark:bg-gray-800 transition-colors'>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            seojoon1
          </a>

          <div className="hidden md:flex space-x-8 text-gray-600 font-medium dark:text-gray-300">
            <a href="#" className="hover:text-mint-500 transition-colors">who?</a>
            <a href="#" className="hover:text-abigail-500 transition-colors">about</a>
            <a href="#" className="hover:text-blue-600 transition-colors">contact</a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 pb-4 flex flex-col space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                <a href="#" className="hover:text-mint-500 transition-colors text-gray-600 dark:text-gray-300 font-medium">who?</a>
                <a href="#" className="hover:text-abigail-500 transition-colors text-gray-600 dark:text-gray-300 font-medium">about</a>
                <a href="#" className="hover:text-blue-600 transition-colors text-gray-600 dark:text-gray-300 font-medium">contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}