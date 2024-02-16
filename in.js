let container = document.getElementById('container');
let resultParagraph = document.getElementById('result');

let recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-EN';

recognition.onresult = function(event) {
    let spokenText = event.results[0][0].transcript.trim().toLowerCase();
    let result = evaluateExpression(spokenText);
    if (result !== null) {
        resultParagraph.textContent = `Natija: ${result}.     
        Agar boshqa misol yechmoqchi bo'lsangiz, saytni reboot qiling`;
    } else {
        resultParagraph.textContent = "Uzr, tushunmadim, boshqatdan aytib ko'ring.     Agar boshqa misol yechmoqchi bo'lsangiz, saytni reboot qiling";
    }
};

function evaluateExpression(spokenText) {
    let expression = spokenText
        .replace('plus', '+')
        .replace('minus', '-')
        .replace('multiplied by', '*')
        .replace('divided by', '/')
        .replace('raised to power of', '**');

    try {
        return eval(expression);
    } catch (error) {
        console.error(error);
        return null;
    }
}

recognition.start();
