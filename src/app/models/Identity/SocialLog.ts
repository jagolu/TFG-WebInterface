export interface SocialLog{
    authToken:string;
    email:string;
    firstName:string;
    id:string;
    socialProvider:SocialType;
    urlImage:string;
    password?:string;
}

export enum SocialType{
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK"
}