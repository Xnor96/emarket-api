import express, { Express, Request, Response } from 'express'

import Sku from '../../models/sku';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        let sku: any = await Sku.find();
        res.send({
            sku: sku,
            totalElements: await sku.countDocuments(),
        });
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

export default router;