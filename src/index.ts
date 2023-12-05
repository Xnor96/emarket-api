require('dotenv-flow').config()
import * as express from 'express';
import * as cors from "cors";

//Debug
import { initDebug } from "./debug";

//routers
import userRouter from "./routers/users"
import skuRouter from "./routers/sku"
import cartRouter from "./routers/carts"

import database from "./services/datebase";
import { verifySession } from './services/session';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

database.connect();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send("STATUS: ON");
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

//Rutas API
app.use('/users', userRouter)
app.use('/skus', verifySession, skuRouter)
app.use('/carts', verifySession, cartRouter)


if (process.env.NODE_ENV == 'development') {
    initDebug()
}