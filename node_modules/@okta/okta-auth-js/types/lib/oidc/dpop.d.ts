import { OAuthError, WWWAuthError } from '../errors';
import { Tokens } from './types';
export interface DPoPClaims {
    htm: string;
    htu: string;
    iat: number;
    jti: string;
    nonce?: string;
    ath?: string;
}
export interface DPoPProofParams {
    keyPair: CryptoKeyPair;
    url: string;
    method: string;
    nonce?: string;
    accessToken?: string;
}
export declare type ResourceDPoPProofParams = Omit<DPoPProofParams, 'keyPair' | 'nonce'>;
declare type DPoPProofTokenRequestParams = Omit<DPoPProofParams, 'accessToken'>;
export declare function isDPoPNonceError(obj: any): obj is OAuthError | WWWAuthError;
export declare function createJwt(header: object, claims: object, signingKey: CryptoKey): Promise<string>;
export declare function cryptoRandomValue(byteLen?: number): string;
export declare function generateKeyPair(): Promise<CryptoKeyPair>;
export declare type StoreMethod = 'get' | 'add' | 'delete' | 'clear';
export declare function findKeyPair(pairId?: string): Promise<CryptoKeyPair>;
export declare function clearDPoPKeyPair(pairId: string): Promise<void>;
export declare function clearAllDPoPKeyPairs(): Promise<void>;
export declare function createDPoPKeyPair(): Promise<{
    keyPair: CryptoKeyPair;
    keyPairId: string;
}>;
export declare function clearDPoPKeyPairAfterRevoke(revokedToken: 'access' | 'refresh', tokens: Tokens): Promise<void>;
export declare function generateDPoPProof({ keyPair, url, method, nonce, accessToken }: DPoPProofParams): Promise<string>;
export declare function generateDPoPForTokenRequest({ keyPair, url, method, nonce }: DPoPProofTokenRequestParams): Promise<string>;
export {};
