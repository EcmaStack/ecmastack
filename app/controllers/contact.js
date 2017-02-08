import Ember from 'ember';
import AWS from 'npm:aws-sdk';
import config from '../config/environment';

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  accessKeyId: config.aws.accessKeyId,
  "secretAccessKey": config.aws.secretAccessKey,
  "region": "us-east-1",
});

export default Ember.Controller.extend({
  actions: {
    sendContact: function() {

      // Grab submitted values
      const submittedForm = {
        name: this.get('name'),
        email: this.get('email'),
        company: this.get('company'),
        phone: this.get('phone'),
        message: this.get('message'),
        timestamp: new Date().getTime()
      };

      // Prepare values to send with email
      const emailParams = {
        Destination: { ToAddresses: [ 'EcmaStack <hello@ecmastack.com>', 'abachuk@gmail.com', 'jmasse860@gmail.com' ] },
        Message: {
          Body: { Text: {
            Data: `${submittedForm.name} from ${submittedForm.company} company contacted EcmaStack about ${submittedForm.message}. You can contact them by email ${submittedForm.email} or phone ${submittedForm.phone}`,
            Charset: 'UTF-8' } },
          Subject: { Data: 'EcmaStack Contact Form', Charset: 'UTF-8' }
        },
        ReplyToAddresses: [submittedForm.email],
        Source: `${submittedForm.name} <info@ecmastack.com>`,
      };

      // Save the submitted form to our database
      const newContact = this.store.createRecord('contact', submittedForm);
      newContact.save().then(function(res) {});

      // Send submitted for as email using AWS SES
      // TODO: handle the error and failure with user friendly messages
      ses.sendEmail(emailParams, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
          console.log('Thanks for dropping us a line');
        }
      });

    }
  }
});
