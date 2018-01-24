export var UserModel = (function () {
    function UserModel(attributes) {
        if (attributes === void 0) { attributes = null; }
        // user attributes
        this.id = 0;
        this.cities = [];
        this.name = '';
        this.email = '';
        this.document = 0;
        this.password = '';
        this.birthday = '';
        this.is_active = false;
        this.picture = '';
        this.gender = '';
        this.created = '';
        this.phone = '';
        this.applicationId = 0;
        this.firebase_uuid = '';
        this.lists = [];
        this.baskets = [];
        this.attributes = attributes;
    }
    Object.defineProperty(UserModel.prototype, "attributes", {
        // set function: set attributes values of categories and 
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
    return UserModel;
}());
//# sourceMappingURL=userModel.js.map