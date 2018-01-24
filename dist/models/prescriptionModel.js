export var PrescriptionModel = (function () {
    function PrescriptionModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Prescription attributes
        this.id = 0;
        this.image = '';
        this.userId = 0;
        this.orderId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(PrescriptionModel.prototype, "attributes", {
        // set function: set attributes values of categories and 
        //               verify types     
        set: function (attributes) {
            for (var k in attributes) {
                if (typeof attributes[k] == typeof this[k]) {
                    this[k] = attributes[k];
                }
                else {
                    this[k] = null;
                    console.log("La variable", k, "no posee el tipo correcto o requerido.");
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return PrescriptionModel;
}());
//# sourceMappingURL=prescriptionModel.js.map