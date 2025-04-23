import { prisma } from "@/lib/prisma";
import { SymbolRouteParams } from "@/types/routes/routes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: SymbolRouteParams) {
  const { symbol } = context.params;

  const asset = await prisma.asset.findFirst({
    where: { symbol: symbol.toUpperCase() },
  });

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  return NextResponse.json(asset);
}
