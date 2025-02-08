import { IAPIFunction } from './types';
import { ProfileTransaction, ProfileSchemaTransaction } from './transactions';
/**
 * @scope: okta.myAccount.profile.read
 */
export declare const getProfile: IAPIFunction<ProfileTransaction>;
/**
 * @scope: okta.myAccount.profile.manage
 */
export declare const updateProfile: IAPIFunction<ProfileTransaction>;
/**
 * @scope: okta.myAccount.profile.read
 */
export declare const getProfileSchema: IAPIFunction<ProfileSchemaTransaction>;
