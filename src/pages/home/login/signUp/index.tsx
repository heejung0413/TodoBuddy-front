import Logo from '@/components/utils/Logo';
import { Text, Input, VStack, HStack, Button, Grid, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignUpPage = () => {
  const [show, setShow] = useState<Boolean>(false);
  const navigate = useNavigate();

  return (
    <Container>
      <Logo />
      <VStack my="30px" justifyContent="center" gap={5}>
        <HStack w={500} justifyContent="center">
          <Text my="auto" w={100} textAlign="center">
            이메일
          </Text>
          <Input width={300} />
        </HStack>
        <HStack w={500} justifyContent="center">
          <Text my="auto" w={100} textAlign="center">
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
        </HStack>
        <HStack w={500} justifyContent="center">
          <Text my="auto" w={100} textAlign="center">
            비밀번호 확인
          </Text>
          <InputGroup size="md" width={300}>
            <Input pr="4.5rem" type={show ? 'text' : 'password'} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </HStack>
        <HStack w={500} justifyContent="center">
          <Text my="auto" w={100} textAlign="center">
            닉네임
          </Text>
          <Input width={300} />
        </HStack>
        <Grid>
          <Button minW={500} colorScheme="brand">
            회원 가입하기
          </Button>
        </Grid>
      </VStack>
    </Container>
  );
};

export default SignUpPage;

export const Container = styled.div`
  margin: 100px;
`;
