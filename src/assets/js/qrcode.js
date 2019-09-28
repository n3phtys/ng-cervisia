function generateQrCode(divId, payload) {
    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var cellSize = 7;
    var margin = 8;
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(payload);
    qr.make();
    document.getElementById(divId).innerHTML = qr.createImgTag(cellSize, margin);
}
function printGenerateQrCode(divId, payload) {
    console.log("received in function: " + divId + "  and   " + payload);
}
