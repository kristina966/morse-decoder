function decodeBits(bits) {
  let morseArr = bits.split(""); // converting string to array

  //* Deleted unnecessary 0   [0, 1, 0, 1, 0] => [1, 0, 1]
  while (morseArr[0] === "0") morseArr.shift(); // delete 0 at the beginning
  while (morseArr[morseArr.length - 1] === "0") morseArr.pop(); // delete 0 at the end

  let freeBits = morseArr.join(""); //convering array to string

  if (freeBits.indexOf("0") < 0) return "."; // any quanity 1 => '.'

  //* Clear in string unnecessary 0 and 1     '11001100000011' => '1010001'
  for (let i = 1; ; i++) {
    // seach step
    if (
      freeBits.indexOf(`1${"0".repeat(i)}1`) >= 0 || // trap for '1110111' type
      freeBits.indexOf(`${"1".repeat(i + 1)}`) < 0
    ) {
      // trap for '10001'type
      freeBits = freeBits
        .replace(new RegExp(`0{${i}}`, "g"), "0") // swap 0 step time  '11001100000011' => '1101100011'
        .replace(new RegExp(`1{${i}}`, "g"), "1"); // swap 1 step time  '1101100011' => '1010001'
      break;
    }
  }

  //* coverting '1010001' => '.. .'
  return freeBits
    .replace(/111/g, "-")
    .replace(/000/g, " ")
    .replace(/1/g, ".")
    .replace(/0/g, "");
}

function decodeMorse(morseCode) {
  let morseArr = morseCode.split(" "); // converting string to array

  //* Decodin morse to text
  for (let i = 0; i < morseArr.length; i++) {
    // running to array
    if (morseArr[i] === "" && morseArr[i + 1] === "") {
      // in 32 line '  ' => ['', ''], here => [' ']
      morseArr.splice(i, 2, " ");
    }
    if (morseArr[i] !== "") {
      morseArr[i] = MORSE_CODE[morseArr[i]]; // decoding letters
    } else {
      morseArr[i] = " "; // decoding remaining '' => ' '
    }
  }

  return morseArr.join(""); // ["h", "a", "p", "p", "y", " ", "e", "n", "d"] => 'happy end'
}

let MORSE_CODE = {
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-.-.--": "!",
  ".-.-.-": ".",
  "--..--": ",",
};

let a = decodeBits("1010001");
decodeMorse(a);
