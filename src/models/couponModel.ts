export class CouponModel {

    // Coupon attributes
    id: number = 0;
    code: string = '';
    name: string = '';
    description: string = '';
    percentage: number = 0;
    is_active: boolean = false;
    date_start: string = '';
    date_end: string = '';
    image: string = '';
    coupon_type: string = '';
    visible: boolean = false;
    storeId: number = 0;
    rules: Array<any> = [];
    products: Array<any> = [];

    constructor(attributes: {} = null) {
        this.attributes = attributes;
    }

    // set function: set attributes values of coupons and 
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