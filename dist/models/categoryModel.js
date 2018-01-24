export var CategoryModel = (function () {
    function CategoryModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Categories attributes
        this.id = 0;
        this.chainId = 0;
        this.name = '';
        this.position = 0;
        this.is_active = false;
        this.image = '';
        this.description = '';
        this.has_promotion = false;
        this.storeId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(CategoryModel.prototype, "attributes", {
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
    return CategoryModel;
}());
//# sourceMappingURL=categoryModel.js.map