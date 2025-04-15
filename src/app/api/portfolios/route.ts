import { prisma } from "@/lib/prisma";
import { portfolioSchema } from "@/validations/portfolio";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await prisma.user.findFirst({
      where: { email: "mockuser@example.com" }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Mock user not found' }, { status: 404 });
    }
    
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: user.id },
      include: {
        transactions: true
      }
    });
    
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const result = portfolioSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { title, userId } = result.data;
    
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const existingPortfolio = await prisma.portfolio.findFirst({
      where: {
        title,
        userId
      }
    });
    
    if (existingPortfolio) {
      return NextResponse.json(
        { error: "You already have a portfolio with this name. Please use a different name." },
        { status: 400 }
      );
    }
    
    const portfolio = await prisma.portfolio.create({
      data: { title, userId },
    });
    
    return NextResponse.json(portfolio);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Portfolio creation error:", {
        code: (error as any).code,
        message: error.message,
        meta: (error as any).meta,
      });
    } else {
      console.error("Unknown error:", error);
    }

    if ((error as any).code === "P2002") {
      return NextResponse.json(
        { error: "A portfolio with these details already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}
