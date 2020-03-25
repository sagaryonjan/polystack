
class EventListener {

    /**
     * Event listener constructor.
     */
    constructor() {
        this._events = {};
    }
    
    /**
     * Listening event listener.
     * 
     * @param {String} name 
     * @param {*} listener 
     */
    on(name, listener) {
        if (!this._events[name]) {
            this._events[name] = [];
        }
    
        this._events[name].push(listener);
    }
    
    /**
     * Remove event listener.
     * 
     * @param {String} name 
     * @param {*} listenerToRemove 
     */
    off(name, listenerToRemove) {
        if (!this._events[name]) {
            throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
        }
    
        const filterListeners = listener => listener !== listenerToRemove;
    
        this._events[name] = this._events[name].filter(filterListeners);
    }

    /**
     * Remove all events.
     */
    removeAll() {
        this._events = {};
    }
    
    /**
     * Emit event listener.
     * 
     * @param {String} name 
     * @param {*} data 
     */
    emit(name, data) {
        if (!this._events[name]) {
            throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
        }
    
        const fireCallbacks = callback => callback(data);
    
        this._events[name].forEach(fireCallbacks);
    }
}

export default EventListener;
