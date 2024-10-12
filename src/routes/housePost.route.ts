import { Router } from 'express';
import { HousePostController } from '@controllers/housePost.controller';
import { CreateHousePostDto, GetNearByHousesDto, UpdateHousePostDto } from '@dtos/housePost.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { checkSimilarUser, RoleMiddleware } from '@/middlewares/housePost.middleware';
import { QueryValidationMiddleware, BodyValidationMiddleware } from '@middlewares/validation.middleware';

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
      BodyValidationMiddleware(CreateHousePostDto),
      this.housePost.createHousePost
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      AuthMiddleware,
      RoleMiddleware(['host', 'admin']),
      checkSimilarUser(),
      BodyValidationMiddleware(UpdateHousePostDto),
      this.housePost.updateHousePost
    );
    this.router.get(`${this.path}/nearby`, QueryValidationMiddleware(GetNearByHousesDto), this.housePost.getNearByHouses);
    this.router.get(`${this.path}/:id(\\d+)`, this.housePost.getHousePostById);
    this.router.get(`${this.path}`, this.housePost.getAllHousePosts);
    this.router.get(`${this.path}/category/:category`, this.housePost.getHousePostsByCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, this.housePost.deleteHousePost);
  }
}
