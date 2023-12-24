import {productsCollection} from "../index";

export const productsRepository = {

     async getProducts(){
         try {

            return productsCollection.find({}).toArray()
         } catch (error) {
             console.error('Error creating product:', error);
             return null;
         }
    },

    async createProduct(title: string) {
        try {
            if (!title) {
                return null;
            }

            const result = await productsCollection.insertOne({ title });

            return {
                title: title,
                _id: result.insertedId,
            };
        } catch (error) {
            console.error('Error creating product:', error);
            return null;
        }
    }


}