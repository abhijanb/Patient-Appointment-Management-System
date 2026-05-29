import { prisma } from "../lib/prisma"

const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
const consultationTypes: ('IN_PERSON' | 'TELEHEALTH')[] = ['IN_PERSON', 'TELEHEALTH']

function getDates(days: number) {
  const dates: string[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < days; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    dates.push(d.toISOString().split('T')[0]!)
  }
  return dates
}

async function seedSlots() {
  console.log("Seeding schedule slots...")

  const doctors = await prisma.doctor.findMany()
  if (doctors.length === 0) {
    console.log("No doctors found. Run seed:doctors first.")
    await prisma.$disconnect()
    return
  }
  console.log(`Found ${doctors.length} doctors`)

  const dates = getDates(10)
  let created = 0
  let skipped = 0

  for (const doctor of doctors) {
    for (const dateStr of dates) {
      const availableDate = new Date(dateStr)
      availableDate.setHours(0, 0, 0, 0)

      for (const timeSlot of timeSlots) {
        const existing = await prisma.schedule.findFirst({
          where: {
            doctorId: doctor.id,
            availableDate,
            timeSlot,
          },
        })

        if (existing) {
          skipped++
          continue
        }

        const consultationType = consultationTypes[Math.floor(Math.random() * consultationTypes.length)]!

        await prisma.schedule.create({
          data: {
            doctorId: doctor.id,
            availableDate,
            timeSlot,
            consultationType,
            status: 'AVAILABLE',
          },
        })
        created++
      }
    }
  }

  console.log(`Created ${created} slots, skipped ${skipped} existing.`)
  await prisma.$disconnect()
}

seedSlots().catch((err) => {
  console.error("Seeder failed:", err)
  prisma.$disconnect()
  process.exit(1)
})
