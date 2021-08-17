import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Loader, SkeletonLoader } from './src/SkeletonLoader';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SkeletonLoader>
        <Loader style={{ height: 100, width: 100 }} />
      </SkeletonLoader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
