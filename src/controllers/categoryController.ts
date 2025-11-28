import { Request, Response } from "express";
import prisma from "../prisma";

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "desc", // faldende efter navn
      },
    });

    return res.json(data);
  } catch (error) {
    console.error("Category GET error:", error);
    return res.status(500).json({ error: "DB fejl: Kunne ikke hente categories" });
  }
};
