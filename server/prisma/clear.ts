import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.review.deleteMany();

	// Удаляем существующие продукты перед добавлением новых
	await prisma.product.deleteMany();

	// Удаляем существующие категории перед добавлением новых
	await prisma.category.deleteMany();

	console.log('Successfully cleared database!');
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
