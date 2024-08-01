// require 함수를 이용해서 다른 개발자가 만든 모듈 불러오기
const http = require('http');
const express = require('express');
const path = require('path');
const mariadb = require('mariadb');

// 데이터베이스(데이터 저장소) 연결을 모아두는 풀 만들기
const pool = mariadb.createPool({
    host : 'localhost',
    port : 4406, 
    user : 'root',
    password : 'admin',
    database : 'test' //,
    //connectionLimit : 10,
    //debug : false
})

BigInt.prototype.toJSON = () => {
    return this.toString();
}

// 익스프레스에서 app 객체 만들기
const app = express();

// 폴더 오픈하기 : 현재 폴더 아래에 있는 public 폴더를 / 요청경로로 오픈하기
app.use('/', express.static(path.join(__dirname, 'public')));


// 라우터 등록하기 : 라우터는 요청 경로에 따라서 실행될 콜백 함수를 등록해주는 것
const router = express.Router();
app.use('/', router);

// menu/list 요청 경로로 요청이 들어오면 콜백 함수를 실행해라
router.route('/menu/list').get(async (req, res) => {

    let conn;

    try {

        // 풀에서 연결 가져오기
        conn = await pool.getConnection();
        
        // SQL문 실행하기
        const sql = 'select id, name, details, color, icon from test.menu'
        const rows = await conn.query(sql, []);

        const output = {
            code : 200,
            message: 'OK',
            header : {},
            data : rows
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));
    


    } catch(err) {

        const output = {
            code : 400,
            message : `에러발생 : ${err}`
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));

    } finally {

        // 풀로 연결 반환하기
        if(conn) {conn.end();} // end 하면 pool 안에 다시 들어가짐
    }

});

// 리스트 요청에 대해 처리할 수 있는 함수 등록
// /person/list 요청 경로로 요청이 들어오면 콜백 함수를 실행해라
router.route('/person/list').get(async (req, res) => {

    let conn;

    try {

        // 풀에서 연결 가져오기
        conn = await pool.getConnection();
        
        // SQL문 실행하기
        const sql = 'select id, name, age, mobile from test.person'
        const rows = await conn.query(sql, []);

        const output = {
            code : 200,
            message: 'OK',
            header : {},
            data : rows
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));
    


    } catch(err) {

        const output = {
            code : 400,
            message : `에러발생 : ${err}`
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));

    } finally {

        // 풀로 연결 반환하기
        if(conn) {conn.end();} // end 하면 pool 안에 다시 들어가짐
    }

});

// 추가 요청에 대해 처리할 수 있는 함수 등록
// /person/add 요청 경로로 요청이 들어오면 콜백 함수를 실행해라
router.route('/person/add').get(async (req, res) => {

    const params = req.query;
    console.log(`요청파라미터 -> ${JSON.stringify(params)}`);
    
    let conn;

    try {

        // 풀에서 연결 가져오기
        conn = await pool.getConnection();
        
        // SQL문 실행하기
        const sql = `insert into test.person(name, age, mobile) values('${params.name}', ${params.age}, '${params.mobile}')`;
        const rows = await conn.query(sql, []);
        console.log(`데이터베이스 실행 결과 -> ${JSON.stringify(rows)}`)

        const output = {
            code : 200,
            message: 'OK',
            header : {},
            data : rows
        }

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));
    


    } catch(err) {

        const output = {
            code : 400,
            message : `에러발생 : ${err}`
        }

        res.writeHead(400, {'Content-Type' : 'text/html; charset=utf8'});
        res.end(JSON.stringify(output));

    } finally {

        // 풀로 연결 반환하기
        if(conn) {conn.end();} // end 하면 pool 안에 다시 들어가짐
    }

});


// 웹서버 실행하고 클라이언트에서 요청할 때까지 대기하기
const port = 7001;
http.createServer(app).listen(port, () => { // 이 콜백함수는 웹서버가 실행되면 호출됨
    console.log(`웹서버 실행됨 : ${port}`);
})