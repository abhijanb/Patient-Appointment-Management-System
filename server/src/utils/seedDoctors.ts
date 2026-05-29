import fs from "fs"
import path from "path"
import { prisma } from "../lib/prisma"

const IMAGE_FILE = "1779969158555-8gh20t7hn7i.jpg"

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
]

async function seedDoctors() {
  console.log("Seeding doctors...")

  const uploadDir = path.join("uploads", "doctor")
  fs.mkdirSync(uploadDir, { recursive: true })

  const imagePath = path.join(uploadDir, IMAGE_FILE)
  if (!fs.existsSync(imagePath)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="100" fill="#00355f"/>
  <text x="100" y="120" font-family="Arial,sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle">MD</text>
</svg>`
    fs.writeFileSync(imagePath, svg)
    console.log(`  Created image: ${IMAGE_FILE}`)
  }

  for (const doc of doctors) {
    const imageUrl = `uploads/doctor/${IMAGE_FILE}`

    const existing = await prisma.doctor.findFirst({
      where: { name: doc.name },
    })

    if (existing) {
      if (existing.imageUrl !== imageUrl || existing.specialization !== doc.specialization) {
        await prisma.doctor.update({
          where: { id: existing.id },
          data: {
            specialization: doc.specialization,
            imageUrl,
          },
        })
        console.log(`  Updated ${doc.name}`)
      } else {
        console.log(`  Skipping ${doc.name} (no changes)`)
      }
    } else {
      await prisma.doctor.create({
        data: {
          name: doc.name,
          specialization: doc.specialization,
          hospitalBranch: doc.hospitalBranch,
          averageRating: doc.averageRating,
          imageUrl,
        },
      })
      console.log(`  Created ${doc.name}`)
    }
  }

  console.log(`\nDone!`)
  await prisma.$disconnect()
}

seedDoctors().catch((err) => {
  console.error("Seeder failed:", err)
  prisma.$disconnect()
  process.exit(1)
})
