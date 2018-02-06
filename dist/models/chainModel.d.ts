export declare class ChainModel {
    name: string;
    logo: string;
    id: number;
    email: string;
    color_prim: string;
    color_sec: string;
    description: string;
    applications: Array<number>;
    suppliers: Array<number>;
    is_active: boolean;
    stores: Array<Object>;
    chainId: number;
    constructor(attributes?: {});
    attributes: {};
}
