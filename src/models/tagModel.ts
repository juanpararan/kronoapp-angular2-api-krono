export class TagModel {

    // Tags attributes
    id: number = 0;
    name: string = '';
    position: number = 0;
    is_active: boolean = false;
    description: string = '';
    subcategoryId: number = 0;

    constructor(attributes: {} = null) {
        this.attributes = attributes;
    }

    // set function: set attributes values of tags and 
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