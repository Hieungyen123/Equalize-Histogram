const value = document.querySelector("#value");
const input = document.querySelector("#pi_input");
value.textContent = input.value;
input.addEventListener("input", (event) => {
    value.textContent = event.target.value;
});
let imgElement = document.getElementById('imageSrc');
let button = document.getElementById('button');
let inputElement = document.getElementById('fileInput');
let canvas = document.getElementById('canvasOutput');



var smallimg = document.getElementsByClassName('small-img');
var MainImg = document.getElementById('mainImage');
inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

smallimg[0].onclick = function () {
    imgElement.src = smallimg[0].src;
}
smallimg[1].onclick = function () {

    imgElement.src = smallimg[1].src;
}
smallimg[2].onclick = function () {
    imgElement.src = smallimg[2].src;
}




function Chart(imgread, output) {
    let src = cv.imread(imgread);
    let srcVec = new cv.MatVector();
    srcVec.push_back(src);
    let accumulate = false;
    let channels = [0];
    let histSize = [parseInt(value.value)];
    let ranges = [1, 256];
    let hist = new cv.Mat();
    let mask = new cv.Mat();
    let color = new cv.Scalar(78, 185, 205);
    let scale = 2;
    // You can try more different parameters
    cv.calcHist(srcVec, channels, mask, hist, histSize, ranges, accumulate);
    let result = cv.minMaxLoc(hist, mask);
    let max = result.maxVal;
    let dst1 = new cv.Mat.zeros(src.rows, histSize[0] * scale,
        cv.CV_8UC3);
    // draw histogram
    for (let i = 0; i < histSize[0]; i++) {
        let binVal = hist.data32F[i] * src.rows / max;
        let point1 = new cv.Point(i * scale, src.rows - 1);
        let point2 = new cv.Point((i + 1) * scale - 1, src.rows - binVal);
        cv.rectangle(dst1, point1, point2, color, cv.FILLED);
    }
    cv.imshow(output, dst1);
    src.delete(); dst1.delete(); srcVec.delete(); mask.delete(); hist.delete();
}

function RunHistogram(imgread, output) {
    let src1 = cv.imread(imgread);
    let dst = new cv.Mat();
    cv.cvtColor(src1, src1, cv.COLOR_RGBA2GRAY, 0);
    cv.equalizeHist(src1, dst);
    // cv.imshow('canvasOutput', src);
    cv.imshow(output, dst);
    src1.delete(); dst.delete();
}



imgElement.onload = function () {

    Chart(imgElement, 'canvasOutput2');
    input.addEventListener("input", () => {
        Chart(imgElement, 'canvasOutput2');
    });


    button.onclick = function () {
        RunHistogram(imgElement, 'canvasOutput')
        Chart(canvas, 'canvasOutputaa');
        input.addEventListener("input", () => {
            Chart(canvas, 'canvasOutputaa');
        });
    };
}



// var Module = {
//     // https://emscripten.org/docs/api_reference/module.html#Module.onRuntimeInitialized
//     onRuntimeInitialized() {
//         document.getElementById('status').innerHTML = 'Ready to try ?';
//     }
// };