function processText(mode) {
    const inputText = document.getElementById("text").value;
    const resultArea = document.getElementById("result");
    const shiftInput = document.getElementById("shift");
    let shift = 3; // デフォルトのシフト数

    if (shiftInput) {
        const parsedShift = parseInt(shiftInput.value);
        if (!isNaN(parsedShift) && parsedShift >= 1 && parsedShift <= 25) {
            shift = parsedShift;
        } else {
            resultArea.value = "エラー: シフト数は1から25の間で有効な数値を入力してください。";
            return;
        }
    }

    if (mode === "decrypt") {
        shift = (26 - shift) % 26; // 復号の場合はシフトを逆にする
    }

    resultArea.value = mode === "encrypt" ? "🛠️ 暗号化中...\n" : "🔑 復号中...\n";
    
    let result = "";
    let i = 0;
  
    function processChar() {
      if (i < inputText.length) {
        let char = inputText[i];
        let processedChar = "";
  
        if (char.match(/[a-z]/)) {
          processedChar = String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
        } else if (char.match(/[A-Z]/)) {
          processedChar = String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
        } else {
          processedChar = char;
        }
  
        result += processedChar;
        // 処理中の文字とアンダースコアで進行状況を表示
        resultArea.value = result + (i < inputText.length -1 ? "_" : ""); 
        i++;
  
        setTimeout(processChar, 60); // テンポを少し調整 (例: 60ms)
      } else {
        // 完了メッセージを追加
        resultArea.value = result + (mode === "encrypt" ? "\n🔒 暗号化完了！" : "\n🗝️ 復号完了！");
      }
    }
  
    if (inputText.length === 0) {
        resultArea.value = "テキストが入力されていません。";
        return;
    }
    processChar();
}

function encrypt() {
    processText("encrypt");
}

function decrypt() {
    processText("decrypt");
}

function copyResult() {
    const resultArea = document.getElementById("result");
    // 完了メッセージを除いた本体のみをコピー対象とする場合
    const resultText = resultArea.value.split("\n")[0]; 
    if (navigator.clipboard && resultText) {
        navigator.clipboard.writeText(resultText).then(() => {
            // 必要であればコピー完了のフィードバック (例: 短いメッセージ表示)
            // alert("結果をコピーしました！"); 
        }).catch(err => {
            // エラー処理
            console.error("コピーに失敗しました: ", err);
            // 旧式のexecCommandフォールバック (HTTPSでないと動かない場合がある)
            try {
                resultArea.select();
                document.execCommand('copy');
            } catch (e) {
                // 何もしない
            }
        });
    } else if (resultText) { // navigator.clipboardが使えない場合のフォールバック
         try {
            resultArea.select(); // select()はtextareaで機能
            const tempInput = document.createElement("textarea"); // 一時的なtextareaを作成
            tempInput.value = resultText;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            // alert("結果をコピーしました！(fallback)");
        } catch (e) {
            alert("コピー機能が利用できませんでした。");
        }
    }
}


function clearFields() {
    document.getElementById("text").value = "";
    document.getElementById("result").value = "";
}
