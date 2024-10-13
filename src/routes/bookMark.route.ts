import { Router } from 'express';
import { BookmarkController } from '@/controllers/bookMark.controller';
import { CreateBookmarkDto } from '@dtos/bookMark.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { BodyValidationMiddleware } from '@/middlewares/validation.middleware';

export class BookmarkRoute implements Routes {
  public path = '/bookmarks';
  public router = Router();
  public bookmark = new BookmarkController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      AuthMiddleware,

      BodyValidationMiddleware(CreateBookmarkDto),
      this.bookmark.createBookmark
    );
    this.router.get(`${this.path}`, AuthMiddleware, this.bookmark.getUserBookmarks);
    this.router.get(`${this.path}/:housePostId(\\d+)`, AuthMiddleware, this.bookmark.checkHousePostIsBookmarked);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.bookmark.deleteBookmark);
  }
}
