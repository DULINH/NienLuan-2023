const vocabularyForm = document.querySelector('#vocabulary-form');
    const vocabularyList = document.querySelector('#vocabulary-list');
    const vocabularyItems = JSON.parse(localStorage.getItem('vocabularyItems')) || [];

    function renderVocabularyItems() {
      vocabularyList.innerHTML = '';
      for (const item of vocabularyItems) {
        const li = document.createElement('li');
        const wordSpan = document.createElement('span');
        const meaningSpan = document.createElement('span');
        const deleteButton = document.createElement('button');

        wordSpan.textContent = item.word;
        meaningSpan.textContent = item.meaning;
        deleteButton.textContent = 'Delete';

        li.appendChild(wordSpan);
        li.appendChild(meaningSpan);
        li.appendChild(deleteButton);

        vocabularyList.appendChild(li);

        deleteButton.addEventListener('click', () => {
          const index = vocabularyItems.indexOf(item);
          vocabularyItems.splice(index, 1);
          localStorage.setItem('vocabularyItems', JSON.stringify(vocabularyItems));
          renderVocabularyItems();
        });
      }
    }

    renderVocabularyItems();

    vocabularyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const wordInput = document.querySelector('#word');
      const meaningInput = document.querySelector('#meaning');
      const word = wordInput.value.trim();
      const meaning = meaningInput.value.trim();
      if (word === '' || meaning === '') {
        return;
      }
      const vocabularyItem = { word, meaning };
      vocabularyItems.push(vocabularyItem);
      localStorage.setItem('vocabularyItems', JSON.stringify(vocabularyItems));
      wordInput.value = '';
      meaningInput.value = '';
      renderVocabularyItems();
    });

    function createEditForm(item, li) {
      const form = document.createElement('form');
      const wordInput = document.createElement('input');
      const meaningInput = document.createElement('input');
      const updateButton = document.createElement('button');

      wordInput.value = item.word;
      meaningInput.value = item.meaning;
      updateButton.textContent = 'Update';

      form.appendChild(wordInput);
      form.appendChild(meaningInput);
      form.appendChild(updateButton);

      updateButton.addEventListener('click', () => {
        const newWord = wordInput.value.trim();
        const newMeaning = meaningInput.value.trim();
        if (newWord === '' || newMeaning === '') {
          return;
        }
        item.word = newWord;
        item.meaning = newMeaning;
        localStorage.setItem('vocabularyItems', JSON.stringify(vocabularyItems));
        li.removeChild(form);
        renderVocabularyItems();
      });

      return form;
    }

    function renderVocabularyItems() {
      vocabularyList.innerHTML = '';
      for (const item of vocabularyItems) {
        const li = document.createElement('li');
        const wordSpan = document.createElement('span');
        const meaningSpan = document.createElement('span');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        wordSpan.textContent = item.word;
        meaningSpan.textContent = item.meaning;

        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        li.appendChild(wordSpan);
        li.appendChild(meaningSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        vocabularyList.appendChild(li);

        editButton.addEventListener('click', () => {
          const editForm = createEditForm(item, li);
          li.insertBefore(editForm, deleteButton);
        });

        deleteButton.addEventListener('click', () => {
          const index = vocabularyItems.indexOf(item);
          vocabularyItems.splice(index, 1);
          localStorage.setItem('vocabularyItems', JSON.stringify(vocabularyItems));
          renderVocabularyItems();
        });
      }
    }