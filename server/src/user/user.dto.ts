import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
	@IsEmail()
	email: string;

	@IsOptional()
	@IsString()
	password?: string;

	@IsOptional()
	@IsString()
	FirstName: string;

	@IsOptional()
	@IsString()
	LastName: string;

	@IsOptional()
	@IsString()
	avatarPath: string;

	@IsOptional()
	@IsString()
	phone?: string;
}
