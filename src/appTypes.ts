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

export interface ProductsDisplayLoaderTypes {
  data: ApiProductData[];
}

export interface CartItem extends ApiProductData {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addCartItem: (newCartItem: CartItem) => void;
  updateCartItem: (newCartItem: CartItem) => void;
  deleteCartItem: (itemId: number) => void;
}
