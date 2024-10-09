import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateBookmarkDto {
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @IsNumber()
  @IsNotEmpty()
  public housePostId: number;
}
