import Debug from "./utils/Debug"
import DeviceOrientation from "./utils/DeviceOrientation"
import Time from "./utils/Time"

let instance = null

export default class GlobalContext {
    sceneCollection = []
    
    time = null
    debug = null

    deviceOrientation = null

    callbackScroll
    callbackResize
    callbackTime
    callbackOrientation        

    get pixelRatio() { return Math.min(window.devicePixelRatio, 2) }

    constructor() {
        if(instance) return instance
        instance = this

        this.callbackResize = () => { this.resize() }
        this.callbackScroll = () => { this.scroll() }
        this.callbackTime = () => { this.update() }

        /** init gestion resize */
        window.addEventListener('resize', this.callbackResize)

        /** init gestion scroll */
        window.addEventListener('scroll', this.callbackScroll)

        /** init gestion du temps = clock principale */
        this.time = new Time()
        this.time.on('update', this.callbackTime)

        /** init debug */
        this.debug = new Debug()
        this.debug.domDebug = "constructor"
    }

    addScene(scene) { 
        this.sceneCollection.push(scene)
    }

    update() {
        this.sceneCollection.forEach(s => { if(s.isVisible) s.update() })
    }

    scroll() {
        this.sceneCollection.forEach(s => { s.scroll() })
    }

    resize() {
        this.sceneCollection.forEach(s => { s.resize() })
    }

    useOrientationDevice(isUsed) {
        this.debug.domDebug = "activation"
        if(!this.deviceOrientation && isUsed) {
            this.deviceOrientation = new DeviceOrientation()
            this.callbackOrientation = () => { this.orientation() }
            this.deviceOrientation.on('update', this.callbackOrientation)
        }

        if(this.deviceOrientation && !isUsed) {
            this.deviceOrientation.off('update')
            this.deviceOrientation.destroy()
            this.deviceOrientation = null
        }
    }

    orientation() {
        this.sceneCollection.forEach(s => { s.orientation() })
    }

    destroy() {
        this.sceneCollection.forEach(s => { s.destroy() })
        this.sceneCollection = []
        this.debug.destroy()
        this.time.off('update')
        window.removeEventListener('scroll', this.callbackScroll)
        window.removeEventListener('resize', this.callbackResize)
        instance = null
    }
}