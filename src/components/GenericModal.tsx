import * as React from 'react';
import styled from 'styled-components/native';
import Modal, {ReactNativeModal} from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ModalPropsOptional} from 'types/common';
import {Text, TouchableOpacity} from 'react-native';

export interface Props extends ModalPropsOptional {
  withCloseBtn?: boolean;
  toggleModal: () => void;
}

const GenericModal: React.FC<Props> = ({
  children,
  isVisible,
  toggleModal,
  withCloseBtn = false,
  ...props
}) => (
  <RNModal
    isVisible={isVisible}
    useNativeDriverForBackdrop
    hideModalContentWhileAnimating
    onBackButtonPress={toggleModal}
    {...props}>
    <SafeAreaView>
      <ModalContent>{children}</ModalContent>
      {withCloseBtn && (
        <TouchableOpacity>
          <Text>X</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  </RNModal>
);

export const RNModal = styled(Modal as never)`
  margin-top: 40px;
` as unknown as typeof ReactNativeModal;

const ModalContent = styled.View`
  padding: 10px;
  border-radius: 4px;
  background-color: white;
`;

export default GenericModal;
