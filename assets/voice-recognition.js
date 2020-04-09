const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
var xhr = new XMLHttpRequest();


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//Get all words and sentances from DB


recognition.onstart = function() {
    console.log("voice is active YO!");
};

recognition.onresult = function(event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;

    content.textContent = transcript;
    console.log(transcript);
    xhr.open("POST", "/voice/submit", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: transcript
    }));
    // console.log("hello.. hotdog");
    setTimeout(function(){ window.location.pathname = '/voice/talk-login'; }, 800);



};

//Add listner to btn
btn.addEventListener("click", () => {
    recognition.start();
});
