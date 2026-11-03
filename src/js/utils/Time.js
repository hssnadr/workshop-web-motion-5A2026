import EventEmitter from "./EventEmitter"

export default class Time extends EventEmitter {
    #start // temps à la création de l'instance
    #current // temps à l'instant t
    elapsed // temps écoulé depuis le début du scénario
    delta // temps écoulé depuis la dernière frame

    constructor() {
        super()

        /** init */
        this.#start = performance.now()
        this.#current = this.#start
        this.elapsed = 0
        this.delta = 1 / 60 // valeur par défaut, correspondant à un écran 60Hz
        
        /** appel le callback à chaque nouvelle frame */
        this.update()
    }

    update() {
        this.delta = performance.now() - this.#current // calcule avant refresh de #current
        this.#current = performance.now()
        this.elapsed = this.#current - this.#start

        // console.log(this.elapsed.toFixed(0), this.delta.toFixed(2))

        this.trigger('update')
        window.requestAnimationFrame(() => { this.update() })
    }
}