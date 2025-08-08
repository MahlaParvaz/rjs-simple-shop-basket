export type TProduct = {
  id: number;
  name: string;
  price: number;
  title: string;
  image: string;
  category: string;
};

export type QueryObject = {
  search?: string;
  category?: string;
};
