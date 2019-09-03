import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer = () => {
  return <View style={styles.spacer}></View>;
};
const styles = StyleSheet.create({
  spacer: {
    marginVertical: 5
  }
});

export default Spacer;
