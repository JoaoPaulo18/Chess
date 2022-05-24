const box = document.querySelector('.box');
const numbers = [1,2,3,4,5,6,7,8].reverse();
const letters = ['a','b','c','d','e','f','g','h'];
const Start1 = ['Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn','Pawn']
const Start2 = ['Rook','Knight','Bishop','Queen','King','Bishop','Knight','Rook'];
let color = 'white';
let Turn = 'white';
let Houses;
let AllSpans;

initChess();

function initChess(){
numbers.forEach(number => {
    letters.forEach(letter =>{
      const boxPeaces = document.createElement('span');
      color == 'white' ? boxPeaces.style.background = 'white' : boxPeaces.style.background = 'green';
      color == 'white' ? color = 'green' : color = 'white';
      if(letter == 'h')
      color == 'white' ? color = 'green' : color = 'white';
      boxPeaces.setAttribute('data-house', number+letter);
      box.appendChild(boxPeaces);
    })
})
  PutSVGs();
}

function PutSVGs(){
  numbers.forEach(number => {
    if(number == 8){
      letters.forEach((letter,index) => {
      const SvgBox = document.createElement('div');
        SvgBox.classList.add('SvgBox');
      const boxImg = document.createElement('img');
      const img = `./SVGs/${Start2[index]}`;
        boxImg.setAttribute('src',img+'Black.svg');
        SvgBox.appendChild(boxImg);
        document.querySelector(`[data-house="8${letter}"]`).appendChild(SvgBox);
   })
  }else if(number == 7){
    letters.forEach((letter,index) => {
      const SvgBox = document.createElement('div');
      SvgBox.classList.add('SvgBox');
      const boxImg = document.createElement('img');
      const img = `./SVGs/${Start1[index]}`;
      boxImg.setAttribute('src',img+'Black.svg');
      SvgBox.appendChild(boxImg);
     document.querySelector(`[data-house="7${letter}"]`).appendChild(SvgBox);
    })
  }else if(number == 2){
    letters.forEach((letter,index) => {
      const SvgBox = document.createElement('div');
      SvgBox.classList.add('SvgBox');
      const boxImg = document.createElement('img');
      const img = `./SVGs/${Start1[index]}`;
      boxImg.setAttribute('src',img+'White.svg');
      SvgBox.appendChild(boxImg);
     document.querySelector(`[data-house="2${letter}"]`).appendChild(SvgBox);
    })
  }else if(number == 1){
    letters.forEach((letter,index) => {
      const SvgBox = document.createElement('div');
      SvgBox.classList.add('SvgBox');
      const boxImg = document.createElement('img');
      const img = `./SVGs/${Start2[index]}`;
      boxImg.setAttribute('src',img+'White.svg');
      SvgBox.appendChild(boxImg);
     document.querySelector(`[data-house="1${letter}"]`).appendChild(SvgBox);
    })
  }

  })
  Houses = document.querySelectorAll('.box span div');
  Houses.forEach(house => house.addEventListener("click", Play));
}

const Plays = {
  Clear(){
    AllSpans = document.querySelectorAll('.box span');
    AllSpans.forEach(span => {
      span.classList.remove('active');
      span.removeEventListener('click',transferPosition)
    })
    },

    King(Position,Peace){
      this.Clear();
      const number = +Position.split('')[0];
      const letter = Position.split('')[1];
      const nextSpans = [
        document.querySelector(`[data-house="${(number+1)+letter}"]`),
        document.querySelector(`[data-house="${(number-1)+letter}"]`),

        document.querySelector(`[data-house="${(number)+letters[letters.indexOf(letter)+1]}"]`),
        document.querySelector(`[data-house="${(number+1)+letters[letters.indexOf(letter)+1]}"]`),
        document.querySelector(`[data-house="${(number-1)+letters[letters.indexOf(letter)+1]}"]`),

        document.querySelector(`[data-house="${(number)+letters[letters.indexOf(letter)-1]}"]`),
        document.querySelector(`[data-house="${(number+1)+letters[letters.indexOf(letter)-1]}"]`),
        document.querySelector(`[data-house="${(number-1)+letters[letters.indexOf(letter)-1]}"]`),
      ]
      nextSpans.forEach(item => {
        if(item && item.innerHTML==''){
          item.classList.add('active');
          transferPosition.peace = Peace;
          transferPosition.transfer = item;
          item.addEventListener('click',transferPosition);
        }else if(item && item.innerHTML != '' && (Turn == 'white'?item.innerHTML.includes('Black'): item.innerHTML.includes('White'))){
          EatPeace.peace = Peace;
          EatPeace.next = item;
          item.addEventListener('click',EatPeace);
        }
      })
    },

    Queen(Position,Peace){
      this.Bishop(Position,Peace);
      this.Rook(Position,Peace);
    },

    Rook(Position,Peace){
      if(!Peace.childNodes[0].getAttribute('src').includes('Queen'))
      this.Clear();

      const number = +Position.split('')[0]
      const letter = Position.split('')[1]

    /** Move Foward / Mover para frente */  
    for(let i = (Turn=='white' ? number+1 : number-1); Turn=='white'? i<7 : i>=1; Turn=='white' ? i++ : i--){
      const forward = document.querySelector(`[data-house="${i+letter}"]`);
      
      if(!forward)break;
 
      if(((forward.innerHTML != '' && Peace.childNodes[0].getAttribute('src').includes('White') && forward.childNodes[0].childNodes[0].getAttribute('src').includes('White')) 
      || 
      (forward.innerHTML != '' && Peace.childNodes[0].getAttribute('src').includes('Black') && forward.childNodes[0].childNodes[0].getAttribute('src').includes('Black'))))  break;  

    if(forward.innerHTML!=''){
      if(Peace.childNodes[0].getAttribute('src').includes('White') && forward.childNodes[0].childNodes[0].getAttribute('src').includes('Black') || Peace.childNodes[0].getAttribute('src').includes('Black') && forward.childNodes[0].childNodes[0].getAttribute('src').includes('White')){
        EatPeace.peace = Peace;
        EatPeace.next = forward;
        forward.addEventListener('click',EatPeace);
        break;
      }
    }

        forward.classList.add('active');
        transferPosition.peace = Peace;
        transferPosition.transfer = forward;
        forward.addEventListener('click',transferPosition);
    }
    /** Move Behind / Mover para trás */  
    for(let i = (Turn=='white'?number-1:number+1); Turn=='white'?i>=1:i<=8; Turn=='white'?i--:i++){
      const behind = document.querySelector(`[data-house="${i+letter}"]`);
     
      if(!behind)break;
      if((behind.innerHTML!='' && Peace.childNodes[0].getAttribute('src').includes('Black') && behind.childNodes[0].childNodes[0].getAttribute('src').includes('Black'))
      ||
      (behind.innerHTML!='' && Peace.childNodes[0].getAttribute('src').includes('White') && behind.childNodes[0].childNodes[0].getAttribute('src').includes('White'))) break;

      if(behind.innerHTML!=''){
        if(Peace.childNodes[0].getAttribute('src').includes('White') && behind.childNodes[0].childNodes[0].getAttribute('src').includes('Black') || Peace.childNodes[0].getAttribute('src').includes('Black') && behind.childNodes[0].childNodes[0].getAttribute('src').includes('White')){
          EatPeace.peace = Peace;
          EatPeace.next = behind;
          behind.addEventListener('click',EatPeace);
          break;
        }
      }    
        behind.classList.add('active');
        transferPosition.peace = Peace;
        transferPosition.transfer = behind;
        behind.addEventListener('click',transferPosition);
    }

    /** Move Right / Mover para a direita */
    for(let i = letters.indexOf(letter); i<=7; i++){
      const Right = document.querySelector(`[data-house="${number + letters[i+1]}"]`);
      if(!Right)break;

      if(((Right.innerHTML != '' && Peace.childNodes[0].getAttribute('src').includes('White') && Right.childNodes[0].childNodes[0].getAttribute('src').includes('White')) 
      || 
      (Right.innerHTML != '' && Peace.childNodes[0].getAttribute('src').includes('Black') && Right.childNodes[0].childNodes[0].getAttribute('src').includes('Black'))))  break;  

      if(Right.innerHTML!=''){
        if(Peace.childNodes[0].getAttribute('src').includes('White') && Right.childNodes[0].childNodes[0].getAttribute('src').includes('Black') || Peace.childNodes[0].getAttribute('src').includes('Black') && Right.childNodes[0].childNodes[0].getAttribute('src').includes('White')){
          EatPeace.peace = Peace;
          EatPeace.next = Right;
          Right.addEventListener('click',EatPeace);
          break;
        }
      }
    
        Right.classList.add('active');
        transferPosition.peace = Peace;
        transferPosition.transfer = Right;
        Right.addEventListener('click',transferPosition);
      
    }

    /** Move Left / Mover para a esquerda */
    for(let i = letters.indexOf(letter); i>=1; i--){
      const Left = document.querySelector(`[data-house="${number + letters[i-1]}"]`);
      if(!Left)break;

      if(((Left.innerHTML != '' && Peace.childNodes[0].getAttribute('src').includes('White') && Left.childNodes[0].childNodes[0].getAttribute('src').includes('White')) 
      || 
      (Left.innerHTML != '' && Peace.childNodes[0].getAttribute('src').includes('Black') && Left.childNodes[0].childNodes[0].getAttribute('src').includes('Black'))))  break;  

      if(Left.innerHTML!=''){
        if(Peace.childNodes[0].getAttribute('src').includes('White') && Left.childNodes[0].childNodes[0].getAttribute('src').includes('Black') || Peace.childNodes[0].getAttribute('src').includes('Black') && Left.childNodes[0].childNodes[0].getAttribute('src').includes('White')){
          EatPeace.peace = Peace;
          EatPeace.next = Left;
          Left.addEventListener('click',EatPeace);
          break;
        }
      }
    
        Left.classList.add('active');
        transferPosition.peace = Peace;
        transferPosition.transfer = Left;
        Left.addEventListener('click',transferPosition);
      
    }

    },

    Knight(Position,Peace){
      this.Clear();
      const number = +Position.split('')[0];
      const letter = Position.split('')[1];
      const nextSpans = [
        document.querySelector(`[data-house="${(Turn=='white'?number+2:number-2)+letters[letters.indexOf(letter)+1]}"]`),
        document.querySelector(`[data-house="${(Turn=='white'?number+2:number-2)+letters[letters.indexOf(letter)-1]}"]`),
        document.querySelector(`[data-house="${(Turn=='white'?number+1:number-1)+letters[letters.indexOf(letter)+2]}"]`),
        document.querySelector(`[data-house="${(Turn=='white'?number+1:number-1)+letters[letters.indexOf(letter)-2]}"]`),

        document.querySelector(`[data-house="${(Turn=='white'?number-2:number+2)+letters[letters.indexOf(letter)+1]}"]`),
        document.querySelector(`[data-house="${(Turn=='white'?number-2:number+2)+letters[letters.indexOf(letter)-1]}"]`),
        document.querySelector(`[data-house="${(Turn=='white'?number-1:number+1)+letters[letters.indexOf(letter)+2]}"]`),
        document.querySelector(`[data-house="${(Turn=='white'?number-1:number+1)+letters[letters.indexOf(letter)-2]}"]`),
      ]

      nextSpans.forEach(item => {
        if(item && item.innerHTML==''){
          item.classList.add('active');
          transferPosition.peace = Peace;
          transferPosition.transfer = item;
          item.addEventListener('click',transferPosition);
        }else if(item && item.innerHTML != '' && (Turn == 'white'?item.innerHTML.includes('Black'): item.innerHTML.includes('White'))){
          EatPeace.peace = Peace;
          EatPeace.next = item;
          item.addEventListener('click',EatPeace);
        }
      })
    },

    Bishop(Position,Peace){
      this.Clear();
      const number = +Position.split('')[0];
      const letter = Position.split('')[1];
      let contagem1 = 0;
      let contagem2 = 0;
      let contagem3 = 0;
      let contagem4 = 0;

     

      for(let i=number; Turn=="white"?i<9 : i>=1;Turn=='white'? i++ : i--){

          const nextSpan = document.querySelector(`[data-house="${i+letters[Turn=="white"?letters.indexOf(letter)+contagem1:letters.indexOf(letter)-contagem1]}"]`);

          if(!nextSpan) break;

          if(nextSpan && nextSpan.getAttribute('data-house')!=number+letter){
          if(nextSpan.innerHTML==""){
            nextSpan.classList.add('active')
            transferPosition.peace = Peace;
            transferPosition.transfer = nextSpan;
            transferPosition.Clear = this.Clear;
            nextSpan.addEventListener('click',transferPosition);

          }else if(Turn=='white' ? nextSpan.childNodes[0].childNodes[0].getAttribute('src').includes('Black') : nextSpan.childNodes[0].childNodes[0].getAttribute('src').includes('White')){
            EatPeace.peace = Peace;
            EatPeace.next = nextSpan;
            nextSpan.addEventListener('click',EatPeace)
            break;
          }
          else{
            contagem1=0;
            break
          }

          contagem1++;
      }else{
        contagem1++;
      }
    }/**end */

    for(let i=number; Turn=="white"?i<9 : i>=1;Turn=='white'? i++ : i--){
      const nextSpan = document.querySelector(`[data-house="${i+letters[Turn=="white"?letters.indexOf(letter)-contagem2:letters.indexOf(letter)+contagem2]}"]`);

      if(nextSpan == null){
        break;
      }
      if(nextSpan && nextSpan.getAttribute('data-house')!=number+letter){
        if(nextSpan.innerHTML==""){
          nextSpan.classList.add('active')
          transferPosition.peace = Peace;
          transferPosition.transfer = nextSpan;
          transferPosition.Clear = this.Clear;
          nextSpan.addEventListener('click',transferPosition);

        }else if(Turn=='white' ? nextSpan.childNodes[0].childNodes[0].getAttribute('src').includes('Black') : nextSpan.childNodes[0].childNodes[0].getAttribute('src').includes('White')){
          EatPeace.peace = Peace;
          EatPeace.next = nextSpan;
          nextSpan.addEventListener('click',EatPeace);
          break;
        }else{
          contagem2=0;
          break;
        }

      contagem2++;
  }else
    contagem2++;
}/**end */

for(let i=number; Turn=="white"?i>=1 : i<9;Turn=='white'? i-- : i++){
  const nextSpan = document.querySelector(`[data-house="${i+letters[Turn=="white"?letters.indexOf(letter)-contagem3:letters.indexOf(letter)+contagem3]}"]`);

  if(nextSpan == null){
 
    break;
  }
  if(nextSpan && nextSpan.getAttribute('data-house')!=number+letter){
    if(nextSpan.innerHTML==""){
      nextSpan.classList.add('active')
      transferPosition.peace = Peace;
      transferPosition.transfer = nextSpan;
      transferPosition.Clear = this.Clear;
      nextSpan.addEventListener('click',transferPosition);

    }else if(Turn=='white' ? nextSpan.childNodes[0].childNodes[0].getAttribute('src').includes('Black') : nextSpan.childNodes[0].childNodes[0].getAttribute('src').includes('White')){
      EatPeace.peace = Peace;
      EatPeace.next = nextSpan;
      nextSpan.addEventListener('click',EatPeace);
      break;
    }else{
      contagem3=0;
      break;
    }

  contagem3++;
}else
contagem3++;
}/**end */

for(let i=number; Turn=="white"?i>=1 : i<9;Turn=='white'? i-- : i++){
  const nextSpan = document.querySelector(`[data-house="${i+letters[Turn=="white"?letters.indexOf(letter)+contagem4:letters.indexOf(letter)-contagem4]}"]`);

  if(nextSpan == null){
 
    break;
  }
  if(nextSpan && nextSpan.getAttribute('data-house')!=number+letter){
    if(nextSpan.innerHTML==""){
      nextSpan.classList.add('active')
      transferPosition.peace = Peace;
      transferPosition.transfer = nextSpan;
      transferPosition.Clear = this.Clear;
      nextSpan.addEventListener('click',transferPosition);

    }else if(Turn=='white' ? nextSpan.childNodes[0].childNodes[0].getAttribute('src').includes('Black') : nextSpan.childNodes[0].childNodes[0].getAttribute('src').includes('White')){
      EatPeace.peace = Peace;
      EatPeace.next = nextSpan;
      nextSpan.addEventListener('click',EatPeace);
      break;
    }else{
      contagem4=0;
      break;
    }

  contagem4++;
}else
contagem4++;
}/**end */

    },

    Pawn(Position,Peace){
      this.Clear();
      const letter = Position.split('')[1];
      let number;

    Turn == 'white' ? number = +Position.split('')[0]+1 : number = +Position.split('')[0]-1;

    const bisideOneLetter = letters[Turn == 'white' ? letters.indexOf(letter)+1 : letters.indexOf(letter)-1];
    
      const bisideTwoLetter = letters[Turn == 'white' ? letters.indexOf(letter)-1 : letters.indexOf(letter)+1];

      const nextSpan = document.querySelector(`[data-house="${number+letter}"]`);
      const nextSpanTwo = document.querySelector(`[data-house="${
        Turn == 'white'? (number+1)+letter : (number-1)+letter}"]`);

        /* Verificação de caso tenha peças ao lado do peão */

      const bisideOne = document.querySelector(`[data-house="${number+bisideOneLetter}"]`);
      const bisideTwo = document.querySelector(`[data-house="${number+bisideTwoLetter}"]`);

      if(
        (bisideOne && bisideOne.innerHTML != '' && (bisideOne.childNodes[0].innerHTML.includes('White') && Peace.innerHTML.includes('Black') || bisideOne.childNodes[0].innerHTML.includes('Black') && Peace.innerHTML.includes('White'))
        ||
        (bisideTwo && bisideTwo.innerHTML != '' && (bisideTwo.childNodes[0].innerHTML.includes('White') && Peace.innerHTML.includes('Black') || bisideTwo.childNodes[0].innerHTML.includes('Black') && Peace.innerHTML.includes('White'))
      ))){

      if(bisideOne && bisideOne.innerHTML != ''){
        EatPeace.peace = Peace;
        EatPeace.bisidePeace = bisideOne;
        bisideOne.addEventListener('click', EatPeace);
      }
      if(bisideTwo && bisideTwo.innerHTML != ''){
        EatPeace.peace = Peace;
        EatPeace.bisidePeace = bisideTwo;
        bisideTwo.addEventListener("click", EatPeace);
      }
    }
            /* -------------------------------------------------------------------- */

      if(nextSpan.innerHTML == ''){
      nextSpan.classList.add('active');

      if(Peace.getAttribute('data-moved')!='' && nextSpanTwo.innerHTML==''){
        transferPosition.peaceTwo = nextSpanTwo;
        nextSpanTwo.classList.add('active');
        nextSpanTwo.addEventListener('click',transferPosition);
      }
      transferPosition.peace = Peace;
      transferPosition.transfer = nextSpan;
      nextSpan.addEventListener('click', transferPosition);
  }
}
}

const EatPeace = {
  handleEvent(){
    AllSpans.forEach(span =>{
      span.classList.remove('active');
      span.removeEventListener('click', EatPeace);
    })
    
    if(this.peace.childNodes[0].getAttribute("src").includes('Pawn')){
      this.bisidePeace.innerHTML = '';
    this.bisidePeace.appendChild(this.peace);
    this.bisidePeace.removeEventListener('click', EatPeace);
    if(this.peace.getAttribute('data-moved') != '') this.peace.setAttribute('data-moved','')
    }else{
      this.next.innerHTML = '';
      this.next.appendChild(this.peace);
      this.next.removeEventListener('click',EatPeace);
    }
    Turn == 'white' ? Turn = 'black' : Turn = 'white';
  }
}

const transferPosition = {
  handleEvent(e){
    Turn == 'white' ? Turn = 'black' : Turn = 'white';
    if(this.peace.childNodes[0].getAttribute('src').includes('Pawn')){
    if(e.target == this.peaceTwo && e.target.innerHTML == ''){
      this.peaceTwo.appendChild(this.peace);
      this.peaceTwo.removeEventListener('click',transferPosition);
    }else if(e.target == this.transfer && e.target.innerHTML == '') this.transfer.appendChild(this.peace);
    else  return;
  }
  if(this.peace.childNodes[0].getAttribute('src').includes('Pawn')){
  this.peace.setAttribute('data-moved','');
  this.peaceTwo.classList.remove('active');
  }else{
    e.target.appendChild(this.peace);
  }

    this.transfer.classList.remove('active');
    this.transfer.removeEventListener('click',transferPosition);

    AllSpans.forEach(span =>{
      span.classList.remove('active');
      span.removeEventListener('click', EatPeace);
    })
  }
}

function Play(e){
  const target = e.currentTarget.childNodes[0];
  if((Turn == 'white' && target.getAttribute('src').includes('White')) || (Turn == 'black' && target.getAttribute('src').includes('Black'))){
    const src = target.getAttribute('src');
      if(src.includes('Pawn')) Plays.Pawn(target.parentNode.parentNode.getAttribute('data-house'), target.parentNode);
      else if(src.includes('Bishop')) Plays.Bishop(target.parentNode.parentNode.getAttribute('data-house'), target.parentNode);
      else if(src.includes('Knight')) Plays.Knight(target.parentNode.parentNode.getAttribute('data-house'), target.parentNode);
      else if(src.includes('Rook')) Plays.Rook(target.parentNode.parentNode.getAttribute('data-house'), target.parentNode);
      else if(src.includes('Queen')) Plays.Queen(target.parentNode.parentNode.getAttribute('data-house'), target.parentNode);
      else if(src.includes('King')) Plays.King(target.parentNode.parentNode.getAttribute('data-house'), target.parentNode);
    }
  }
