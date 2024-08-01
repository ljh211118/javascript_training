// 여러 개의 값을 하나의 변수상자에 넣기

let names = ['홍길동1', '홍길동2', '홍길동3']
console.log(`names 변수상자 안에 들어있는 칸의 개수 : ${names.length}`);

let first = names[0];
console.log(`첫번째 칸 : ${first}`);

console.log(`names 변수상자의 크기 : ${typeof(names)}`);
console.log(`names의 첫번째 칸의 크기 : ${typeof(names[0])}`);

let fish1 = {
    name : '붕어빵1',
    age : 1
}
console.log(`fish1 변수상자의 크기 : ${typeof(fish1)}`);

if(Array.isArray(names)) {
    console.log('names가 배열입니다.');
}

if(Array.isArray(fish1)) {
    console.log('fish1이 배열입니다.');
}

// for문(C-Style for문)
for (let i = 0; i<names.length; i ++) {
        console.log(`names의 ${i}번째 요소 : ${names[i]}`)
}

// forEach문(권장함)
// 배열을 만들면 .forEach가 자동으로 만들어짐.
names.forEach((value, index) => {
    console.log(`names의 ${index}번째 요소 : ${value}`)
})

// for문
// 콜백방식을 쓰는데 비동기인지 동기인지 헷갈릴 때가 있음.
// 성능이 떨어져서 C-Style for문을 안쓰고 싶을때 사용.
for (let name of names) {
    console.log(`names의 요소 : ${name}`);
}

// 배열에 추가하기
names.push('홍길동4');
console.log(`names 전체 : ${JSON.stringify(names)}`); 
//JSON은 메모리에 있는 변수?객체?를 복원하는 개념
// 자바스크립트의 붕어빵 정도를 글자 형태로 바꿔서 전달
console.log(`fish1의 전체 : ${JSON.stringify(fish1)}`)


const fish2 = {
    name : '붕어빵2',
    children : [
        { 
            name : '자식붕어빵1',
            age : 1
        },
        {
            name : '자식붕어빵2',
            age : 1
        }
    ]
}
console.log(`fish2의 이름 : ${fish2.name}`); // 일반적인 방법

console.log(`fish2의 이름 : ${fish2['name']}`);

const attr1 = 'name';
console.log(`fish2의 속성 : ${fish2[attr1]}`); // 이 방식이 좋은 점 : 사용자가 가지고 오려고 하는 정보를 변수에 넣어 가지고 올 수 있음. 자유롭게 사용이 가능함.

console.log(`fish2의 두번째 자식의 나이 : ${fish2['children'][1]['age']}`);

