import React, { useContext } from 'react';
import { View, Animated } from 'react-native';
import styled from 'styled-components';
import AttractionCard from './AttractionCard';
import constants from '../../constants';
import { ContextCreator } from '../../context/ContextCreator';

const CARD_WIDTH = constants.height * 0.28
export default function Attractions(props) {
  const { currentSuggestions } = useContext(ContextCreator)

  return (
    <Animated.ScrollView
      horizontal
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: this.animation,
              },
            },
          },
        ],
        { useNativeDriver: true }
      )}
    >
      {currentSuggestions.map((attraction, index) => {
        return (
          <AttractionCard index={index} name={attraction.name} placeId={attraction.placeId} img={attraction.img} key={index} />
        )
      })}
    </Animated.ScrollView>
  )
}