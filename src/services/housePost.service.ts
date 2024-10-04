import { HouseType, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreateHousePostDto, UpdateHousePostDto } from '@/dtos/housePost.dto';
import { HttpException } from '@exceptions/HttpException';
import { HousePost } from '@/interfaces/housePost.interface';

@Service()
export class HousePostService {
  public housePosts = new PrismaClient().housePost;

  public async createHousePost(housePostData: CreateHousePostDto): Promise<HousePost> {
    const createHousePostData: Promise<HousePost> = this.housePosts.create({
      data: {
        ...housePostData,
        houseType: housePostData.houseType as HouseType
      }
    });
    return createHousePostData;
  }

  public async getHousePostById(housePostId: number): Promise<HousePost> {
    const findHousePost: HousePost = await this.housePosts.findUnique({ where: { id: housePostId } });
    if (!findHousePost) throw new HttpException(404, `HousePost with id ${housePostId} not found`);

    return findHousePost;
  }

  public async updateHousePost(housePostId: number, housePostData: UpdateHousePostDto): Promise<HousePost> {
    const findHousePost: HousePost = await this.housePosts.findUnique({ where: { id: housePostId } });
    if (!findHousePost) throw new HttpException(404, `HousePost with id ${housePostId} not found`);

    const updateHousePostData: Promise<HousePost> = this.housePosts.update({
      where: { id: housePostId },
      data: { ...housePostData, houseType: housePostData.houseType as HouseType }
    });

    return updateHousePostData;
  }

  public async deleteHousePost(housePostId: number): Promise<HousePost> {
    const findHousePost: HousePost = await this.housePosts.findUnique({ where: { id: housePostId } });
    if (!findHousePost) throw new HttpException(404, `HousePost with id ${housePostId} not found`);

    const deleteHousePostData: Promise<HousePost> = this.housePosts.delete({ where: { id: housePostId } });
    return deleteHousePostData;
  }

  public async getAllHousePosts(): Promise<HousePost[]> {
    const housePosts: HousePost[] = await this.housePosts.findMany();
    return housePosts;
  }

  public async getHousePostsByCategory(category: string): Promise<HousePost[]> {
    // TODO: implement proper trending
    if (category === 'TRENDING') {
      // take only 5 posts
      const housePosts: HousePost[] = await this.housePosts.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });
      return housePosts;
    }

    const housePosts: HousePost[] = await this.housePosts.findMany({ where: { houseType: category as HouseType } });
    return housePosts;
  }
}
