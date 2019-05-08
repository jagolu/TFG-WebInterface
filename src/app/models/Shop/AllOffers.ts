import { ShopOffer, BuyType } from "../models";
import { OfferType } from './ShopOffer';

export class Offers{
    /**
     * All the offers
     */
    private static AllOffers:ShopOffer[] = [
        {
            "name": "GROUP CAPACITY + 5 members",
            "price": 1,
            "description": "Add 5 members of capacity to your actual group capacity!",
            "type": OfferType.GROUP,
            "buyType": BuyType.MOREGROUPCAPACITY_5
        },
        {
            "name": "GROUP CAPACITY + 25 members",
            "price": 5,
            "description": "Add 25 members of capacity to your actual group capacity!",
            "type": OfferType.GROUP,
            "buyType": BuyType.MOREGROUPCAPACITY_25
        },
        {
            "name": "GROUP CAPACITY + 50 members",
            "price": 10,
            "description": "Add 50 members of capacity to your actual group capacity!",
            "type": OfferType.GROUP,
            "buyType": BuyType.MOREGROUPCAPACITY_50
        },
        {
            "name": "PRueba aasdfas",
            "price": 10,
            "description": "Add 50 members of capacity to your actual group capacity!",
            "type": OfferType.USER,
            "buyType": BuyType.MOREGROUPCAPACITY_50
        }
    ];


    /**
     * Function to get the buy info
     * @param BuyType type. The id type of the buy 
     * @return The buy info
     */
    public static getOffer(type:BuyType): ShopOffer{
        let offer = this.AllOffers.filter(offer=>{
            return offer.buyType == type;
        });

        console.log(offer);

        return offer.length == 1 ? offer[0] : {
            "name": "",
            "price": -1,
            "description" : "",
            "type": null,
            "buyType": null
        };
    }

    public static getAllOffers():ShopOffer[] {
        return this.AllOffers;
    }
}