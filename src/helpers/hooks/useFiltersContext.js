"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LOCAL_KEY } from "@/constants/constants";

const ThemeContext = createContext();

export const useFiltersContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState();

  const setFiltersData = (id, name) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...filters, { id, name }]));
    setFilters((prevFilters) => [...prevFilters, { id, name }]);
  };

  const clearFilters = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify([]));
    setFilters([]);
  };

  const closeFilterMenu = () => {
    setShowFilter(!showFilter);
  };

  const deleteIndex = (filterId) => {
    const index = filters.findIndex((el) => el.id === filterId);
    filters.splice(index, 1);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(filters));
    setFilters([...filters]);
  };

  return (
    <ThemeContext.Provider
      value={{
        showFilter,
        setFilters,
        filters,
        closeFilterMenu,
        deleteIndex,
        setFiltersData,
        clearFilters,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
