type User = {
  id: string;
  email: string;
  phone: string;
};

type Category = 'categoria-1' | 'categoria-2' | 'categoria-3' | 'categoria-4';

type City = 'roma' | 'napoli' | 'milano';

type TimeRange = 'timerange-1' | 'timerange-2';

type Visibility =
  | 'offerta-1'
  | 'offerta-2'
  | 'offerta-3'
  | 'offerta-4'
  | 'offerta-5';

type AdsMedia = {name: string; base64: string};

type Ads = {
  views?: number;
  isFavorite?: boolean;
  id?: string;
  publicationDate?: number;
  title: string;
  description: string;
  category: Omit<Category, 'all'>;
  city: City;
  age: string;
  neighborhood?: string;
  areas?: string[];
  email: string;
  phone: string;
  cover: AdsMedia[];
  images?: AdsMedia[];
  whatsapp: boolean;
  visibilityOption?: Visibility;
  visibilityTime?: TimeRange;
  visibilityExpiration?: number;
  isHighlighted?: boolean;
};

type VisibilityOption = {
  value: Visibility;
  title: string;
  subtitle: string;
  price: {
    actual: string;
    original?: string;
  };
  disabled?: boolean;
  important?: boolean;
  chip?: string;
};

type AdsFormValues = Ads & {
  privacyConsens: boolean;
  marketing?: boolean;
  specialData?: boolean;
  imageConsens?: boolean;
};

type HomeFormValues = Omit<Filters, 'ageRange'>;

type Filters = {
  ageRange: number[];
  city?: City;
  category?: Category;
  keyword?: string;
};

type Orders = {
  age: 'young' | 'old' | 'none';
  publicationDate: 'latest' | 'oldest';
};

type MyRoute = {
  label: string;
  path?: string;
  submenu?: {
    label: string;
    path: string;
  }[];
};
