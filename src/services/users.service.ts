import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@interfaces/users.interface';

@Service()
export class UserService {
  public user = new PrismaClient().user;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.user.findMany();
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.user.create({ data: { ...userData, password: hashedPassword, role: userData.role as Role } });
    return createUserData;
  }

  public async updateUser(userId: number, userData: UpdateUserDto): Promise<User> {
    console.log('we are here?');
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    const updateUserData = await this.user.update({
      where: { id: userId },
      data: {
        ...userData,
        role: userData.role ? { set: userData.role as Role } : undefined
      }
    });

    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData = await this.user.delete({ where: { id: userId } });
    return deleteUserData;
  }
}
