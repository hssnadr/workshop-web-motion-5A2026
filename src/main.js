import SceneBouncingBubbles from "./js/scenario/SceneBouncingBubbles"
import { askMotionAccess } from "./js/utils/DeviceAccess"

document.getElementById("btn-access").addEventListener("click", () => { 
    askMotionAccess()
})

const scene1_ = new SceneBouncingBubbles("canvas-scene-1", 40)
scene1_.draw()

const scene2_ = new SceneBouncingBubbles("canvas-scene-2", 10)
scene2_.draw()