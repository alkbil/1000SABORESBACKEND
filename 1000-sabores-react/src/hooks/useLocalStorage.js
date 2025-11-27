// useLocalStorage.js - Hook personalizado para manejar localStorage
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Función para obtener el valor inicial
  const getInitialValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al leer localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getInitialValue);

  // Función para actualizar el valor
  const setValue = (value) => {
    try {
      // Permitir que value sea una función para actualizar basado en el valor anterior
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error al escribir en localStorage key "${key}":`, error);
    }
  };

  // Función para remover el item del localStorage
  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error al remover localStorage key "${key}":`, error);
    }
  };

  // Escuchar cambios en localStorage de otras pestañas/ventanas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error al parsear storage change para key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;