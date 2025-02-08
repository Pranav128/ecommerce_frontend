"use strict";

exports.Status = exports.PasswordStatus = exports.EmailRole = void 0;
let EmailRole;
exports.EmailRole = EmailRole;
(function (EmailRole) {
  EmailRole["PRIMARY"] = "PRIMARY";
  EmailRole["SECONDARY"] = "SECONDARY";
})(EmailRole || (exports.EmailRole = EmailRole = {}));
let Status;
exports.Status = Status;
(function (Status) {
  Status["VERIFIED"] = "VERIFIED";
  Status["UNVERIFIED"] = "UNVERIFIED";
})(Status || (exports.Status = Status = {}));
let PasswordStatus;
exports.PasswordStatus = PasswordStatus;
(function (PasswordStatus) {
  PasswordStatus["NOT_ENROLLED"] = "NOT_ENROLLED";
  PasswordStatus["ACTIVE"] = "ACTIVE";
})(PasswordStatus || (exports.PasswordStatus = PasswordStatus = {}));
//# sourceMappingURL=types.js.map