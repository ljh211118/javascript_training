// 붕어빵 만들기

let name = '홍길동1';
let age = 21;

let fish1 = {
   name : '홍길동1',
   age : 21,
   swim : function () { // function은 함수상자고, swim은 변수상자. 근데 이렇게 부르지 않고 속성(애티뷰트)이라고 함 변수든, 함수든 의미가 없음. 그래서 속성이라 부름
        console.log('붕어빵이 헤엄칩니다.')
   }
}

console.log(`fish1 붕어빵의 이름 : ${fish1.name}`); // 인스턴스 객체
fish1.swim();

class Fish {
    
    constructor(name, age) { // 자동으로 name과 age가 만들어짐
        this.name = name;
        this.age = age;
    }

    swim() {
        console.log('붕어빵이 헤엄칩니다.');
    }
}

let fish2 = new Fish('붕어빵1', 1);
console.log(`fish2 붕어빵의 이름 : ${fish2.name}`);