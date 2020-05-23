"use strict";
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var USERS = [
    { id: '03', userName: 'admin', password: '123456' },
    { id: '04', userName: 'abcde', password: '253325' }
];

var STU = [
    { id: '01', userName: 'yxc010203', password: '124456' },
    { id: '02', userName: 'yxc040506', password: '445346' }
];
const ENTER = [
    { userName: 'admin', password: '123456' }
];

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Acept,X-Requested-With,yourHeaderFeild");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});


app.get('/users/', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

app.get('/stu/', function (req, resp) {
    resp.send(STU);
    resp.end();
});

app.get('/enter/', function (req, resp) {
    resp.send(ENTER);
    resp.end();
});


app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end()
});

app.get('/stu/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of STU) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end()
});

app.post('/enter', function (req, resp) {
    let founded = false;
    for (let user of ENTER) {
        if (user.userName === req.body.userName && user.password === req.body.password) {
            resp.send({ succ: true });
            founded = true;
        }
    }
    if (founded == false) {
        resp.send({ succ: flase });
    }
    resp.end();
})


//添加用户
app.post('/user', function (req, resp) {
    //json 
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});


app.post('/stu', function (req, resp) {
    //json 
    STU.push(req.body);
    resp.send({ succ: true });
    resp.end();
});



// 修改用户
app.put('/user', function (req, resp) {
    // json
    let founded = false;

    for (let user of USERS) {
        if (user.id === req.body.id) {

            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});


app.put('/stu', function (req, resp) {
    // json
    let founded = false;
    for (let user of STU) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            console.log(user.QQQ);
            console.log(user.WWW);
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});


//删除用户
app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});


app.delete('/stu/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let stu of STU) {
        if (stu.id === req.params.id) {
            STU.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});




app.listen(8080, function () {
    console.log('服务器在8080端口 启动！');
});