const recordBtn = document.querySelector(".record"),
inputLanguage = document.querySelector("#language-write"),
outputLanguage = document.querySelector("#language-read"),
inputField = document.querySelector("#textInput");

var result = document.querySelector(".result");

let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,recognition,recording = false;



function speechToText() {
  try {
    recognition = new SpeechRecognition();
    recognition.lang = inputLanguage.value;
    recognition.interimResults = true;
    recordBtn.classList.add("recording");
    recognition.start();
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      //detect when intrim results
      if (event.results[0].isFinal) {
        result.innerHTML += " " + speechResult;
        result.querySelector("p").remove();
      } else {
        //creative p with class interim if not already there
        if (!document.querySelector(".interim")) {
          const interim = document.createElement("p");
          interim.classList.add("interim");
          result.appendChild(interim);
        }
        //update the interim p with the speech result
        document.querySelector(".interim").innerHTML = " " + speechResult;
      }
    };
    recognition.onspeechend = () => {
      speechToText();
    };
    recognition.onerror = (event) => {
      stopRecording();
      if (event.error === "no-speech") {
        alert("No speech was detected. Stopping...");
      } else if (event.error === "audio-capture") {
        alert(
          "No microphone was found. Ensure that a microphone is installed."
        );
      } else if (event.error === "not-allowed") {
        alert("Permission to use microphone is blocked.");
      } else if (event.error === "aborted") {
        alert("Listening Stopped.");
      } else {
        alert("Error occurred in recognition: " + event.error);
      }
    };
  } catch (error) {
    recording = false;

    console.log(error);
  }
}

recordBtn.addEventListener("click", () => {
  if (!recording) {
    speechToText();
    recording = true;
  } else {
    stopRecording();
  }
});

function stopRecording() {
  recognition.stop();
  recordBtn.classList.remove("recording");
  recording = false;
}







//  function to create options each contain a language and append it to select element 
function populateLanguages() {
  languages.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.innerHTML = lang.name;
    inputLanguage.appendChild(option);
  });
}

populateLanguages();

function speakTool() {
  var text = result.textContent;
  responsiveVoice.speak(text,outputLanguage.value);
}

function populateLanguagesVoices() {
  languagesVoices.forEach((lang) => {
    var option = document.createElement("option");
    option.value = lang.name;
    option.innerHTML = lang.name;
    outputLanguage.appendChild(option);
  });
}

populateLanguagesVoices();

function handleEnter(event) {
  if (event.key === 'Enter') {
    var inputValue = inputField.value;
    inputField.value = ''; 
  
    result.textContent = inputValue;
    result.style.display ="block"
  }
}


