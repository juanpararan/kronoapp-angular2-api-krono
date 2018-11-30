var CouponModel = (function () {
    function CouponModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Coupon attributes
        this.id = 0;
        this.code = '';
        this.name = '';
        this.description = '';
        this.percentage = 0;
        this.is_active = false;
        this.date_start = '';
        this.date_end = '';
        this.image = '';
        this.coupon_type = '';
        this.visible = false;
        this.storeId = 0;
        this.rules = [];
        this.products = [];
        this.attributes = attributes;
    }
    Object.defineProperty(CouponModel.prototype, "attributes", {
        // set function: set attributes values of coupons and 
        //               verify types     
        set: 
        // set function: set attributes values of coupons and
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
    return CouponModel;
}());
export { CouponModel };
//# sourceMappingURL=couponModel.js.map