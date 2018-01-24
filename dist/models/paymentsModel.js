export var PaymentsModel = (function () {
    function PaymentsModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // payments attributes
        this.id = 0;
        this.pay_type = '';
        this.attributes = attributes;
    }
    Object.defineProperty(PaymentsModel.prototype, "attributes", {
        // set function: set attributes values of payments and 
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
    return PaymentsModel;
}());
//# sourceMappingURL=paymentsModel.js.map