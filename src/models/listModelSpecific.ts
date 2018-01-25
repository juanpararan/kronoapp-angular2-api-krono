export class ListModelSpecific {

    // List attributes
    id: number = 0;
    items: Array<Object> = [];
    chainId: number = 0;
    date: string = '';
    name: string = '';
    total: number = 0;
    clientId: number = 0;
    storeId: number = 0;

    constructor(attributes: {} = null) {
        this.attributes = attributes;
    }

    // set function: set attributes values of basket and 
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