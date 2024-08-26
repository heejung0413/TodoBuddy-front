import * as S from '@/styles/home/CreateMemo.styles';
import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Input, IconButton } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import { IconStyle } from './MemoList';
import { colors } from '@/styles/theme/styled-components/palette';
import { MemoServices } from '@/api/Services/Memo';
import { CategoryServices } from '@/api/Services/Category';
import { CategoryData } from '@/api/@types/Category';
import { useCustomToast } from '@/hooks/useCustomToast';

interface Props {
  setOpen: Dispatch<SetStateAction<Boolean>>;
}

const CreateMemo: FC<Props> = ({ setOpen }) => {
  const [category, setCategory] = useState<CategoryData[]>([]);
  const [value, setValue] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // 선택된 카테고리 ID 상태
  const [selectedCategoryName, setSelectedCategoryName] = useState(''); // 선택된 카테고리 이름 상태
  const toast = useCustomToast();

  const handleCategoryClick = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName); // 선택된 카테고리 이름 업데이트
  };

  const fetchCategory = async () => {
    try {
      const data = await CategoryServices.get();
      setCategory(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async () => {
    try {
      if (selectedCategoryId) {
        const result = await MemoServices.post({ memoContent: value, categoryId: selectedCategoryId });
        console.log(result);
      } else {
        toast.info('설정된 카테고리가 없습니다. 카테고리 설정 먼저 해주세요.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
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
              {selectedCategoryName === '' ? '카테고리' : selectedCategoryName}
              <FaAngleDown style={{ margin: 'auto 3px' }} />
            </Flex>
          </MenuButton>
          <MenuList margin="0 auto">
            {category.length > 0 ? (
              category.map(value => (
                <MenuItem
                  key={value.categoryId}
                  value={value.categoryId}
                  onClick={() => handleCategoryClick(value.categoryId, value.categoryName)}
                >
                  <IconStyle background-color={colors.category[value.categoryId]} />
                  {value.categoryName}
                </MenuItem>
              ))
            ) : (
              <MenuItem>카테고리 없음</MenuItem>
            )}
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
