import { OktaAuthConstructor } from '../base/types';
import { MinimalOktaOAuthInterface } from '../oidc/types';
import { IdxTransactionManagerInterface, OktaAuthIdxConstructor, OktaAuthIdxOptions, MinimalOktaAuthIdxInterface } from './types';
import { IdxTransactionMeta } from './types/meta';
import { IdxStorageManagerInterface } from './types/storage';
export declare function mixinMinimalIdx<M extends IdxTransactionMeta = IdxTransactionMeta, S extends IdxStorageManagerInterface<M> = IdxStorageManagerInterface<M>, O extends OktaAuthIdxOptions = OktaAuthIdxOptions, TM extends IdxTransactionManagerInterface = IdxTransactionManagerInterface, TBase extends OktaAuthConstructor<MinimalOktaOAuthInterface<M, S, O, TM>> = OktaAuthConstructor<MinimalOktaOAuthInterface<M, S, O, TM>>>(Base: TBase): TBase & OktaAuthIdxConstructor<MinimalOktaAuthIdxInterface<M, S, O, TM>>;
