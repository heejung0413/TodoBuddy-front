import { Box, Button, Card, CardBody, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { IconStyle } from '../Memo/MemoList';
import { colors } from '@/styles/theme/styled-components/palette';
import { FC, useState } from 'react';
import { CategoryData } from '@/api/@types/Category';
import { CategoryServices } from '@/api/Services/Category';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useRenderStore } from '@/stores/render';

interface Props {
  categoryOrderId: number;
  category: CategoryData[];
  onClose: () => void;
}

const SettingCategoryContents: FC<Props> = ({ categoryOrderId, category, onClose }) => {
  //카테고리 이름 찾기
  const value = (number: number) => {
    const data = category.find(item => item.categoryOrderId === number);
    const dataName = data ? data.categoryName : '';
    return dataName;
  };
  //카테고리 아이디 찾기
  const categoryId = (orderId: number) => {
    const data = category.find(item => item.categoryOrderId === orderId);
    const dataId = data ? data.categoryId : 1;
    return dataId;
  };

  const [input, setInput] = useState<string>(value(categoryOrderId));
  const [createInput, setCreateInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const { render, setRender } = useRenderStore();
  const toast = useCustomToast();

  const handlePatchSubmit = async () => {
    setIsLoading(true);
    try {
      await CategoryServices.patch({ categoryId: categoryId(categoryOrderId), categoryName: input });
      toast.success('해당 카테고리 이름이 수정되었습니다.');
      setRender(!render);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubmit = async () => {
    setIsLoading(true);
    try {
      await CategoryServices.delete({ categoryId: categoryId(categoryOrderId) });
      toast.info('해당 카테고리가 삭제되었습니다.');
      setIsDeleted(false);
      setRender(!render);

      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSubmit = async () => {
    setIsLoading(true);

    try {
      if (createInput !== '') {
        await CategoryServices.post({ categoryOrderId: categoryOrderId, categoryName: createInput });
        toast.success('카테고리를 생성하였습니다.');
        setRender(!render);

        onClose();
      } else {
        toast.info('내용을 입력하세요.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!category) return;
  return (
    <Flex>
      {category.some(value => value.categoryOrderId === categoryOrderId) ? (
        <Box>
          <Flex>
            <IconStyle
              background-color={colors.category[categoryOrderId]}
              borderRadius={10}
              style={{ width: 'max-content' }}
            />

            <Input
              flexShrink={1}
              minW={70}
              defaultValue={value(categoryOrderId)}
              value={input}
              onChange={e => setInput(e.target.value)}
            />

            <Button colorScheme="red" variant="solid" mx={3} minW="fit-content" onClick={() => setIsDeleted(true)}>
              지우기
            </Button>
            <Button colorScheme="brand" onClick={handlePatchSubmit} isLoading={isLoading}>
              저장
            </Button>
          </Flex>
          {isDeleted && (
            <Flex>
              <Card>
                <CardBody display="flex" gap={3} mt={5}>
                  <Text flexShrink={1}>
                    해당 카테고리를 정말 삭제하시겠습니까? <br />
                    <Text fontSize="0.8em">(해당 카테고리에 저장된 모든 메모도 같이 삭제됩니다.)</Text>
                  </Text>
                  <Button colorScheme="red" variant="solid" onClick={handleDeleteSubmit}>
                    네
                  </Button>
                  <Button colorScheme="red" variant="outline" onClick={() => setIsDeleted(false)}>
                    아니오
                  </Button>
                </CardBody>
              </Card>
            </Flex>
          )}
        </Box>
      ) : (
        <VStack>
          <Flex>
            <IconStyle
              background-color={colors.category[categoryOrderId]}
              borderRadius={10}
              style={{ width: 'max-content' }}
            />
            <Text my="auto" backgroundColor="gray.100" px={5} py={2}>
              해당 카테고리 없음
            </Text>
            <Button
              colorScheme="brand"
              variant="outline"
              mx={3}
              minW="fit-content"
              onClick={() => setIsCreated(prev => !prev)}
            >
              새로 만들기
            </Button>
          </Flex>
          {isCreated && (
            <Card>
              <CardBody display="flex" gap={3}>
                <Input
                  placeholder="카테고리 이름을 입력하세요."
                  value={createInput}
                  onChange={e => setCreateInput(e.target.value)}
                />
                <Button colorScheme="brand" onClick={handleCreateSubmit}>
                  확인
                </Button>
              </CardBody>
            </Card>
          )}
        </VStack>
      )}
    </Flex>
  );
};

export default SettingCategoryContents;
