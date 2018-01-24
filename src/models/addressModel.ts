export class AddressModel {

    // Address attributes
    id: number = 0;
    line_1: string = '';
    line_2: string = '';
    userId: number = 0;

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