import GUI from "lil-gui"

export default class Debug {
    /** @type {GUI} */
    ui = null

    get active() { return !!this.ui }

    constructor() {
        if(window.location.hash === '#debug') {
            this.ui = new GUI()
        }
    }

    set domDebug(content) {
        if (!this.active) return
        const element_ = document.getElementById("debug")
        if (!element_) return
        element_.style.display = "block"
        element_.textContent = content
    }

    destroy() {
        if(this.active) this.ui.destroy()
    }
}