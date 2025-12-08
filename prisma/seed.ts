import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Brugere
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  await prisma.user.createMany({
    data: [
      { firstname: "Tim", lastname: "Særensen", email: "admin@example.com", password: adminPassword, role: "ADMIN" },
      { firstname: "Bo", lastname: "Jesnen", email: "user@example.com", password: userPassword, role: "USER" },
    ]
  });

  // Kategorier
  const categories = await prisma.category.createMany({
    data: [
      { name: "Personbil" },
      { name: "Varevogn" },
      { name: "Lastbil" },
      { name: "Autocamper" },
      { name: "Andre" },
    ]
  });

  // Brands
  const brands = await prisma.brand.createMany({
    data: [
      { name: "Toyota" },
      { name: "BMW" },
      { name: "Mercedes" },
      { name: "Ford" },
      { name: "Volkswagen" },
    ]
  });

  // FuelTypes
  const fuelTypes = await prisma.fueltype.createMany({
    data: [
      { name: "Benzin" },
      { name: "Diesel" },
      { name: "El" },
      { name: "Hybrid" },
      { name: "Andre" },
    ]
  });

  // Hent IDs til biler
  const brandsList = await prisma.brand.findMany();
  const categoriesList = await prisma.category.findMany();
  const fuelTypesList = await prisma.fueltype.findMany();

  // Cars (10 stk.)
  await prisma.car.createMany({
    data: [
      { model: "Toyota Corolla", year: 2018, price: 150000, brandId: brandsList[0].id, categoryId: categoriesList[0].id, fueltypeId: fuelTypesList[0].id },
      { model: "BMW 320i", year: 2020, price: 350000, brandId: brandsList[1].id, categoryId: categoriesList[0].id, fueltypeId: fuelTypesList[0].id },
      { model: "Mercedes Sprinter", year: 2019, price: 420000, brandId: brandsList[2].id, categoryId: categoriesList[1].id, fueltypeId: fuelTypesList[1].id },
      { model: "Ford Transit", year: 2021, price: 380000, brandId: brandsList[3].id, categoryId: categoriesList[1].id, fueltypeId: fuelTypesList[1].id },
      { model: "VW Golf", year: 2017, price: 160000, brandId: brandsList[4].id, categoryId: categoriesList[0].id, fueltypeId: fuelTypesList[0].id },
      { model: "Mercedes Actros", year: 2022, price: 650000, brandId: brandsList[2].id, categoryId: categoriesList[2].id, fueltypeId: fuelTypesList[1].id },
      { model: "Toyota Yaris Hybrid", year: 2021, price: 200000, brandId: brandsList[0].id, categoryId: categoriesList[0].id, fueltypeId: fuelTypesList[3].id },
      { model: "BMW i3", year: 2020, price: 250000, brandId: brandsList[1].id, categoryId: categoriesList[0].id, fueltypeId: fuelTypesList[2].id },
      { model: "VW California", year: 2019, price: 550000, brandId: brandsList[4].id, categoryId: categoriesList[3].id, fueltypeId: fuelTypesList[1].id },
      { model: "Ford F150", year: 2018, price: 300000, brandId: brandsList[3].id, categoryId: categoriesList[4].id, fueltypeId: fuelTypesList[1].id },
    ],
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });