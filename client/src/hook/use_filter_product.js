

// hooks/useFilteredProducts.js
import { useMemo } from "react";

export const useFilteredProducts = (
  data,
  search,
  category,
  sort
) => {
  return useMemo(() => {
    if (!data) return [];

    let result = [...data];

    if (search) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter(p => p.category === category);
    }

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [data, search, category, sort]);
};
