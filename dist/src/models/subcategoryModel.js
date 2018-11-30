var SubcategoryModel = (function () {
    function SubcategoryModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Subcategories attributes
        this.id = 0;
        this.categories = [];
        this.name = '';
        this.is_active = false;
        this.image = '';
        this.description = '';
        this.date_start = '0000-00-00';
        this.date_end = '0000-00-00';
        this.attributes = attributes;
    }
    Object.defineProperty(SubcategoryModel.prototype, "attributes", {
        // set function: set attributes values of subcategories and 
        //               verify types 
        set: 
        // set function: set attributes values of subcategories and
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
    return SubcategoryModel;
}());
export { SubcategoryModel };
//# sourceMappingURL=subcategoryModel.js.map