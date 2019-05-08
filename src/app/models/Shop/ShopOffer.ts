import { BuyType } from '../models';

export interface ShopOffer{
    name:string;
    price:Number;
    description:string;
    type:OfferType;
    buyType: BuyType;
}

export enum OfferType{
    ALL = "All",
    USER = "User",
    GROUP = "Group"
}