import { prisma } from "../lib/prisma";

const doctors = [
  { name: "Dr. Sarah Chen", specialization: "Cardiology", hospitalBranch: "City General Hospital", averageRating: 4.8 },
  { name: "Dr. James Wilson", specialization: "Neurology", hospitalBranch: "City General Hospital", averageRating: 4.6 },
  { name: "Dr. Maria Rodriguez", specialization: "Pediatrics", hospitalBranch: "City General Hospital", averageRating: 4.9 },
  { name: "Dr. David Kim", specialization: "Orthopedics", hospitalBranch: "City General Hospital", averageRating: 4.5 },
  { name: "Dr. Emily Thompson", specialization: "Dermatology", hospitalBranch: "City General Hospital", averageRating: 4.7 },
  { name: "Dr. Michael Patel", specialization: "Ophthalmology", hospitalBranch: "Westside Medical Center", averageRating: 4.4 },
  { name: "Dr. Jennifer Lee", specialization: "Psychiatry", hospitalBranch: "Westside Medical Center", averageRating: 4.3 },
  { name: "Dr. Robert Garcia", specialization: "Pulmonology", hospitalBranch: "Westside Medical Center", averageRating: 4.6 },
  { name: "Dr. Lisa Anderson", specialization: "Endocrinology", hospitalBranch: "Westside Medical Center", averageRating: 4.5 },
  { name: "Dr. John Martinez", specialization: "Gastroenterology", hospitalBranch: "Westside Medical Center", averageRating: 4.2 },
  { name: "Dr. Anna Kowalski", specialization: "Rheumatology", hospitalBranch: "Northside Health Clinic", averageRating: 4.7 },
  { name: "Dr. Thomas Brown", specialization: "Urology", hospitalBranch: "Northside Health Clinic", averageRating: 4.1 },
  { name: "Dr. Rachel Nguyen", specialization: "Oncology", hospitalBranch: "Northside Health Clinic", averageRating: 4.8 },
  { name: "Dr. Christopher Taylor", specialization: "ENT", hospitalBranch: "Northside Health Clinic", averageRating: 4.3 },
  { name: "Dr. Amanda White", specialization: "Allergy & Immunology", hospitalBranch: "Northside Health Clinic", averageRating: 4.5 },
  { name: "Dr. Kevin O'Brien", specialization: "Nephrology", hospitalBranch: "Eastside Medical Plaza", averageRating: 4.4 },
  { name: "Dr. Stephanie Hall", specialization: "Gynecology", hospitalBranch: "Eastside Medical Plaza", averageRating: 4.9 },
  { name: "Dr. Daniel Park", specialization: "Hematology", hospitalBranch: "Eastside Medical Plaza", averageRating: 4.2 },
  { name: "Dr. Laura Mitchell", specialization: "Infectious Disease", hospitalBranch: "Eastside Medical Plaza", averageRating: 4.6 },
  { name: "Dr. William Davis", specialization: "Physical Medicine", hospitalBranch: "Eastside Medical Plaza", averageRating: 4.3 },
  { name: "Dr. Patricia Lopez", specialization: "Cardiology", hospitalBranch: "Southside Wellness Center", averageRating: 4.7 },
  { name: "Dr. Joseph Miller", specialization: "Neurology", hospitalBranch: "Southside Wellness Center", averageRating: 4.5 },
  { name: "Dr. Susan Clark", specialization: "Pediatrics", hospitalBranch: "Southside Wellness Center", averageRating: 4.8 },
  { name: "Dr. Richard Wright", specialization: "Orthopedics", hospitalBranch: "Southside Wellness Center", averageRating: 4.0 },
  { name: "Dr. Michelle Turner", specialization: "Dermatology", hospitalBranch: "Southside Wellness Center", averageRating: 4.6 },
];

async function seedDoctors() {
  console.log("Seeding doctors...");

  for (const doc of doctors) {
    const existing = await prisma.doctor.findFirst({
      where: { name: doc.name },
    });

    if (existing) {
      if (existing.specialization !== doc.specialization) {
        await prisma.doctor.update({
          where: { id: existing.id },
          data: {
            specialization: doc.specialization,
          },
        });
        console.log(`  Updated ${doc.name}`);
      } else {
        console.log(`  Skipping ${doc.name} (no changes)`);
      }
    } else {
      await prisma.doctor.create({
        data: {
          name: doc.name,
          specialization: doc.specialization,
          hospitalBranch: doc.hospitalBranch,
          averageRating: doc.averageRating,
        },
      });
      console.log(`  Created ${doc.name}`);
    }
  }

  console.log(`\nDone!`);
  await prisma.$disconnect();
}

seedDoctors().catch((err) => {
  console.error("Seeder failed:", err);
  prisma.$disconnect();
  process.exit(1);
});
