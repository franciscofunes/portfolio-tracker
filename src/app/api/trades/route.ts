import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const portfolioId = url.searchParams.get("portfolioId");

    if (!portfolioId) {
      return NextResponse.json({ error: "Portfolio ID is required" }, { status: 400 });
    }

    const transactions = await prisma.transaction.findMany({
      where: { portfolioId },
      include: { asset: true },
      orderBy: { date: "asc" }
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Transaction fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
