import { Router } from "express";
import { productValidation } from "../middelwares/products.middelwares.js";

export const router = Router()

router.get("/",productValidation, (req, res)=> {
    res.status(200).json([
        {
            name: "Mobile",
            price : 15000
        },
        {
            name: "TV",
            price : 25000
        },
    ])
})