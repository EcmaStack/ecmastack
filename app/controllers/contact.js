import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['timestamp'],
  sortAscending: false, // sorts post by timestamp
  actions: {
    sendContact: function() {
      const newContact = this.store.createRecord('contact', {
        name: this.get('name'),
        email: this.get('email'),
        company: this.get('company'),
        phone: this.get('phone'),
        message: this.get('message'),
        timestamp: new Date().getTime()
      });
      newContact.save().then(function(res) {
        // res.isError == false
        // res.id
        console.log(res);
      });
    }
  }
});
