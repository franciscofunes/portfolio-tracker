import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const asset = await prisma.asset.findFirst({
    where: { symbol: params.symbol.toUpperCase() },
  });

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  return NextResponse.json(asset);
}