import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import styled from 'styled-components';
import AttractionCard from './AttractionCard';
import constants from '../../constants';
import ContextCreator from '../../context/ContextCreator';

const CARD_WIDTH = constants.height * 0.28
export default class Attractions extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <ContextCreator.Consumer>
                {context => (
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
                  //   style={styles.scrollView}
                  //   contentContainerStyle={styles.endPadding}
                  >
                      {context.currentSuggestions.map((attraction, index) => {
                          return(
                              <AttractionCard index={index} name={attraction.name} placeId={attraction.placeId} img={attraction.img} key={index} />
                          )
                      })}
                  </Animated.ScrollView>
                )}
            </ContextCreator.Consumer>
        )
    }
}