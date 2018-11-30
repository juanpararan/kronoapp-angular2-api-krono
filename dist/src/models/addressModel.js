var AddressModel = (function () {
    function AddressModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Address attributes
        this.id = 0;
        this.line_1 = '';
        this.line_2 = '';
        this.userId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(AddressModel.prototype, "attributes", {
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
    return AddressModel;
}());
export { AddressModel };
//# sourceMappingURL=addressModel.js.map