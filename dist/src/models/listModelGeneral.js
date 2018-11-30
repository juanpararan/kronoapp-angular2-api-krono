var ListModelGeneral = (function () {
    function ListModelGeneral(attributes) {
        if (attributes === void 0) { attributes = null; }
        // List attributes
        this.id = 0;
        this.date = '';
        this.name = '';
        this.total = 0;
        this.clientId = 0;
        this.storeId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(ListModelGeneral.prototype, "attributes", {
        // set function: set attributes values of basket and 
        //               verify types 
        set: 
        // set function: set attributes values of basket and
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
    return ListModelGeneral;
}());
export { ListModelGeneral };
//# sourceMappingURL=listModelGeneral.js.map