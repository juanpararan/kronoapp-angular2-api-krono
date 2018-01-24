export var ItemModel = (function () {
    function ItemModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        this.attributes = attributes;
    }
    Object.defineProperty(ItemModel.prototype, "attributes", {
        // set function: set attributes values of items and 
        //               verify types 
        set: function (attributes) {
            for (var k in attributes) {
                this[k] = attributes[k];
            }
        },
        enumerable: true,
        configurable: true
    });
    return ItemModel;
}());
//# sourceMappingURL=itemModel.js.map