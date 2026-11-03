import EventEmitter from "./EventEmitter"

export default class DeviceOrientation extends EventEmitter {
    beta = 0 // rotation AUTOUR de l'axe X (-180 -> 180°)
    gamma = 0 // rotation AUTOUR de l'axe Y (-90 -> 90°)
    alpha = 0 // rotation AUTOUR de l'axe Z (0 -> 360°)

    handleOrientation = null

    constructor() {
        super()

        this.handleOrientation = (event) => {
            if(event.beta === null) return

            this.beta = event.beta
            this.gamma = event.gamma
            this.alpha = event.alpha

            this.trigger('update')
        }

        window.addEventListener('deviceorientation', this.handleOrientation)
    }

    destroy() {
        if(!this.handleOrientation) return
        window.removeEventListener('deviceorientation', this.handleOrientation)
    }
}