import React from 'react';
import { useColorScheme, View, Text, StyleSheet } from 'react-native';
import { i18n } from '../../utils';
import Colors from '../../utils/colors';

function Section({ children, title }) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text>{i18n.t('welcome')}</Text>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.neutral2 : Colors.neutral1,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.neutral2 : Colors.neutral1,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Section;
