import {EventListener} from "./event-listener";

export class EventHandler
{
    private listeners: Array<EventListener> = [];

    constructor(private sender: any) {}

    public subscribe = (callback: (sender: any, args: any) => void, predicate?: (args: any) => boolean): () => void => {
        this.listeners.push(new EventListener(callback, predicate));
        return () => { this.unsubscribe(callback); };
    };

    public unsubscribe = (callback: (sender: any, args: any) => void) => {
        for(var i=0; i<this.listeners.length; i++) {
            if(this.listeners[i].callback == callback)
            {
                this.listeners.splice(i, 1);
                return;
            }
        }
    };


    public unsubscribeAll = () => {
        this.listeners = [];
    };

    public publish = (args) => {
        for (var i = 0; i < this.listeners.length; i++) {
            if(this.listeners[i].predicate) {
                if(this.listeners[i].predicate(args)) {
                    this.listeners[i].callback(this.sender, args);
                }
            }
            else
            { this.listeners[i].callback(this.sender, args); }
        }
    };

    public getSubscriptionCount = (): number => {
        return this.listeners.length;
    }
}