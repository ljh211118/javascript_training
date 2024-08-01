// 일반 함수

function add(a, b) {
    return a + b;
}

const result = add(10, 10);
console.log(`더하기 결과 : ${result}`);

// 화살표 함수

const add2 = (a, b) => {
    return a + b;
}

// 콜백 함수

const add3 = (a, b, c) => {
    setTimeout(() => {
        const result = a+b;
        c(result);
    }, 500);
    
}

const divide = (a, b, c) => {
    
    setTimeout(() => {
        if(b == 0) {
            c('값이 올바르지 않습니다.', null);
            return;
        }

        const result = a/b;
        c(null, result);

    }, 1000);
}


// 0으로 나누기가 안됨
// err이라는 구멍을 하나 더 만들어서 에러를 확인
divide(100, 10, (err, result) => {

    if(err) {
        console.error(`에러 발생 : ${err}`)
        return;
    }

    console.log(`[콜백함수]나누기 결과 : ${result}`);
})

add3(10, 10, (result) => {
    console.log(`[콜백함수]더하기 결과 : ${result}`);
}) 

// 나누기 한 다음에 더하기를 실행하는 함수

divide(100, 5, (err, result) => {

    if(err) {
        console.error(`에러 발생 : ${err}`)
        return;
    }

    console.log(`[콜백함수]나누기 결과 : ${result}`);

    add3(result, 10, (result2) => {
        console.log(`[콜백함수]더하기 결과 : ${result2}`)
    });
})


const add4 = (a, b) => 
    new Promise((resolve, reject) => {

        add3(a, b, (err, result) => {
            if(err) {
                reject(err);
                return;
            }

            resolve(result);

        })

    })

const divide4 = (a, b) => 
    new Promise((resolve, reject) => {

        divide(a, b, (err, result) => {
            if(err) {
                reject(err);
                return;
            }

            resolve(result);
        })

    }) 


// promise를 쓰는 함수에는 await를 붙임
const doCalc = async () => {

    try {
        const result1 = await divide4(200, 10);
        console.log(`나누기 결과 : ${result1}`);

        const result2 = await add4(result1, 10);
        console.log(`더하기 결과 : ${result2}`);
    } catch(err) {
        console.log(`doCalc에서 에러 발생 : ${err}`);
    }
    
}
doCalc();