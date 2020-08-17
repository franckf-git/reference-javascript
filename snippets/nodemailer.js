const express = require('express'),
    bodyParser = require('body-parser'),
    nodeMailer = require('nodemailer');

const server = express();

// add middleware to parse the json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

// Set up routes
server.post('/send-email', async (req, res, next) => {
    try {

        let {
            email
        } = req.body;

        if (!email) {
            return res.status(400).send({
                "error": {
                    "message": " Email requied"
                }
            });
        }

        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'xxxxxx@gmail.com',
                pass: 'xxxxxxx'
            }
        });
        let mailOptions = {
            from: '"CodesQuery" <xxxxxxx@gmail.com>',
            to: email,
            subject: 'Testing Email',
            html: '<b>Send email in Node.js | Tutorials by CodesQuery</b>'
        };

        transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                throw new error('Something went wrong')
            }
            console.log(data);
            return res.status(200).send({
                "status": true,
                "message": "Email Send Successfully."
            });
        });

    } catch (err) {
        console.log(err);
        return res.status(200).send({
            "error": {
                "message": "Something went wrong"
            }
        });
    }
});

server.get('*', (req, res, next) => {
    next();
});


// catch 404 error
server.use(function (req, res, next) {
    const err = new Error('Requested URL Not Found !');
    err.status = 404;
    next(err);
});

//Error handler
server.use(function (err, req, res, next) {
    res.locals.message = err.message;

    // render the error page
    res.status(err.status || 500);
    res.send({
        "error": {
            "message": res.locals.message
        }
    });
});

server.listen(5000, function () {
    console.log('Express server listening on - http://' + 'localhost' + ':' + 5000);
});