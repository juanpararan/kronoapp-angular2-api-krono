export var TagModel = (function () {
    function TagModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Tags attributes
        this.id = 0;
        this.name = '';
        this.position = 0;
        this.is_active = false;
        this.description = '';
        this.subcategoryId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(TagModel.prototype, "attributes", {
        // set function: set attributes values of tags and 
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
    return TagModel;
}());
//# sourceMappingURL=tagModel.js.map