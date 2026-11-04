import * as THREE from 'three'
import GlobalContext from '../GlobalContext'
import DomElement from '../utils/DomElement'

export default class Scene3D extends THREE.Scene {
    domElement
    canvas

    camera
    renderer

    get isVisible() { return this.domElement.isVisible }
    get width() { return this.domElement.width }
    get height() { return this.domElement.height }
    get position() { return this.domElement.position }

    constructor(id) {
        super()
        this.idScene = id

        console.log("CONSTRUCTOR 3D")

        /** DOM + dimensions */
        this.domElement = new DomElement(id)
        this.canvas = this.domElement.element

        /** referencement */
        this.globalContext = new GlobalContext()
        this.globalContext.addScene(this)

        /** debug */
        this.params = {}
        this.debug = this.globalContext.debug
        if(this.debug.active) this.debugFolder = this.debug.ui.addFolder(this.idScene)

        /** default camera */
        this.camera = new THREE.PerspectiveCamera(75, this.domElement.ratio, 0.1, 2000 )
        this.camera.position.z = 100
        this.add(this.camera)

        /** renderer : passer d'une vue caméra à une représentation sur le canvas */
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        })

        /** resize */
        this.resize()
    }

    update() { 
        this.renderer.render(this, this.camera)
    }

    scroll() { 
        this.domElement.measure() 
    }

    resize() {
        /** update des mesures de l'élément du DOM */
        this.domElement.measure()

        /** camera */
        this.camera.aspect = this.domElement.ratio
        this.camera.updateProjectionMatrix() // mise à jour réelle de la caméra

        /** renderer */
        this.renderer.setPixelRatio(this.globalContext.pixelRatio) // fix du début à la fin
        this.renderer.setSize(this.width, this.height, false)
    }

    orientation() { }

    destroy() {
        // voir le cours étape 5.1
    }
}