document.addEventListener('DOMContentLoaded', function () {
  loadContent();

  function loadContent() {
    fetch('content.txt')
      .then(response => response.text())
      .then(text => {
        const container = document.getElementById('text-container');
        const wordsContainer = document.getElementById('words');
        let modifiedText = encodeHtml(text); 
        let matchIndex = 1;
        let draggables = [];

        modifiedText = modifiedText.replace(/\*([^*]+)\*/g, function(match, p1) {
          let draggable = document.createElement('div');
          draggable.setAttribute('draggable', true);
          draggable.classList.add('draggable');
          draggable.textContent = p1.trim();
          draggables.push(draggable);
          return `<input type="text" id="input-${matchIndex++}" data-answer="${p1.trim()}">`;
        });

        shuffle(draggables);
        draggables.forEach(draggable => wordsContainer.appendChild(draggable));
        container.innerHTML = modifiedText.replace(/\n/g, '<br>').replace(/ {5}/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        applyDraggableListeners();
        applyDroppableListeners();
      })
      .catch(error => console.error('Error loading the text file:', error));
  }

  function applyDraggableListeners() {
    document.querySelectorAll('.draggable').forEach(item => {
      item.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text', event.target.innerText);
      });
    });
  }

  function applyDroppableListeners() {
    document.querySelectorAll('input[type="text"]').forEach(input => {
      input.addEventListener('dragover', event => event.preventDefault());
      input.addEventListener('drop', event => {
        event.preventDefault();
        input.value = event.dataTransfer.getData('text');
      });
    });
  }
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function encodeHtml(html) {
  return html.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&#039;');
}


document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text', event.target.innerText);
    });
  });
  
  document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('dragover', event => {
      event.preventDefault();  // Allow the drop
    });
  
    input.addEventListener('drop', event => {
      event.preventDefault();
      const correctWord = event.dataTransfer.getData('text');
      event.target.value = correctWord;
    });
  });
  
  function checkAnswers() {
    let score = 0;
    const inputs = document.querySelectorAll('input[type="text"]');
    const total = inputs.length;
    inputs.forEach(input => {
      const correctAnswer = input.dataset.answer;
      if (input.value.trim() === correctAnswer) {
        input.className = 'correct';
        score++;  // Increment score for each correct answer
      } else {
        input.className = 'incorrect';
      }
    });
    const scorePercent = Math.round((score / total) * 100);
    document.getElementById('score').textContent = `${scorePercent}% (${score} / ${total})`;
  }
  
  


  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // ES6 array destructuring swap
    }
  }
  