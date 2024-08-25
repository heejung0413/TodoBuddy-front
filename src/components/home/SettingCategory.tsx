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
} from '@chakra-ui/react';
import { IconStyle } from './MemoList';
import { colors } from '@/styles/theme/styled-components/palette';
import { useEffect, useState } from 'react';
import { CategoryServices } from '@/api/Services/Category';
import { CategoryData } from '@/api/@types/Category';

const SettingCategory = () => {
  const array = [1, 2, 3];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState<CategoryData[]>([]);
  const [deleteCategoryStates, setDeleteCategoryStates] = useState(
    array.map(() => false), // 초기 상태는 모두 false로 설정
  );
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
  }, []);

  useEffect(() => {
    // 각 카테고리 ID에 대해 존재 여부를 확인하여 상태를 업데이트합니다.
    const updatedStates = array.map(value => (category.some(item => item.categoryId === value) ? true : false));
    setDeleteCategoryStates(updatedStates);
  }, [category]);

  const handleButtonClick = index => {
    const newStates = [...deleteCategoryStates];
    newStates[index] = !newStates[index]; // 해당 인덱스의 상태 토글
    setDeleteCategoryStates(newStates);
  };

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
            {array.map((value, index) => {
              const isDeleted = deleteCategoryStates[index];
              return (
                <Flex my={3}>
                  <IconStyle backgroundColor={colors.category[index]} borderRadius={10} style={{ width: '45px' }} />
                  {isDeleted ? (
                    <>
                      <Input flexShrink={1} key={index} />
                    </>
                  ) : (
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
                  )}

                  <Button colorScheme="red" mx={3} onClick={() => handleButtonClick(index)}>
                    {isDeleted ? '지우기' : '지우기 취소'}
                  </Button>
                </Flex>
                // <Flex my={3}>
                //   <IconStyle
                //     background-color={colors.category[value]}
                //     border-radius={10}
                //     style={{ width: '45px', height: '45px' }}
                //   />
                //   {/* {deleteCategory ? (
                //     <DeleteCategoryItem />
                //   ) : (
                //     <>
                //       <Input />
                //       <Button>지우기 취소</Button>
                //     </>
                //   )} */}
                //   {/* {deleteCategory ? (
                //     <DeleteCategoryItem />
                //   ) : (
                //     <Flex
                //       width="100%"
                //       backgroundColor="gray.100"
                //       borderRadius={10}
                //       alignItems="center"
                //       pl={5}
                //       color="gray.900"
                //     >
                //       해당 카테고리 없음
                //     </Flex>
                //   )}

                //   {categoryItem ? (
                //     <Button
                //       colorScheme="red"
                //       opacity={10}
                //       mx={3}
                //       onClick={() => {
                //         setDeleteCategory(prev => !prev), console.log(deleteCategory);
                //       }}
                //     >
                //       {deleteCategory ? '지우기' : '지우기 취소'}
                //     </Button>
                //   ) : (
                //     <Button
                //       colorScheme="red"
                //       variant="outline"
                //       mx={3}
                //       px={5}
                //       onClick={() => {
                //         setDeleteCategory(prev => !prev), console.log(deleteCategory);
                //       }}
                //     ></Button>
                //   )} */}
                // </Flex>
              );
            })}
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
