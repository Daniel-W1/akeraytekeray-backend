import { IsString, IsOptional, IsNotEmpty, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class CreateHousePostDto {
  @IsNumber()
  @IsNotEmpty()
  public hostId: number;

  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public street_address: string;

  @IsString()
  @IsNotEmpty()
  public absolute_location?: string;

  @IsString()
  @IsOptional()
  public city: string;

  @IsString()
  @IsNotEmpty()
  public state: string;

  @IsNumber()
  @IsNotEmpty()
  public rooms: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  public media: string[];

  @IsNumber()
  @IsNotEmpty()
  public price: number;

  @IsString()
  @IsNotEmpty()
  public houseType: string;

  @IsNumber()
  @IsNotEmpty()
  public house_size_sqm: number;
}

export class UpdateHousePostDto {
  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  public street_address?: string;

  @IsString()
  @IsOptional()
  public absolute_location?: string;

  @IsString()
  @IsOptional()
  public city?: string;

  @IsString()
  @IsOptional()
  public state?: string;

  @IsNumber()
  @IsOptional()
  public rooms?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public media?: string[];

  @IsBoolean()
  @IsOptional()
  public available?: boolean;

  @IsNumber()
  @IsOptional()
  public price?: number;

  @IsString()
  @IsOptional()
  public houseType?: string;

  @IsNumber()
  @IsOptional()
  public house_size_sqm?: number;
}
