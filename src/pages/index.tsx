import { Button, Flex, Grid, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import * as S from '@/styles/home/index.styles';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/utils/Logo';
import { UserServices } from '@/api/Services/User';
import { useCustomToast } from '@/hooks/useCustomToast';
import { AxiosError } from 'axios';
import { useAuth } from '@/hooks/useAuth';

const IndexPage = () => {
  const [show, setShow] = useState<Boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const toast = useCustomToast();
  const { setIsLoggedIn } = useAuth();

  const LoginHandleSubmit = async () => {
    try {
      await UserServices.login({ email: email, password: password });
      navigate('/'); // 홈으로 리다이렉션
      toast.success('로그인에 성공했습니다.');
      setIsLoggedIn(true);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.status === 400) {
        toast.info('로그인 실패: 비밀번호가 틀렸습니다.');
      } else {
        toast.error('로그인 실패: 비밀번호가 틀렸습니다.');
      }
    }
  };

  const LogoutHandleSubmit = async () => {
    try {
      await UserServices.logout();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <S.Container>
      <Logo />
      <Grid justifyContent="center">
        <VStack>
          <Flex margin="0 auto">
            <Text minW="60px" margin="auto 10px">
              이메일
            </Text>
            <Input width={300} value={email} onChange={e => setEmail(e.target.value)} />
          </Flex>
          <Flex>
            <Text minW="60px" margin="auto 10px">
              비밀번호
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
          </Flex>
        </VStack>
        <Button margin="10px 0" colorScheme="brand" onClick={LoginHandleSubmit}>
          로그인
        </Button>
        <Button margin="10px 0" colorScheme="brand" onClick={LogoutHandleSubmit}>
          로그아웃
        </Button>
        <Flex justifyContent="center" gap={10}>
          <Text cursor="pointer" onClick={() => navigate('/login/find')}>
            아이디/비밀번호 찾기
          </Text>
          <Text cursor="pointer" onClick={() => navigate('/login/signUp')}>
            회원가입
          </Text>
        </Flex>
      </Grid>
      <Text my="30px" color="gray" fontSize={12} textAlign="center">
        Copyright © 2024 All rights reserved | This Site is made with by heejung/heemang/sun-ae
      </Text>
    </S.Container>
  );
};
export default IndexPage;
