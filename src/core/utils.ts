export function hexToArrayBuffer(hex: string) {
  return new Uint8Array(
    hex.match(/[\da-f]{2}/gi)!.map(function(h) {
      return parseInt(h, 16);
    })
  ).buffer;
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  for (let byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return window.btoa(binary);
}

export function base64ToArrayBuffer(base64: string) {
  let binary = window.atob(base64);
  let bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
