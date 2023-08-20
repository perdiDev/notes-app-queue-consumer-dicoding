class Listener {
  constructor(notesService, mailSender) {
    console.log('listener constructor');
    this._notesService = notesService;
    this._mailSender = mailSender;
  }

  async listen(message) {
    try {
      console.log('listener');
      const { userId, targetEmail } = JSON.parse(message.content.toString());
      console.log(userId);

      const notes = await this._notesService.getNotes(userId);
      console.log(notes);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
