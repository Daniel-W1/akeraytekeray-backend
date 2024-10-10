import { CreateUserDto } from '../../dtos/users.dto';
import { Role } from '@prisma/client';

export const createUserFixture = (overrides = {}): CreateUserDto => {
  return {
    email: 'testuser@example.com',
    phone: '1234567890',
    password: 'securepassword',
    firstname: 'Test',
    lastname: 'User',
    role: Role.host,
    ...overrides
  };
};
