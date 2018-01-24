export class ItemModel {

    // Items attributes
    id: number;
    product_image_default: string;
    product_weight_default: number;
    product_description: string;
    product_name: string;
    product_unit_default: string;
    product_has_prescription: boolean;
    product_has_prom: boolean;
    product_rating: number;
    observation: string; 
    quantity: number;
    checked: boolean;
    cost: number;
    orderId: any;                    // revisar dsps
    basketId: any;
    listId: any;                     // revisar dsps
    productId: number;
    prescriptionId: number;      // revisar dsps

    constructor(attributes: {} = null) {
        this.attributes = attributes;
    }

    // set function: set attributes values of items and 
    //               verify types 
    set attributes(attributes: {}) {
        for (var k in attributes) {
            this[k] = attributes[k];
        }
    }

}