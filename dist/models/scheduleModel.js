export var ScheduleModel = (function () {
    function ScheduleModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // schedule attributes
        this.id = 0;
        this.schedules = {};
        this.attributes = attributes;
    }
    Object.defineProperty(ScheduleModel.prototype, "attributes", {
        // set function: set attributes values of schedules and 
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
    return ScheduleModel;
}());
//# sourceMappingURL=scheduleModel.js.map