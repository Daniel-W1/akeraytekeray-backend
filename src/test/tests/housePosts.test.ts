import request from 'supertest';
import App from '../../app';
import { HousePostRoute } from '../../routes/housePost.route';
import { Application } from 'express';
import { createUserFixture } from '../fixtures/host-0';
import { createUser } from '../factory/userFactory';
import { cleanupUsers } from '../factory/userFactory';
import { cleanupHouses } from '../factory/houseFactory';
import { createHouse } from '../factory/houseFactory';
import { createHousePostFixture } from '../fixtures/house-0';
import assert from 'assert';

describe('Testing HousePosts route', () => {
  let app: Application;

  beforeEach(async () => {
    assert(process.env.ENVIRONMENT === 'test');

    const appInstance = new App([new HousePostRoute()]);
    app = appInstance.getServer();

    // create a user
    const user = createUserFixture();
    const createdUser = await createUser(user);

    // create a house post
    const house = createHousePostFixture({ hostId: createdUser.id });
    await createHouse(house);
  });

  //   describe('[GET] /housePosts', () => {});

  //   describe('[GET] /housePosts/:id', () => {});

  describe('[GET] /houseposts/nearby', () => {
    it('should return nearby house posts', async () => {
      const query = {
        longitude: 1,
        latitude: 1,
        radius: 1000
      };
      const response = await request(app).get('/houseposts/nearby').query(query);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
    });

    it('should return no house posts', async () => {
      const query = {
        longitude: 10,
        latitude: 10,
        radius: 1
      };
      const response = await request(app).get('/houseposts/nearby').query(query);

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
    });

    it('should reutrn 400 because field is missing', async () => {
      const query = {
        longitude: 10,
        latitude: 10
      };
      const response = await request(app).get('/houseposts/nearby').query(query);

      expect(response.status).toBe(400);
    });
  });

  afterEach(async () => {
    await cleanupHouses();
    await cleanupUsers();
  });
});
