import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreateBookmarkDto } from '@/dtos/bookMark.dto';
import { HttpException } from '@exceptions/HttpException';
import { Bookmark } from '@/interfaces/bookMark.interface';

@Service()
export class BookmarkService {
  public bookmarks = new PrismaClient().bookmark;

  public async createBookmark(bookmarkData: CreateBookmarkDto): Promise<Bookmark> {
    const { userId, housePostId } = bookmarkData;

    const createBookmarkData: Promise<Bookmark> = this.bookmarks.create({
      data: {
        user: {
          connect: { id: userId }
        },
        housePost: {
          connect: { id: housePostId }
        }
      }
    });
    return createBookmarkData;
  }

  public async deleteBookmark(bookMarkId: number): Promise<Bookmark> {
    const findBookmark: Bookmark = await this.bookmarks.findUnique({ where: { id: bookMarkId } });
    if (!findBookmark) throw new HttpException(404, `Bookmark with id ${bookMarkId} not found`);

    const deleteBookmarkData: Promise<Bookmark> = this.bookmarks.delete({ where: { id: bookMarkId } });
    return deleteBookmarkData;
  }

  public async getUsersBookmarks(userId: number): Promise<Bookmark[]> {
    const bookmarks: Bookmark[] = await this.bookmarks.findMany({ where: { userId } });
    return bookmarks;
  }

  public async checkHousePostIsBookmarked(userId: number, housePostId: number): Promise<Bookmark | null> {
    const isBookmarked: Bookmark | null = await this.bookmarks.findFirst({ where: { userId, housePostId } });
    return isBookmarked;
  }
}
