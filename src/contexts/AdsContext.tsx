import {useState, useContext, createContext} from 'react';

export type AdsContextType = {
  ads?: AdsFormValues;
  setAds: React.Dispatch<AdsFormValues | undefined>;
};

export const AdsContext = createContext<AdsContextType>({
  ads: undefined,
  setAds: () => {},
});

export const AdsProvider = ({children}: {children: JSX.Element}) => {
  const [ads, setAds] = useState<AdsFormValues>();

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
