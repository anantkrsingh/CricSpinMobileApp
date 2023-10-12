import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing, withSpring, withRepeat, withSequence, useAnimatedStyle, useSharedValue, withDelay, runOnJS } from 'react-native-reanimated';

const CircleOverlay = () => {
  const styles = StyleSheet.create({
    container: {
      width: 160,
      height: 103,
    },
    circle: {
      position: 'absolute',
      
    },
  });
  return (
    <View style={styles.container}>
      <Svg height={103} width={160}>
        <Circle
          cx={80}
          cy={51.5}
          r={50}
          stroke="black"
          strokeWidth={3}
          fill="#6e2bf0"
          opacity={1}
          style={[
            styles.circle,
          ]}
          strokeDasharray="8 8"
        />
      </Svg>
    </View>
  );
  
};



export default CircleOverlay;
