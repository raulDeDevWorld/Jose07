import qrcodeParser from "qrcode-parser";

function QRreaderUtils(e, setFilterQR) {

 qrcodeParser(e.target.files[0]).then((res) => {
       setFilterQR(res);
       
    });

}

export { QRreaderUtils }