import Time from "./utils/Time"

let instance = null

export default class GlobalContext {
    sceneCollection = []
    
    time = null

    get pixelRatio() { return Math.min(window.devicePixelRatio, 2) }

    constructor() {
        if(instance) return instance
        instance = this

        window.addEventListener('resize', () => { this.resize() })

        this.time = new Time()
        this.time.on('update', () => { this.update() })
    }

    addScene(scene) { 
        this.sceneCollection.push(scene)
    }

    update() {
        this.sceneCollection.forEach(s => { s.update() })
    }

    resize() {
        console.log("----")
        this.sceneCollection.forEach(s => { s.resize() })
    }
}