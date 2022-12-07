// run a function on a delay
const debounce = (func, delay) => {
    let timer;

    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context, args), delay);
    };
};

// Get the theme color based on the feature
// Optional "alpha" param to control transparency (0-100)
function getThemeColor(type, alpha) {
    const colorMap = {
        "Default": "#9B9B9B",
        "Goddess": "#D7A954",
        "Heroine": "#8AB67B",
        "First Name": "#6CB4CC",
        "Famous Woman": "#C97889",
        "Other": "#9B9B9B"
    }

    const hexBase = colorMap[type] == undefined ? "Default" : colorMap[type]
    const hexAlpha = alpha ? `0${Math.round((255 / 100) * alpha).toString(16)}`.slice(-2).toUpperCase() : "FF"
    const output = `${hexBase}${hexAlpha}`

    return output;
}

export { debounce, getThemeColor };