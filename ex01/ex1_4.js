// 함수상자 
// 변수상자는 자료형의 크기를 명시하지 않았음
// function으로 변수상자와 함수상자를 비교함

function print() {
    console.log('안녕!')
}

print();

function print2(a) {
    console.log(`전달받은 값 : ${a}`);
}

print2(10);

function print3(a, b) {
    console.log(`전달받은 값 : ${a}, ${b}`);

    return a+b;
}

let result = print3(10, 10);
console.log(`print3의 결과 : ${result}`);

// 함수상자를 통해 자료형을 출력해봄
console.log(`print 함수 상자의 크기 : ${typeof(print)}`);
// - 함수상자의 크기로 function이 나옴
// - function이란 함수상자에 넘겨주면 함수상자의 크기가 무엇인지 알려줌(무슨 말인지 모르는게 당연함)
// : 함수상자를 변수상자에 할당함(자바에서는 안됨)
// 고급용어로 '함수를 1급객체로 다룬다'라고 표현함
// 이게 엄청난 변화를 가져옴
// 이 기능이 자바 스크립트에 없다면 자바 스크립트 책의 두꼐가 1/3은 줄어든다.
// 자바는 변수상자의 윗쪽 구멍에는 글자, 숫자를 넣으면 밑에 구멍으로 그게 나옴
// 자바 스크립트는 함수상자의 윗쪽 구멍이랑 아랫쪽 구멍으로 다른 함수상자가 들어올 수 있음
// 글자나 숫자만 던져주다가 함수상자도 들어올 수 있게 됨
// 코드가 더 간결해지게 만들 수 있기 때문이다.

// 일급객체 대표적인 형태 3가지

// 1. 미리 만든 함수상자를 변수상자에 할당
let show = print;
show();


// 2. 함수상자를 만들면서 바로 변수상자에 할당
let show2 = function print4() {
    console.log('print4 호출됨.')
}
show2();
// 위처럼 하면 안됨. 어차피 변수상자에 들어갈거라 함수상자의 이름이 필요없음

// 3. 화살표 함수 형태로 변경
let show3 = () => { 
    console.log('print5 호출됨.')
}
show3();

// --------------------------------------------

// callback 함수
// 더하기 함수(a, b)를 만들었는데 return을 안하겠다고 함
// 그럴 경우 위에 구멍을 하나 더 만듦
// 하나 더 만든 구멍에 함수상자(result라는 함수)를 전달해서 실행하면 이 함수에서 결과를 실행해 출력함
// 이를 callback함수라고 함. 

// 일반적인 함수
 function add1(a, b) {
    return a+b;
 }

 let result1 = add1(10, 10);
 console.log(`더하기 결과 : ${result1}`);

 // callback함수
 function add2(a, b, c) {
    c(a+b);
 }

add2(10, 10, (result) => {
    console.log(`더하기 결과 : ${result}`);
 });


// 예제 - 방법1. cal 함수 내부에서 계산 수행, 콜백함수는 단지 결과 출력
// 재사용이 용이함
function cal1(a, b){ 

    let result = 0;
    
    for(let i = 1; i <= a; i++){
        result += i;
    }

    b(result);

}

cal1(10, (result) => { 
    console.log(`결과1 : ${result}`);
});

// 예제 - 방법2. 콜백함수 내부에서 계산 수행. cal 함수는 단순히 값을 전달
// 쓸 때마다 콜백함수를 작성해야한다는 번거로움 있음
function cal2(a, b){
    b(a);
}

cal2(10, (a) => { // 콜백 함수 내에서 추가적인 계산 수행

    let result = 0;
    
    for(let i = 1; i <= a; i++){
        result += i;
    }
    console.log(`결과2 : ${result}`);
});

// 예제

function cal3(a, b){ 

    let result = 0;
    
    for(let i = 1; i <= a; i++){
        result += i;
    }

    b(result);

}

function b(result) {
    console.log(`결과3 : ${result}`);
}

cal3(10, b)
cal3(60, b)

// 예제

function cal4(a) {

    result = 0;

    for(let i = 0; i<a; i++) {
        result += i;
    }

    return result;
}

let res4 =  cal4(4) 
console.log(`결과4 : ${res4}`)

// 예제

function cal4(a) {

    result = 0;

    for(let i = 0; i <= a; i++) {
        result += i;
    }

    console.log(`결과4 : ${result}`)

}

cal4(10)

// 교수님 답안1. for문 사용하기

let sum = 0;
for(let i = 0; i < 10; i ++) {
    sum = sum + (i+1);
}

console.log(`1부터 10까지의 합 : ${sum}`);

// 교수님 답안2. 함수로 분리하기
let calc = (start, end) => {
    let sum = 0;
    for(let i = start; i < end; i ++) {
        sum = sum + (i+1);
    }

    return sum;
}

let calcResult = calc(0, 10);
console.log(`1부터 10까지의 합 : ${calcResult}`);

let calcResult2 = calc(0, 100);
console.log(`1부터 100까지의 합 : ${calcResult2}`);


// 교수님 답안3. callback 함수 형태로 바꾸기

let calc2 = (start, end, callback) => {
    let sum = 0;
    for(let i = start; i < end; i ++) {
        sum = sum + (i+1);
    }

    callback(sum);
}

calc2(0, 10, (result) => {
    console.log (`1부터 10까지의 합 : ${result}`);
});