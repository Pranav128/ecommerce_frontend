import { ServiceInterface, ServiceManagerOptions } from '../core/types';
import { TokenManagerInterface } from '../oidc/types';
export declare class RenewOnTabActivationService implements ServiceInterface {
    private tokenManager;
    private started;
    private options;
    private lastHidden;
    onPageVisbilityChange: () => void;
    constructor(tokenManager: TokenManagerInterface, options?: ServiceManagerOptions);
    private _onPageVisbilityChange;
    start(): Promise<void>;
    stop(): Promise<void>;
    canStart(): boolean;
    requiresLeadership(): boolean;
    isStarted(): boolean;
}
