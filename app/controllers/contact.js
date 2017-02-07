import Ember from 'ember';
import AWS from 'npm:aws-sdk';

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  accessKeyId: "AKIAIPDIIAXY24YAGHNQ", // AMAZON_ACCESS_KEY_ID
  "secretAccessKey": "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", //AMAZON_SECRET_ACCESS_KEY
  "region": "us-east-1",
});
console.log(ses);

export default Ember.Controller.extend({
  sortProperties: ['timestamp'],
  sortAscending: false, // sorts post by timestamp
  init() {

  },
  actions: {
    sendContact: function() {
      const submittedForm = {
        name: this.get('name'),
        email: this.get('email'),
        company: this.get('company'),
        phone: this.get('phone'),
        message: this.get('message'),
        timestamp: new Date().getTime()
      };

      const params = {
        Destination: { ToAddresses: [ 'EcmaStack <hello@ecmastack.com>' ] },
        Message: {
          Body: { Text: {
            Data: `${submittedForm.name} from ${submittedForm.company} company contacted EcmaStack about ${submittedForm.message}. You can contact them by email ${submittedForm.email} or phone ${submittedForm.phone}`,
            Charset: 'UTF-8' } },
          Subject: { Data: 'EcmaStack Contact Form', Charset: 'UTF-8' }
        },
        ReplyToAddresses: [submittedForm.email],
        Source: `${submittedForm.name} <info@ecmastack.com>`,
      }

      const newContact = this.store.createRecord('contact', {
        name: this.get('name'),
        email: this.get('email'),
        company: this.get('company'),
        phone: this.get('phone'),
        message: this.get('message'),
        timestamp: new Date().getTime()
      });
      newContact.save().then(function(res) {
        ses.sendEmail(params, function(err, data) {
          if (err) {
            console.log(err, err.stack);
            console.log(err);
          } else {
            console.log(data);
            console.log('Thanks for dropping us a line');
          }
        });
        console.log(res);
      });
    }
  }
});
