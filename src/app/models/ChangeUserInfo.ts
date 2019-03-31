import { ValueConverter } from '@angular/compiler/src/render3/view/template';

export interface ChangeUserInfo{
    nickname?:string;
    oldPassword?:string;
    newPassword?:string;
    repeatNewPassword?:string;
    image?:string;
}