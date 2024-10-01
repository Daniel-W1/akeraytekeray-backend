import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public firstname: string;

  @IsString()
  @IsNotEmpty()
  public lastname: string;

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
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  public password: string;
}
