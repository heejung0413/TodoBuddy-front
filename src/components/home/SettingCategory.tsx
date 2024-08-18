import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Flex,
  Input,
  Box,
} from '@chakra-ui/react';
import { IconStyle } from './MemoList';
import { colors } from '@/styles/theme/styled-components/palette';
import { useState } from 'react';

const SettingCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteCategory, setDeleteCategory] = useState<Boolean>(false);

  return (
    <>
      <Button my={5} colorScheme="brand" onClick={onOpen}>
        카테고리 설정
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={10} paddingBottom={5}>
          <ModalHeader>
            카테고리 설정
            <Text fontSize="0.8em" color="blue" fontWeight={500}>
              카테고리는 3개까지 가능합니다 😁
            </Text>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Flex my={3}>
              <IconStyle background-color={colors.category[1]} border-radius={10} style={{ width: '45px' }} />
              {deleteCategory ? (
                <Flex
                  width="100%"
                  backgroundColor="gray.100"
                  borderRadius={10}
                  alignItems="center"
                  pl={5}
                  color="gray.900"
                >
                  해당 카테고리 없음
                </Flex>
              ) : (
                <Input flexShrink={1} />
              )}

              {deleteCategory ? (
                <Button colorScheme="red" variant="outline" mx={3} onClick={() => setDeleteCategory(false)} px={5}>
                  지우기 취소
                </Button>
              ) : (
                <Button colorScheme="red" opacity={10} mx={3} onClick={() => setDeleteCategory(true)}>
                  지우기
                </Button>
              )}
            </Flex>
            <Flex my={3}>
              <IconStyle background-color={colors.category[2]} border-radius={10} style={{ width: '45px' }} />
              <Input flexShrink={1} />
              <Button colorScheme="red" opacity={10} mx={3}>
                지우기
              </Button>
            </Flex>
            <Flex my={3}>
              <IconStyle background-color={colors.category[3]} border-radius={10} style={{ width: '45px' }} />
              <Input flexShrink={1} />
              <Button colorScheme="red" opacity={10} mx={3}>
                지우기
              </Button>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingCategory;
