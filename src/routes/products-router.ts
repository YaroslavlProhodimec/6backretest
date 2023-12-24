import {Router,Request,Response} from "express";
import {productsRepository} from "../repositories/products-repository";

export const productsRouter = Router({})

productsRouter.get('/',async (req:Request,res:Response)=>{
    const products = await  productsRepository.getProducts()

        res.send(products);

})
productsRouter.post('/',  async(req: Request, res: Response) => {
    const newProject  = await productsRepository.createProduct(req.body)
    // res.status(201).send(newProject)
    if(newProject){
        res.status(201).send(newProject)
    } else {
        res.sendStatus(404)
    }
})