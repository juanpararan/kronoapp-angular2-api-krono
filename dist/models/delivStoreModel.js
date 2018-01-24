export var DelivStoreModel = (function () {
    function DelivStoreModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // delivery store attributes
        this.id = 0;
        this.deliv_store = '';
        this.extra_info = '';
        this.map_image = '';
        this.storeId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(DelivStoreModel.prototype, "attributes", {
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
    return DelivStoreModel;
}());
//# sourceMappingURL=delivStoreModel.js.map