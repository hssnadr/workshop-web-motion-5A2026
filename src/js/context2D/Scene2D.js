import GlobalContext from "../GlobalContext"
import DomElement from "../utils/DomElement"

export default class Scene2D {
    globalContext = null
    canvas = null
    context = null
    domElement = null

    get width() { return this.domElement.width * this.globalContext.pixelRatio }
    get height() { return this.domElement.height * this.globalContext.pixelRatio }

    constructor(id) {
        this.id = id
        
        this.domElement = new DomElement(id)
        this.canvas = this.domElement.element
        this.context = this.canvas.getContext('2d')

        /** referencement */
        this.globalContext = new GlobalContext()
        this.globalContext.addScene(this)

        /** resize */
        this.resize()
    }

    clear() { this.context.clearRect(0,0,this.width, this.height) }

    update() {
        console.log("---")
        console.log(this.id, "update")
    }

    draw() {}

    resize() {
        console.log("---")
        console.log(this.id, "resize")

        /** update des mesures de l'élément du DOM */
        this.domElement.measure()
        
        /** faire correspondre dimensions pixel CSS et pixels du contexte 2D */
        this.canvas.width = this.width
        this.canvas.height = this.height

        /** refresh rendu */
        this.draw()
    }
}