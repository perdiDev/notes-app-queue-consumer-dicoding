require('dotenv').config();
const amqp = require('amqplib');
const MailSender = require('./MailSender');
const NotesService = require('./NotesService');
const Listener = require('./Listener');

const init = async () => {
  console.log('INIT');
  const notesService = new NotesService();
  console.log('tes 1');
  const mailSender = new MailSender();
  console.log('tes 2');
  const listener = new Listener(notesService, mailSender);
  console.log(listener.listen);
  console.log('tes 3');

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  console.log('tes 4');
  const channel = await connection.createChannel();
  console.log('tes 5');

  await channel.assertQueue('export:notes', {
    durable: true,
  });
  console.log('tes 6');

  channel.consume('export:notes', listener.listen, { noAck: true });
  console.log('tes 7');
};

init();
