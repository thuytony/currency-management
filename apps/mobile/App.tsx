import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, AppRegistry } from 'react-native';
import CurrencyList from './src/components/CurrencyList';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      <View style={styles.content}>
        <CurrencyList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    flex: 1,
  },
});

// Register component with AppRegistry
AppRegistry.registerComponent('main', () => App);