export declare class EventHandler {
    private sender;
    private listeners;
    constructor(sender: any);
    subscribe: (callback: (sender: any, args: any) => void, predicate?: (args: any) => boolean) => () => void;
    unsubscribe: (callback: (sender: any, args: any) => void) => void;
    publish: (args: any) => void;
    getSubscriptionCount: () => number;
}
