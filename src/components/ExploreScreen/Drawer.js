import React, { useContext } from 'react';
import { View, Text, StatusBar, Animated, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from 'styled-components';
import constants from '../../constants';
import Drawer from 'react-native-advance-draggable-view';
import { ContextCreator } from '../../context/ContextCreator';
import Attractions from './Attractions';

const Wrapper = styled.View`
    height: ${constants.height * 0.38};
    width: ${constants.width};
    position: absolute;
    flex: 1;
`;

const DrawerContainer = styled.View`
    height: ${constants.height * 0.1};
    width: ${constants.width};
`;

const Content = styled.View`
    height: 100%;
    width: ${constants.width};
    backgroundColor: #fff;
    flexDirection: row;
`;

const Header = styled.View`
    height: ${constants.height * 0.07};
    width: ${constants.width};
    backgroundColor: #fff;
    borderTopLeftRadius: 15;
    borderTopRightRadius: 15;
    elevation: 5;
    shadowColor: #000000;
    shadowOpacity: 0.2;
    paddingLeft: 16px;
    justifyContent: center;
`;

const Title = styled.Text`
    fontWeight: bold;
    fontSize: 16;
`;

const TripButton = styled.TouchableOpacity`
    height: 60;
    width: 60;
    marginTop: -75;
    marginBottom: 15;
    marginRight: 15;
    borderRadius: 30;
    alignSelf: flex-end;
    elevation: 5;
    shadowColor: #000000;
    shadowOpacity: 0.2;
    alignItems: center;
    justifyContent: center;
    zIndex: 8;
    backgroundColor: ${props => props.theme.pinkColor};
`;

export default function ExportedDrawer({ navigation }) {

    const { searchLoading } = useContext(ContextCreator)

    return (
        <Wrapper pointerEvents='box-none'>
            <Drawer
                initialDrawerSize={0.70}
                refFunc={(c) => {
                }}

                drawerBg="transparent"
                renderContainerView={() => <DrawerContainer pointerEvents="box-none" />}
                renderDrawerView={() => (
                    <Content>
                        <ContextCreator.Consumer>
                            {context => {
                                if (context.searchLoading === true) {
                                    return <View style={{ width: constants.width, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator /></View>
                                } else if (context.currentSuggestions.length > 0) {
                                    return (<Attractions />)
                                } else {
                                    return (<View style={{ width: constants.width, alignItems: 'center', justifyContent: 'center' }}><Text>Start by searching something...</Text></View>)
                                }
                            }}
                        </ContextCreator.Consumer>
                    </Content>)}
                renderInitDrawerView={() => (<View>

                    <TripButton pointerEvents='auto' onPress={() => {
                        navigation.navigate("ItineraryList")
                    }}>
                        <MaterialCommunityIcons name='book-multiple-variant' size={32} color={'#fff'} />
                    </TripButton>
                    <Header>
                        <Title>Attractions nearby</Title>
                    </Header>
                </View>)}
            />
        </Wrapper>
    )
}