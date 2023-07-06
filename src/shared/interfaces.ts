import { ParsedUrlQuery } from "querystring";

import { USER_ROLE } from "./constants";
import { Role } from "./enums";

export interface CategoryType {
  id: number;
  src: string;
  textKey: string;
  href: string;
}

export interface UserPayload {
  username: string;
  name: string;
  photo?: string;
  role: typeof USER_ROLE;
}

export interface EmployeePayload {
  phone: string;
  name: string;
  role: Role;
}

export interface ProductListType {
  id: string;
  name: string;
  price: number;
  sale: number;
  images: string[];
  created_at: Date;
  slug: string;
}

export interface ProductType extends ProductListType {
  description: string;
  specifications: string;
  category: string;
}

export interface OrderProductType
  extends Omit<ProductListType, "images" | "created_at" | "slug"> {
  quantity: number;
  image: string;
}

export interface FamiliarProduct
  extends Pick<
    ProductType,
    "id" | "name" | "price" | "images" | "sale" | "slug"
  > {
  create_at: string;
}

// branch.chainmart.site
export interface EmployeeType {
  id: string;
  name: string;
  phone: string;
  createAt: string;
  isActive: boolean;
}

export interface OrderType {
  id: string;
  status: string;
}

export interface BatchType {
  id: string;
  created_at: string; 
  batch_code: string;
  import_quantity: number;
  import_cost: number;
  expiry_date: string;
  sold: number;
  product: {
    name: string;
    price: number;
    sale: number;
    slug: string;
    id: string;
    product_code: string;
    category: string;
  },
  employee_create: {
    id: string;
    name: string;
    phone: string;
  }
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  ignorePrice: number;
  star: number;
  sold: number;
  image: string;
  label?: number;
  slug: string;
}


export interface IProductDetail {
  id: number;
  name: string;
  price: number;
  ignorePrice: number;
  star: number;
  sold: number;
  images: string[];
  image: string;
  slug: string;
  options: object;
  maxQuantity: number;
  specifications: { [key: string]: string };
  description: string;
  familiar: Array<FamiliarProduct>;
}

export interface ICart {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  maxQuantity: number;
  quantity: number;
}

export interface ErrorPayload {
  statusCode: number;
  message: string;
  error: string;
}

export interface SuccessPayload {
  status: string;
}

export interface SignInPayload {
  account: string;
  password: string;
}

export interface SignUpPayload {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface IParams extends ParsedUrlQuery {
  slug: string;
}

export interface Comment {
  id: string;
  name: string;
  createdAt: number;
  star: number;
  content?: string;
  avatar: string;
  images?: string[];
}
