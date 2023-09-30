import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing, withSpring, withRepeat, withSequence, useAnimatedStyle, useSharedValue, withDelay, runOnJS } from 'react-native-reanimated';

const CircleOverlay = () => {
    const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const rotateCircle = () => {
        const intervalId = setInterval(() => {
          setRotationAngle((prevAngle) => prevAngle + 10)
        }, 50); 
  
        return () => clearInterval(intervalId);
    }

    rotateCircle();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{  }],
    };
  });

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
          stroke="#0093E9"
          strokeWidth={3}
          fill="#80D0C7"
          opacity={1}
          style={[
            styles.circle,
            {
              transform: [{ rotate: `${rotationAngle}deg` }],
            },
          ]}
          strokeDasharray="8 8"
        />
      </Svg>
    </View>
  );
  
};



export default CircleOverlay;
