import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()

  const products = [
    // ── BEEF ──
    {
      name: "Ribeye Steak (Bone-In)",
      description: "Dry-aged 28 days for intense marbling and flavor. The quintessential steak — richly marbled, incredibly juicy, and perfect for high-heat grilling.",
      image: "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 42.0,
      availableWeights: JSON.stringify([0.5, 1, 2, 3]),
      category: "Beef",
    },
    {
      name: "Beef Tenderloin Fillet",
      description: "The most prized cut — exceptionally lean with a buttery, melt-in-your-mouth texture. Perfect for special occasions, pan-searing, or beef Wellington.",
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 55.0,
      availableWeights: JSON.stringify([0.5, 1, 2]),
      category: "Beef",
    },
    {
      name: "Premium Ground Beef",
      description: "Freshly ground daily from premium cuts. 90% lean, perfect for gourmet burgers, bolognese, kofta kebabs, and homemade meatballs.",
      image: "https://images.unsplash.com/photo-1602473812169-0892a446dba4?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 18.0,
      availableWeights: JSON.stringify([0.5, 1, 2, 5]),
      category: "Beef",
    },
    {
      name: "T-Bone Steak",
      description: "Two steaks in one — strip and tenderloin divided by a T-shaped bone. A classic showstopper for the grill with unbeatable depth of flavor.",
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 38.0,
      availableWeights: JSON.stringify([0.8, 1, 1.5]),
      category: "Beef",
    },
    {
      name: "Beef Short Ribs",
      description: "Thick, meaty ribs ideal for slow braising or smoking. Fall-off-the-bone tender with deep, rich beefy flavor that's impossible to resist.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 28.0,
      availableWeights: JSON.stringify([1, 2, 3]),
      category: "Beef",
    },
    // ── LAMB ──
    {
      name: "Lamb Rack (French Cut)",
      description: "Elegantly frenched rack of lamb, trimmed to perfection. Tender, juicy chops ideal for quick high-heat searing or roasting.",
      image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 34.0,
      availableWeights: JSON.stringify([0.5, 1, 2]),
      category: "Lamb",
    },
    {
      name: "Leg of Lamb (Bone-In)",
      description: "A magnificent centerpiece for Sunday roasts. Slow-roast with garlic, rosemary, and olive oil for unforgettable flavor the whole family will love.",
      image: "https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 26.0,
      availableWeights: JSON.stringify([2, 3, 4]),
      category: "Lamb",
    },
    {
      name: "Lamb Shoulder",
      description: "Incredibly flavorful, forgiving cut that becomes pull-apart tender when slow-cooked. Great value, perfect for feeding a crowd.",
      image: "https://images.unsplash.com/photo-1607116667981-96e3a2a2e0b5?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 22.0,
      availableWeights: JSON.stringify([1, 2, 3]),
      category: "Lamb",
    },
    {
      name: "Lamb Mince",
      description: "Freshly ground from premium lamb cuts. Ideal for shepherd's pie, kofta kebabs, moussaka, and Mediterranean-inspired dishes.",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 19.0,
      availableWeights: JSON.stringify([0.5, 1, 2]),
      category: "Lamb",
    },
    // ── CHICKEN ──
    {
      name: "Whole Free-Range Chicken",
      description: "Organic free-range chicken, air-chilled for superior flavor and texture. Perfect for roasting, grilling, or spatchcocking to golden perfection.",
      image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 12.0,
      availableWeights: JSON.stringify([1.5, 2, 2.5]),
      category: "Chicken",
    },
    {
      name: "Chicken Breast Fillet",
      description: "Lean, versatile boneless skinless breasts. A weeknight essential — perfect for meal prep, stir-fries, salads, and healthy dinners.",
      image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 14.0,
      availableWeights: JSON.stringify([0.5, 1, 2]),
      category: "Chicken",
    },
    {
      name: "Chicken Thighs (Bone-In)",
      description: "Succulent bone-in thighs with crispy skin. More flavorful and juicier than breast — perfect for baking, braising, and BBQ.",
      image: "https://images.unsplash.com/photo-1598511796318-7b82ef4aeed4?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 10.0,
      availableWeights: JSON.stringify([0.5, 1, 2]),
      category: "Chicken",
    },
    {
      name: "Chicken Wings",
      description: "Plump, meaty wings ready for your favorite marinade. A game day essential — bake, fry, or grill to crispy, golden perfection.",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 8.0,
      availableWeights: JSON.stringify([1, 2, 3]),
      category: "Chicken",
    },
    // ── SAUSAGES ──
    {
      name: "Artisan Italian Sausages",
      description: "Hand-crafted with fennel, red pepper flakes, and Italian herbs. Coarse-ground in natural casings — bold, aromatic, and bursting with flavor.",
      image: "https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 22.0,
      availableWeights: JSON.stringify([0.5, 1, 2]),
      category: "Sausages",
    },
    {
      name: "Classic Beef Sausages",
      description: "Traditional beef sausages made with premium cuts and a secret blend of herbs and spices. A family breakfast staple since 1985.",
      image: "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 18.0,
      availableWeights: JSON.stringify([0.5, 1, 2]),
      category: "Sausages",
    },
    {
      name: "Merguez Lamb Sausages",
      description: "North African-inspired lamb sausages with cumin, harissa, and smoked paprika. Spicy, smoky, and unforgettable on the grill.",
      image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=80",
      pricePerKg: 24.0,
      availableWeights: JSON.stringify([0.5, 1]),
      category: "Sausages",
    },
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }

  console.log(`Seeded ${products.length} products successfully!`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
