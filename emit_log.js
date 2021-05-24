#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const exchange = 'logs';
    const payload = {
      id: 11,
      packet_no: 126,
      temperature: 30,
      humidity: 60,
      tds: 1100,
      pH: 5.0,
    };

    let payloadAsString = JSON.stringify(payload);
    const msg = payloadAsString || 'Hello World!';

    channel.assertExchange(exchange, 'fanout', {
      durable: false,
    });
    channel.publish(exchange, '', Buffer.from(msg));
    console.log(" [x] Sent '%s'", msg);
  });
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
