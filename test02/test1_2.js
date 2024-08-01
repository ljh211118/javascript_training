// 변수상자

let name1;
let age1;

name1 = '홍길동1';
age1 = 21;

console.log(`이름과 나이 : ${name1}, ${age1}`);

// 함수상자

const name2 = '홍길동';
const age2 = 22;

const fish1 = {
    name : name2,
    age : age2
}
console.log(`fish1의 이름 : ${fish1.name}`);

// 함수상자
function add1(a,b) {
    return a+b;
}
const result1 = add1(age1, age2);
console.log(`더하기 결과 : ${result1}`);

// 익명함수
const add2 = function(a, b) {
    return a + b;
}
const result2 = add2(age1, age2);
console.log(`더하기 결과 : ${result2}`);

// 화살표함수
const add3 = (a, b) => {
    return a + b;
}
const result3 = add3(age1, age2);
console.log(`더하기 결과 : ${result3}`);

// 콜백함수
const add4 = (a, b, c) => {
    c(a+b);
}

add4(10, 10, (result4) => {
    console.log(`더하기 결과 : ${result4}`);
});

// 붕어빵 만들기
class Fish {
    constructor(name, age) {
        this.name = name;
        this.age = age;

        console.log('붕어빵의 생성자 함수 호출됨');
    }
}

const fish2 = new Fish('붕어빵1', 1);

class Shark extends Fish {

}

const fish3 = new Shark('상어빵1', 1);
console.log(`상어빵 : ${fish3.name}, ${fish3.age}`);
console.log(`상어빵 : ${fish3['name']}, ${fish3['age']}`);

// 여러 값을 하나의 변수상자에 넣기
let fishes = [];
fishes.push({
    name : '붕어빵1',
    age : 1
});

fishes.push({
    name : '붕어빵2',
    age : 2
});

fishes.push({
    name : '붕어빵3',
    age : 3
});

console.log(`붕어빵 갯수 : ${fishes.length}`)
console.log(`두 번째 붕어빵의 나이 : ${fishes[1].age}`);

// 글자
const output = JSON.stringify(fishes);
console.log(`붕어빵 여러 개 : ${output}`)

// 배열
const output2 = JSON.parse(output);
console.log(`복원된 붕어빵 갯수 : ${output2.length}`);

for (let fish of fishes) {
    console.log(`붕어빵 : ${fish.name}`);
}
