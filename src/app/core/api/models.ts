export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string | null;
  price: number;
  nuts: boolean;
  image: string | null;
  vegeterian: boolean;
  spiciness: number;
  categoryId: number;
}

export interface BasketItem {
  productId: number;
  quantity: number;
  price: number;
}