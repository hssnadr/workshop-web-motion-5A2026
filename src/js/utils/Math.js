/** application du Théorème de Pythagore */
export function distance2D(x1, y1, x2, y2) {
    const deltaX_ = x2 - x1
    const deltaY_ = y2 - y1
    const distance_ = Math.sqrt( deltaX_**2 + deltaY_**2 )

    return distance_
}