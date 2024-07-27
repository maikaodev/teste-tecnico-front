export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserResponse {
  data: User[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

