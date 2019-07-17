import { DMTitle } from './DMTitle';
import { DMMessageCluster } from './DMMessageCluster';

export interface DMRoom{
    title:DMTitle;
    clusters:DMMessageCluster[];
}