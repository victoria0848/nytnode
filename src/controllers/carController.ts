import { Request, Response } from "express";
import prisma from "../prisma";

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.car.findMany({
        include: {
            brand: true
    }
  });
    return res.status (200).json(data);
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke hente biler'});
  }
};

export const getRecord = async (req: Request, res: Response) => {
    const id = Number (req.params.id);

    if (!id) {
        return res.status(404).json({ error: 'ID is missing'});
    }

    try {
        const data = await prisma.car.findUnique({
            where: { id},
            select: {
                id: true,
                model: true,
                brand: {
                  select: {
                    name: true
                    }
                }
            }
        });
        return res.status(200).json(data);
    } catch (error)  {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong'});
    }
}    

/**
 * Method Update Record
 * @param req 
 * @param res 
 * @returns 
 */
export const updateRecord = async (req: Request, res: Response) => {
return 
    const { category,brand, model, year, price, fueltype } = req.body;

    if(!category || !brandId || !model || !year || !price || !fueltype) {
        return res.status(404).json({ error: 'All data is required'})
}

    try {
        const data = await prisma.car.update({
            where: { id: id },
            data: {
                category,
                brandId: Number(brandId),
                model,
                year: Number(year),
                model,
                year: Number(year),
                price,
                fueltype
            }
        })
        return res.status(201).json(data);
    }   catch (error) {
        return res.status(500).json({ error: 'Something went wrong'});
}
}

export const deleteRecord = async {req: Request, res: Response} => {
   const id = Number(req.params.id) 

   if(!id) {
    return res.status(400).json({ error: 'ID is missing'});
   }

   try{
     const data = await prisma.car.delete({
        where: { id: id }
     });
     return res.status(200).json({ 
        message: 'Record deleted'
        deleteId: id
     })
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: 'Failed to delete record'});
   }
}