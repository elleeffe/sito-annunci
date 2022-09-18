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
  orders: Orders;
  setOrders: Dispatch<SetStateAction<Orders>>;
};

export const FiltersContext = createContext<FiltersContextType>({
  filters: {
    ageRange: [18, 60],
    city: undefined,
    category: undefined,
    keyword: '',
  },
  setFilters: () => {},
  orders: {
    age: 'none',
    publicationDate: 'none',
  },
  setOrders: () => {},
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
  const [orders, setOrders] = useState<Orders>({
    age: 'none',
    publicationDate: 'none',
  });
  const [filters, setFilters] = useState<Filters>(() => ({
    ageRange: [18, 60],
    city,
    category,
    keyword: keyword || '',
  }));

  return (
    <FiltersContext.Provider
      value={{
        orders,
        setOrders,
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
