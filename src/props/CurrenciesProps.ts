import { StaticImageData } from 'next/image'

export type RateByCurrency = {
  currency: {
    code: string;
    icon: {
      alt: string;
      url: string | StaticImageData // ✅
    };
    name: string;
    createdAt: string;
    updatedAt: string;
    ratesByCurrency: any[]; // уточни, якщо є структура
    cat_date: string;
    cat_type: string;
    id: string;
  };
  from_1000?: {
    buy1000?: number | string;
    sell1000?: number | string;
  };
  from_5000?: {
    buy5000?: number | string;
    sell5000?: number | string;
  };
  id: string;
};


export type CurrencyMeta = {
  createdAt: string;
  updatedAt: string;
  code: string;
  name: string;
  icon: {
    alt: string;
    url: string;
  };
  ratesByCurrency: RateByCurrency[]; // масив курсів
  cat_date: string;
  cat_type: string;
  id: string;
};

export type RateBlock1000 = {
  buy1000: number;
  sell1000: number;
};

export type RateBlock5000 = {
  buy5000: number;
  sell5000: number;
};

export type CurrencyRateItem = {
  currency: CurrencyMeta;
  from_1000?: RateBlock1000;
  from_5000?: RateBlock5000;
  id: string;
};

export type CurrUAN = CurrencyRateItem[];