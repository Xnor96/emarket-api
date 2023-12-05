import express, { Request, Response, Router } from 'express'
import ShoppingCart from '../../models/shoppingCart';

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const headers: any = req.headers.data
        let cart = await ShoppingCart.find({ User: headers.user }).populate('Sku');
        res.send({
            cart: cart
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: 1, message: "Internal server error" })
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const headers: any = req.headers.data
        let m = await ShoppingCart.findOne({ Sku: req.body.Sku, User: headers.user })
        if (m != null) {
            m.quantity = m.quantity + 1
            await m.save()
        } else {
            let User = headers.user
            let {
                Sku,
                quantity
            } = req.body;
            let m = new ShoppingCart({
                User,
                Sku,
                quantity
            })
            await m.save()
        }
        res.send('Listo');
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.post('/minus', async (req: Request, res: Response) => {
    try {
        const headers: any = req.headers.data
        let m = await ShoppingCart.findOne({ _id : req.body.idCarts, User: headers.user })
        if (m.quantity != 1) {
            m.quantity = m.quantity - 1
            await m.save()
        } else {
            await ShoppingCart.deleteOne({ _id: req.body.idCarts })
        }
        res.send('Listo');
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

router.delete('/', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        res.send(req);
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

export default router;