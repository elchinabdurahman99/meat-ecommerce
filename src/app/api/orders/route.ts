import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, phone, address, deliveryTime, paymentMethod, subtotal, deliveryFee, total, items } = body

    if (!name || !phone || !address || !deliveryTime || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        customerName: name,
        phone,
        address,
        deliveryTime,
        subtotal,
        deliveryFee,
        total,
        paymentMethod: paymentMethod || 'cash',
        status: 'pending',
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            productName: item.productName,
            weight: item.weight,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    })

    return NextResponse.json({ id: order.id }, { status: 201 })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
