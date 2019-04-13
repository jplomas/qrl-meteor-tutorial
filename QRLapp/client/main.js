import { QRLLIBload } from 'qrllib/build/offline-libjsqrl';
import { Template } from 'meteor/templating' 
import './wallet.js'

$('#generateButton').hide();

const waitForQRLLIB = (callBack) => {
  setTimeout(() => {
    // Test the QRLLIB object has the str2bin function.
    // This is sufficient to tell us QRLLIB has loaded.
    if (typeof QRLLIB.str2bin === 'function') {
      callBack();
    } else {
      return waitForQRLLIB(callBack);
    }
    return false;
  }, 50);
};

waitForQRLLIB(() => {
  $('#generateButton').show();
  console.log('QRLLIB loaded!')
});