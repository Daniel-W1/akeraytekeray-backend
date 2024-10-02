export interface HousePost {
  id?: number;
  hostId: number;
  title?: string;
  description: string;
  street_address: string;
  absolute_location: string;
  city: string;
  state: string;
  rooms: number;
  media: string[];
  available?: boolean;
  price: number;
  houseType: string;
  house_size_sqm: number;
}
