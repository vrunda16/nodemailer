const express = require("express");
const app = express();
app.use(express.json());
const nodemailer = require("nodemailer");


const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "vrundamoradiya16@gmail.com",
        pass: "trni wwoi fjep qvxc",
    },
});

let Otp =Math.floor(Math.random() *10000);


app.post("/", (req, res) => {
    
    let{email,subject,text} = req.body
    // console.log(email,subject,text);
    const mailOptions = {
        from: "vrundamoradiya16@gmail.com",
        to: email,
        subject: subject,
        text: text,
        html:`<h1>otp ${Otp} </h1>`,
    };
// console.log(mailOptions);

    transport.sendMail(mailOptions,
        (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });

    res.send("sending");
});

app.get("/:otp",(req,res) =>{
    let {otp} = req.params;
    if(Otp == otp) {
        res.send("otp matched");
        console.log("otp matched");
    } else {
        res.send("otp not match");
        console.log("otp umatched");
    }
});

app.listen(8090, () => {
    console.log("server is running");
});

