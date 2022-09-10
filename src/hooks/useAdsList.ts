import {useCallback, useEffect, useMemo, useState} from 'react';
import {mockAds} from '../utils/mocks';

const mockAdsList: Ads[] = new Array(20)
  .fill(mockAds)
  .map((el, i) => ({...el, id: el.id + i}));

const mock: {[key: number]: Ads[]} = {
  0: [...mockAdsList],
  1: [...mockAdsList],
  2: [...mockAdsList],
};

const sleep = (ms: number) => new Promise((res, rej) => setTimeout(res, ms));

const useAdsList = (filters: Filters, order: Orders) => {
  const [pagination, setPagination] = useState<number>(0);
  const [list, setList] = useState<Ads[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getAdsList = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      setError(false);
      // TODO - pass filters and pagination to backend
      await sleep(2000);
      setList((old) => [...old, ...mock[pagination]]);
      setPagination(pagination + 1);
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [pagination, loading]);

  const adsList = useMemo(() => {
    // TODO - order ads before return it to page
    return list;
  }, [list]);

  useEffect(() => {
    if (pagination > 0) {
      return;
    }
    getAdsList();
  }, [pagination, getAdsList]);

  return {adsList, error, loading, getAdsList};
};

export default useAdsList;
