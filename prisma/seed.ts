import { PrismaClient } from "../src/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const ASSETS = [
  { symbol: "AAPL", name: "Apple Inc.", assetType: "Stock" },
  { symbol: "TSLA", name: "Tesla Inc.", assetType: "Stock" },
  { symbol: "NVDA", name: "Nvidia Corp.", assetType: "Stock" },
  { symbol: "AMZN", name: "Amazon.com Inc.", assetType: "Stock" },
  { symbol: "GOOGL", name: "Alphabet Inc.", assetType: "Stock" },
  { symbol: "MSFT", name: "Microsoft Corp.", assetType: "Stock" },
];

const PORTFOLIOS = ["Tech Stocks", "Dividend Growth", "High Risk"];

async function main() {
  try {
    console.log("Cleaning database...");
    await prisma.transaction.deleteMany();
    await prisma.portfolio.deleteMany();
    await prisma.asset.deleteMany();
    await prisma.user.deleteMany();

    console.log("Creating user...");
    const user = await prisma.user.create({
      data: {
        email: "mockuser@example.com",
        name: "Mock User",
      },
    });

    console.log("Creating assets...");
    const createdAssets = await Promise.all(
      ASSETS.map((asset) => prisma.asset.create({ data: asset }))
    );

    console.log("Creating portfolios and transactions...");
    for (const title of PORTFOLIOS) {
      const portfolio = await prisma.portfolio.create({
        data: {
          title,
          userId: user.id,
        },
      });

      for (let i = 0; i < 10; i++) {
        const asset = faker.helpers.arrayElement(createdAssets);
        const type = faker.helpers.arrayElement(["BUY", "SELL"]);
        const quantity = faker.number.int({ min: 1, max: 50 });
        const price = faker.number.float({
          min: 100,
          max: 500,
          fractionDigits: 2,
        });
        const daysAgo = faker.number.int({ min: 10, max: 300 });
        const date = faker.date.recent({ days: daysAgo });

        const exitPrice =
          Math.random() > 0.3
            ? Number(
                (price * faker.number.float({ min: 0.8, max: 1.2 })).toFixed(2)
              )
            : null;

        await prisma.transaction.create({
          data: {
            type,
            quantity,
            price,
            date,
            exitPrice,
            portfolioId: portfolio.id,
            assetId: asset.id,
          },
        });
      }
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Detailed error:", {
        code: (error as any).code,
        message: error.message,
        meta: (error as any).meta,
      });
    } else {
      console.error("Unknown error:", error);
    }
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
