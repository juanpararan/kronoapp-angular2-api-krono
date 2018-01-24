export var OrderModel = (function () {
    function OrderModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // Orders attributes
        this.id = 0;
        this.items = [];
        this.payments = [];
        this.prescriptions = [];
        this.client_name = '';
        this.chainId = 0;
        this.coupons = [];
        this.status = '';
        this.date_start = '';
        this.date_end = '';
        this.comments = null;
        this.address_line_1 = null;
        this.address_line_2 = null;
        this.deliv_order = '';
        this.schedule_day = '';
        this.schedule_hour_start = '';
        this.schedule_hour_end = '';
        this.order_number = 0;
        this.total = 0;
        this.cityId = 0;
        this.clientId = 0;
        this.zoneId = null;
        this.storeId = 0;
        this.foundationId = null;
        this.applicationId = 0;
        this.created = '';
        this.attributes = attributes;
    }
    Object.defineProperty(OrderModel.prototype, "attributes", {
        // set function: set attributes values of orders and 
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
    return OrderModel;
}());
//# sourceMappingURL=orderModel.js.map