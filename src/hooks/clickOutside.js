"use client";
import { useEffect, useState, useRef } from "react";

export const useDropdown = () => {

  // Cambio de estados del menu   
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // Si el click ocurre fuera del elemento referenciado, cerramos el menú
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Retornamos todo lo necesario para controlar el componente
  return { isOpen, toggle, dropdownRef };
};