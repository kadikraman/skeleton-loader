import * as React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Reanimated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

const SPEED = 1800;
const BACKGROUND_COLOR = '#efefee';
const HIGHLIGHT_COLOR = '#fff';

export const SkeletonLoader= ({ children }) => {
  const [layout, setLayout] = React.useState();
  const shared = useSharedValue(0);
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: SPEED }), Infinity);
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(shared.value, [0, 1], [-width, width]) },
    ],
  }));

  if (!layout?.width && !layout?.height) {
    return (
      <View onLayout={event => setLayout(event.nativeEvent.layout)}>
        {children}
      </View>
    );
  }

  return (
    <MaskedView
      style={{ height: layout.height, width: layout.width }}
      maskElement={<View>{children}</View>}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: BACKGROUND_COLOR,
          overflow: 'hidden',
        }}
      />
      <Reanimated.View style={[animatedStyles, StyleSheet.absoluteFill]}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
              colors={['transparent', 'black', 'transparent']}
            />
          }>
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: HIGHLIGHT_COLOR },
            ]}
          />
        </MaskedView>
      </Reanimated.View>
    </MaskedView>
  );
};

export const Loader = ({ style }) => {
  return (
    <View
      style={[
        style ? style : { width: 100, height: 100 },
        { backgroundColor: '#fff' },
      ]}
    />
  );
};
