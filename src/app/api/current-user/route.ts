import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await prisma.user.findFirst({
      where: { email: "mockuser@example.com" },
      select: { id: true, name: true, email: true }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Mock user not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching mock user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}