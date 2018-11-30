export declare class CouponModel {
    id: number;
    code: string;
    name: string;
    description: string;
    percentage: number;
    is_active: boolean;
    date_start: string;
    date_end: string;
    image: string;
    coupon_type: string;
    visible: boolean;
    storeId: number;
    rules: Array<Object>;
    products: Array<Object>;
    constructor(attributes?: {});
    attributes: {};
}
