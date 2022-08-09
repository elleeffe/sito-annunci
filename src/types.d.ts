type User = {
  email: string;
  phone: string;
};

type Category = 'all' | 'categoria-1' | 'categoria-2';

type City = 'roma' | 'napoli' | 'milano';

type TimeRange = 'timerange-1' | 'timerange-2';

type Visibility =
  | 'offerta-1'
  | 'offerta-2'
  | 'offerta-3'
  | 'offerta-4'
  | 'offerta-5';

type Ads = {
  title: string;
  content: string;
  category: Omit<Category, 'all'>;
  city: City;
  age: number;
  neighborhood?: string;
  areas?: string[];
  email: string;
  phone?: string;
  cover: {name: string; base64: string}[];
  images?: {name: string; base64: string}[];
  whatsapp: boolean;
  visibilityOption?: Visibility;
  visibilityTime?: TimeRange;
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

type HomeFormValues = {
  category: Category;
  city: City;
  keyword: string;
};
