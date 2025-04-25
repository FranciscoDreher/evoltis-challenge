import { Category } from "../../../shared/enums/category";

export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    isActive: boolean;
    createdAt?: Date;
    category?: Category;
  }