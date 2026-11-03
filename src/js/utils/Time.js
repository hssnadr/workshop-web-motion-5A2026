import EventEmitter from "./EventEmitter"

export default class Time extends EventEmitter {
    constructor() {
        super()
        
        /** appel le callback à chaque nouvelle frame */
        this.update()
    }

    update() {
        this.trigger('update')
        window.requestAnimationFrame(() => { this.update() })
    }
}