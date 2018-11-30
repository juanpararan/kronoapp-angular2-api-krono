var ListModelSpecific = (function () {
    function ListModelSpecific(attributes) {
        if (attributes === void 0) { attributes = null; }
        // List attributes
        this.id = 0;
        this.items = [];
        this.chainId = 0;
        this.date = '';
        this.name = '';
        this.total = 0;
        this.clientId = 0;
        this.storeId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(ListModelSpecific.prototype, "attributes", {
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
    return ListModelSpecific;
}());
export { ListModelSpecific };
//# sourceMappingURL=listModelSpecific.js.map