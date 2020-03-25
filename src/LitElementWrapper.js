import EventBus from './EventBus';
import { LitElement } from 'lit-element';

class LitElementWrapper extends LitElement {

    /**
     * Lit element wrapper constructor.
     */
    constructor() {
      super();
  
      this.getMixins = this.mixins();
      this.getMethods = this.methods();
      this.setState = this.setState.bind(this);
      this.getState = this.getState.bind(this);
  
      if(this.isMixinsAvailable()) {
        this.resolveMixins();
      }
      if(this.isMethodsAvailable()) {
        this.resolveMethods();
      }
    }
  
    /**
     * Register methods which will be available in object.
     * 
     * @return {array} Returns empty array
     */
    mixins() {
      return [];
    }
  
    /**
     * Register methods which will be available in object.
     * 
     * @return {object} Returns empty object
     */
    methods() {
      return {};
    }

    /**
     * Bind the property of the object by element value.
     * 
     * @param {string} fieldName The property name of the object.
     * @param {object} e Element of form field. This object must have value.
     */
    model(fieldName, e, requestUpdate) {
      this.setState(fieldName, e.target.value, requestUpdate);
    }

    /**
     * Listening to an event.
     * 
     * @param {*} event Event name.
     * @param {*} listener callback
     */
    listen(event, listener) {
        EventBus.on(event, listener);
    }

    /**
     * Sending event.
     * 
     * @param {String} event Event name.
     * @param {*} data Data to send to listener.
     */
    emit(event, data) {
        EventBus.emit(event, data);
    }

    /**
     * Remove listener.
     * 
     * @param {*} event Event name.
     * @param {*} listener callback
     */
    removeListener(event, listenerToRemove) {
        EventBus.off(event, listenerToRemove);
    }

    /**
     * Remove all listeners.
     * 
     * @param {String} event Event name.
     * @param {*} data Data to send to listener.
     */
    removeAllListeners() {
        EventBus.removeAll();
    }
    
    /**
     * Check if mixin is available or not.
     */
    isMethodsAvailable() {
      return Object.entries(this.getMethods).length > 0
    }
  
    /**
     * Check if mixin is available or not.
     */
    isMixinsAvailable() {
      return Array.isArray(this.getMixins) || this.getMixins.length > 0
    }
  
    /**
     * Expose helpers in your methods.
     */
    exposedMethods() {
      return {
        setState : this.setState,
        getState : this.getState,
        emit     : this.emit,
        listen   : this.listen
      }
    }
  
    /**
     * Set the property of object.
     * 
     * @param {string} key - The property name of the object.
     * @param {string} value - Value of the object property.
     */
    setState(key, value, requestUpdate) {
      this[key] = value;
   
      if(requestUpdate) {
        this.requestUpdate();
      }
    }
  
    /**
     * Get property of object.
     * 
     * @param {string} key The property name of the object.
     * @return {*} The value of object property.
     */
    getState(key) {
      return this[key];
    }
  
    /**
     * It sets data of mixins.
     * 
     * @param {Object} mixin Mixin data
     */
    setMixinData(mixin) {
      if(mixin.hasOwnProperty('data')) {
        for (const key in mixin.data) {
          this[key] = mixin.data[key];
        }
      }
    }
  
    /**
     * It sets data of mixins.
     * 
     * @param {Object} mixin Mixin data
     */
    setMixinMethods(mixin, index) {
      for (const methodName in mixin) {
        if(methodName !== 'data') {
          this[methodName] = (...args) => this.getMixins[index][methodName](this.exposedMethods(), ...args);
        }
      }
    }
  
    /**
     * Resolve Mixins
     */
    resolveMixins() {
      this.getMixins.forEach((mixin, index) => {
        this.setMixinData(mixin);
        this.setMixinMethods(mixin, index)        
      });
    }
  
   /**
    * Resolve dynamic methods.
    */
     resolveMethods() {
      for (const methodName of Object.keys(this.getMethods)) {
        this[methodName] = (...args) => this.getMethods[methodName](this.exposedMethods(), ...args);
      }
    }
    
}

export default LitElementWrapper