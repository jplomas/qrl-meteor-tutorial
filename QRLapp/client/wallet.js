console.log('wallet.js loaded');

async function makeWallet() {
  let XMSS_OBJECT = null;
  let hashFunction = QRLLIB.eHashFunction.SHA2_256;
  let xmssHeight = 8;
  const randomSeed = toUint8Vector(Crypto.randomBytes(48));
  XMSS_OBJECT = await new QRLLIB.Xmss.fromParameters(randomSeed, xmssHeight, hashFunction);
  return XMSS_OBJECT;
}
function gen() {
  console.log('Generating...');
}