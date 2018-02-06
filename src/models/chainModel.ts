export class ChainModel {

    name: string = '';
    logo: string = '';
    id: number = 0;
    email: string = '';
    color_prim: string = '';
    color_sec: string = '';
    description: string = '';
    applications: Array<number> = [];
    suppliers: Array<number> = [];
    is_active: boolean = false;
    stores: Array<Object> = [];
    chainId: number = 0;

    constructor(attributes: {} = null) {
        this.attributes = attributes;
    }

    // set function: set attributes values of categories and 
    //               verify types     
    set attributes(attributes: {}) {
        for (var k in attributes) {
            if (typeof attributes[k] == typeof this[k]) {
                this[k] = attributes[k];
            }
            else {
                this[k] = null;
                console.log("La variable", k, 
                    "no posee el tipo correcto o requerido.");
            }
        }
    }    
    
}