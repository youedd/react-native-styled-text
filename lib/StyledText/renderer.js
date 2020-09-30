import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

import { parse, Mixed } from './parser';
import { verifyChildrenProp, verifyTextStylesProp, verifyTextStyles } from './utils';

const defaultStyles = {
  b: {
    fontWeight: 'bold',
  },
  i: {
    fontStyle: 'italic',
  },
  u: {
    textDecorationLine: 'underline',
  }
};

const renderMixedText = (mixedText: Mixed, textStyles: Object, textProps: Object = {}) => mixedText.map((element, index) => {
  if (typeof element === 'string' || element === undefined || element === null) {
    return element;
  }
  
  const props = Object.assign(
    { 
      style: textStyles[element.styleName] || defaultStyles[element.styleName], 
      key: index,
    },
    textProps[element.styleName]
  );

  return React.createElement(
    Text,
    props,
    renderMixedText(element.mixedText, textStyles),
  )
});

export const renderStyledText = (children, textStyles, textProps, props) => {
  const text = verifyChildrenProp(children) ? children : undefined;
  const styles = verifyTextStylesProp(textStyles) ? (textStyles || {}) : {}

  const mixedText = parse(text);
  verifyTextStyles(mixedText, styles, defaultStyles);

  const textElements = renderMixedText(mixedText, styles, textProps);

  return React.createElement(
    Text,
    textProps,
    ...textElements,
  );
};
