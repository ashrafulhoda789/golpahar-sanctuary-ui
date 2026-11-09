/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-7 h-7" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-1.5 sm:p-2 rounded-full bg-cream-200/80 dark:bg-maroon-900 border border-maroon-900/10 dark:border-amber-500/30 text-maroon-900 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4  text-amber-400" />
      ) : (
        <Moon className="w-4 h-4  text-maroon-800" />
      )}
    </button>
  );
};

export default ThemeToggle;