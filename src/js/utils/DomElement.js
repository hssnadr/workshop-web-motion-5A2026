export default class DomElement {
    id
    element
    
    width
    height
    position

    get isVisible() { return this.position.bottom > 0 && this.position.top < window.innerHeight }
    get ratio() { return this.height == 0 ? 1 : this.width / this.height }

    constructor(id) {
        this.id = id
        this.element = document.getElementById(id)
        this.measure()
    }

    measure() {
        /** dimensions */
        this.width = this.element.clientWidth
        this.height = this.element.clientHeight

        /** position */
        const rect_ = this.element.getBoundingClientRect()
        this.position = {
            top : rect_.top,
            bottom : rect_.bottom,
            left : rect_.left,
            right : rect_.right,
        }
    }
}