const space = 33;
const numberLetters = 26;
const reg = /^5[8-9]|6[0-4]|9[1-6]|12[3-9]|1[3-9][0-9]|2[0-5][0-5]$/; // rango de valores en la tabla ascii que no son letras

let cipher = str => {
  let strCipher = "";
  for (let i = 0; i < str.length; i++) {
    let codeChar = str.charCodeAt(i);
    let newCodeChar = (codeChar - codeChar + space) % numberLetters + codeChar; // Obtiene el nuevo codigo ascii de la letra ingresada
    // Verifica que la variable newCodeChar no esté en el rango de la variable reg, Sí está en el rango le resta el número de letras para volver al principio (A-a).
    reg.test(newCodeChar) ? (newCodeChar -= numberLetters, strCipher += String.fromCharCode(newCodeChar)) : strCipher += String.fromCharCode(newCodeChar);
  }
  return strCipher;
}

let deCipher = str => {
  let strDecipher = "";
  for (let i = 0; i < str.length; i++) {
    let codeChar = str.charCodeAt(i);
    let newCodeChar = codeChar - (space % numberLetters); // Le quita los 7 espacios para decifrar, pero si está en el rango de "reg", le suma 26 para volver a iniciar (A-a)
    reg.test(newCodeChar) ? (newCodeChar += numberLetters, strDecipher += String.fromCharCode(newCodeChar)) : (strDecipher += String.fromCharCode(newCodeChar));
  }
  return strDecipher;
}

let clean = () => {
  text.value = '';
  text.focus();
}

let isValidate = str => { // Verifica que la entrada no sea un número o esté vacío
  const regexp = /^[A-Z]|[a-z]$/;
  for (let i = 0; i < str.length; i++) {
    return regexp.test(str[i]) == false || str.length == 0 ? false : true;
  }
}

const text = document.getElementById('texto-js');
const btnCipher = document.getElementById('cipher-js');
const bntDecipher = document.getElementById('decipher-js');
const result = document.getElementById('result-js');
const textValue = document.getElementById('text-value-js');

btnCipher.addEventListener('click',(e) => {
  e.preventDefault();
  let valueText = text.value;
  if(isValidate(valueText)) {
    textValue.textContent = `El texto ingresado es: ${text.value}`;
    result.textContent = `El resultado es: ${cipher(valueText)}`;
    clean();
  }
})

bntDecipher.addEventListener('click',(e) => {
  e.preventDefault();
  let valueText = text.value;
  if(isValidate(valueText)) {
    textValue.textContent = `El texto ingresado es:  ${text.value}`;
    result.textContent = `El resultado es: ${deCipher(valueText)}`;
    clean();
  }
})