import {useState, useContext, createContext, PropsWithChildren} from 'react';

export type FiltersContextType = {
  filters: Filters;
  setFilters: React.Dispatch<Filters>;
};

export const FiltersContext = createContext<FiltersContextType>({
  filters: {age: [18, 60], city: undefined, category: undefined, keyword: ''},
  setFilters: () => {},
});

export const FiltersProvider = ({
  children,
  category,
  city,
  keyword,
}: PropsWithChildren<{
  city: City | undefined;
  category?: Category;
  keyword?: string;
}>) => {
  const [filters, setFilters] = useState<Filters>(() => ({
    age: [18, 60],
    city,
    category,
    keyword: keyword || '',
  }));

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
