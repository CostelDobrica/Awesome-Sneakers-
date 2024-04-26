export interface Account {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  shippingAddress: string;
  city: string;
  zip: string;
  country: string;
  isAdmin: string;
}

export interface AccountResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  zip: string;
  country: string;
  isAdmin: boolean;
}

export interface AccountDeleteResponse {
  message: string;
  user: AccountResponse;
}

export interface AccountUpdateRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  zip: string;
  country: string;
}

export interface AccountUpdateResponse {
  message: string;
  updatedUser: AccountResponse;
}

export interface AccountRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  shippingAddress: string;
  city: string;
  zip: string;
  country: string;
}

export interface AccountRegisterResponse {
  message: string;
  user: AccountResponse;
}

export interface AccountLoginResponse {
  jwtToken: string;
  user: AccountResponse;
}

export interface AccountLoginRequest {
  email: string;
  password: string;
}
