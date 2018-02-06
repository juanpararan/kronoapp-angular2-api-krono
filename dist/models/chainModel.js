export var ChainModel = (function () {
    function ChainModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        this.name = '';
        this.logo = '';
        this.id = 0;
        this.email = '';
        this.color_prim = '';
        this.color_sec = '';
        this.description = '';
        this.applications = [];
        this.suppliers = [];
        this.is_active = false;
        this.stores = [];
        this.chainId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(ChainModel.prototype, "attributes", {
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
    return ChainModel;
}());
//# sourceMappingURL=chainModel.js.map