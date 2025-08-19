import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  language: string;
  setLanguage: (lang: string) => void;
  theme: 'light' | 'dark' | 'high-contrast';
  setTheme: (theme: 'light' | 'dark' | 'high-contrast') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  translations: Record<string, string>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');
  const [theme, setTheme] = useState<'light' | 'dark' | 'high-contrast'>('light');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/data/i18n/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${language}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (err) {
        setError(`Failed to load translations: ${err instanceof Error ? err.message : 'Unknown error'}`);
        console.error('Translation loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('sassa-favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  }, []);

  // Load theme from localStorage
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('sassa-theme');
      if (savedTheme) {
        setTheme(savedTheme as 'light' | 'dark' | 'high-contrast');
      }
    } catch (err) {
      console.error('Error loading theme:', err);
    }
  }, []);

  const addToFavorites = (id: string) => {
    const newFavorites = [...favorites, id];
    setFavorites(newFavorites);
    try {
      localStorage.setItem('sassa-favorites', JSON.stringify(newFavorites));
    } catch (err) {
      console.error('Error saving favorites:', err);
    }
  };

  const removeFromFavorites = (id: string) => {
    const newFavorites = favorites.filter(fav => fav !== id);
    setFavorites(newFavorites);
    try {
      localStorage.setItem('sassa-favorites', JSON.stringify(newFavorites));
    } catch (err) {
      console.error('Error saving favorites:', err);
    }
  };

  const handleSetTheme = (newTheme: 'light' | 'dark' | 'high-contrast') => {
    setTheme(newTheme);
    try {
      localStorage.setItem('sassa-theme', newTheme);
    } catch (err) {
      console.error('Error saving theme:', err);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const contextValue: AppContextType = {
    language,
    setLanguage,
    theme,
    setTheme: handleSetTheme,
    searchQuery,
    setSearchQuery,
    favorites,
    addToFavorites,
    removeFromFavorites,
    translations,
    isLoading,
    error,
    clearError,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};