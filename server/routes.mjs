import express from "express"
import { add, getAll, getByName, remove } from "./products.mjs"

const router = express.Router()

router.get('/', (req, res) => {
    res.send('/products/name => un produit spé & /products => tout les produits')
})

router.get('/products', (req, res) => {
    res.send(getAll())
})

router.get('/products/:name', (req, res) => {
    const name = req.params.name
    res.send(getByName(req.params.name))
})

router.post('/products', (req, res) => {
    const { name, quantity } = req.body
    res.send(add(name, quantity))
})

router.delete('/products/:name', (req, res) => {
    let quantity = 0
    const name = req.params.name
    if (req.query.quantity) {
        quantity = req.query.quantity
        const check = remove(name, quantity)
        if (check) {
            res.send("delete success")
        } else {
            res.send("check name or quantity")
        }
    }
    else {
        res.send("cant delete without quantity")
    }


})

export default router