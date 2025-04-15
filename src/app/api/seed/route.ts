import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
import { prisma } from "@/lib/prisma";

const ASSETS = [
  { symbol: "AAPL", name: "Apple Inc.", assetType: "Stock" },
  { symbol: "TSLA", name: "Tesla Inc.", assetType: "Stock" },
  { symbol: "NVDA", name: "Nvidia Corp.", assetType: "Stock" },
  { symbol: "AMZN", name: "Amazon.com Inc.", assetType: "Stock" },
  { symbol: "GOOGL", name: "Alphabet Inc.", assetType: "Stock" },
  { symbol: "MSFT", name: "Microsoft Corp.", assetType: "Stock" },
];

const PORTFOLIOS = ["Tech Stocks", "Dividend Growth", "High Risk"];

export async function POST() {
  try {
    await prisma.transaction.deleteMany();
    await prisma.portfolio.deleteMany();
    await prisma.asset.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
      data: {
        email: "mockuser@example.com",
        name: "Mock User",
      },
    });

    const createdAssets = await Promise.all(
      ASSETS.map((asset) => prisma.asset.create({ data: asset }))
    );

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

        await prisma.transaction.create({
          data: {
            type,
            quantity,
            price,
            date,
            exitPrice: Math.random() > 0.3
              ? Number((price * faker.number.float({ min: 0.8, max: 1.2 })).toFixed(2))
              : null,
            portfolioId: portfolio.id,
            assetId: asset.id,
          },
        });
      }
    }

    return NextResponse.json({ message: "Seeding completed successfully" });
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
    return NextResponse.json(
      {
        error: "Seeding failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
