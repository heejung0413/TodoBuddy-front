import * as S from '@/styles/home/CreateMemo.styles';
import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Input, IconButton } from '@chakra-ui/react';
import { FaAngleDown } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';

const CreateMemo = () => {
  return (
    <S.Container>
      <Menu>
        <MenuButton as={Button} borderColor="blue" borderWidth="1px" backgroundColor="white" _hover={{ bg: 'white ' }}>
          <Flex>
            카테고리 <FaAngleDown style={{ margin: 'auto 3px' }} />
          </Flex>
        </MenuButton>
        <MenuList margin="0 auto">
          <MenuItem>운동</MenuItem>
          <MenuItem>공부</MenuItem>
          <MenuItem>토익</MenuItem>
        </MenuList>
      </Menu>
      <Input bg="white"></Input>
      <Button colorScheme="brand">메모하기</Button>
      <IconButton colorScheme="blue" aria-label="Search database" icon={<TfiWrite />} />
    </S.Container>
  );
};

export default CreateMemo;
