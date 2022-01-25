const express = require('express');
const router = express.Router();

function testMiddleWare( req, res, next ) {
    console.log('첫번째 미들웨어')
    next();
}

function testMiddleWare2( req, res, next ) {
    console.log('두번째 미들웨어')
    next();
}

router.get('/', testMiddleWare, testMiddleWare2, (req, res) => {
    res.send('admin 이후 url')
});

router.get('/products', (req, res) => {
    //res.send('admin products')
    res.render( 'admin/products.html' , {
        message : 'Hello!',
        online : 'express'
    })
});

router.get('/products/write', (req, res) => {
    res.render('admin/write.html')
})

router.post('/products/write', (req, res) => {
    // res.send(req.body.name); => 각각의 요소에 직접 접근하여 가져올 때 
    res.send(req.body) 
    // 모든 요소를 한번에 가져올 때 (json 타입으로 가져와짐)
})

module.exports = router;