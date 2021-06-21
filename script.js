import {wordsArray} from "./words.js"

//英単語を表示するキャンバス
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

//お見事！正解ですと表示するキャンバス
let textCanvas = document.getElementById("textScreen");
let textCtx = textCanvas.getContext("2d");

let button = document.getElementById("btn");
let buttonGiveUp = document.getElementById("btn_giveUp");

const TEXT_GAME_HEIGHT = 40;
const TEXT_GAME_WIDTH = 400;

const digit = 4;
let answerArr = [];

let eat = 0;
let bite = 0;

let count = 0;

const wordsNum = wordsArray.length;

function getRandomInt(){
    return Math.floor(Math.random() * (wordsNum));
}

function checkInput(){

    //入力された文字
    let guessStr = document.getElementById("guess").value;

    //文字数が違う場合
    if(guessStr.length != digit){
        return 1;
    }
    
    //同じアルファベットを含んでいる場合
    for(var i = 0; i< digit; i++){
        for(var j = 0; j < i; j++){
            if(guessStr[i] == guessStr[j]){
                return 2;
            }
        }
    }

    //アルファベット（小文字）以外を含んでいる場合
    let letters = /^[a-z]+$/;

    if(!guessStr.match(letters)){
        return 3;
    }

    return guessStr;
}

function judge(answerArr,guessStr){
    
    for(var i = 0; i < digit; i++){

        for(var j = 0; j < digit; j++){

            if(answerArr[i] == guessStr[j]){
                if(i == j){
                    eat++;
                }else{
                    bite++;
                }
            }
        }

    }

}

function resetEatBite(){
    eat = 0;
    bite = 0;
    eatValue.innerHTML = "";
    biteValue.innerHTML = "";
}



answerArr = wordsArray[getRandomInt()];
console.log(answerArr);

button.addEventListener('click',function(){

    errMes.innerHTML = ""; 

    let isCheckedStr = checkInput();
    
    switch(isCheckedStr){
        case 1: errMes.innerHTML = "4文字のアルファベットを入力してください";break;
        case 2: errMes.innerHTML = "全て異なるアルファベットを入力して下さい";break;
        case 3: errMes.innerHTML = "アルファベット(全て小文字)を入力して下さい"; break;
    }

    if(typeof isCheckedStr == "string"){
        
        resetEatBite();

        judge(answerArr,isCheckedStr);

        count++;

        eatValue.innerHTML = eat;
        biteValue.innerHTML = bite;

        document.getElementById("hintMessage").style.display = 'block';

        tryValue.innerHTML = count;

        document.getElementById('tryMessage').style.display = 'block';
        
    }

    if(eat == digit){

        textCtx.fillStyle = "black";
        textCtx.font = "bold 30px serif";

        textCtx.fillText("お見事!正解は",100,30);

        textCanvas.style.visibility = "visible";
        canvas.style.visibility = "visible";

        ctx.fillStyle = "white";
        ctx.font = "bold 70px serif";
        ctx.fillText(answerArr,135,90);
    }

})

buttonGiveUp.addEventListener('click', function(){

    textCtx.clearRect(0,0,TEXT_GAME_WIDTH,TEXT_GAME_HEIGHT);

    textCtx.fillStyle = "black";
    textCtx.font = "bold 30px serif";
    textCtx.fillText("残念！正解は",115,30);

    textCanvas.style.visibility = "visible";
    canvas.style.visibility = "visible";

    //正解の単語を表示
    ctx.fillStyle = "white";
    ctx.font = "bold 70px serif";
    ctx.fillText(answerArr,135,90);

    button.disabled = true;
});


