import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useFiltersContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState([]);

  const closeFilterMenu = () => {
    setShowFilter(!showFilter);
  };

  const deleteIndex = (filterName) => {
    const index = filters.findIndex((el) => el === filterName);
    filters.splice(index, 1);
    setFilters([...filters]);
  };

  return (
    <ThemeContext.Provider
      value={{ showFilter, setFilters, filters, closeFilterMenu, deleteIndex }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
