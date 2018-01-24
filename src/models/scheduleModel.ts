export class ScheduleModel {

    // schedule attributes
    id: number = 0;
    schedules: any = {};

    constructor(attributes: {} = null) {
        this.attributes = attributes;
    }

    // set function: set attributes values of schedules and 
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