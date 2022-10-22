import {
  useState,
  useContext,
  createContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';

export type FiltersContextType = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
  initialCategory?: Category;
};

export const FiltersContext = createContext<FiltersContextType>({
  filters: {
    ageRange: [18, 60],
    city: undefined,
    category: undefined,
    keyword: '',
  },
  setFilters: () => {},
  order: 'latest',
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
  const [order, setOrder] = useState<Order>('latest');
  const [filters, setFilters] = useState<Filters>(() => ({
    ageRange: [18, 60],
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
        initialCategory: category,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
