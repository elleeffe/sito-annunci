import {useState, useContext, createContext, PropsWithChildren} from 'react';

export type FiltersContextType = {
  filters: Filters;
  setFilters: React.Dispatch<Filters>;
  order: Order;
  setOrder: React.Dispatch<Order>;
};

export const FiltersContext = createContext<FiltersContextType>({
  filters: {age: [18, 60], city: undefined, category: undefined, keyword: ''},
  setFilters: () => {},
  order: {
    age: null,
    publicationDate: null,
  },
  setOrder: () => {},
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
  const [order, setOrder] = useState<Order>({
    age: null,
    publicationDate: null,
  });
  const [filters, setFilters] = useState<Filters>(() => ({
    age: [18, 60],
    city,
    category,
    keyword: keyword || '',
  }));

  return (
    <FiltersContext.Provider
      value={{
        order,
        setOrder,
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
