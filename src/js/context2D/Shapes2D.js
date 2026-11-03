export function circle(context, x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI)
    context.stroke()
    context.closePath()
} 