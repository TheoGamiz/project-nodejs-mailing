import express from "express"
import { add, getAll, getByName, remove } from "./products.mjs"
import { client } from "./elephantsql.mjs"

const router = express.Router()


router.get('/', (req, res) => {
    res.send('test')
})

router.get('/a', async (req, res) => {
    try {
        const results = await client.query('SELECT * FROM your_table');
        res.json(results);
    } catch (err) {
        console.log(err);
    }
})


router.get('/products', (_, res) => {
    res.send(getAll())
})


router.post('/products', (req, res) => {
    const { name, quantity } = req.body
    res.send(add(name, quantity))
})




router.get('/products/:name', (req, res) => {
    const name = req.params.name
    res.send(getByName(req.params.name))
})



router.delete('/products/:name', (req, res) => {
    let quantity = 0
    const name = req.params.name
    if (req.query.quantity) {
        quantity = req.query.quantity
        const check = remove(name, quantity)
        if (check) {
            res.send("success")
        } else {
            res.send("verifier vos inputs")
        }
    }
    else {
        res.send("enter a quantity")
    }


})

export default router