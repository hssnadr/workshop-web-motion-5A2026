import GlobalContext from "../GlobalContext"
import Debug from "../utils/Debug"
import DomElement from "../utils/DomElement"

export default class Scene2D {
    /** @type {GlobalContext} */
    globalContext = null
    /** @type { DomElement } */
    domElement = null
    /** @type {Debug} */
    debug = null

    canvas = null
    context = null
    
    get isVisible() { return this.domElement.isVisible }
    get width() { return this.domElement.width * this.globalContext.pixelRatio }
    get height() { return this.domElement.height * this.globalContext.pixelRatio }
    get position() { return this.domElement.position }

    constructor(id) {
        this.id = id
        
        /** DOM + dimensions */
        this.domElement = new DomElement(id)
        this.canvas = this.domElement.element
        this.context = this.canvas.getContext('2d')

        /** referencement */
        this.globalContext = new GlobalContext()
        this.globalContext.addScene(this)

        /** debug */
        this.params = {}
        this.debug = this.globalContext.debug
        if(this.debug.active) this.debugFolder = this.debug.ui.addFolder(this.id)

        /** resize */
        this.resize()
    }

    clear() { this.context.clearRect(0,0,this.width, this.height) }

    update() {}

    draw() {}

    scroll() { this.domElement.measure() }

    resize() {
        /** update des mesures de l'élément du DOM */
        this.domElement.measure()
        
        /** faire correspondre dimensions pixel CSS et pixels du contexte 2D */
        this.canvas.width = this.width
        this.canvas.height = this.height

        /** refresh rendu */
        this.draw()
    }

    orientation() {}

    destroy() {}
}