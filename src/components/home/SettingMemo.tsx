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
import { FC, useState } from 'react';
import { MemoData } from '@/api/@types/Memo';
import { CategoryData } from '@/api/@types/Category';
import { MemoServices } from '@/api/Services/Memo';
import { useCustomToast } from '@/hooks/useCustomToast';

interface Props {
  memo: MemoData;
  category: CategoryData[];
}

const SettingMemo: FC<Props> = ({ memo, category }) => {
  const today = new Date();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deadLine, setDeadLine] = useState<string>(today.toDateString());
  const [link, setLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [selectedCategoryOrderId, setSelectedCategoryOrderId] = useState<number>(memo.categoryOrderId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(memo.categoryId);
  const toast = useCustomToast();

  const selectedCategory = (categoryId, categoryOrderId) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryOrderId(categoryOrderId);
  };

  const handlePatchSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await MemoServices.patchMemo({
        memoId: memo.memoId,
        memoDeadLine: new Date(deadLine).toISOString(),
        memoContent: content === '' ? memo.memoContent : content,
        memoLink: link === '' ? memo.memoLink : link,
        categoryId: selectedCategoryId,
      });
      console.log(data);
      toast.info('메모가 수정되었습니다.');
      onClose();
    } catch (e) {
      toast.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubmit = async () => {
    setIsLoading(true);
    try {
      await MemoServices.delete({ memoId: memo.memoId });
      toast.info('해당 메모가 삭제되었습니다.');
      onClose();
    } catch (e) {
      toast.error(e);
    } finally {
      setIsLoading(false);
    }
  };

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
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  defaultValue={memo.memoDeadline ?? deadLine}
                  onChange={() => {
                    setDeadLine(new Date(deadLine).toISOString()), console.log(deadLine);
                  }}
                />
              </Flex>
              <Flex>
                <SettingMemoTitle>내용 수정하기</SettingMemoTitle>
                <Input
                  placeholder={memo.memoContent}
                  defaultValue={memo.memoContent}
                  onChange={e => setContent(e.target.value)}
                />
              </Flex>
              <Flex>
                <SettingMemoTitle>링크 추가하기</SettingMemoTitle>
                <Input
                  placeholder={memo.memoLink ?? '링크 정보 없음'}
                  defaultValue={memo.memoLink}
                  onChange={e => {
                    setLink(e.target.value);
                  }}
                />
              </Flex>
              <Flex>
                <SettingMemoTitle>카테고리 분류</SettingMemoTitle>
                <Flex>
                  <Flex>
                    {category.map(value => (
                      <SettingMemoCategory
                        background-color={
                          selectedCategoryOrderId === value.categoryOrderId
                            ? colors.category[selectedCategoryOrderId]
                            : '#FFFFFF'
                        }
                        // hover-background-color={colors.HoverCategory[selectedCategoryOrderId]}
                        value={value.categoryId}
                        onClick={() => selectedCategory(value.categoryId, value.categoryOrderId)}
                      >
                        {value.categoryName}
                      </SettingMemoCategory>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter gap={3} flexDirection="column">
            <Flex gap={5}>
              <Button variant="outline" colorScheme="red" flexGrow={1} onClick={() => setDeleteOpen(true)}>
                삭제
              </Button>
              <Button colorScheme="blue" mr={3} onClick={handlePatchSubmit} isLoading={isLoading}>
                저장
              </Button>
            </Flex>
            {deleteOpen ? (
              <Flex gap={3}>
                <DeleteMemoBox>정말 해당 메모를 삭제하시겠습니까?</DeleteMemoBox>
                <Button colorScheme="red" onClick={handleDeleteSubmit}>
                  네
                </Button>
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
  background-color: ${colors.category[0]};
  padding: 5px 10px;
  border-radius: 10px;
`;
