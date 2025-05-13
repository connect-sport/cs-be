const EMAIL_VALIDATION_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_VALIDATION_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const USERNAME_VALIDATION_REGEX = /^[a-zA-Z0-9._-]{3,}$/;
const NAME_VALIDATION_REGEX = /^[a-zA-Z0-9._-]{3,}$/;
const PHONE_VALIDATION_REGEX =
  /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
const URL_VALIDATION_REGEX =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
const ZIP_CODE_VALIDATION_REGEX = /^\d{5}(?:[-\s]\d{4})?$/;
const DATE_VALIDATION_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_VALIDATION_REGEX = /^(0[0-9]|1[0-2]):[0-5][0-9] ?([AP]M)?$/;
const CURRENCY_VALIDATION_REGEX = /^\$?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})?$/;
const IP_ADDRESS_VALIDATION_REGEX =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const UUID_VALIDATION_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

module.exports = {
  EMAIL_VALIDATION_REGEX,
  PASSWORD_VALIDATION_REGEX,
  USERNAME_VALIDATION_REGEX,
  NAME_VALIDATION_REGEX,
  PHONE_VALIDATION_REGEX,
  URL_VALIDATION_REGEX,
  ZIP_CODE_VALIDATION_REGEX,
  DATE_VALIDATION_REGEX,
  TIME_VALIDATION_REGEX,
  CURRENCY_VALIDATION_REGEX,
  IP_ADDRESS_VALIDATION_REGEX,
  UUID_VALIDATION_REGEX,
};
