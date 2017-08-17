/* eslint no-console: 1 */
console.warn('You are using the default filter for the users service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data: any, connection: any, hook: any) { // eslint-disable-line no-unused-vars
  return data;
};
