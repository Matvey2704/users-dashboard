export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;

  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Company {
  department: string;
  name: string;
  title: string;

  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;

    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export interface Bank {
  cardType: string
  currency: string
}

export interface Crypto {
  coin: string
  wallet: string
  network: string
}

export interface User {
  id: number

  firstName: string
  lastName: string
  maidenName?: string

  age: number
  gender: 'male' | 'female'

  email: string
  phone: string
  username: string

  birthDate: string

  image: string

  bloodGroup: string
  height: number
  weight: number
  eyeColor: string

  role: 'admin' | 'moderator' | 'user'

  address: Address
  company: Company
  bank: Bank
  crypto: Crypto
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}