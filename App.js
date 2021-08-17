import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { ItemListLoader } from './src/ItemList';
import { Loader, SkeletonLoader } from './src/SkeletonLoader';

export default function App() {
  const [currentLoader, setCurrentLoader] = React.useState(null);
  const { width } = useWindowDimensions();

  const toggleLoading = React.useCallback(
    loader => {
      setCurrentLoader(loader);
      wait(5000).then(() => setCurrentLoader(null));
    },
    [setCurrentLoader],
  );

  if (!currentLoader) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View>
          <Pressable
            onPress={() => toggleLoading('simple-square')}
            style={[styles.button, styles.green]}>
            <Text style={styles.whiteText}>Simple square loader</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleLoading('grey-item-list')}
            style={[styles.button, styles.grey]}>
            <Text>Grey item list loader</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleLoading('pink-item-list')}
            style={[styles.button, styles.pink]}>
            <Text>Pink item list loader</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleLoading('purple-item-list')}
            style={[styles.button, styles.purple]}>
            <Text>Purple item list loader</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (currentLoader === 'simple-square') {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SkeletonLoader>
          <Loader style={{ height: width * 0.8, width: width * 0.8 }} />
        </SkeletonLoader>
      </View>
    );
  }

  if (currentLoader === 'grey-item-list') {
    return <ItemListLoader />;
  }

  if (currentLoader === 'pink-item-list') {
    return (
      <ItemListLoader backgroundColor="#F4DBD8" highlightColor="#FFF4EC" />
    );
  }

  if (currentLoader === 'purple-item-list') {
    return (
      <ItemListLoader backgroundColor="#6E75A8" highlightColor="#8D91C7" />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ADEEE3',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  green: { backgroundColor: '#50723C' },
  pink: { backgroundColor: '#F4DBD8' },
  orange: { backgroundColor: '#EF946C' },
  purple: { backgroundColor: '#8D91C7' },
  grey: { backgroundColor: '#efefee' },
  whiteText: { color: '#fff' },
});

export const wait = numMs => new Promise(res => setTimeout(() => res(), numMs));
