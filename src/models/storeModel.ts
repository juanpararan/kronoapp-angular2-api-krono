export class StoreModel {

    // Store attributes
    id: number = 0;
    payments: Array<Object> = [];
    banners: Array<Object> = [];
    delivstores: Array<Object> = [];
    delivzones: Array<Object> = [];
    schedules: Array<Object> = [];
    specialdays: Object = {};
    lastorders: number = 0;
    name: string = '';
    logo: string = '';
    background_image: string = '';
    description: string = '';
    is_active: boolean = false;
    minimun: number = 0;
    rating: number = 0;
    location_lat: number = 0;
    location_long: number = 0;
    minimum_response: string = '';
    address_line_1: string = '';
    address_line_2: string = '';
    chainId: number = 0;
    cityId: number = 0;
    city_name: string = '';
    email_logo: string = '';
    foundations: Array<number> = [];

    constructor(attributes: {} = null) {
        this.attributes = attributes;
    }

    // set function: set attributes values of store and verify types 
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