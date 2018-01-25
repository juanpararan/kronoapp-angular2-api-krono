import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ProductModel {

    loadedProduct = new BehaviorSubject(null);
    // Products attributes
    id: number = 0;
    images: Array<Object> = [];
    datasheets: Array<Object> = [];
    units: Object = {};
    unit_default: Object = {};
    tags: Array<number> = [];
    codebars: Array<string> = [];
    description: string = '';
    bestseller: number = 0;
    name: string = '';
    has_prom: boolean = false;
    has_prescription: boolean = false;
    percentage: number = 0;
    color_prim: string = '';
    color_sec: string = '';
    is_active: boolean = false;
    many_units: boolean = false;
    storeId: number = 0;
    chainId: number = 0;
    subcategories: Array<number> = [];
    position: number = 0;
    posid: string = '';
    inventory: number = 0;
    rating: number = 0;
    suppliers: Array<number> = [];

    constructor(attributes: {} = null) {
        this.attributes = attributes;
    }

    // set function: set attributes values of products and verify types
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
