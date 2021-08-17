import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Loader, SkeletonLoader } from './src/SkeletonLoader';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleLoading = React.useCallback(() => {
    setIsLoading(true);
    wait(5000).then(() => setIsLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <SkeletonLoader>
          <Loader style={{ height: 300, width: 300 }} />
        </SkeletonLoader>
      ) : (
        <View>
          <Pressable onPress={toggleLoading}>
            <Text>Show loader</Text>
          </Pressable>
        </View>
      )}
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

export const wait = numMs => new Promise(res => setTimeout(() => res(), numMs));
