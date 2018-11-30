var BannerModel = (function () {
    function BannerModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Banner attributes
        this.id = 0;
        this.image_banner = '';
        this.is_active = false;
        this.storeId = 0;
        this.attributes = attributes;
    }
    Object.defineProperty(BannerModel.prototype, "attributes", {
        // set function: set attributes values of categories and 
        //               verify types     
        set: 
        // set function: set attributes values of categories and
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
    return BannerModel;
}());
export { BannerModel };
//# sourceMappingURL=bannerModel.js.map