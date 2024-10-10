import { CreateHousePostDto } from '../../dtos/housePost.dto';
import { HouseType } from '@prisma/client';

export const createHousePostFixture = (overrides: any = {}): CreateHousePostDto => {
  if (!('hostId' in overrides)) {
    throw new Error('hostId is required');
  }

  return {
    title: 'Test House',
    description: 'A nice place to stay',
    street_address: '123 Test St',
    absolute_location: 'POINT(1 1)',
    city: 'San Francisco',
    state: 'CA',
    rooms: 3,
    media: ['image1.jpg', 'image2.jpg'],
    bathRooms: 2,
    bedRooms: 2,
    houseRules: ['No smoking', 'No pets'],
    price: 1000,
    houseType: HouseType.RENT,
    house_size_sqm: 100,
    ...overrides
  };
};
