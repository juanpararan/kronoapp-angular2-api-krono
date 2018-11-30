var DelivZoneModel = (function () {
    function DelivZoneModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Categories attributes
        this.id = 0;
        this.chainId = 0;
        this.name = '';
        this.deliv_cost = 0;
        this.storeId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(DelivZoneModel.prototype, "attributes", {
        // set function: set attributes values of categories and 
        //               verify types     
        set: 
        // set function: set attributes values of categories and
        //               verify types
        function (attributes) {
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
    return DelivZoneModel;
}());
export { DelivZoneModel };
//# sourceMappingURL=delivZoneModel.js.map