export declare class EventListener {
    callback: (sender: any, args: any) => void;
    predicate: (args: any) => boolean;
    constructor(callback: (sender: any, args: any) => void, predicate?: (args: any) => boolean);
}
