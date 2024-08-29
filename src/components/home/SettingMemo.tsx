import { LuFileText } from 'react-icons/lu';
import { IconStyle } from './MemoList';
import { colors } from '@/styles/theme/styled-components/palette';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { FC, useState } from 'react';
import { MemoData } from '@/api/@types/Memo';
import { CategoryData } from '@/api/@types/Category';
import { MemoServices } from '@/api/Services/Memo';

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
  const options = category.map(value => value.categoryName);
  const number = category.map(value => value.categoryOrderId);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  });

  const group = getRootProps();

  // const handleSubmit = async () => {
  //   try{
  //     await MemoServices.patchMemo({memoId: memo.memoId, memoDeadLine: })
  //   }
  // }

  function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();

    return (
      <Box as="label">
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _checked={{
            bg: `HoverCategory.1`,
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    );
  }

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
                    setDeadLine(deadLine), console.log(deadLine);
                  }}
                />
              </Flex>
              <Flex>
                <SettingMemoTitle>내용 수정하기</SettingMemoTitle>
                <Input placeholder={memo.memoContent} defaultValue={memo.memoContent} />
              </Flex>
              <Flex>
                <SettingMemoTitle>링크 추가하기</SettingMemoTitle>
                <Input
                  placeholder={memo.memoLink ?? '링크 정보 없음'}
                  defaultValue={memo.memoLink}
                  value={link}
                  onChange={() => setLink(link)}
                />
              </Flex>
              <Flex>
                <SettingMemoTitle>카테고리 분류</SettingMemoTitle>
                <Flex>
                  {/* {category.map(item => (
                    <RadioGroup defaultValue="2">
                      <Stack spacing={5} direction="row">
                        <Radio colorScheme="red" value="1">
                          <SettingMemoCategory
                            background-color={colors.category[item.categoryOrderId]}
                            hover-background-color={colors.HoverCategory[item.categoryOrderId]}
                            value="토익"
                          >
                            {item.categoryName}
                          </SettingMemoCategory>
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  ))} */}
                  <HStack {...group}>
                    {options.map(value => {
                      const radio = getRadioProps({ value });
                      return (
                        <RadioCard key={value} {...radio}>
                          {value}
                        </RadioCard>
                      );
                    })}
                  </HStack>
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
