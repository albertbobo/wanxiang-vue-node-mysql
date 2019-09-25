// nodemailer.js
const nodemailer = require('nodemailer');

// 创建一个smtp服务器
const config = {
    host: 'smtp.163.com',
    port: 465,
    secureConnection: true,              // 使用SSL
    secure: true,                        // true for 465, false for other ports
    auth: {
        user: 'onewanxiang@163.com',     // 发送方的163邮箱账号
        pass: 'null001'                  // 邮箱的授权码
    }
};

// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);

let mail = {
    transporter: transporter,
    send(tomail, mysubject, msg) {
        // 邮件内容
        let mailOptions = {
            from: 'onewanxiang@163.com',
            to: tomail,
            subject: mysubject,
            html: '您的验证码为：' + msg + '，如非本人操作请忽略。',
        };
        // 发送邮件
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    }
};

module.exports = mail;
