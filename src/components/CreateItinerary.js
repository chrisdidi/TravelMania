import React, { useState, useContext, createContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components';
import constants from '../constants'
import { ContextCreator } from '../context/ContextCreator'
import PrimaryButton from './PrimaryButton'

const Wrapper = styled.TouchableOpacity`
    width: ${props => props.wrapperWidth};
    alignItems: center;
    justifyContent: center;
    padding: 12px;
`;

const ButtonText = styled.Text`
    color: ${props => props.theme.pinkColor};
    fontSize: 18px;
`;

const FormModal = styled.View`
    position: absolute;
    width: ${constants.width * 0.8};
    height: 360px;
    backgroundColor: ${props => props.theme.darkBlueColor};
    borderRadius: 12px;
    top: ${(constants.height * 0.5) - 110 - 180};
    left: ${(constants.width * 0.5) - (constants.width * 0.4)};
    elevation: 5;
    box-shadow: 0px 4px 15px rgba(0,0,0, 0.4);
    justifyContent: space-between;
    display: ${props => props.displayModal.display};
    opacity: ${props => props.displayModal.opacity};
    zIndex: 6;
    padding: 20px;
`;

const ModalTitle = styled.Text`
    color: #fff;
    fontWeight: bold;
    fontSize: 18px;
    marginBottom: 8px;
`;

const Question = styled.Text`
    marginBottom: 4px;
    color: #fff;
    fontSize: 16px;
`;

const InputWrapper = styled.View`
    width: auto;
    padding: 8px;
    paddingLeft: 12px;
    marginBottom: 8px;
    backgroundColor: ${props => props.theme.lightGreyColor};
    borderRadius: 8px;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top: 12;
    right: 12;
    height: 32;
    width: 32
    alignItems:center;
    justifyContent: center;
`;

export default ({ width = constants.width }) => {

    const [showModal, setShowModal] = useState(false)
    const [itineraryName, setItineraryName] = useState("")
    const [description, setDescription] = useState("")

    const { createNewItinerary } = useContext(ContextCreator)
    return (
        <>
            <Wrapper wrapperWidth={width} onPress={() => {
                setShowModal(!showModal)
            }}>
                <ButtonText>{showModal ? "Cancel" : "Create new itinerary"}</ButtonText>
            </Wrapper>
            <FormModal pointerEvents={showModal ? 'auto' : 'none'} displayModal={showModal ? { display: 'flex', opacity: 1, pointerEvents: 'auto' } : { display: 'none', opacity: 0, pointerEvents: 'none' }}>
                <CloseButton onPress={() => {
                    setShowModal(false)
                }}>
                    <Ionicons name="ios-close" size={40} color="#F1F3F6" />
                </CloseButton>
                <View>
                    <ModalTitle>New itinerary</ModalTitle>
                    <Question>Give your trip a name.</Question>
                    <InputWrapper><TextInput value={itineraryName} onChangeText={e => {
                        setItineraryName(e)
                    }} placeholder="e.g. Day 1 in London" /></InputWrapper>
                    <Question>What is it about?</Question>
                    <InputWrapper><TextInput value={description} onChangeText={e => {
                        setDescription(e)
                    }} placeHolder="(Optional)" /></InputWrapper>
                </View>

                <PrimaryButton buttonWidth='auto' text="CREATE ITINERARY" onPress={() => {
                    createNewItinerary(itineraryName, description)
                    setShowModal(false)
                }} />

            </FormModal>
        </>
    )
}