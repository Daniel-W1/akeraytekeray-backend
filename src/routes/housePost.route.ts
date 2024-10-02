import { Router } from 'express';
import { HousePostController } from '@controllers/housePost.controller';
import { CreateHousePostDto, UpdateHousePostDto } from '@dtos/housePost.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { checkSimilarUser, RoleMiddleware } from '@/middlewares/housePost.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class HousePostRoute implements Routes {
  public path = '/houseposts';
  public router = Router();
  public housePost = new HousePostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      AuthMiddleware,
      RoleMiddleware(['host', 'admin']),
      checkSimilarUser(),
      ValidationMiddleware(CreateHousePostDto),
      this.housePost.createHousePost
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      AuthMiddleware,
      RoleMiddleware(['host', 'admin']),
      checkSimilarUser(),
      ValidationMiddleware(UpdateHousePostDto),
      this.housePost.updateHousePost
    );
    this.router.get(`${this.path}/:id(\\d+)`, this.housePost.getHousePostById);
    this.router.get(`${this.path}`, this.housePost.getAllHousePosts);
    this.router.delete(`${this.path}/:id(\\d+)`, this.housePost.deleteHousePost);
  }
}
