export interface SearchUserInfo{
    publicUserid:string;
    email:string;
    username:string;
    open:Boolean;
    dateSignUp:Date;
    groups:UserInGroupSearch[];
}

export interface UserInGroupSearch{
    groupName:string;
    role:string;
    blocked:Boolean;
    joinTime:Date;
    roleTime:Date;
}