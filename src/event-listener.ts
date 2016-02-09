export class EventListener
{
    constructor(public callback: (sender: any, args: any) => void, public predicate?: (args: any) => boolean) {}
}