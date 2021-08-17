import * as React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { Loader, SkeletonLoader } from './SkeletonLoader';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ItemListLoader = ({ backgroundColor, highlightColor }) => {
  return (
    <SafeAreaView>
      <SkeletonLoader
        backgroundColor={backgroundColor}
        highlightColor={highlightColor}>
        <View style={styles.container}>
          {new Array(10).fill(null).map((_, index) => (
            <Item key={index} />
          ))}
        </View>
      </SkeletonLoader>
    </SafeAreaView>
  );
};

const Item = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.row}>
      <Loader style={styles.image} />
      <View>
        <Loader style={[styles.line, { width: width * 0.6 }]} />
        <Loader style={[styles.line, { width: width * 0.4 }]} />
        <Loader style={[styles.line, { width: width * 0.2 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  row: { flexDirection: 'row', marginBottom: 40 },
  image: { height: 100, width: 100, marginRight: 10 },
  line: { height: 20, marginBottom: 10 },
});
