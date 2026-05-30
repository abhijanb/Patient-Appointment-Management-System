import { prisma } from "../lib/prisma";
import env from "../config/env";
import bcrypt from "bcryptjs";

async function seedAdmin() {
  console.log("Seeding admin user...");
  console.log(`  Email: ${env.adminEmail}`);

  const user = await prisma.user.upsert({
    where: { email: env.adminEmail },
    update: {
      passwordHash: bcrypt.hashSync(env.adminPassword, 10),
      role: "ADMIN",
    },
    create: {
      email: env.adminEmail,
      passwordHash: bcrypt.hashSync(env.adminPassword, 10),
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log(`  Admin user ${user.id}: ${user.email} (${user.role})`);
  console.log("Done!");
  await prisma.$disconnect();
}

seedAdmin().catch((err) => {
  console.error("Seeder failed:", err);
  prisma.$disconnect();
  process.exit(1);
});
