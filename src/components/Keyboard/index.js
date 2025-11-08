import React, {useMemo, useRef} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styled';
import View from '../View';

const KeyboardAvoidingComponent = ({
  keyboardShouldPersistTaps = 'never',
  children,
  scrollViewProps = {},
  footer,
  ...rest
}) => {
  const scrollRef = useRef(null);
  const styled = styles();
  const isKeyboardShouldPersistTaps = useMemo(
    () => keyboardShouldPersistTaps === 'handled',
    [keyboardShouldPersistTaps],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styled.container}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // iOS için ek offset
      {...rest}>
      <View style={styled.scrollViewContainer}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          ref={scrollRef}
          contentContainerStyle={styled.scrollViewContent}>
          {isKeyboardShouldPersistTaps ? (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View flex>{children}</View>
            </TouchableWithoutFeedback>
          ) : (
            <View flex>{children}</View>
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

KeyboardAvoidingComponent.dismiss = Keyboard.dismiss;
KeyboardAvoidingComponent.isVisible = Keyboard.isVisible;
export default KeyboardAvoidingComponent;
