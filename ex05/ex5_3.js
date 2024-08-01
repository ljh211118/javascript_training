// 웹서버 만들기

const http = require('http');
const express = require('express');
const mariadb = require('mariadb');
const path = require('path');

// 커넥션이라고 요청을 보낼 수 있는 애들이 들어가져 있다
const pool = mariadb.createPool({
    host : 'localhost',
    port : 4406, 
    user : 'root',
    password : 'admin',
    database : 'test',
    connectionLimit : 10,
    debug : false
})

const app = express();

// 폴더 오픈하기
app.use('/', express.static(path.join(__dirname, 'public')));

const router = express.Router();

BigInt.prototype.toJSON = () => {
    return this.toString();
}


// 리스트 요청
router.route('/person/list').get(async(req, res) => {
    console.log('/person/list 요청됨.');

    let conn; //try 중괄호 밖에서 사용하기 위해

    try {
        conn = await pool.getConnection(); // 데이터베이스 연결을 가져옴

        const sql = 'select id, name, age, mobile from test.person';
        const rows = await conn.query(sql, []);
        console.log(`SQL 실행 결과 : ${JSON.stringify(rows)}`);

        const output = {
            code : 200,
            message : 'OK',
            header : {},
            data : rows
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));

    } catch(err) {
        console.error(`에러발생 : ${err}`);

        const output = {
            code : 400,
            message : `에러발생 : ${err}`
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));

    } finally {
        if(conn) {conn.end();} // end 하면 pool 안에 다시 들어가짐
    }

});

// 삭제
router.route('/person/remove').get(async(req, res) => {
    console.log('/person/remove 요청됨.');

    let conn; //try 중괄호 밖에서 사용하기 위해

    try {
        conn = await pool.getConnection(); // 데이터베이스 연결을 가져옴

        const sql = 'delete from test.person where id = 1';
        const rows = await conn.query(sql, []);
        console.log(`SQL 실행 결과 : ${JSON.stringify(rows)}`);

        const output = {
            code : 200,
            message : 'OK',
            header : {},
            data : rows
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));

    } catch(err) {
        console.error(`에러발생 : ${err}`);

        const output = {
            code : 400,
            message : `에러발생 : ${err}`
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));

    } finally {
        if(conn) {conn.end();} // end 하면 pool 안에 다시 들어가짐
    }

});

// 추가
router.route('/person/add').get(async(req, res) => {
    console.log('/person/add 요청됨.');

    // 요청 파라미터 확인하기
    const params = req.query;
    console.log(`params -> ${JSON.stringify(params)}`);

    let conn; //try 중괄호 밖에서 사용하기 위해

    try {
        conn = await pool.getConnection(); // 데이터베이스 연결을 가져옴

        const sql = "insert into test.person(name, age, mobile) values ('홍길동2', 22, '010-2000-2000')";
        const rows = await conn.query(sql, []);
        console.log(`SQL 실행 결과 : ${JSON.stringify(rows)}`);

        const output = {
            code : 200,
            message : 'OK',
            header : {},
            data : rows
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));

    } catch(err) {
        console.error(`에러발생 : ${err}`);

        const output = {
            code : 400,
            message : `에러발생 : ${err}`
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));

    } finally {
        if(conn) {conn.end();} // end 하면 pool 안에 다시 들어가짐
    }

});


// 라우터 먼저
app.use('/', router);

// 404 미들웨어
app.use((req, res, next) => {
    console.log(`첫번째 미들위에 호출됨.`);

    next();
})

app.use((req, res, next) => {
    console.log('두번째 미들웨어 호출됨.');
    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'});
    res.end('<h3>페이지를 찾을 수 없습니다.</h3>')
})

http.createServer(app).listen(7001, () => {
    console.log(`웹서버 실행됨 : 7001`);
})

console.log(`웹서버 실행 요청함`);
