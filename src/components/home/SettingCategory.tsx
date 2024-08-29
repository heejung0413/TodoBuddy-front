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
  Flex,
  Input,
} from '@chakra-ui/react';
import { IconStyle } from './MemoList';
import { colors } from '@/styles/theme/styled-components/palette';
import { ChangeEvent, useEffect, useState } from 'react';
import { CategoryServices } from '@/api/Services/Category';
import { CategoryData } from '@/api/@types/Category';

const SettingCategory = () => {
  const array = [0, 1, 2];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState<CategoryData[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteCategoryStates, setDeleteCategoryStates] = useState(array.map(() => false));

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const fetchCategory = async () => {
    try {
      const data = await CategoryServices.get();
      setCategory(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (value: number) => {
    setIsLoading(true);
    try {
      console.log('dd');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubmit = async (value: number) => {
    setIsLoading(true);
    try {
      await CategoryServices.delete({ categoryId: value });
      setDeleteCategoryStates(prevState => {
        const newState = [...prevState];
        newState[value] = !newState[value];
        return newState;
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    const updatedStates = array.map(value => (category.some(item => item.categoryId === value) ? true : false));
    setDeleteCategoryStates(updatedStates);
  }, [category]);

  const TrueDeleteCategoryPublishing = ({ value }: { value: number }) => {
    return (
      <>
        <IconStyle background-color={colors.category[value]} borderRadius={10} style={{ width: 'max-content' }} />
        <Input flexShrink={1} value={input} onChange={handleChangeInput} minW={70} />
        <Button colorScheme="red" variant="solid" mx={3} onClick={() => handleDeleteSubmit(value)} minW="fit-content">
          지우기
        </Button>
        <Button isLoading={isLoading} colorScheme="brand" onClick={() => handleSubmit(value)}>
          확인
        </Button>
      </>
    );
  };

  const FalseDeleteCategoryPublishing = ({ value }: { value: number }) => {
    return (
      <>
        <IconStyle background-color={colors.category[value]} borderRadius={10} style={{ width: 'max-content' }} />
        <Flex width="100%" backgroundColor="gray.100" borderRadius={10} alignItems="center" pl={5} color="gray.900">
          해당 카테고리 없음
        </Flex>
        <Button
          colorScheme="red"
          variant="outline"
          mx={3}
          onClick={() =>
            setDeleteCategoryStates(prevState => {
              const newState = [...prevState];
              newState[value] = !newState[value];
              return newState;
            })
          }
          minW="fit-content"
        >
          지우기 취소
        </Button>
      </>
    );
  };

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
            {array.map(value => {
              return (
                <Flex my={3}>
                  {deleteCategoryStates[value] === true ? (
                    <TrueDeleteCategoryPublishing value={value} />
                  ) : (
                    <FalseDeleteCategoryPublishing value={value} />
                  )}
                </Flex>
              );
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingCategory;
