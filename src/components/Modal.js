import React from 'react';
import { View, Button, Text } from 'react-native';
import styled from 'styled-components';
import Modal, { ModalFooter, ModalButton, ModalContent, ModalTitle, SlideAnimation } from 'react-native-modals';
import ContextCreator from "../context/ContextCreator";

const Wrapper = styled.View`
`;

export default function TripModal(props) {

    return (
        <ContextCreator.Consumer>
            {context => {
                return (
                    <>
                        <Modal
                            width={0.9}
                            visible={context.showModal}
                            rounded
                            modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                            actionsBordered
                            onTouchOutside={() => {
                                setModalState(false);
                            }}
                            modalTitle={
                                <ModalTitle
                                    title="Do you really want to remove it from the list?"
                                    align="left"
                                />
                            }
                            footer={
                                <ModalFooter>
                                    <ModalButton
                                        text="No"
                                        bordered
                                        onPress={() => {
                                            context.setModalState(false);
                                        }}
                                        key="button-1"
                                    />
                                    <ModalButton
                                        text="DELETE!"
                                        bordered
                                        onPress={() => {
                                            context.removeTripFromList();
                                        }}
                                        key="button-2"
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent
                                style={{ backgroundColor: '#fff' }}
                            >
                                <Text>Trip will be deleted and there will be no way back</Text>
                            </ModalContent>
                        </Modal>
                    </>
                )
            }}
        </ContextCreator.Consumer>

    )
}