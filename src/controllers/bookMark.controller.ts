import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { CreateBookmarkDto } from '@/dtos/bookMark.dto';
import { Bookmark } from '@/interfaces/bookMark.interface';
import { BookmarkService } from '@/services/bookMark.service';

export class BookmarkController {
  public bookmark = Container.get(BookmarkService);

  public createBookmark = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookmarkData: CreateBookmarkDto = req.body;
      const createdBookmark: Bookmark = await this.bookmark.createBookmark(bookmarkData);

      res.status(201).json({ data: createdBookmark, message: 'Bookmark created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBookmark = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const housePostId = Number(req.params.housePostId);

      const deletedBookmark: Bookmark = await this.bookmark.deleteBookmark(userId, housePostId);

      res.status(200).json({ data: deletedBookmark, message: 'Bookmark deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getUserBookmarks = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id; // the current user
      const bookmarks: Bookmark[] = await this.bookmark.getUsersBookmarks(userId);

      res.status(200).json({ data: bookmarks, message: 'All Bookmarks retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public checkHousePostIsBookmarked = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const housePostId = Number(req.params.housePostId);

      const isBookmarked = await this.bookmark.checkHousePostIsBookmarked(userId, housePostId);

      res.status(200).json({ data: isBookmarked, message: 'HousePost is Bookmarked' });
    } catch (error) {
      next(error);
    }
  };
}
