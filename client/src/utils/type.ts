export interface LoginRequest {
  name: string;
  email: string;
}

export interface LoginResponse {
  message: string;
}

export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export interface DogSearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface SearchQueryParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: string;
  ageMax?: string;
  size?: number;
  from?: number;
  sort?: string;
  next?: string;
}
