type User = {
  email: string;
};

type Category = 'all' | 'categoria-1' | 'categoria-2';

type City = 'roma' | 'napoli' | 'milano';

type Ads = {
  title: string;
  content: string;
  category: Omit<Category, 'all'>;
  city: City;
  age: number;
  address?: string;
  areas?: string[];
  email: string;
  phone?: string;
  cover: {name: string; base64: string}[];
  images?: {name: string; base64: string}[];
  whatsapp?: boolean;
};
