export interface Category {
  _id: string;
  name: string;
  categoryImage: string;
}

export interface CategoryRequest {
  name: string;
  categoryImage: string;
}

export interface CategoryRequestUpdate {
  _id: string;
  name: string;
  categoryImage: string;
}

export interface CategoryResponse {
  message: string;
  category: Category;
}
