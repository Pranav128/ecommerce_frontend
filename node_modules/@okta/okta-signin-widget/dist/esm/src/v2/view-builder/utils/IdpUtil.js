import { FORMS } from '../../ion/RemediationConstants.js';

function getIdvName(remediations) {
  let redirectIDVerifyRemediation = remediations.find(remediation => {
    return remediation.name === FORMS.REDIRECT_IDVERIFY;
  });
  return redirectIDVerifyRemediation.idp.name;
}
function getHelpLinks(remediations) {
  const idpName = getIdvName(remediations);
  let termsOfUse, privacyPolicy;
  switch (idpName === null || idpName === void 0 ? void 0 : idpName.toUpperCase()) {
    case 'PERSONA':
      termsOfUse = 'https://withpersona.com/legal/terms-of-use';
      privacyPolicy = 'https://withpersona.com/legal/privacy-policy';
      break;
    case 'CLEAR':
      termsOfUse = 'https://www.clearme.com/member-terms';
      privacyPolicy = 'https://www.clearme.com/privacy-policy';
      break;
    case 'INCODE':
      termsOfUse = 'https://incode.id/terms';
      privacyPolicy = 'https://incode.id/privacy';
      break;
  }
  return {
    termsOfUse: termsOfUse,
    privacyPolicy: privacyPolicy
  };
}

export { getHelpLinks, getIdvName };
//# sourceMappingURL=IdpUtil.js.map
