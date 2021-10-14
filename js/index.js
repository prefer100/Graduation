//Image 정보
var image = null;
var resizedImage = null;
var resizedData = null;
var resultWord = null;
var data = null;
var resultlink = null;
//Input 태그에서 파일을 불러올 때 정보를 받아 image tag source에 넣어준다.
var fileElement = document.getElementById("fileInput");

//이미지 사이즈 변경을 위한 버튼 이벤트 정의
var imageResizeBtnElement = document.getElementById("imageResizeBtn");

if (fileElement) {
    fileElement.onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                if (!fr.result) return;
                //이미지 정보 저장
                image = fr.result;

                var previewElement = document.getElementById("imagePreview");
                if (previewElement) previewElement.src = fr.result;
            };
            fr.readAsDataURL(files[0]);
        }
    };
}

if (imageResizeBtnElement) {
    imageResizeBtnElement.onclick = function (e) {
        //이미지를 불러왔을 경우에만 리사이징을 시도한다.
        if (image) resizedataURL(72, 72);
        else alert("이미지를 먼저 불러와 주세요");
    };
}

// 이미지 리사이징 함수
function resizedataURL(wantedWidth, wantedHeight) {
    // We create a canvas and get its context.
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    // We set the dimensions at the wanted size.
    canvas.width = wantedWidth;
    canvas.height = wantedHeight;
    var previewElement = document.getElementById("imagePreview");
    // We resize the image with the canvas method drawImage();
    ctx.drawImage(previewElement, 0, 0, wantedWidth, wantedHeight);
    resizedData = ctx.getImageData(0, 0, wantedWidth, wantedHeight).data;
    resizedData = Array.prototype.slice.call(resizedData);
    console.log(resizedData);
    resizedData = resizedData
        .map((val, index) => {
            if ((index + 1) % 4 == 0) {
                return null;
            } else {
                val = val/255;
                return val;
            }
        })
        .filter((o) => o !== null);
    console.log(resizedData);

    var dataURI = canvas.toDataURL();

    if (dataURI) {
        resizedImage = dataURI;
        var previewElement = document.getElementById("resizedImagePreview");
        if (previewElement) previewElement.src = dataURI;
        predict(resizedData);

    }
}

//tf 프로세스를 시작한다.
var predict = function (input) {
    if (window.model) {
        window.model
            .predict([tf.tensor(input).reshape([1, 72, 72, 3])])
            .array()
            .then(function (scores) {
                scores = scores[0];
                console.log(scores);
                predicted = scores.indexOf(Math.max(...scores));
                $("#number").html(predicted);
                console.log(predicted);
                result(predicted);    
            });
    } else {
        setTimeout(function () {
            predict(input);
        }, 100000000);
    }
};
//텐서플로우 모델을 불러온다.
tf.loadLayersModel("https://prefer100.cafe24.com/model/model.json").then(function (model) {
    window.model = model;
});

var result = function(input) {
    if (input == 0) {
        resultWord = "AI스피커";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/411/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 1){
        resultWord = "DSLR카메라";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/335/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 2){
        resultWord = "TV";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/336/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 3){
        resultWord = "LED마스크";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/2055/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 4){
        resultWord = "갤럭시버즈";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/412/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 5){
        resultWord = "갤럭시휴대폰";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/339/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 6){
        resultWord = "고데기";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/2055/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 7){
        resultWord = "공기청정기";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/452/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 8){
        resultWord = "그래픽카드";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/385/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 9){
        resultWord = "냉장고";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/451/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 10){
        resultWord = "노트북";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/334/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 11){
        resultWord = "닌텐도스위치";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/338/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 12){
        resultWord = "다리미";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/452/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 13){
        resultWord = "라디오";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/411/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 14){
        resultWord = "마사지건";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/452/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 15){
        resultWord = "마우스";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/387/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 16){
        resultWord = "마이크";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/411/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 17){
        resultWord = "모니터";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/383/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 18){
        resultWord = "믹서기";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/451/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 19){
        resultWord = "블루투스 스피커";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/411/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 20){
        resultWord = "서큘레이터";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/2054/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 21){
        resultWord = "스마트밴드";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/427/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 22){
        resultWord = "스탠드";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/469/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 23){
        resultWord = "스탠드에어컨";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/2054/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 24){
        resultWord = "아이폰";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/339/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 25){
        resultWord = "안마의자";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/452/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 26){
        resultWord = "액션캠";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/395/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 27){
        resultWord = "앰프";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/411/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 28){
        resultWord = "에어랩";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/2055/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 29){
        resultWord = "에어팟";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/412/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 30){
        resultWord = "에어프라이어";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/451/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 31){
        resultWord = "오븐";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/451/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 32){
        resultWord = "웹캠";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/387/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 33){
        resultWord = "인덕션";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/451/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 34){
        resultWord = "전기면도기";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/2055/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 35){
        resultWord = "전기밥솥";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/451/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 36){
        resultWord = "전기장판";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/2054/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 37){
        resultWord = "전기포트";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/451/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 38){
        resultWord = "전자드럼";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/751/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 39){
        resultWord = "전자피아노";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/751/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 40){
        resultWord = "청소기";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/452/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 41){
        resultWord = "카메라";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/395/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 42){
        resultWord = "카메라렌즈";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/397/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 43){
        resultWord = "커피머신";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/451/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 44){
        resultWord = "키보드";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/387/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 45){
        resultWord = "튀김기";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/451/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 46){
        resultWord = "프로젝터";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/336/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 47){
        resultWord = "프린터";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/387/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else if(input == 48){
        resultWord = "헤드셋";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/387/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }
    else{
        resultWord = "헤어드라이기";
        resultLink = "https://cafe.naver.com/ca-fe/cafes/10050146/menus/2055/articles/write?boardType=L";
        $("#word").html(resultWord);
        $("#link").html(resultLink);
    }

}