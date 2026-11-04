import * as THREE from 'three'
import Scene3D from "../context3D/Scene3D"

const WALL_THICKNESS = 20

class Wall extends THREE.Mesh {
    constructor(color) {
        super(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: color })
        )
    }

    setSize(width, height) {
        this.scale.set(width, height, 20) // 20 = profondeur arbitraire du mur
    }
}

export default class SceneGravityCubes extends Scene3D {
    constructor(id) {
        super(id)

        /** passage caméra perspective à orthographique */
        this.camera = new THREE.OrthographicCamera(-20, 20, 20, -20, 0.1, 2000)
        this.camera.position.z = 300

        /** création d'un cube */
        const geometry_ = new THREE.BoxGeometry(60, 60, 60)
        const material_ = new THREE.MeshBasicMaterial({ color: "red" })
        this.cube = new THREE.Mesh(geometry_, material_)
        this.add(this.cube)

        /** création des murs */
        this.walls = {
            left: new Wall("blue"),
            top: new Wall("red"),
            right: new Wall("blue"),
            bottom: new Wall("yellow"),
        }
        Object.values(this.walls).forEach(w => { this.add(w) })

        /** init */
        this.resize()
    }

    scroll() {
        super.scroll()
        if (this.cube) this.cube.rotation.z += 0.1
    }

    resize() {
        super.resize()

        /** mapping camera orthographique et dimensions pixel CSS (pilotées au niveau du DOM) */
        this.camera.right = this.width / 2
        this.camera.left = -this.width / 2
        this.camera.top = this.height / 2
        this.camera.bottom = - this.height / 2
        this.camera.updateProjectionMatrix()

        if(this.walls) {
            if(this.walls.left) {
                this.walls.left.setSize(WALL_THICKNESS, this.height) 
                this.walls.left.position.x = -this.width / 2 + WALL_THICKNESS / 2
            }
            if(this.walls.top) {
                this.walls.top.setSize(this.width - 2 * WALL_THICKNESS, WALL_THICKNESS) 
                this.walls.top.position.y = this.height / 2 - WALL_THICKNESS / 2
            }
            if(this.walls.right) {
                this.walls.right.setSize(WALL_THICKNESS, this.height) 
                this.walls.right.position.x = this.width / 2 - WALL_THICKNESS / 2
            }
            if(this.walls.bottom) {
                this.walls.bottom.setSize(this.width - 2 * WALL_THICKNESS, WALL_THICKNESS) 
                this.walls.bottom.position.y = -this.height / 2 + WALL_THICKNESS / 2
            }
        }

        /** uniquement pour tester */
        // if (this.cube) this.cube.position.x = -this.width / 2 + WALL_THICKNESS / 2
        // if (this.cube) this.cube.position.y = -this.height / 2
    }
}