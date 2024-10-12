import { CreateBookmarkDto } from '@/dtos/bookMark.dto';

export const createBookmarkFixture = (overrides: any = {}): CreateBookmarkDto => {
  if (!('userId' in overrides)) {
    throw new Error('userId is required');
  }

  return {
    userId: overrides.userId,
    housePostId: overrides.housePostId
  };
};
