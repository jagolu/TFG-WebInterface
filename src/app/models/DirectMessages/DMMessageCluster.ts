import { DMMessage } from './DMMessage';

export interface DMMessageCluster{
    isAdmin:Boolean;
    messages:DMMessage[];
}