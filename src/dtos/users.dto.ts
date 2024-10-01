import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber, IsEnum, IsOptional } from 'class-validator';

export enum UserRole {
  Tenant = 'tenant',
  Host = 'host',
  Admin = 'admin',
}

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @IsEnum(UserRole)
  public role: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  public phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;
}

export class LoginUserDto {
  @IsPhoneNumber()
  public phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  public password?: string;

  @IsOptional()
  @IsString()
  public firstname?: string;

  @IsOptional()
  @IsString()
  public lastname?: string;

  @IsOptional()
  @IsEnum(UserRole)
  public role?: string;
}
