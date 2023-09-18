export interface ApiProductData {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface ApiCategoryData {
  id: string;
  name: string;
}

export type CategorySelectionHandler = (item: ApiCategoryData) => void;

export interface FilterSidebarPropTypes {
  handleCategorySelection: CategorySelectionHandler;
}

export interface ProductsDisplayPropTypes {
  category?: string;
}
