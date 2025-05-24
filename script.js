function encrypt() {
    const input = document.getElementById("text").value;
    const resultArea = document.getElementById("result");
    resultArea.value = "🛠️ 暗号化中...\n";
    
    let result = "";
    let i = 0;
  
    function processChar() {
      if (i < input.length) {
        let char = input[i];
        let encryptedChar = "";
  
        if (char.match(/[a-z]/)) {
          encryptedChar = String.fromCharCode((char.charCodeAt(0) - 97 + 3) % 26 + 97);
        } else if (char.match(/[A-Z]/)) {
          encryptedChar = String.fromCharCode((char.charCodeAt(0) - 65 + 3) % 26 + 65);
        } else {
          encryptedChar = char;
        }
  
        result += encryptedChar;
        resultArea.value = result + "_";
        i++;
  
        setTimeout(processChar, 80); // ここでテンポ調整できる
      } else {
        resultArea.value = result + "\n🔒 暗号化完了！";
      }
    }
  
    processChar();
  }