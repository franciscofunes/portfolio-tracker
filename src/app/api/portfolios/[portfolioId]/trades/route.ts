import { prisma } from "@/lib/prisma";
import { PortfolioRouteParams } from "@/types/routes/routes";
import { tradeFormSchema } from "@/validations/trade";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: PortfolioRouteParams
) {
  try {
    const { portfolioId } = await context.params;
    
    if (!portfolioId) {
      return NextResponse.json(
        { error: "Portfolio ID is required" },
        { status: 400 }
      );
    }

    const trades = await prisma.transaction.findMany({
      where: {
        portfolioId: portfolioId,
      },
      include: {
        asset: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(trades);
  } catch (error) {
    console.error("Error fetching trades:", error);
    return NextResponse.json(
      { error: "Failed to fetch trades" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: PortfolioRouteParams
) {
  try {
    const { portfolioId } = await context.params;
    
    if (!portfolioId) {
      return NextResponse.json(
        { error: "Portfolio ID is required" },
        { status: 400 }
      );
    }
    
    const body = await req.json();
    console.log(body)
    const result = tradeFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;
    console.log(data)

    const [portfolio, asset] = await Promise.all([
      prisma.portfolio.findUnique({ 
        where: { id: portfolioId },
        select: { id: true }
      }),
      prisma.asset.findUnique({ 
        where: { id: data.assetId },
        select: { id: true }
      }),
    ]);

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    if (!asset) {
      return NextResponse.json(
        { error: "Asset not found" },
        { status: 404 }
      );
    }

    const trade = await prisma.transaction.create({
      data: {
        type: data.type,
        quantity: data.quantity,
        price: data.price,
        date: new Date(data.date),
        portfolioId: portfolioId,
        exitPrice: data.exitPrice,
        assetId: data.assetId,
      },
    });
    
    return NextResponse.json(trade);
  } catch (error) {
    console.error("Trade creation error:", error);
    return NextResponse.json(
      { error: "Failed to create trade" },
      { status: 500 }
    );
  }
}