import * as React from 'react';
import { StyleSheet, TextProps } from 'react-native';

import { renderStyledText } from './renderer';

type Props = TextProps & {
  children: String,
  textStyles: StyleSheet.StyleSheet,
  textProps: { [styleName: string]: TextProps },
};

class StyledText extends React.PureComponent<Props> {
  render() {
    const { children, textStyles, textProps, ...props } = this.props;
    return renderStyledText(children, textStyles, textProps, props);
  }
}

export default StyledText;
