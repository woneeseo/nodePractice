const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser'); 
// body-parser는 express의 내장객체이기 떄문에 npm install을 할 필요가 없다.  

const admin = require('./routes/admin');
const contacts = require('./routes/contacts');

const app = express();
const port = 3000;

nunjucks.configure( 'template' , {
    autoescape : true ,
    express : app // express 객체
});

// 미들웨어 세팅
app.use( logger("dev") );
// use( )도 일종의 미들웨어이다. 

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended : false }));

// 이미지에 접근하기 ( 정적 파일 )
app.use( '/uploads' , express.static('uploads') );
// app.use( 'url' , express.static('폴더명') );

// 미들웨어를 이용해 템플릿에서 사용될 글로벌 변수를 설정해줌
// 이제 템플릿에서는 isLogin이라는 변수를 어디서든 접근할 수 잇음 
app.use( (req, res, next) => {
    app.locals.isLogin = false;
    app.locals.req_path = req.path; // express에서 현재 url을 보내주는 변수
    next();
})

app.get('/', (request, response) => {
    response.send('Hellp Express');
});

app.get('/fastcampus', (request, response) => {
    response.send('Fastcampus get 55555'); 
    // 결과 : Cannot GET /fastcampus
    // 이유 : get요청에 url 라우팅을 추가하지 않았기 때문에 
    // url을 추가해 작성하는 경우 서버를 한번 껐다 켜 주어야 반영이 됨 
});

function vipMiddleWare( req, res, next ) {
    console.log('최우선 미들웨어');
    next();
}

app.use( '/admin', vipMiddleWare , admin );
// /admin으로 들어오는 요청은 
// admin.js 안에 있는 내용을 이용해 실행하겠다는 의미이다

app.use( '/contacts' , contacts );

//404, 500 규칙은 내가 작성할 라우팅의 맨 마지막에 작성해야 한다
// 위의 라우팅을 모두 돈 뒤에도 없으면 404, 500 url에 접근해야하므로

app.use( (req, res, _ ) => {
    // 사용하지 않는 변수는 _ (언더바)로 처리
    res.status(400).render('common/404.html')
})
app.use( (req, res, _ ) => {
    // 사용하지 않는 변수는 _ (언더바)로 처리
    // 500 에러는 서버에러, 스펠링 틀림, 업로드 파일 크기가 큼 등의 문제시 발생 
    res.status(500).render('common/500.html')
})

app.listen( port , () => {
    console.log('Express listening on port', port) // 터미널에 출력됨
});