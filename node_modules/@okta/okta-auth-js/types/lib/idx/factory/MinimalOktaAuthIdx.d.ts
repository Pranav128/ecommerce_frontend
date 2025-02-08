import { OktaAuthOptionsConstructor } from '../../base/types';
import { StorageManagerConstructor } from '../../storage/types';
import { IdxTransactionManagerInterface, MinimalOktaAuthIdxInterface, OktaAuthIdxConstructor } from '../types/api';
import { IdxTransactionMeta } from '../types/meta';
import { IdxStorageManagerInterface } from '../types/storage';
import { OktaAuthIdxOptions } from '../types/options';
import { TransactionManagerConstructor, MinimalOktaOAuthInterface } from '../../oidc/types';
export declare function createMinimalOktaAuthIdx<M extends IdxTransactionMeta = IdxTransactionMeta, S extends IdxStorageManagerInterface<M> = IdxStorageManagerInterface<M>, O extends OktaAuthIdxOptions = OktaAuthIdxOptions, TM extends IdxTransactionManagerInterface = IdxTransactionManagerInterface>(StorageManagerConstructor: StorageManagerConstructor<S>, OptionsConstructor: OktaAuthOptionsConstructor<O>, TransactionManagerConstructor: TransactionManagerConstructor<TM>): OktaAuthIdxConstructor<MinimalOktaAuthIdxInterface<M, S, O, TM> & MinimalOktaOAuthInterface<M, S, O, TM>>;
