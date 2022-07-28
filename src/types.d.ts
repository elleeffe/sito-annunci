type User = {
  email: string;
};

type Category = 'categoria-1' | 'categoria-2';

type City = 'roma' | 'napoli' | 'milano';

type Ads = {
  title: string;
  content: string;
  category: Category[];
  city: string;
  address?: string;
  areas?: string;
  email: string;
  phone?: string;
  images: File[];
};
