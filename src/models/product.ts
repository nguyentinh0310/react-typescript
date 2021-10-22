export interface Product {
  categoryId?: string | number;
  id?: string | number;
  name: string;
  images: Images;
  shortDescription: string;
  description: string;
  originalPrice: number;
  isFreeShip: boolean;
  salePrice: number;
  isPromotion: number;
  promotionPercent: number;

  createdAt?: number;
  updatedAt?: number;
}

interface Images {
  [key: string]: string;
}
