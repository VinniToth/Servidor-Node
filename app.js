const express = require("express");
const bodyParser = require("body-parser");
const engines = require("consolidate");
const { render } = require("ejs");
const paypal = require("paypal-rest-sdk");

const app = express();

app.engine('ejs', require('ejs').renderFile);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQGWdd300H4r944fsWhraQX9_XGqdSfUyl2eId_LqT5vYJkCHWLuYai81neQbJrwICBwREgLzB2TDBQj',
    'client_secret': 'EJqw1iqYd4G22FFHDTKQ_ZElwkFcrTyd79QhhpLHRGbHPPaKp-ukEStim68KFnJ8hrZfncVYNAlQ4QTh'
  });

app.get("/", (req, res) => {
    res.render("../views/index");
});

app.get('/paypal', (req, res) =>{
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "100.00",
                    "currency": "BRL",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "BRL",
                "total": "100.00"
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href);
        }
    });
});

app.get('/success', (req, res) =>{
    // res.send('success');
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        "payer_id": PayerID,
        "transactions": [{
            "amount": {
                "currency": "BRL",
                "total": "100.00"
            }
        }]
    };
    
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render("success");
        }
    });

});

app.get('/cancel', (req, res) => {
    res.render("cancel");
});

app.listen(21350, () => {
    console.log("Server is runing");
});
