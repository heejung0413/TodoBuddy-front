import * as S from '@/styles/home/CreateMemo.styles';
import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Input, IconButton } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import { IconStyle } from './MemoList';
import { colors } from '@/styles/theme/styled-components/palette';
import { MemoServices } from '@/api/Services/Memo';

interface Props {
  setOpen: Dispatch<SetStateAction<Boolean>>;
}

const CreateMemo: FC<Props> = ({ setOpen }) => {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [value, setValue] = useState<string>('');

  const handleSubmit = async () => {
    try {
      if (categoryId) {
        const result = await MemoServices.post({ memoContent: value, categoryId: categoryId });
        console.log(result);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <S.Container>
      <S.CategoryInputBox>
        <Menu>
          <MenuButton
            as={Button}
            borderColor="blue"
            borderWidth="1px"
            backgroundColor="white"
            _hover={{ bg: 'white ' }}
            marginRight={3}
            minW="max-content"
          >
            <Flex px="auto">
              {categoryId ?? '카테고리'} <FaAngleDown style={{ margin: 'auto 3px' }} />
            </Flex>
          </MenuButton>
          <MenuList margin="0 auto">
            <MenuItem onClick={() => setCategoryId(1)}>
              <IconStyle background-color={colors.category[1]} />
              운동
            </MenuItem>
            <MenuItem onClick={() => setCategoryId(2)}>
              <IconStyle background-color={colors.category[2]} />
              공부
            </MenuItem>
            <MenuItem onClick={() => setCategoryId(3)}>
              <IconStyle background-color={colors.category[3]} />
              토익
            </MenuItem>
          </MenuList>
        </Menu>
        <Input bg="white" value={value} onChange={e => setValue(e.target.value)}></Input>
      </S.CategoryInputBox>
      <Flex gap={3}>
        <Button colorScheme="brand" minW="fit-content" flexGrow={{ base: '1', md: '0' }} onClick={handleSubmit}>
          메모하기
        </Button>
        <IconButton
          colorScheme="blue"
          aria-label="Search database"
          icon={<TfiWrite />}
          onClick={() => setOpen(prev => !prev)}
        />
      </Flex>
    </S.Container>
  );
};

export default CreateMemo;
