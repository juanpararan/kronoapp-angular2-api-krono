import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var ProductModel = (function () {
    function ProductModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        this.loadedProduct = new BehaviorSubject(null);
        // Products attributes
        this.id = 0;
        this.images = [];
        this.datasheets = [];
        this.units = {};
        this.unit_default = {};
        this.tags = [];
        this.codebars = [];
        this.description = '';
        this.bestseller = 0;
        this.name = '';
        this.has_prom = false;
        this.has_prescription = false;
        this.percentage = 0;
        this.color_prim = '';
        this.color_sec = '';
        this.is_active = false;
        this.many_units = false;
        this.storeId = 0;
        this.chainId = 0;
        this.subcategories = [];
        this.position = 0;
        this.posid = '';
        this.inventory = 0;
        this.rating = 0;
        this.suppliers = [];
        this.attributes = attributes;
    }
    Object.defineProperty(ProductModel.prototype, "attributes", {
        // set function: set attributes values of products and verify types
        set: 
        // set function: set attributes values of products and verify types
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
    return ProductModel;
}());
export { ProductModel };
//# sourceMappingURL=productModel.js.map