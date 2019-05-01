export interface ShopOffer{
    name:string;
    price:Number;
    description:string;
    type:OfferType
}

export enum OfferType{
    ALL = "All",
    USER = "User",
    GROUP = "Group"
}