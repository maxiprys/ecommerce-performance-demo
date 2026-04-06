export type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
    creationAt: string;
    updatedAt: string;
  };
  images: string[];
  slug?: string;
  creationAt?: string;
  updatedAt?: string;
};
