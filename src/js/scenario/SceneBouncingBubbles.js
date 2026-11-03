import Scene2D from "../Context2D/Scene2D"
import { circle } from "../context2D/Shapes2D"

const CIRCLE_RADIUS = 20
const STROKE_WIDTH = 4
const MAX_SPEED = 5

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
        /** update de la position */
        this.x += this.vx
        this.y += this.vy

        /** inversion de la vitesse au bord */
        this.vx = this.x < this.radius ? Math.abs(this.vx) : this.vx
        this.vx = this.x > width - this.radius ? -Math.abs(this.vx) : this.vx
        this.vy = this.y < this.radius ? Math.abs(this.vy) : this.vy
        this.vy = this.y > heigth - this.radius ? -Math.abs(this.vy) : this.vy
    }

    draw() {
        /** rendu */
        this.#context.strokeStyle = "white"
        this.#context.lineWidth = STROKE_WIDTH
        circle(this.#context, this.x, this.y, this.radius)
    }
}

export default class SceneBouncingBubbles extends Scene2D {
    bubbleCollection = []

    constructor(id, nBubble) {
        super(id)

        /** création des bulles initiales */
        for (let i = 0; i < nBubble; i++) {
            /** instancier nouvelle bulle */
            const bubble_ = new Bubble(this.context)

            /** initialiser les propriétés de la bulle */
            bubble_.radius = CIRCLE_RADIUS
            bubble_.x = this.width * Math.random()
            bubble_.y = this.height * Math.random()

            /** référencer nouvelle bulle */
            this.bubbleCollection.push(bubble_)
        }

        /** init */
        this.resize()
    }

    update() {
        this.bubbleCollection.forEach(b => {
            b.update(this.width, this.height)
        })
        this.draw()
    }

    draw() {
        /** effacer le canvas de l'image précédente */
        this.clear()
    
        if (!this.bubbleCollection) return
        this.bubbleCollection.forEach(b => {
            b.draw()
        })
    }
}