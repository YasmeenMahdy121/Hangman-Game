// letters section
let lettersSection=document.querySelector('.letters');
// category word section
let categoryWord=document.querySelector('.the-category-word');
// correct letters which clicked
let correctLetters=0;
// letters
let letters='abcdefghijklmnopqrstuvwxyz';
// generate array of the letters
let lettersArr= Array.from(letters);
// generate letters span
lettersArr.forEach((letter)=>{
    // create span
    let span=document.createElement('span');
    // add letter to span
    let lett=document.createTextNode(letter);
    span.appendChild(lett);
    // add span to letters section
    lettersSection.appendChild(span);
});
// Object Of Words + Categories
const words = {
    Programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    Movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    People: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    Countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
  }
// get random category
let categories=Object.keys(words);
let randomCategory=categories[Math.floor(Math.random()*categories.length)];
// set random category to html
document.querySelector('.category').innerHTML=randomCategory;
// get random category word
let randomCategoryWord=words[randomCategory][Math.floor(Math.random()*words[randomCategory].length)];
// set random category word to html
for(ch of randomCategoryWord){
    let span=document.createElement('span');
    if(ch!=' '){
        categoryWord.appendChild(span);
    }
    else{
        correctLetters++;
        span.innerHTML='-';
        categoryWord.appendChild(span);
    }
}
// get letters to click
let lettersSpan=document.querySelectorAll('.letters span');
// get guessing word spans
let categoryWordSpan=document.querySelectorAll('.the-category-word span');
// number of wrong click
let wrongNum=0;
// click on letters
lettersSpan.forEach((span)=>{
    span.addEventListener('click',function(){
        checkLetters(span);
    });
});
// checkLetters function
function checkLetters(span){
    let correct=false;
    span.className='disable';
    // check letter
    for( i in randomCategoryWord){
        if(randomCategoryWord[i].toLowerCase()==span.innerHTML){
            categoryWordSpan[i].innerHTML=randomCategoryWord[i];
            correctLetters++;
            correct=true;
        }
      }
    //   increase wrong number if the letter not found in the word
      if(correct==false){
        wrongNum++;
        let drawSection=document.querySelector('.the-draw-section');
        drawSection.classList.add(`wrong-${wrongNum}`);
      }
    //   check if end game
      if(correctLetters==randomCategoryWord.length){
          endGame(true);
      }
      else if(wrongNum==7){
          endGame(false);
      }
}
// end game function
function endGame(status){
    setTimeout(()=>{
        let overlay=document.querySelector('.overlay');
        let message=document.querySelector('.end-game');
        // if succeeded
        if(status){
            message.innerHTML='Congratulation';
            overlay.style.display='block';
            message.style.display='flex';
            setTimeout(()=>{
                message.style.top='50px';
            },210);
        }
        // if failed
        else{
            message.innerHTML=`Game Over, The Word Is ${randomCategoryWord}`;
            overlay.style.display='block';
            message.style.display='flex';
            setTimeout(()=>{
                message.style.top='50px';
            },210);
        }
    },200);
}
