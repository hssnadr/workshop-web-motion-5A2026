import Scene2D from "../Context2D/Scene2D"
import { circle, line } from "../context2D/Shapes2D"
import GlobalContext from "../GlobalContext"
import { distance2D } from "../utils/Math"

const CIRCLE_RADIUS = 20 // valeur par défaut
const STROKE_WIDTH = 5
const MAX_SPEED = 300 // pixel / seconde

class Bubble {
    #context
    radius = 10
    /** position */
    x = 0
    y = 0
    /** vitesse */
    vx = 0
    vy = 0

    constructor(context) {
        this.#context = context

        /** initalisation de la vitesse */
        this.vx = MAX_SPEED * (Math.random() - 0.5) * 2
        this.vy = MAX_SPEED * (Math.random() - 0.5) * 2
    }

    update(width, heigth) {
        /** update de la position : GlobalContext = singleton -> toujours la même instance au new */
        const delta_ = new GlobalContext().time.delta / 1000 // en secondes
        this.x += this.vx * delta_
        this.y += this.vy * delta_

        /** inversion de la vitesse au bord */
        this.vx = this.x < this.radius ? Math.abs(this.vx) : this.vx
        this.vx = this.x > width - this.radius ? -Math.abs(this.vx) : this.vx
        this.vy = this.y < this.radius ? Math.abs(this.vy) : this.vy
        this.vy = this.y > heigth - this.radius ? -Math.abs(this.vy) : this.vy
    }

    draw() {
        /** rendu */
        circle(this.#context, this.x, this.y, this.radius)
    }
}

export default class SceneBouncingBubbles extends Scene2D {
    /** @type {[Bubble]} */
    bubbleCollection = []

    get nBubbles() { return this.bubbleCollection ? this.bubbleCollection.length : 0 }

    constructor(id, nBubbles) {
        super(id)

        /** debug */
        this.params = {
            nBubbles: nBubbles,
            radius: CIRCLE_RADIUS,
            threshold: 200,
            lineWidth: STROKE_WIDTH
        }
        if (this.debugFolder) {
            this.debugFolder.add(this.domElement, 'isVisible').listen().disable()

            this.debugFolder.add(this.params, 'nBubbles', 2, 1000, 1).onFinishChange((value) => {
                this.generateBubbles()
            })
            this.debugFolder.add(this.params, 'radius', 5, 100, 1).onChange((value) => {
                this.bubbleCollection.forEach(b => {
                    b.radius = value
                })
            })
            this.debugFolder.add(this.params, 'threshold', 0, 500)
            this.debugFolder.add(this.params, 'lineWidth', 1, 20, 1)
        }

        /** init */
        this.resize()

        this.generateBubbles()
        /** use orienation */
        this.globalContext.useOrientationDevice(true)
    }

    generateBubbles() {
        this.bubbleCollection = [] // reset la collection

        /** création des bulles initiales */
        for (let i = 0; i < this.params.nBubbles; i++) {
            /** instancier nouvelle bulle */
            const bubble_ = new Bubble(this.context)

            /** initialiser les propriétés de la bulle */
            bubble_.radius = this.params.radius
            bubble_.x = this.width * Math.random()
            bubble_.y = this.height * Math.random()

            /** référencer nouvelle bulle */
            this.bubbleCollection.push(bubble_)
        }
    }

    update() {
        this.bubbleCollection.forEach(b => {
            b.update(this.width, this.height)
        })
        this.draw()
    }

    /** ici ne fait rien, mais pour info */
    scroll() {
        super.scroll() // ! ne pas oublier le super pour refresh la visibilité
        /** zone dédiée aux comportements relatifs au scroll */
    }

    draw() {
        /** effacer le canvas de l'image précédente */
        this.clear()

        /** centralisation des styles, car toujours identiques */
        this.context.strokeStyle = "white"
        this.context.fillStyle = "black"
        this.context.lineWidth = this.params.lineWidth

        /** relier les bulles */
        for (let i = 0; i < this.nBubbles; i++) {
            /** bulles de départ */
            const bubble_Start_ = this.bubbleCollection[i]

            for (let j = i + 1; j < this.nBubbles; j++) {
                // for (let j = 0; j < this.nBubbles; j++) {
                /** bulle d'arrivée */
                const bubble_End_ = this.bubbleCollection[j]

                /** calcul de la distance entres les 2 bulles */
                const distance = distance2D(
                    bubble_Start_.x, bubble_Start_.y,
                    bubble_End_.x, bubble_End_.y
                )

                /** dessin de la ligne si le seuil est franchi */
                if (distance < this.params.threshold) {
                    line(this.context, bubble_Start_.x, bubble_Start_.y, bubble_End_.x, bubble_End_.y)
                }
            }
        }

        /** dessiner les bulles */
        if (!this.bubbleCollection) return
        this.bubbleCollection.forEach(b => {
            b.draw()
        })
    }

    orientation() {
        if(!this.globalContext.deviceOrientation) return
        const { alpha, beta, gamma } = this.globalContext.deviceOrientation
        // this.debug.domDebug = `beta ${beta.toFixed(2)} · gamma ${gamma.toFixed(2)} · alpha ${alpha.toFixed(2)}`

        /**
         * pour le scénario :
         * on veut une range -1;1 correspondant dans toutes
         * les directions à +/- 90°
         */
        const betaNormalize_ = beta / 90
        const gammaNormalize_ = gamma / 90

        this.debug.domDebug = `betaNorm ${ betaNormalize_.toFixed(1) } · gammaNorm ${gammaNormalize_.toFixed(1)}`
    }
}