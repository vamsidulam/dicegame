import {dices} from './dicegamedata.js';

let computer_score=localStorage.getItem('computer_score')||0;
let user_score=localStorage.getItem('user_score')||0;
let computer_choice=0;
let user_choice=0;

const dice_sound = new Audio('rolling-dice-2-102706.mp3');

document.querySelector('.js-play-btn').addEventListener('click', ()=>{
    rolldice();
} );

document.querySelector('.js-reset-btn').addEventListener('click',()=>{
    computer_score=0;
    user_score=0;
    localStorage.setItem('computer_score',JSON.stringify(computer_score));
    localStorage.setItem('user_score',JSON.stringify(user_score));
    document.querySelector('.js-result').innerHTML=``;
    showresult();
});

function randomedice(){
    let n=Math.floor(Math.random()*6);
    user_choice=n;
    let image=dices[n].img;
    document.querySelector('.js-user-dice').src=image;
    dice_sound.play();
    rollcomputerdice();

}

function rolldice(){
    dice_sound.play();
    let image='';
    let count=0;
    document.querySelector('.js-result').innerHTML=`Loading...`;
    let interval_id=setInterval( ()=>{
        let n=Math.floor(Math.random()*6);
        let image=dices[n].img;
        count+=1;
        document.querySelector('.js-user-dice').src=image;
        if(count>=10){
            clearInterval(interval_id);
            randomedice();
        }
    },100 );

}
function rollcomputerdice(){
    dice_sound.play();
    let image='';
    let count=0;
    let interval_id=setInterval( ()=>{
        let n=Math.floor(Math.random()*6);
        let image=dices[n].img;
        count+=1;
        document.querySelector('.js-computer-dice').src=image;
        if(count>=10){
            clearInterval(interval_id);
            randomcomputerdice();
        }
    },100 );
}
function randomcomputerdice(){
    let n=Math.floor(Math.random()*6);
    computer_choice=n;
    let image=dices[n].img;
    document.querySelector('.js-computer-dice').src=image;
    check();
}
function check()
{
    if(user_choice>computer_choice){
        user_score=parseInt(user_score)+1;
        localStorage.setItem('user_score',JSON.stringify(user_score));
        document.querySelector('.js-result').innerHTML=`You Won`;
    }
    else if(user_choice===computer_choice){
        document.querySelector('.js-result').innerHTML=`Game Draw`;
    }
    else{
        computer_score=parseInt(computer_score)+1;
        localStorage.setItem('computer_score',JSON.stringify(computer_score));
        document.querySelector('.js-result').innerHTML=`You losse`;
    }
    showresult();
}
function showresult(){
    document.querySelector('.js-user-score').innerHTML=`USER SCORE : ${user_score}`;
    document.querySelector('.js-computer-score').innerHTML=`COMPUTER SCORE : ${computer_score}`;
    
}