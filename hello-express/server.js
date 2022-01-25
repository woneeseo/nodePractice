// 서버를 띄우는 부분만
const app = require('./app');
const port = 3000;

app.listen( port, () => {
    console.log('Express listening on port', port);
});