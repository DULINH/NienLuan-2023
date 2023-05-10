// kiểm tra trình duyệt có hỗ trợ Web Speech API hay không
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  // tạo một đối tượng mới của lớp SpeechRecognition
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // thiết lập ngôn ngữ và chế độ ghi âm liên tục
  recognition.lang = 'vn-VN';
  recognition.continuous = true;

  // xử lý các sự kiện của quá trình nhận dạng giọng nói
  recognition.onresult = function(event) {
    const result = event.results[event.resultIndex][0].transcript;
    const output = document.getElementById('recognized-text');
    output.innerHTML += result;
  }

  recognition.onerror = function(event) {
    console.error('Lỗi nhận dạng giọng nói:', event.error);
  }

  // bắt đầu quá trình nhận dạng giọng nói khi người dùng nhấn nút "Bắt đầu ghi âm"
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');

  startButton.addEventListener('click', function() {
    recognition.start();
    startButton.disabled = true;
    startButton.innerHTML = '<i class="fas fa-microphone-slash"></i>Đang ghi âm...';
    stopButton.disabled = false;
    console.log('Bắt đầu ghi âm');
  });

  // dừng quá trình nhận dạng giọng nói khi người dùng nhấn nút "Dừng ghi âm"
  stopButton.addEventListener('click', function() {
    recognition.stop();
    startButton.disabled = false;
    startButton.innerHTML = '<i class="fas fa-microphone"></i>';
    stopButton.disabled = true;
    console.log('Dừng ghi âm');
  });
} else {
  console.error('Trình duyệt không hỗ trợ Web Speech API');
}

//text - to - speech
const synth = window.speechSynthesis;
    const speakButton = document.getElementById('speak-button');
    const stopButton = document.getElementById('stop-button');
    const textInput = document.getElementById('recognized-text');
    let utterance = new SpeechSynthesisUtterance();

    speakButton.addEventListener('click', () => {
      utterance.text = textInput.value;
      synth.speak(utterance);
    });

    stopButton.addEventListener('click', () => {
      synth.cancel();
    });