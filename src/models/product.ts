export interface Product {
  categoryId?: string | number;
  id?: string | number;
  name: string;
  images: Images;
  shortDescription: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  isPromotion: number;
  promotionPercent: number;

  isFreeShip?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

interface Images {
  [key: string]: string;
}
