import { Prisma } from '@prisma/client';

export const returnUserObject: Prisma.UserSelect = {
	id: true,
	email: true,
	FirstName: true,
	LastName: true,
	avatarPath: true,
	password: false,
	phone: true
};
