// 入力要素を取得
var height = document.getElementById('height-in'); // 身長入力
var weight = document.getElementById('weight-in'); // 体重入力
var button = document.getElementById('button-sub'); // 計測開始ボタン

// 出力要素を取得
var output = document.getElementById('bmi-output'); // BMI表示場所

// 入力値からBMIを計算して表示する無名関数
var calcBmi = function () {
  try{
  var h_value = height.value;  //入力された身長の値を取得
  var w_value = weight.value;  //入力された体重の値を取得
  if (isNaN(Number(h_value)) || isNaN(Number(w_value)) || h_value <= 0 || w_value <= 0) {
    alert('半角数字を入力してください。');
    height.value=null;
    weight.value=null;
  }
  else{
  h_value /= 100;  //身長(cm)をメートルに変える
  
  //体重 ÷ (身長 m × 身長 m),BMIの小数点第一位以下切り捨て
  var bmi =Math.round( w_value / ( h_value * h_value )  * 10) / 10 ; 
  output.innerHTML = bmi;  //BMIを表示

  if(bmi >= 25){
    document.getElementById('hantei').innerHTML="肥満";//25以上だった場合は肥満
  }else if(bmi < 25 && bmi >=18){
    document.getElementById('hantei').innerHTML="標準";//25未満、18以上だったら標準
  }else{
    document.getElementById('hantei').innerHTML="痩せ型";}//18未満だったら瘦せ型

  displayMessage();//肥満または瘦せ型だったら表示するメッセージ

  //空にする 
  height.value=null;
  weight.value=null;
  }
  }catch(error){
    alert('エラーが発生しました');
    console.log(error);}//例外処理：アラートとコンソールでエラーであることを表示する

    // AJAXを利用しメッセージを表示する関数
  async function displayMessage(){
      const response = await fetch('./message.json');
      const data =await response.json();
      const messageElm = document.getElementById('message');
      if( bmi >= 25 || bmi < 18){
        messageElm.innerHTML = data.message;}
      else{
        // 標準だったらメッセージを表示しない
        messageElm.innerHTML = null;
      }
  };
}

// 計測開始ボタンが押されたときの処理
button.addEventListener('click', calcBmi);