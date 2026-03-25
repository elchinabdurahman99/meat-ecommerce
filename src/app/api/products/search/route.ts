import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''

  if (!q.trim()) return NextResponse.json([])

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q } },
        { description: { contains: q } },
        { category: { contains: q } },
      ],
    },
    take: 8,
    select: {
      id: true,
      name: true,
      image: true,
      pricePerKg: true,
      category: true,
    },
  })

  return NextResponse.json(products)
}
