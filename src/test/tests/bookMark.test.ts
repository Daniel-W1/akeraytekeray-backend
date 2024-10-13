import request from 'supertest';
import App from '../../app';
import { BookmarkRoute } from '../../routes/bookMark.route';
import { Application } from 'express';
import { createUserFixture } from '../fixtures/host-0';
import { createUser, cleanupUsers } from '../factory/userFactory';
import { createHouse, cleanupHouses } from '../factory/houseFactory';
import { createHousePostFixture } from '../fixtures/house-0';
import { createBookmarkFixture } from '../fixtures/bookmark-0';
import { createBookmark, cleanupBookmarks } from '../factory/bookmarkFactory';
import assert from 'assert';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';

describe('Testing Bookmarks route', () => {
  let app: Application;
  let createdUser: any;
  let authToken: string;
  let createdHouse: any;

  beforeEach(async () => {
    assert(process.env.ENVIRONMENT === 'test');

    const appInstance = new App([new BookmarkRoute()]);
    app = appInstance.getServer();

    // Create a user
    const user = createUserFixture();
    createdUser = await createUser(user);

    // Login the user
    const expiresIn: number = 60 * 60;
    authToken = sign({ id: createdUser.id }, SECRET_KEY, { expiresIn });

    // Create a house post
    const house = createHousePostFixture({ hostId: createdUser.id });
    createdHouse = await createHouse(house);
  });

  describe('[POST] /bookmarks', () => {
    it('should create a new bookmark', async () => {
      const bookmarkData = createBookmarkFixture({
        userId: createdUser.id,
        housePostId: createdHouse.id
      });

      const response = await request(app).post('/bookmarks').set('Authorization', `Bearer ${authToken}`).send(bookmarkData);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.userId).toBe(createdUser.id);
      expect(response.body.data.housePostId).toBe(createdHouse.id);
    });

    it('should return 400 if userId is missing', async () => {
      const bookmarkData = createBookmarkFixture({
        userId: createdUser.id,
        housePostId: createdHouse.id
      });

      const response = await request(app)
        .post('/bookmarks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ ...bookmarkData, userId: undefined });

      expect(response.status).toBe(400);
    });
  });

  describe('[GET] /bookmarks/:userId', () => {
    it('should return bookmarks for a user', async () => {
      const bookmarkData = createBookmarkFixture({
        userId: createdUser.id,
        housePostId: createdHouse.id
      });
      await createBookmark(bookmarkData);

      const response = await request(app).get(`/bookmarks`).set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].userId).toBe(createdUser.id);
      expect(response.body.data[0].housePostId).toBe(createdHouse.id);
    });

    it('should return empty array if user has no bookmarks', async () => {
      const response = await request(app).get(`/bookmarks`).set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('[DELETE] /bookmarks/:id', () => {
    it('should delete a bookmark', async () => {
      const bookmarkData = createBookmarkFixture({
        userId: createdUser.id,
        housePostId: createdHouse.id
      });
      const createdBookmark = await createBookmark(bookmarkData);

      const response = await request(app).delete(`/bookmarks/${createdBookmark.id}`).set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Bookmark deleted successfully');
    });

    it('should return 404 if bookmark not found', async () => {
      const response = await request(app).delete('/bookmarks/nonexistent-id').set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });

  afterEach(async () => {
    await cleanupBookmarks();
    await cleanupHouses();
    await cleanupUsers();
  });
});
