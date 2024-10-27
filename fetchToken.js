window.canvasAccessToken = ''; // Declare a global variable

function setCanvasAccessToken(token) {
    window.canvasAccessToken = token; // Set the global variable
}

function getCanvasAccessToken() {
    return window.canvasAccessToken; // Get the global variable
}

// Attach functions to the window object for access in other scripts
window.setCanvasAccessToken = setCanvasAccessToken;
window.getCanvasAccessToken = getCanvasAccessToken;