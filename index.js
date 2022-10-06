const fs = require('fs')

class Contenedor{
    constructor(archive){
        this.archive= archive;
        this.products = [];
    }

    async read(){
        try{
            let dB = await fs.promises.readFile(this.archive, 'utf-8')
            return dB
        }catch(e){
            console.log("error")
        }
    }

    getId(){
        const length = this.products.length
        if(length < 1) return 0
        return this.products[this.products.length - 1].id
    } 

    async save(product){
        const id = this.getId()
        this.products.push({
            ...product, ...{id: id + 1}
        })
        try{
            await  fs.promises.writeFile(this.archive, JSON.stringify(this.products, null, 4))
        }catch(e){
            console.error("No se pudo guardar" + e)
        }
    }

    getById(id){
        let resultId = this.products.find(prod => prod.id == id)
        return resultId
    }

    async getAll(){
        return this.products
    }

    deleteById(id){
        const index = this.products.findIndex(prod => prod.id == id)
        this.products.splice(index, 1)
    }

    async deleteAll(){
        await fs.promises.writeFile(this.archive, "[]")
    }

}

const contenedor = new Contenedor("products.txt")

contenedor.save({"name": "batman", "precio": 1450 })
contenedor.save({"name": "shingeki no kioyin", "precio": 2900 })
contenedor.save({"name": "the walking dead", "precio": 1500 })
 
module.exports = Contenedor