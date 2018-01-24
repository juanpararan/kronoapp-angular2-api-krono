export class UserModel {

    // user attributes
    id: number = 0;
    cities: Array<any> = [];
    name: string = '';
    email: string = '';
    document: number = 0;
    password: string = '';
    birthday: string = '';
    is_active: boolean = false;
    picture: string = '';
    gender: string = '';
    created: string = '';
    phone: string = '';
    applicationId: number = 0;
    firebase_uuid: string = '';
    lists: Array<any> = [];
    baskets: Array<number> = [];

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