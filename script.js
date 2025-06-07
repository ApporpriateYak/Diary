const diaryText = document.getElementById('diaryText');
const newbt = document.getElementById('newbt');
const save = document.getElementById('save');
const entryList = document.getElementById('entryList');

// Load all saved entries from localStorage or start with empty array
let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

// Show all saved entries as links
function displayEntries() {
    entryList.innerHTML = '';
    entries.forEach((entry) => {
      const li = document.createElement('li');
  
      const link = document.createElement('a');
      link.href = `?entry=${entry.id}`;
      link.textContent = entry.timestamp;
  
      const delButton = document.createElement('button');
      delButton.textContent = '🗑️';
      delButton.style.marginLeft = '10px';
      delButton.addEventListener('click', () => {
        const confirmDelete = confirm('Are you sure you want to delete this entry?');
        if (!confirmDelete) return;
      
        entries = entries.filter(e => e.id !== entry.id);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        displayEntries();
      
        const currentId = parseInt(new URLSearchParams(window.location.search).get('entry'));
        if (currentId === entry.id) {
          diaryText.value = '';
          history.replaceState(null, '', window.location.pathname);
        }
      });
      
  
      li.appendChild(link);
      li.appendChild(delButton);
      entryList.appendChild(li);
    });
  }
22  

// Save new entry
save.addEventListener('click', () => {
  if (diaryText.value.trim() === '') return;

  const entry = {
    id: Date.now(),
    text: diaryText.value,
    timestamp: new Date().toLocaleString()
  };

  entries.push(entry);
  localStorage.setItem('diaryEntries', JSON.stringify(entries));
  displayEntries();
  diaryText.value = '';
  alert('Entry saved!');
});

// New button clears textarea
newbt.addEventListener('click', () => {
  diaryText.value = '';
  history.replaceState(null, '', window.location.pathname);
});

// Load entry from URL if any
function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('entry'));
  if (id) {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      diaryText.value = entry.text;
    }
  }
}

// Initial load
displayEntries();
loadFromURL();
