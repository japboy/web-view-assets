module.exports = {
  processors: [
    'stylelint-processor-html',
  ],
  extends: 'stylelint-config-standard',
  rules: {
    indentation: [2],
    'unit-whitelist': ['%', 'ch', 'deg', 'em', 'fr', 'ms', 'pt', 'px', 'rem', 's', 'vw', 'vh'],
    'no-empty-source': null,
    // css-moduleでのglobal疑似要素を利用したcssの上書きを許可する
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
