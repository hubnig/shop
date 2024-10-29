// import { faker } from '@faker-js/faker';
// import { PrismaClient } from '@prisma/client';
// import slugify from 'slugify';

// const prisma = new PrismaClient();

// async function main() {
// 	const numberOfProducts = 50; // Количество генерируемых продуктов
// 	const numberOfReviewsPerProduct = 5; // Количество отзывов на продукт

// 	// Получаем все категории и пользователей из базы данных
// 	const categories = await prisma.category.findMany();
// 	const users = await prisma.user.findMany();

// 	// Генерация продуктов
// 	const products = Array.from({ length: numberOfProducts }, () => {
// 		const name = faker.commerce.productName();
// 		const imageCount = Math.floor(Math.random() * (6 - 2 + 1)) + 2; // Случайное количество изображений от 2 до 6
// 		const images = Array.from({ length: imageCount }, () => faker.image.url()); // Генерация массива изображений

// 		return {
// 			name,
// 			slug: slugify(name, { lower: true }), // Генерация slug на основе имени
// 			description: faker.lorem.paragraph(),
// 			price: +faker.commerce.price({ min: 100, max: 1000, dec: 0 }), // Случайная цена от 100 до 1000
// 			images, // Массив с изображениями
// 			categoryId: faker.helpers.arrayElement(categories).id, // Случайная категория
// 			userId: faker.helpers.arrayElement(users).id // Случайный пользователь
// 		};
// 	});

// 	// Удаляем существующие продукты перед добавлением новых
// 	await prisma.product.deleteMany();

// 	for (const product of products) {
// 		const createdProduct = await prisma.product.create({ data: product });

// 		// Генерация отзывов для каждого продукта
// 		for (let i = 0; i < numberOfReviewsPerProduct; i++) {
// 			await prisma.review.create({
// 				data: {
// 					rating: Math.floor(Math.random() * (5 - 1 + 1) + 1), // Случайная оценка от 1 до 5
// 					text: faker.lorem.sentence(),
// 					productId: createdProduct.id,
// 					userId: faker.helpers.arrayElement(users).id // Случайный пользователь для отзыва
// 				}
// 			});
// 		}
// 	}

// 	console.log(`Successfully seeded ${numberOfProducts} products with reviews!`);
// }

// main()
// 	.catch(e => {
// 		console.error(e);
// 		process.exit(1);
// 	})
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 	});
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
	const numberOfProducts = 50; // Количество генерируемых продуктов
	const numberOfReviewsPerProduct = 5; // Количество отзывов на продукт

	// Получаем все категории и пользователей из базы данных
	const categories = await prisma.category.findMany();
	const users = await prisma.user.findMany();

	// Удаляем существующие отзывы перед удалением продуктов
	await prisma.review.deleteMany();

	// Удаляем существующие продукты перед добавлением новых
	await prisma.product.deleteMany();

	// Генерация продуктов
	for (let i = 0; i < numberOfProducts; i++) {
		const name = faker.commerce.productName();
		let slug = slugify(name, { lower: true });

		// Проверка уникальности slug
		const existingProduct = await prisma.product.findUnique({
			where: { slug }
		});
		if (existingProduct) {
			slug += `-${i}`; // Добавляем индекс для уникальности
		}

		const productData = {
			name,
			slug,
			description: faker.lorem.paragraph(),
			price: Math.floor(Math.random() * (1000 - 100 + 1) + 100), // Случайная цена от 100 до 1000
			images: Array.from(
				{ length: Math.floor(Math.random() * (6 - 2 + 1)) + 2 },
				() => faker.image.url({ width: 480, height: 640 })
			), // Случайное количество изображений от 2 до 6
			categoryId: faker.helpers.arrayElement(categories).id, // Случайная категория
			userId: faker.helpers.arrayElement(users).id // Случайный пользователь
		};

		const createdProduct = await prisma.product.create({ data: productData });

		// Генерация отзывов для каждого продукта
		for (let j = 0; j < numberOfReviewsPerProduct; j++) {
			await prisma.review.create({
				data: {
					rating: Math.floor(Math.random() * (5 - 1 + 1) + 1), // Случайная оценка от 1 до 5
					text: faker.lorem.sentence(),
					productId: createdProduct.id,
					userId: faker.helpers.arrayElement(users).id // Случайный пользователь для отзыва
				}
			});
		}
	}

	console.log(`Successfully seeded ${numberOfProducts} products with reviews!`);
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
