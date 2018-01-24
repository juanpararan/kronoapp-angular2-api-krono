export var BasketModel = (function () {
    function BasketModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Items attributes
        this.id = 0;
        this.items = [];
        this.chainId = 0;
        this.date = '';
        this.storeId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(BasketModel.prototype, "attributes", {
        // set function: set attributes values of basket and 
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
    return BasketModel;
}());
//# sourceMappingURL=basketModel.js.map