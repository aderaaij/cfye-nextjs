module.exports = {
  extends: ['plugin:@next/next/recommended', 'stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'declaration-colon-newline-after': null,
    'no-descending-specificity': null,
    'at-rule-semicolon-newline-after': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'order/order': [
      ['custom-properties', 'declarations'],
      {
        disableFix: true,
      },
    ],
  },
};
