import {useState, useContext, createContext} from 'react';
import {mockAds} from '../utils/mocks';

export type AdsContextType = {
  ads?: AdsFormValues | Ads;
  setAds: React.Dispatch<AdsFormValues | Ads | undefined>;
};

export const AdsContext = createContext<AdsContextType>({
  ads: undefined,
  setAds: () => {},
});

export const AdsProvider = ({children}: {children: JSX.Element}) => {
  const [ads, setAds] = useState<AdsFormValues | Ads>();

  return (
    <AdsContext.Provider
      value={{
        ads,
        setAds,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

export const useAdsContext = () => useContext(AdsContext);
