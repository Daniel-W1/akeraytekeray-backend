export interface HousePost {
  id?: number;
  hostId: number;
  hostName: string;
  hostProfileMedia: string;
  title?: string;
  description: string;
  street_address: string;
  absolute_location: string;
  city: string;
  state: string;
  rooms: number;
  media: string[];
  bathRooms: number;
  bedRooms: number;
  houseRules: string[];
  available?: boolean;
  price: number;
  houseType: string;
  house_size_sqm: number;
}
