export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ResponseProps {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface FormattedUser {
  id: number;
  email: string;
  full_name: string;
  avatar: string;
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

