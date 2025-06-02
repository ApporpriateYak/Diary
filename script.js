const diarytext = document.getElementById('diarytext');
const newbt = document.getElementById('newbt');
const save = document.getElementById('save');

if(localStorage.getItem('diarytext')){
    diarytext.value = localStorage.getItem('diarytext');
}

newbt.addEventListener('click', () =>{
    diarytext.value = '';
});

save.addEventListener('click', () => {
    localStorage.setItem('diarytext', diarytext.value);
    alert('Entry saved!');
  });