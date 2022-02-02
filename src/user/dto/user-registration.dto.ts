import { IsEmail, IsString } from 'class-validator';

export class UserRegistrationDto {

  @IsString({message: 'Не указано имя'})
  name: string;

  @IsEmail({}, { message: 'Не указан email' })
  email: string;

  @IsString({ message: 'Не указан пароль' })
  password: string;
}
