import { prisma } from "./prisma";

// Types of allowed models and their ownership fields
type Model = "hostel" | "employee" | "room";

/**
 * Verifies if the given userId owns the entity of given model and id.
 * - Hostel: hostel.ownerId === userId
 * - Room: room.ownerId === userId
 * - Employee: employee.employee_of.id === userId
 */
export async function verifyOwnership(model: Model, id: string, userId: string) {
  if (model === "hostel") {
    const hostel = await prisma.hostel.findUnique({ where: { id } });
    return hostel && hostel.ownerId === userId ? hostel : null;
  }

  if (model === "room") {
    const room = await prisma.room.findUnique({ where: { id } });
    return room && room.ownerId === userId ? room : null;
  }

  if (model === "employee") {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { employee_of: true },
    });
    return employee && employee.employee_of.id === userId ? employee : null;
  }

  return null;
}
