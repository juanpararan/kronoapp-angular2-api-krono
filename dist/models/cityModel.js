export var CityModel = (function () {
    function CityModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Items attributes
        this.id = 0;
        this.country = '';
        this.state = '';
        this.name = '';
        this.attributes = attributes;
    }
    Object.defineProperty(CityModel.prototype, "attributes", {
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
    return CityModel;
}());
//# sourceMappingURL=cityModel.js.map