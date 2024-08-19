import { LuFileText } from 'react-icons/lu';
import { IconStyle } from './MemoList';
import { colors } from '@/styles/theme/styled-components/palette';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { useState } from 'react';

const SettingMemo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState<String>('');
  const [deleteOpen, setDeleteOpen] = useState<Boolean>(false);
  console.log(category);

  return (
    <>
      <IconStyle style={{ display: 'flex' }} background-color={colors.brand[300]} onClick={onOpen}>
        <LuFileText style={{ color: 'white' }} />
      </IconStyle>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>메모 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Flex>
                <SettingMemoTitle>일정</SettingMemoTitle>
                <Input placeholder="Select Date and Time" size="md" type="datetime-local" />
              </Flex>
              <Flex>
                <SettingMemoTitle>내용 수정하기</SettingMemoTitle>
                <Input placeholder="원래 메모 내용" />
              </Flex>
              <Flex>
                <SettingMemoTitle>링크 추가하기</SettingMemoTitle>
                <Input />
              </Flex>
              <Flex>
                <SettingMemoTitle>카테고리 분류</SettingMemoTitle>
                <Flex>
                  <SettingMemoCategory
                    background-color={colors.category[1]}
                    hover-background-color={colors.HoverCategory[1]}
                    value="토익"
                    onClick={() => setCategory('토익')}
                  >
                    토익
                  </SettingMemoCategory>
                  <SettingMemoCategory
                    background-color={colors.category[2]}
                    hover-background-color={colors.HoverCategory[2]}
                    value="운동"
                    onClick={() => setCategory('운동')}
                  >
                    운동
                  </SettingMemoCategory>
                  <SettingMemoCategory
                    background-color={colors.category[3]}
                    hover-background-color={colors.HoverCategory[3]}
                    value="공부"
                    onClick={() => setCategory('공부')}
                  >
                    공부
                  </SettingMemoCategory>
                </Flex>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter gap={3} flexDirection="column">
            <Flex gap={5}>
              <Button variant="outline" colorScheme="red" flexGrow={1} onClick={() => setDeleteOpen(true)}>
                삭제
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                저장
              </Button>
            </Flex>
            {deleteOpen ? (
              <Flex gap={3}>
                <DeleteMemoBox>정말 해당 메모를 삭제하시겠습니까?</DeleteMemoBox>
                <Button colorScheme="red">네</Button>
                <Button variant="outline" colorScheme="red" onClick={() => setDeleteOpen(false)}>
                  아니오
                </Button>
              </Flex>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingMemo;

export const SettingMemoTitle = styled.p`
  font-size: 1em;
  width: 40%;
  text-align: center;
  margin: auto 0;
`;

export const SettingMemoCategory = styled.button`
  padding: 10px 15px;
  border-radius: 10px;
  flex-grow: 1;
  margin: 5px 10px;
  background-color: ${props => props['background-color']};
  &:hover {
    background-color: ${props => props['hover-background-color']};
  }
  &:focus {
    background-color: ${props => props['hover-background-color']};
  }
`;

export const DeleteMemoBox = styled.div`
  background-color: ${colors.HoverCategory[1]};
  padding: 5px 10px;
  border-radius: 10px;
`;
