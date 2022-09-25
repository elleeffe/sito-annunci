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
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getAdsList = useCallback(
    async (reset: boolean) => {
      if (loading) {
        return;
      }
      if (reset) {
        setList([]);
      }
      try {
        setLoading(true);
        setError(false);
        // TODO - pass filters and pagination to backend
        await sleep(2000);
        setList((old) => [...old, ...mock[reset ? 0 : pagination]]);
        setPagination((old) => (reset ? 0 : old + 1));
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [pagination, loading]
  );

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

  return {adsList, error, loading, getAdsList};
};

export default useAdsList;
