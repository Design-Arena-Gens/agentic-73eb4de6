import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET() {
  await connectToDatabase();
  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const created = await Order.create(body);
  return NextResponse.json(created, { status: 201 });
}
