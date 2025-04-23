import { prisma } from "@/lib/prisma";
import { PortfolioTradeRouteParams } from "@/types/routes/routes";
import { tradeFormSchema } from "@/validations/trade";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: PortfolioTradeRouteParams
) {
  try {
    const { portfolioId, tradeId } = await context.params;

    if (!portfolioId || !tradeId) {
      return NextResponse.json(
        { error: "Portfolio ID and Trade ID are required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const result = tradeFormSchema.safeParse(body);

    if (!result.success) {
      console.error(
        "Validation errors:",
        JSON.stringify(result.error.format())
      );
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    const trade = await prisma.transaction.findFirst({
      where: {
        id: tradeId,
        portfolioId: portfolioId,
      },
    });

    if (!trade) {
      console.log(`Trade not found: ${tradeId} in portfolio: ${portfolioId}`);
      return NextResponse.json({ error: "Trade not found" }, { status: 404 });
    }

    console.log(`Found trade to update: ${JSON.stringify(trade)}`);

    if (!data.assetId) {
      console.error("Missing assetId in update data");
      return NextResponse.json(
        { error: "Asset ID is required" },
        { status: 400 }
      );
    }

    const updatedTrade = await prisma.transaction.update({
      where: {
        id: tradeId,
      },
      data: {
        type: data.type,
        quantity: data.quantity,
        price: data.price,
        date: new Date(data.date),
        assetId: data.assetId,
        exitPrice: data.exitPrice,
      },
    });

    console.log("Raw request body:", body);
    console.log("Validated data:", data);
    console.log("Updated trade data:", updatedTrade);

    console.log(`Trade updated successfully: ${JSON.stringify(updatedTrade)}`);
    return NextResponse.json(updatedTrade);
  } catch (error) {
    console.error("Trade update error:", error);
    return NextResponse.json(
      {
        error: "Failed to update trade",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: PortfolioTradeRouteParams
) {
  try {
    const { portfolioId, tradeId } = await context.params;

    console.log(
      `Attempting to delete trade: ${tradeId} from portfolio: ${portfolioId}`
    );

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: tradeId,
        portfolioId: portfolioId,
      },
    });

    if (!transaction) {
      console.log(`Trade not found: ${tradeId}`);
      return NextResponse.json({ error: "Trade not found" }, { status: 404 });
    }

    await prisma.transaction.delete({
      where: {
        id: tradeId,
      },
    });

    console.log(`Successfully deleted trade: ${tradeId}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting trade:", error);
    return NextResponse.json(
      { error: "Failed to delete trade" },
      { status: 500 }
    );
  }
}
