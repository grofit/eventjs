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
        this.listeners.forEach((eventListener) => {
            if(eventListener.predicate) {
                if(eventListener.predicate(args)) {
                    setTimeout(() => { eventListener.callback(args, this.sender); }, 1);
                }
            }
            else
            { setTimeout(() => { eventListener.callback(args, this.sender); }, 1); }
        });
    };

    public publishSync = (args) => {
        this.listeners.forEach((eventListener) => {
            if(eventListener.predicate) {
                if(eventListener.predicate(args)) {
                    eventListener.callback(args, this.sender);
                }
            }
            else
            { eventListener.callback(args, this.sender); }
        });
    };

    public getSubscriptionCount = (): number => {
        return this.listeners.length;
    }
}