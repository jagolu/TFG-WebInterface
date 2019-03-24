import { SocialType } from 'src/app/components/logSign/social-button/social-button.component';

export interface SocialLog{
    authToken:string;
    email:string;
    firstName:string;
    id:string;
    socialProvider:SocialType;
}