var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var temp, arrPosition = [0];
window.answers = [];
// var start_click = false;
if (!('webkitSpeechRecognition' in window)) {
    upgrade();
} else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
        recognizing = true;
        start_img.src = '../assets/image/mic-animate.gif';
        start_img.className = 'mic-animate';
    };

    recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
            start_img.src = '../assets/image/micro.svg';
            start_img.className = 'micro';

            console.log('info_no_speech');
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            start_img.src = '../assets/image/micro.svg';
            start_img.className = 'micro';
            console.log('info_no_microphone');
            ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
                console.log('info_blocked');
            } else {
                console.log('info_denied');
            }
            ignore_onend = true;
        }
    };

    recognition.onend = function () {
        arrPosition = [0];
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        start_img.src = '../assets/image/micro.svg';
        start_img.className = 'micro';
        if (!final_transcript) {
            console.log('info_start');
            return;
        }
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById('final_span'));
            window.getSelection().addRange(range);
        }
        if (create_email) {
            create_email = false;
            createEmail();
        }
    };

    recognition.onresult = function (event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_span.innerHTML = '';
                interim_span.innerHTML = '';
                final_transcript = split_strings(event.results[i][0].transcript, arrPosition);
            } else {
                interim_transcript += event.results[i][0].transcript;
                temp = interim_transcript;
                setTimeout(function () {
                    if (temp === interim_transcript) {
                        var len = interim_transcript.length;
                        if (-1 === arrPosition.indexOf(len)) {
                            arrPosition.push(len);
                            // window.questions.push(interim_transcript.substring(arrPosition[arrPosition.length-2], arrPosition[arrPosition.length -1]).trim());
                            getAnswer(interim_transcript.substring(arrPosition[arrPosition.length - 2], arrPosition[arrPosition.length - 1]).trim());
                        }
                    }
                    interim_transcript = split_strings(interim_transcript, arrPosition);
                    interim_span.innerHTML = interim_transcript;
                }, 1000);
            }
        }
        final_span.innerHTML = final_transcript;
        interim_span.innerHTML = interim_transcript;
    }
};

function upgrade() {
    start_button.style.visibility = 'hidden';
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
    return s.replace(first_char, function (m) {
        return m.toUpperCase();
    });
}

function split_strings(str, arrPosition) {
    if (arrPosition && str) {
        var strArr = '';
        var len = arrPosition.length;
        for (var i = 0; i < len - 1; i++) {
            strArr += capitalize(str.substring(arrPosition[i], arrPosition[i + 1])) + '. ';
        }
        return strArr;
    }
}

function getAnswer(question) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:7000/cybercontact?search=' + question,
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        headers : {'Content-Type' : 'application/json; charset=utf-8'},
    }).done(function (data) {
        window.answers.push(data);
        console.log(data);
    }).error(function () {
        console.log('error get answer!!!');
    })
}

function startButton(event) {
    if (recognizing) {
        recognition.stop();
        return;
    }
    // window.questions = [];
    window.answers = [];
    final_transcript = '';
    recognition.lang = "vi-VI";
    recognition.start();
    ignore_onend = false;
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
    start_img.src = '../assets/image/mic-slash.gif';
    start_img.className = 'mic-slash';
    start_timestamp = event.timeStamp;
}