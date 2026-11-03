export function circle(context, x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI)
    context.fill() // !!! ORDRE + regarder le cours pour optimisation
    context.stroke() // !!! ORDRE (stroke après le fill) + regarder le cours pour optimisation
    context.closePath()
} 

export function line(context, x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
}