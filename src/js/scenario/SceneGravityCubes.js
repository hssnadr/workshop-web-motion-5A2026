import * as THREE from 'three'
import Scene3D from "../context3D/Scene3D"

export default class SceneGravityCubes extends Scene3D {
    constructor(id) {
        super(id)

        /** création d'un cube */
        const geometry_ = new THREE.BoxGeometry(20, 20, 20)
        const material_ = new THREE.MeshBasicMaterial({ color : "red" })
        this.cube = new THREE.Mesh(geometry_, material_)
        this.add(this.cube)
    }

    scroll() {
        super.scroll()
        if(this.cube) this.cube.rotation.z += 0.1
    }

    resize() {
        super.resize()
        if(this.cube) this.cube.rotation.y -= 0.1
    }
}