export default class DomElement {
    id
    element
    width
    height

    constructor(id) {
        this.id = id
        this.element = document.getElementById(id)
        this.measure()
    }

    measure() {
        this.width = this.element.clientWidth
        this.height = this.element.clientHeight
    }
}