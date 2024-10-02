import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { CreateHousePostDto, UpdateHousePostDto } from '@/dtos/housePost.dto';
import { HousePost } from '@/interfaces/housePost.interface';
import { HousePostService } from '@/services/housePost.service';

export class HousePostController {
  public housePost = Container.get(HousePostService);

  public createHousePost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const housePostData: CreateHousePostDto = req.body;
      const createdHousePost: HousePost = await this.housePost.createHousePost(housePostData);

      res.status(201).json({ data: createdHousePost, message: 'HousePost created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getHousePostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const housePostId = Number(req.params.id);
      const housePost: HousePost = await this.housePost.getHousePostById(housePostId);

      res.status(200).json({ data: housePost, message: 'HousePost retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateHousePost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const housePostId = Number(req.params.id);
      const housePostData: UpdateHousePostDto = req.body;
      const updatedHousePost: HousePost = await this.housePost.updateHousePost(housePostId, housePostData);

      res.status(200).json({ data: updatedHousePost, message: 'HousePost updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteHousePost = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const housePostId = Number(req.params.id);
      const deletedHousePost: HousePost = await this.housePost.deleteHousePost(housePostId);

      res.status(200).json({ data: deletedHousePost, message: 'HousePost deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllHousePosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const housePosts: HousePost[] = await this.housePost.getAllHousePosts();

      res.status(200).json({ data: housePosts, message: 'All HousePosts retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };
}
