import { loc } from './loc.js';
import { OAuthError } from './Errors.js';

class InlineErrorType {
  constructor() {
    this.inline = true;
  }
}
class TerminalErrorType {
  constructor() {
    this.terminal = true;
  }
}
class TypedOAuthError extends OAuthError {
  constructor(originalError, errorTypeCtor) {
    super(originalError.message);
    this.errorType = void 0;
    this.orginalError = void 0;
    this.errorDetails = void 0;
    this.errorType = new errorTypeCtor();
    this.orginalError = originalError;
    this.errorDetails = {
      errorSummary: this.getErrorSummary(),
      errorCode: originalError.errorCode,
      errorCauses: 'errorCauses' in originalError ? originalError.errorCauses : undefined
    };
  }
  getErrorSummary() {
    return this.orginalError.errorSummary;
  }
  is(errorTrait) {
    var _Object$getOwnPropert;
    return Boolean((_Object$getOwnPropert = Object.getOwnPropertyDescriptor(this.errorType, errorTrait)) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.value);
  }
}
class RecoverableError extends TypedOAuthError {}
class NonRecoverableError extends TypedOAuthError {}
class ClockDriftError extends RecoverableError {
  constructor(error) {
    super(error, TerminalErrorType);
  }
  getErrorSummary() {
    return loc('error.unsynced.clock', 'login');
  }
}
class UserNotAssignedError extends RecoverableError {
  constructor(error) {
    super(error, InlineErrorType);
  }
}
class JITProfileProvisioningError extends RecoverableError {
  constructor(error) {
    super(error, InlineErrorType);
  }
  getErrorSummary() {
    return loc('error.jit_failure', 'login');
  }
}
class MfaRequiredError extends NonRecoverableError {
  constructor(error) {
    super(error, InlineErrorType);
  }
  getErrorSummary() {
    return loc('error.mfa.required', 'login');
  }
}
function getTypedOAuthError(error) {
  switch (error.errorCode) {
    case 'access_denied':
      return new UserNotAssignedError(error);
    case 'jit_failure_missing_fields':
    case 'jit_failure_invalid_login_format':
    case 'jit_failure_values_not_match_pattern':
    case 'jit_failure_values_too_long':
    case 'jit_failure_invalid_locale':
      return new JITProfileProvisioningError(error);
    case 'login_required':
      const mfaRequiredMsg = 'The client specified not to prompt, but the client app requires re-authentication or MFA.';
      if (error.message === mfaRequiredMsg) {
        return new MfaRequiredError(error);
      }
    case 'INTERNAL':
      const clockDriftMsg = 'The JWT was issued in the future';
      if (error.message === clockDriftMsg) {
        return new ClockDriftError(error);
      }
    default:
      return new RecoverableError(error, Object);
  }
}

export { ClockDriftError, JITProfileProvisioningError, MfaRequiredError, NonRecoverableError, RecoverableError, TypedOAuthError, UserNotAssignedError, getTypedOAuthError };
//# sourceMappingURL=OAuthErrors.js.map
