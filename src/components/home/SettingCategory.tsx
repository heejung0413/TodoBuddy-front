import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CategoryServices } from '@/api/Services/Category';
import { CategoryData } from '@/api/@types/Category';
import SettingCategoryContents from './Memo/SettingCategoryContents';
import { useRenderStore } from '@/stores/render';

const SettingCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState<CategoryData[]>([]);
  const { render } = useRenderStore();

  const fetchCategory = async () => {
    try {
      const data = await CategoryServices.get();
      setCategory(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [render]);

  return (
    <>
      <Button my={5} colorScheme="brand" onClick={onOpen}>
        카테고리 설정
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={10} paddingBottom={5} minW="fit-content">
          <ModalHeader>
            카테고리 설정
            <Text fontSize="0.8em" color="blue" fontWeight={500}>
              카테고리는 3개까지 가능합니다 😁
            </Text>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <VStack>
              {[0, 1, 2].map(value => (
                <SettingCategoryContents categoryOrderId={value} category={category} onClose={onClose} />
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingCategory;
