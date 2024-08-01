// 변수상자

let name1 = '홍길동1';
let age1 = 21;
console.log(`이름과 나이 : ${name1}, ${age1}`)

const age2 = '10';
const age3 = Number(age2);
console.log(`age2의 크기 : ${typeof(age2)}, age3의 크기 : ${typeof(age3)}`);

// 함수상자

function add(a, b) {
    return a+b;
}

const result = add(2,3);
console.log(`더하기 결과 : ${result}`);

// 화살표 함수

const add2 = (a, b) => {
    return a+b;
}

const result2 = add(2,3);
console.log(`더하기 결과 : ${result2}`);

// 콜백 함수

function add3(a, b, c) {
    const add = a+b;
    c(add);
}

add3(2,3, (result) => {
    console.log(`더하기 결과 : ${result}`);
});

// 붕어빵 만들기
const fish1 = {
    name : '붕어빵1',
    age : 21,
    swim : () => {
        console.log('붕어빵이 헤엄칩니다.')
    }
}

fish1.swim();
console.log(`fish1의 이름 : ${fish1.name}`);

// 붕어빵 틀에서 붕어빵 만들어내기
class Fish {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    swim() {
        console.log('붕어빵이 헤엄칩니다.')
    }
}

let fish2 = new Fish('붕어빵2', 2);

fish2.swim();
console.log(`fish2의 이름 : ${fish2.name}`);
