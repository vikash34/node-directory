export function sendEmailToCompany(req, res){
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
    var transporter = nodemailer.createTransport(smtpTransport(
      {  service: 'gmail',
         host: 'smtp.gmail.com',
         auth: {
         user: 'sender@gmail.com',
         pass: 'senderpass@123'
              }
      })
    );

    return sequelize.query('call GetCompanyEmailList()')
    .then(company_result => {
      if(company_result.length > 0){
        for (let index = 0; index < company_result.length; index++) {
          sequelize.query('call sendEmailToCompany(' + company_result[index].ClientID + ');')
          .then(result => {
            var client_data = result;
            // console.log(client_data);
            var mailOptions = {
               from: 'sender@gmail.com',
               to: company_result[index].email,
               subject: 'Sending Email using Node.js',
               text: 'That was easy!',
               attachments: [{'filename': 'Client_data.csv','content':json2csv(client_data)}]
              };

          transporter.sendMail(mailOptions, function(error, info){
             if (error) {
               res.json({yo: 'error'+error});
               console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                res.json({yo: 'email Sent'});
              }
            });
          }).catch(error => {
            finalRes.push({"status":'failure'});
            return res.status(500).json(finalRes[0]);
          });
        }
      }
    }).catch(err=>{
      console.log(err);
    });
  }



function json2csv(content){
  const { Parser } = require('json2csv');
  var fields = getFields(content);
  return new Parser({ fields }).parse(content);

  function getFields(content){
      var fields = [];
      for(var i = 0; i < content.length; i++){
        fields = Object.keys(content[i]);
        if(fields.length > 0)
        break;
      };
      return fields;
    }
  }
