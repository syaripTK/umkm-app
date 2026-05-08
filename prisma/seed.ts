import "dotenv/config";
import prisma from "../src/config/prisma";
import { getProvinces, getRegencies, getDistricts } from "idn-area-data";

async function main() {
  console.log(" Seeding dimulai...");

  // ============================================
  // SEED PROVINCES
  // ============================================
  console.log(" Seeding provinces...");
  await prisma.province.deleteMany();

  const provinces = await getProvinces();
  await prisma.province.createMany({
    data: provinces.map((p) => ({
      id: parseInt(p.code),
      name: p.name,
    })),
  });
  console.log(`    ${provinces.length} provinsi berhasil di-seed`);

  // ============================================
  // SEED CITIES (Regencies)
  // ============================================
  console.log("  Seeding cities...");
  await prisma.city.deleteMany();

  const regencies = await getRegencies();
  const cityData = regencies.map((r) => ({
    id: parseInt(r.code.replace(".", "")),
    provinceId: parseInt(r.province_code),
    name: r.name,
    type: r.name.startsWith("KOTA") ? "Kota" : "Kabupaten",
  }));

  const BATCH = 100;
  for (let i = 0; i < cityData.length; i += BATCH) {
    await prisma.city.createMany({ data: cityData.slice(i, i + BATCH) });
  }
  console.log(`   ${cityData.length} kota/kabupaten berhasil di-seed`);

  // ============================================
  // SEED DISTRICTS
  // ============================================
  console.log(" Seeding districts...");
  await prisma.district.deleteMany();

  const districts = await getDistricts();
  const districtData = districts.map((d) => ({
    id: parseInt(d.code.replace(/\./g, "")),
    cityId: parseInt(d.regency_code.replace(".", "")),
    name: d.name,
    postalCode: "00000",
  }));

  const BATCH_D = 500;
  for (let i = 0; i < districtData.length; i += BATCH_D) {
    await prisma.district.createMany({
      data: districtData.slice(i, i + BATCH_D),
    });
    process.stdout.write(
      `\r    ${Math.min(i + BATCH_D, districtData.length)} / ${districtData.length}`,
    );
  }
  console.log(`\n    ${districtData.length} kecamatan berhasil di-seed`);

  // ============================================
  // SEED CATEGORIES
  // ============================================
  console.log("  Seeding categories...");
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: [
      { name: "Makanan & Minuman", slug: "makanan-minuman", icon: "🍱" },
      { name: "Fashion & Pakaian", slug: "fashion-pakaian", icon: "👗" },
      { name: "Kerajinan Tangan", slug: "kerajinan-tangan", icon: "🎨" },
      { name: "Pertanian & Organik", slug: "pertanian-organik", icon: "🌿" },
      {
        name: "Kecantikan & Perawatan",
        slug: "kecantikan-perawatan",
        icon: "💄",
      },
      { name: "Elektronik & Gadget", slug: "elektronik-gadget", icon: "📱" },
      { name: "Perabotan Rumah", slug: "perabotan-rumah", icon: "🏠" },
      { name: "Kesehatan", slug: "kesehatan", icon: "💊" },
      { name: "Olahraga & Outdoor", slug: "olahraga-outdoor", icon: "⚽" },
      { name: "Buku & Alat Tulis", slug: "buku-alat-tulis", icon: "📚" },
      { name: "Mainan & Hobi", slug: "mainan-hobi", icon: "🧸" },
      { name: "Otomotif", slug: "otomotif", icon: "🔧" },
    ],
  });
  console.log("   12 kategori berhasil di-seed");

  // ============================================
  // SEED ADMIN DEFAULT
  // ============================================
  console.log(" Seeding admin default...");
  const bcrypt = await import("bcryptjs");
  const existing = await prisma.user.findUnique({
    where: { email: "admin@umkm.com" },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "admin@umkm.com",
        password: await bcrypt.hash("Admin123!", 10),
        role: "admin",
        isVerified: true,
      },
    });
    console.log("    Admin default: admin@umkm.com / Admin123!");
  } else {
    console.log("     Admin sudah ada, skip");
  }

  console.log("\n Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(" Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
