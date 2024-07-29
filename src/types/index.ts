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

export interface ChartSeries {
  name: string;
  data: number[];
}

export interface Color {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface ColorResponse {
  data: Color[];
}

