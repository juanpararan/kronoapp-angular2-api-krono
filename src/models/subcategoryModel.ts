export class SubcategoryModel {

    // Subcategories attributes
    id: number = 0;
    categories: Array<number> = [];
    name: string = '';
    is_active: boolean = false;
    image: string = '';
    description: string = '';
    date_start: string = '0000-00-00';
    date_end: string = '0000-00-00';

    constructor(attributes: {} = null) {
        this.attributes = attributes;
    }

    // set function: set attributes values of subcategories and 
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