import * as THREE from 'three'
import Scene3D from "../context3D/Scene3D"
import { Bodies, Body, Composite, Engine, Runner } from 'matter-js'

const WALL_THICKNESS = 20
const CUBE_SIZE = 40
const CUBE_COLORS = ["red", "yellow", "blue"]

class Cube extends THREE.Mesh {
    body

    constructor(color) {
        super(
            new THREE.BoxGeometry(40, 40, 40),
            new THREE.MeshBasicMaterial({ color: color })
        )

        this.body = Bodies.rectangle(0, 0, 40, 40)
    }

    update() {
        this.position.x = this.body.position.x
        this.position.y = -this.body.position.y
        this.rotation.z = -this.body.angle
    }

    setPosition(x, y) {
        /** position du mesh */
        this.position.x = x
        this.position.y = y

        /** position du body */
        Body.setPosition(this.body, { x, y: -y })
    }
}

class Wall extends THREE.Mesh {
    constructor(color) {
        super(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: color })
        )

        this.body = Bodies.rectangle(0, 0, 1, 1, { isStatic: true })
    }

    setSize(width, height) {
        Body.scale(this.body, 1 / this.scale.x, 1 / this.scale.y)
        Body.scale(this.body, width, height)
        
        this.scale.set(width, height, 20) // 20 = profondeur arbitraire du mur
    }

    setPosition(x, y) {
        /** position du mesh */
        this.position.x = x
        this.position.y = y

        /** position du body */
        Body.setPosition(this.body, { x, y: -y })
    }
}

export default class SceneGravityCubes extends Scene3D {
    constructor(id) {
        super(id)

        /** passage caméra perspective à orthographique */
        this.camera = new THREE.OrthographicCamera(-20, 20, 20, -20, 0.1, 2000)
        this.camera.position.z = 300

        /** création d'un cube */
        this.cubes = []
        for (let i = 0; i < 10; i++) {
            const cube_ = new Cube(CUBE_COLORS[i % CUBE_COLORS.length])

            const minX_ = -this.width / 2 + WALL_THICKNESS + CUBE_SIZE
            const maxX_ = this.width / 2 - WALL_THICKNESS - CUBE_SIZE
            const minY_ = -this.height / 2 + WALL_THICKNESS + CUBE_SIZE
            const maxY_ = this.height / 2 - WALL_THICKNESS - CUBE_SIZE

            cube_.setPosition(minX_ + (maxX_ - minX_) * Math.random(), minY_ + (maxY_ - minY_) * Math.random())
            this.cubes.push(cube_)
            this.add(cube_)
        }

        /** création des murs */
        this.walls = {
            left: new Wall("blue"),
            top: new Wall("red"),
            right: new Wall("blue"),
            bottom: new Wall("yellow"),
        }
        Object.values(this.walls).forEach(w => { this.add(w) })

        /** initialisation du moteur physique */
        this.engine = Engine.create()
        this.runner = Runner.create()
        Runner.run(this.runner, this.engine)

        /** référencement des bodies (physiques) de la scène dans le moteur physique */
        // Composite.add(this.engine.world, [this.cube.body])
        // Composite.add(this.engine.world, [this.cube, ...Object.values(this.walls)].map(o => o.body))
        Composite.add(this.engine.world, [...this.cubes, ...Object.values(this.walls)].map(o => o.body))


        /** init */
        this.resize()
    }

    update() {
        super.update()

        this.cubes.forEach(c => c.update())
    }

    scroll() {
        super.scroll()
    }

    resize() {
        super.resize()

        /** mapping camera orthographique et dimensions pixel CSS (pilotées au niveau du DOM) */
        this.camera.right = this.width / 2
        this.camera.left = -this.width / 2
        this.camera.top = this.height / 2
        this.camera.bottom = - this.height / 2
        this.camera.updateProjectionMatrix()

        if (this.walls) {
            if (this.walls.left) {
                this.walls.left.setSize(WALL_THICKNESS, this.height)
                this.walls.left.setPosition(-this.width / 2 + WALL_THICKNESS / 2, 0)
            }
            if (this.walls.top) {
                this.walls.top.setSize(this.width - 2 * WALL_THICKNESS, WALL_THICKNESS)
                this.walls.top.setPosition(0, this.height / 2 - WALL_THICKNESS / 2)
            }
            if (this.walls.right) {
                this.walls.right.setSize(WALL_THICKNESS, this.height)
                this.walls.right.setPosition(this.width / 2 - WALL_THICKNESS / 2, 0)
            }
            if (this.walls.bottom) {
                this.walls.bottom.setSize(this.width - 2 * WALL_THICKNESS, WALL_THICKNESS)
                this.walls.bottom.setPosition(0, -this.height / 2 + WALL_THICKNESS / 2)
            }
        }
    }

    destroy() {
        super.destroy()
        Runner.stop(this.runner)
        Engine.clear(this.engine)
    }
}