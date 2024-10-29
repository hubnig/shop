import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
	const categories = [
		'Action',
		'Adventure',
		'RPG',
		'Simulation',
		'Strategy',
		'Sports',
		'Puzzle',
		'Horror',
		'Platformer',
		'Shooter',
		'Fighting',
		'Racing',
		'Arcade',
		'Indie',
		'Casual',
		'Educational',
		'Quest',
		'MMO'
	];

	// Удаляем существующие категории перед добавлением новых
	await prisma.category.deleteMany();

	for (const categoryName of categories) {
		await prisma.category.create({
			data: {
				name: categoryName,
				slug: slugify(categoryName, { lower: true })
			}
		});
	}

	console.log(`Successfully seeded ${categories.length} categories!`);
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
