var StoreModel = (function () {
    function StoreModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Store attributes
        this.id = 0;
        this.payments = [];
        this.banners = [];
        this.delivstores = [];
        this.delivzones = [];
        this.schedules = [];
        this.specialdays = {};
        this.lastorders = 0;
        this.name = '';
        this.logo = '';
        this.background_image = '';
        this.description = '';
        this.is_active = false;
        this.minimun = 0;
        this.rating = 0;
        this.location_lat = 0;
        this.location_long = 0;
        this.minimum_response = '';
        this.address_line_1 = '';
        this.address_line_2 = '';
        this.chainId = 0;
        this.cityId = 0;
        this.city_name = '';
        this.email_logo = '';
        this.foundations = [];
        this.attributes = attributes;
    }
    Object.defineProperty(StoreModel.prototype, "attributes", {
        // set function: set attributes values of store and verify types 
        set: 
        // set function: set attributes values of store and verify types
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
    return StoreModel;
}());
export { StoreModel };
//# sourceMappingURL=storeModel.js.map