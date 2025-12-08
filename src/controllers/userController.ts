import { Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";

/**
 * Method Get Records
 * @param req 
 * @param res 
 * @returns Array
 */
export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany();
    return res.status(200).json(data);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * Method Get Record
 * @param req 
 * @param res 
 * @returns Object
 */
export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(404).json({ error: 'ID is missing' });
  }

  try {
    const data = await prisma.user.findUnique({
      where: { id },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

/**
 * Method Create Record
 * @param req 
 * @param res 
 * @returns Object
 */
export const createRecord = async (req: Request, res: Response) => {
  return
  const { firstname, lastname, email, password, role, isActive } = req.body;

  if (!firstname || !lastname || !email || !password || !role || !isActive) {
    return res.status(404).json({ error: 'All data is required' })
  }

  try {
    const hashedPasword = await bcrypt.hash(password, 10);

    const data = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPasword,
        role,
        isActive
      }
    })
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

/**
 * Method Update Record
 * @param req 
 * @param res 
 * @returns Object
 */
export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(404).json({ error: 'ID is missing' })
  }

  const { firstname, lastname, email, role, isActive } = req.body;

  if (!firstname || !lastname || !email || !role || !isActive) {
    return res.status(404).json({ error: 'All data is required' })
  }
  try {
    const data = await prisma.user.update({
      where: { id },
      data: {
        firstname,
        lastname,
        email,
        role,
        isActive: Boolean(isActive)
      }

    })
  }
}

/**
 * Method Delete Record
 * @param req 
 * @param res 
 * @returns Object
 */
export const deleteRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (!id) {
      return res.status(400).json({ error: 'ID is missing' });
    }

    try {
      const data = await prisma.user.delete({
        where: { id }
      });
      return res.status(200).json({
        message: 'Record deleted',
        deleteId: id
      })
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete record' });
    }
  }