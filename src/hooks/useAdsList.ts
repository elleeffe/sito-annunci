import {useCallback, useEffect, useMemo, useState} from 'react';
import {mockAds} from '../utils/mocks';

const mockAdsList: Ads[] = new Array(10).fill(mockAds);

const mock: {[key: number]: Ads[]} = {
  0: [...mockAdsList],
  1: [...mockAdsList],
  2: [...mockAdsList],
};

const sleep = (ms: number) => new Promise((res, rej) => setTimeout(res, ms));

const useAdsList = (filters: Filters, orders: Orders) => {
  const [pagination, setPagination] = useState<number>(0);
  const [list, setList] = useState<Ads[]>([]);
  const [listError, setListError] = useState<boolean>(false);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [favoriteError, setFavoriteError] = useState<string>();
  const [favoriteLoading, setFavoriteLoading] = useState<string>();

  const getAdsList = useCallback(
    async (reset: boolean) => {
      if (listLoading) {
        return;
      }
      if (reset) {
        setList([]);
      }
      try {
        setListLoading(true);
        setListError(false);
        // TODO - pass filters and pagination to backend
        await sleep(2000);
        setList((old) => [...old, ...mock[reset ? 0 : pagination]]);
        setPagination((old) => (reset ? 0 : old + 1));
      } catch (e) {
        console.log(e);
        setListError(true);
      } finally {
        setListLoading(false);
      }
    },
    [pagination, listLoading]
  );

  const handleFavorite = useCallback(async (id?: string) => {
    if (id) {
      try {
        setFavoriteLoading(id);
        setFavoriteError(undefined);
        // TODO - add api
        await sleep(2000);
        setList((old) =>
          old.map((el) =>
            el.id === id
              ? {
                  ...el,
                  isFavorite:
                    el.isFavorite !== undefined ? !el.isFavorite : true,
                }
              : el
          )
        );
      } catch (e) {
        console.log(e);
        setFavoriteError(id);
      } finally {
        setFavoriteLoading(undefined);
      }
    }
  }, []);

  const adsList = useMemo(() => {
    return list
      .sort((a, b) => {
        if (orders.age === 'young') {
          return parseInt(a.age) - parseInt(b.age);
        }
        if (orders.age === 'old') {
          return parseInt(b.age) - parseInt(a.age);
        }
        return -1;
      })
      .sort((a, b) => {
        if (a.publicationDate && b.publicationDate) {
          if (orders.publicationDate === 'oldest') {
            return (a.publicationDate || 0) - (b.publicationDate || 0);
          }
          return -1;
        }
        return -1;
      });
  }, [list, orders]);

  useEffect(() => {
    getAdsList(false);
  }, []);

  return {
    adsList,
    listError,
    listLoading,
    getAdsList,
    handleFavorite,
    favoriteLoading,
    favoriteError,
  };
};

export default useAdsList;
