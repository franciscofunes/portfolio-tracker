import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { symbol: string } }
) {
  const asset = await prisma.asset.findFirst({
    where: { symbol: await params.symbol.toUpperCase() },
  });

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  return NextResponse.json(asset);
}
