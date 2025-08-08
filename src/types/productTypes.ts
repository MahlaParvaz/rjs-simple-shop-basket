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

export type TSearchBoxProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<QueryObject>>;
};
