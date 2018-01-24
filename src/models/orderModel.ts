export class OrderModel {

    // Orders attributes
    id: number = 0;
    items: Array<any> = [];
    payments: Array<any> = [];
    prescriptions: Array<any> = [];
    client_name: string = '';
    chainId: number = 0;
    coupons: Array<any> = [];
    status: string = '';
    date_start: string = '';
    date_end: string = '';
    comments: string = null;
    address_line_1: string = null;
    address_line_2: string = null;
    deliv_order: string = '';
    schedule_day: string = '';
    schedule_hour_start: string = '';
    schedule_hour_end: string = '';
    order_number: number = 0;
    total: number = 0;
    cityId: number = 0;
    clientId: number = 0;
    zoneId: number = null;
    storeId: number = 0;
    foundationId: number = null;
    applicationId: number = 0;
    created: string = '';

    constructor(attributes: {} = null) {
        this.attributes = attributes;
    }

    // set function: set attributes values of orders and 
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