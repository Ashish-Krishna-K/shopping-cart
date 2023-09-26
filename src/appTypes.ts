/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { Mock } from "vitest";

export interface ApiProductData {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface LocalProductCache {
  storedAt: number;
  products: ApiProductData[];
}

export interface ApiCategoryData {
  id: string;
  name: string;
}

export interface LocalCategoryCache {
  storedAt: number;
  categories: ApiCategoryData[];
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

export type CarouselPropsType = Pick<ApiProductData, "id" | "title" | "image">;

export interface fakeProps {
  cart: CartItem[];
  addCartItem: Mock<[item: any], number> | (() => void);
  updateCartItem: () => void;
  deleteCartItem: () => void;
  children?: ReactNode | undefined;
}
