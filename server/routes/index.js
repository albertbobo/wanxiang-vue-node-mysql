const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const connection = require('./conn');     // 引入连接数据库模块
const nodeemailer = require('./nodemailer');

connection.connect(() => {
    console.log("Database connection succeeded")
});

let server = '192.168.43.102';
let port = 8088;

// 管理员登录请求api
router.post('/checkLogin', (req, res) => {
    // 接收帐号和密码
    let {username, password} = req.body;
    // 在数据库查询是否存在此帐号和密码的用户
    // 查询数据
    const sqlStr = `select name from a_user where username='${username}' and password='${password}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取管理员用户列表api
router.get('/getAdminList', (req, res) => {
    // 查询数据库，把当前所有管理员用户信息返回给前端
    const sqlStr = `select * from a_user`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加管理员用户记录api
router.post('/adminAdd', (req, res) => {
    let {username, name, password} = req.body;
    const sqlStr = `insert into a_user (username,name,password) values('${username}','${name}','${password}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 修改管理员用户数据api
router.post('/adminEdit', (req, res) => {
    let {id, username, name, password} = req.body;
    const sqlStr = `update a_user set username='${username}',name='${name}',password='${password}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除管理员用户记录api
router.post('/adminDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from a_user where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取用户列表api
router.get('/getUserList', (req, res) => {
    // 查询数据库，把当前所有管理员用户信息返回给前端
    const sqlStr = `select * from user`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除用户记录api
router.post('/userDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from user where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 验证该邮箱是否已注册api
router.post('/getUserEmail', (req, res) => {
    let email = req.body.email;
    const sqlStr = `select email from user where email='${email}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 发送验证码api
router.post('/sendEmailCode', (req, res) => {
    let {email, mysubject} = req.body;
    let num = Math.floor(Math.random() * (9999 - 1000)) + 1000;    // 生成4位随机数
    nodeemailer.send(String(email), String(mysubject), String(num));
    res.json(num);
});

// 添加注册用户记录api
router.post('/userAdd', (req, res) => {
    let {email, password, username, signature} = req.body;
    const sqlStr = `insert into user (email, password, username, signature) 
    values('${email}','${password}','${username}','${signature}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 修改用户密码api
router.post('/userEditPwd', (req, res) => {
    let {email, password} = req.body;
    const sqlStr = `update user set password='${password}' where email='${email}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 验证当前用户api
router.post('/verifyUser', (req, res) => {
    let {email, password} = req.body;
    const sqlStr = `select email,username,signature,iconUrl,coverUrl 
    from user where email='${email}' and password='${password}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 编辑个人资料api
router.post('/userInfoEdit', (req, res) => {
    let {email, username, signature} = req.body;
    const sqlStr = `update user set username='${username}',signature='${signature}' where email='${email}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 查询当前登录用户信息api
router.post('/getLoginUser', (req, res) => {
    let {email} = req.body;
    const sqlStr = `select email,username,signature,iconUrl,coverUrl from user where email='${email}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有slideshow列表api
router.get('/getSlideList', (req, res) => {
    const sqlStr = `select * from slideshow order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取最新3期slideshow列表api
router.get('/getSlideList2', (req, res) => {
    const sqlStr = `select * from slideshow order by vol desc limit 3`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 修改slideshow数据api
router.post('/slideEdit', (req, res) => {
    let {id, vol, day, monthYear, imageUrl, saying, author} = req.body;
    const sqlStr = `update slideshow set vol='${vol}',day='${day}',monthYear='${monthYear}',
    imageUrl='${imageUrl}',saying='${saying}',author='${author}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加slideshow记录api
router.post('/slideAdd', (req, res) => {
    let {vol, day, monthYear, imageUrl, saying, author} = req.body;
    const sqlStr = `insert into slideshow (vol, day, monthYear, imageUrl, saying, author) 
    values('${vol}','${day}','${monthYear}','${imageUrl}','${saying}','${author}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除slideshow记录api
router.post('/slideDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from slideshow where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 上传图片api
router.post('/uploadImages', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../uploads/images');  // 设置图片存放路径
    form.keepExtensions = true;                                  // 保持扩展名
    // 获取文件
    form.parse(req, (err, fields, files) => {
        if (err) return next(err);
        let date = (new Date()).getTime();           // 时间戳
        let oldPath = files.file.path;               // 获取文件路径
        console.log(`oldPath: ${oldPath}`);
        let imgName = files.file.name;               // 上传的图片名
        console.log(`imgName: ${imgName}`);
        let newImgName = imgName.replace(/[^.]+/, `img_${date}`);    // 替换原图片名
        console.log(`newImgName: ${newImgName}`);
        let newPath = path.join(path.dirname(oldPath), newImgName);  // 组合成新路径名
        console.log(`newPath: ${newPath}`);
        // 图片文件重命名路径
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                throw err;
            } else {
                res.send({
                    "errno": 0,
                    "data": [
                        "http://" + server + ":" + port + "/uploads/images/" + newImgName
                    ]
                });
            }
        });
    });
});

// 上传视频api
router.post('/uploadVideos', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../uploads/videos');
    form.keepExtensions = true;
    // 获取文件
    form.parse(req, (err, fields, files) => {
        if (err) return next(err);
        let date = (new Date()).getTime();
        let oldPath = files.file.path;
        console.log(`oldPath: ${oldPath}`);
        let videoName = files.file.name;
        console.log(`videoName: ${videoName}`);
        let newVideoName = videoName.replace(/[^.]+/, `video_${date}`);
        console.log(`newVideoName: ${newVideoName}`);
        let newPath = path.join(path.dirname(oldPath), newVideoName);
        console.log(`newPath: ${newPath}`);
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                throw err;
            } else {
                res.send({
                    url: "http://" + server + ":" + port + "/uploads/videos/" + newVideoName
                });
            }
        });
    });
});

// 获取所有悦读列表api
router.get('/getReadList', (req, res) => {
    const sqlStr = `select * from read_list order by vol`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除悦读记录api
router.post('/readDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from read_list where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 修改悦读数据api
router.post('/readEdit', (req, res) => {
    let {id, vol, date, category, title, content, likeCount} = req.body;
    const sqlStr = `update read_list set vol='${vol}',date='${date}',category='${category}',
    title='${title}',content='${content}',likeCount='${likeCount}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加悦读记录api
router.post('/readAdd', (req, res) => {
    let {vol, date, category, title, likeCount, value} = req.body;
    const sqlStr = `insert into read_list (vol, date, category, title, likeCount, content) 
    values('${vol}','${date}','${category}','${title}','${likeCount}','${value}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取分类1默认排序悦读列表api
router.get('/getReadList1Vol', (req, res) => {
    const sqlStr = `select * from read_list where category=1 order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取分类2默认排序悦读列表api
router.get('/getReadList2Vol', (req, res) => {
    const sqlStr = `select * from read_list where category=2 order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取分类3默认排序悦读列表api
router.get('/getReadList3Vol', (req, res) => {
    const sqlStr = `select * from read_list where category=3 order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取分类4默认排序悦读列表api
router.get('/getReadList4Vol', (req, res) => {
    const sqlStr = `select * from read_list where category=4 order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取分类5默认排序悦读列表api
router.get('/getReadList5Vol', (req, res) => {
    const sqlStr = `select * from read_list where category=5 order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取分类6默认排序悦读列表api
router.get('/getReadList6Vol', (req, res) => {
    const sqlStr = `select * from read_list where category=6 order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加悦读表点赞数api
router.post('/readLikeAdd', (req, res) => {
    let {id, likeCount} = req.body;
    const sqlStr = `update read_list set likeCount='${likeCount}'+1 where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加悦读收藏表记录api
router.post('/readMarkAdd', (req, res) => {
    let {id, email} = req.body;
    const sqlStr = `insert into read_mark (readId, email) values('${id}','${email}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取用户悦读收藏表
router.post('/getReadMark', (req, res) => {
    let email = req.body;
    const sqlStr = `select read_list.* from read_list inner join read_mark
    on read_list.id=read_mark.readId where read_mark.email='${email}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有视界列表
router.get('/getVideoList', (req, res) => {
    const sqlStr = `select * from video_list order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除视界记录api
router.post('/videoDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from video_list where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 修改视界数据api
router.post('/videoEdit', (req, res) => {
    let {id, vol, date, title, videoUrl, intro, imageUrl, likeCount} = req.body;
    const sqlStr = `update video_list set vol='${vol}',date='${date}',title='${title}',
    videoUrl='${videoUrl}',intro='${intro}',imageUrl='${imageUrl}',likeCount='${likeCount}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加视界记录api
router.post('/videoAdd', (req, res) => {
    let {vol, date, title, videoUrl, intro, imageUrl, likeCount} = req.body;
    const sqlStr = `insert into video_list (vol, date, title, videoUrl, intro, imageUrl, likeCount) 
    values('${vol}','${date}','${title}','${videoUrl}','${intro}','${imageUrl}','${likeCount}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取往期视界列表
router.get('/getVideoList2', (req, res) => {
    const sqlStr = `select vol,date,title,imageUrl from video_list order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取视界表最新的一条记录
router.get('/getVideoLast', (req, res) => {
    const sqlStr = `select * from video_list where vol=(select max(vol) from video_list)`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取点击的视界表的一条记录
router.post('/getVideoOne', (req, res) => {
    let vol = req.body.vol;
    const sqlStr = `select * from video_list where vol='${vol}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有题园列表
router.get('/getTestList', (req, res) => {
    const sqlStr = `select * from test_list order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取题园表最新的一条记录
router.get('/getTestLast', (req, res) => {
    const sqlStr = `select * from test_list where vol=(select max(vol) from test_list)`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除题园记录api
router.post('/testDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from test_list where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 修改题园数据api
router.post('/testEdit', (req, res) => {
    let {id, vol, date, theme, intro, imageUrl} = req.body;
    const sqlStr = `update test_list set vol='${vol}',date='${date}',theme='${theme}',
    intro='${intro}',imageUrl='${imageUrl}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加题园记录api
router.post('/testAdd', (req, res) => {
    let {vol, date, theme, intro, imageUrl} = req.body;
    const sqlStr = `insert into test_list (vol, date, theme, intro, imageUrl) 
    values('${vol}','${date}','${theme}','${intro}','${imageUrl}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取点击的题园表一条记录
router.post('/getTestOne', (req, res) => {
    let vol = req.body.vol;
    const sqlStr = `select * from test_list where vol='${vol}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取题园测试题目
router.post('/getTopicTest', (req, res) => {
    let {id, number} = req.body;
    const sqlStr = `select topic_list.* from test_list inner join topic_list 
    on test_list.id=topic_list.testId where test_list.id='${id}' and topic_list.number='${number}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有测试题目列表
router.get('/getTopicList', (req, res) => {
    const sqlStr = `select * from topic_list`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除测试题目记录api
router.post('/topicDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from topic_list where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 修改测试题目数据api
router.post('/topicEdit', (req, res) => {
    let {id, testId, number, question, point, option1, option2, option3, optionRight, answer} = req.body;
    const sqlStr = `update topic_list set testId='${testId}',number='${number}',question='${question}',point='${point}', 
    option1='${option1}',option2='${option2}',option3='${option3}',optionRight='${optionRight}',answer='${answer}' 
    where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加测试题目记录api
router.post('/topicAdd', (req, res) => {
    let {testId, number, question, point, option1, option2, option3, optionRight, answer} = req.body;
    const sqlStr = `insert into topic_list 
    (testId, number, question, point, option1, option2, option3, optionRight, answer) values(
    '${testId}','${number}','${question}','${point}','${option1}','${option2}','${option3}','${optionRight}','${answer}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有问答列表
router.get('/getQuestionList', (req, res) => {
    const sqlStr = `select * from question_list order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除问答记录api
router.post('/questionDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from question_list where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 修改问答数据api
router.post('/questionEdit', (req, res) => {
    let {id, vol, date, username, question, description, reply, likeCount} = req.body;
    const sqlStr = `update question_list set vol='${vol}',date='${date}',username='${username}',
    question='${question}',description='${description}',reply='${reply}',likeCount='${likeCount}' 
    where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加问答记录api
router.post('/questionAdd', (req, res) => {
    let {vol, date, username, question, description, likeCount, value} = req.body;
    const sqlStr = `insert into question_list (vol, date, username, question, description, likeCount, reply) 
    values('${vol}','${date}','${username}','${question}','${description}','${likeCount}','${value}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取往期问答列表
router.get('/getQuestionList2', (req, res) => {
    const sqlStr = `select vol,question from question_list order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取问答表最新的一条记录
router.get('/getQuestionLast', (req, res) => {
    const sqlStr = `select * from question_list where vol=(select max(vol) from question_list)`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取点击的问答表一条记录
router.post('/getQuestionOne', (req, res) => {
    let vol = req.body.vol;
    const sqlStr = `select * from question_list where vol='${vol}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加用户提问记录
router.post('/userAskAdd', (req, res) => {
    let {email, username, question, description} = req.body;
    const sqlStr = `insert into question_collection (email, username, question, description)
    values('${email}','${username}','${question}','${description}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有用户提问列表
router.get('/getUserAskList', (req, res) => {
    const sqlStr = `select * from question_collection`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除用户提问记录api
router.post('/userAskDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from question_collection where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有探索列表
router.get('/getExploreList', (req, res) => {
    const sqlStr = `select * from explore_list order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除探索记录api
router.post('/exploreDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from explore_list where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 修改探索数据api
router.post('/exploreEdit', (req, res) => {
    let {id, vol, date, imageUrl, title, content, likeCount} = req.body;
    const sqlStr = `update explore_list set vol='${vol}',date='${date}',imageUrl='${imageUrl}',
    title='${title}',content='${content}',likeCount='${likeCount}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加探索记录api
router.post('/exploreAdd', (req, res) => {
    let {vol, date, imageUrl, title, likeCount, value} = req.body;
    const sqlStr = `insert into explore_list (vol, date, imageUrl, title, likeCount, content) 
    values('${vol}','${date}','${imageUrl}','${title}','${likeCount}','${value}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取点击的探索表一条记录
router.post('/getExploreOne', (req, res) => {
    let vol = req.body.vol;
    const sqlStr = `select * from explore_list where vol='${vol}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取往期探索列表
router.get('/getExploreList2', (req, res) => {
    const sqlStr = `select vol,date,title,imageUrl from explore_list order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取探索表最新的一条记录
router.get('/getExploreLast', (req, res) => {
    const sqlStr = `select * from explore_list where vol=(select max(vol) from explore_list)`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取今日一更所有列表
router.get('/getDailyList', (req, res) => {
    const sqlStr = `select * from daily_list order by vol desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 删除今日一更记录api
router.post('/dailyDel', (req, res) => {
    let id = req.body.id;
    const sqlStr = `delete from daily_list where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 修改今日一更数据api
router.post('/dailyEdit', (req, res) => {
    let {id, vol, date, category, imageUrl, intro} = req.body;
    const sqlStr = `update daily_list set vol='${vol}',date='${date}',category='${category}',
    imageUrl='${imageUrl}',intro='${intro}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加今日一更记录api
router.post('/dailyAdd', (req, res) => {
    let {vol, date, category, imageUrl, intro} = req.body;
    const sqlStr = `insert into daily_list (vol, date, category, imageUrl, intro) 
    values('${vol}','${date}','${category}','${imageUrl}','${intro}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取今日更新悦读模块列表
router.get('/getDailyRead', (req, res) => {
    const sqlStr = `select * from daily_list where category=1 and vol=(select max(vol) from daily_list)`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取悦读表最新标题
router.get('/getDailyReadTitle', (req, res) => {
    const sqlStr = `select title from read_list where vol=(select max(vol) from read_list)`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取今日更新视界模块列表
router.get('/getDailyVideo', (req, res) => {
    const sqlStr = `select daily_list.*,video_list.title,video_list.intro from daily_list inner join video_list 
    on daily_list.vol=video_list.vol 
    where daily_list.category=2 and daily_list.vol=(select max(daily_list.vol) from daily_list)`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取今日更新题园模块列表
router.get('/getDailyTest', (req, res) => {
    const sqlStr = `select daily_list.*,test_list.theme,test_list.intro from daily_list inner join test_list
    on daily_list.vol=test_list.vol 
    where daily_list.category=3 and daily_list.vol=(select max(daily_list.vol) from daily_list)`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取今日更新问答模块列表
router.get('/getDailyQuestion', (req, res) => {
    const sqlStr = `select daily_list.*,question_list.question,question_list.description 
    from daily_list inner join question_list
    on daily_list.vol=question_list.vol 
    where daily_list.category=4 and daily_list.vol=(select max(daily_list.vol) from daily_list)`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取今日更新探索模块列表
router.get('/getDailyExplore', (req, res) => {
    const sqlStr = `select daily_list.*,explore_list.title from daily_list inner join explore_list
    on daily_list.vol=explore_list.vol 
    where daily_list.category=5 and daily_list.vol=(select max(daily_list.vol) from daily_list)`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 悦读点赞api
router.post('/readLike', (req, res) => {
    let {id, likeCount} = req.body;
    const sqlStr = `update read_list set likeCount='${likeCount}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 视界点赞api
router.post('/videoLike', (req, res) => {
    let {id, likeCount} = req.body;
    const sqlStr = `update video_list set likeCount='${likeCount}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 问答点赞api
router.post('/questionLike', (req, res) => {
    let {id, likeCount} = req.body;
    const sqlStr = `update question_list set likeCount='${likeCount}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 探索点赞api
router.post('/exploreLike', (req, res) => {
    let {id, likeCount} = req.body;
    const sqlStr = `update explore_list set likeCount='${likeCount}' where id='${id}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加悦读收藏api
router.post('/readMarkAdd', (req, res) => {
    let {id, email} = req.body;
    const sqlStr = `insert into read_mark (readId, email) values('${id}','${email}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 取消悦读收藏api
router.post('/readMarkDel', (req, res) => {
    let {id, email} = req.body;
    const sqlStr = `delete from read_mark where readId='${id}' and email='${email}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加视界收藏api
router.post('/videoMarkAdd', (req, res) => {
    let {id, email} = req.body;
    const sqlStr = `insert into video_mark (videoId, email) values('${id}','${email}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 取消视界收藏api
router.post('/videoMarkDel', (req, res) => {
    let {id, email} = req.body;
    const sqlStr = `delete from video_mark where videoId='${id}' and email='${email}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加问答收藏api
router.post('/questionMarkAdd', (req, res) => {
    let {id, email} = req.body;
    const sqlStr = `insert into question_mark (questionId, email) values('${id}','${email}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 取消问答收藏api
router.post('/questionMarkDel', (req, res) => {
    let {id, email} = req.body;
    const sqlStr = `delete from question_mark where questionId='${id}' and email='${email}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加探索收藏api
router.post('/exploreMarkAdd', (req, res) => {
    let {id, email} = req.body;
    const sqlStr = `insert into explore_mark (exploreId, email) values('${id}','${email}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 取消探索收藏api
router.post('/exploreMarkDel', (req, res) => {
    let {id, email} = req.body;
    const sqlStr = `delete from explore_mark where exploreId='${id}' and email='${email}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取用户悦读收藏列表api
router.get('/getReadMark', (req, res) => {
    const sqlStr = `select read_list.*,read_mark.email from read_list inner join read_mark 
    on read_list.id=read_mark.readId order by read_mark.id desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取用户视界收藏列表api
router.get('/getVideoMark', (req, res) => {
    const sqlStr = `select video_list.*,video_mark.email from video_list inner join video_mark 
    on video_list.id=video_mark.videoId order by video_mark.id desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取用户问答收藏列表api
router.get('/getQuestionMark', (req, res) => {
    const sqlStr = `select question_list.*,question_mark.email from question_list inner join question_mark 
    on question_list.id=question_mark.questionId order by question_mark.id desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取用户探索收藏列表api
router.get('/getExploreMark', (req, res) => {
    const sqlStr = `select explore_list.*,explore_mark.email from explore_list inner join explore_mark 
    on explore_list.id=explore_mark.exploreId order by explore_mark.id desc`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有悦读收藏列表api
router.get('/getReadMarkAll', (req, res) => {
    const sqlStr = `select * from read_mark`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有视界收藏列表api
router.get('/getVideoMarkAll', (req, res) => {
    const sqlStr = `select * from video_mark`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有问答收藏列表api
router.get('/getQuestionMarkAll', (req, res) => {
    const sqlStr = `select * from question_mark`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 获取所有探索收藏列表api
router.get('/getExploreMarkAll', (req, res) => {
    const sqlStr = `select * from explore_mark`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

module.exports = router;
