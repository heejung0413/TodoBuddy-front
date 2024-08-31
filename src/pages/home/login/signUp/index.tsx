import { UserServices } from '@/api/Services/User';
import Logo from '@/components/utils/Logo';
import { Text, Input, VStack, HStack, Button, Grid, InputGroup, InputRightElement } from '@chakra-ui/react';

import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignUpPage = () => {
  const [show, setShow] = useState<Boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const result = await UserServices.postSignup({ email: email, password: password, nickName: nickname });
      console.log(result);
      navigate('/home');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Logo />
      <VStack my="30px" justifyContent="center" gap={5}>
        <HStack w={500} justifyContent="center">
          <Text my="auto" w={100} textAlign="center">
            이메일
          </Text>
          <Input width={300} value={email} onChange={e => setEmail(e.target.value)} />
        </HStack>

        <HStack w={500} justifyContent="center">
          <Text my="auto" w={100} textAlign="center">
            비밀번호 확인
          </Text>
          <InputGroup size="md" width={300}>
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
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
          <Input width={300} value={nickname} onChange={e => setNickname(e.target.value)} />
        </HStack>
        <Grid>
          <Button minW={500} colorScheme="brand" onClick={handleSubmit}>
            회원 가입하기
          </Button>
        </Grid>
      </VStack>
    </Container>
  );
};
export default SignUpPage;

export const Container = styled.div`
  margin: 100px auto;
`;
