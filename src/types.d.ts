type User = {
  email: string;
};

type Category = 'categoria-1' | 'categoria-2';

type City = 'roma' | 'napoli' | 'milano';

type Ads = {
  category: Category[];
  city: string;
  address?: string;
  areas?: string;
  contactType: ContactType;
};
