export const onMouseMoveTranslate = (e, _el, params, factorX, factorY, wrapperOffsetX, wrapperOffsetY) => {

    const { clientX, clientY } = e;

    const offsetX = (clientX - wrapperOffsetX) - params.centerX;
    const offsetY = (clientY - wrapperOffsetY) - params.centerY;

    _el.style.transform = `translate3d(${offsetX / factorX}px, ${offsetY / factorY}px, 0px)`
}

export const onMouseMoveTranslateScale = (e, _el, params, factorX, factorY, wrapperOffsetX, wrapperOffsetY, scale) => {

    const { clientX, clientY } = e;

    const offsetX = (clientX - wrapperOffsetX) - params.centerX;
    const offsetY = (clientY - wrapperOffsetY) - params.centerY;

    _el.style.transform = `translate3d(${offsetX / factorX}px, ${offsetY / factorY}px, 0px) scale(${scale})`
}

export const onMouseMoveTranslateRotate = (e, _el, params, factorX, factorY, wrapperOffsetX, wrapperOffsetY) => {

    const { clientX, clientY } = e;

    const offsetX = (clientX - wrapperOffsetX) - params.centerX;
    const offsetY = (clientY - wrapperOffsetY) - params.centerY;

    _el.style.transform = `translate3d(${offsetX / factorX}px, ${offsetY / factorY}px, 0px) rotate(-5deg)`
}

export const onMouseLeaveTranslateScale = (_el) => {
    _el.style.transform = `translate3d(0px, 0px, 0px) scale(1)`
}

export const onMouseLeaveTranslateRotate = (_el) => {
    _el.style.transform = `translate3d(0px, 0px, 0px) rotate(-5deg)`
}


