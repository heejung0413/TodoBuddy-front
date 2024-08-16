import { Button, Flex, Grid, Image, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import logo from '/public/Logo.svg';
import * as S from '@/styles/home/index.styles';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
  const [show, setShow] = useState<Boolean>(false);
  const navigate = useNavigate();
  return (
    <S.Container>
      <VStack gap={3}>
        <Image src={logo} width={200} margin="0 auto" />
        <Text color="brand.900">메모장과 친구가 되어보세요!</Text>
      </VStack>
      <Grid justifyContent="center">
        <VStack>
          <Flex margin="0 auto">
            <Text minW="60px" margin="auto 10px">
              아이디
            </Text>
            <Input width={300} />
          </Flex>
          <Flex>
            <Text minW="60px" margin="auto 10px">
              비밀번호
            </Text>
            <InputGroup size="md" width={300}>
              <Input pr="4.5rem" type={show ? 'text' : 'password'} />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </VStack>
        <Button margin="10px 0" colorScheme="brand" onClick={() => navigate('/home')}>
          로그인
        </Button>
        <Flex justifyContent="center" gap={10}>
          <Text>아이디/비밀번호 찾기</Text>
          <Text>회원가입</Text>
        </Flex>
      </Grid>
      <Text margin="30px auto" color="gray" fontSize={12}>
        Copyright © 2024 All rights reserved | This Site is made with by heejung/heemang/sun-ae
      </Text>
    </S.Container>
  );
};

export default IndexPage;
