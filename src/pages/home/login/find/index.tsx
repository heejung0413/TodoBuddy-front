import Logo from '@/components/utils/Logo';
import { Button, Card, Heading, HStack, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { Container } from '../signUp';
import { ChangeEvent, useState } from 'react';
import { UserServices } from '@/api/Services/User';
import { useCustomToast } from '@/hooks/useCustomToast';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Timer from '@/utils/timer';

// type FormValues = { code: string };

// const { validators, getFormikStates } = generateValidators<FormValues>({
//   code: { required: true, range: { min: 4, max: 4 }, regex: 'code' },
// });

const LoginFindPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [disabledInput, setDisabledInput] = useState<boolean>(false);
  const [disabledPassword, setDisabledPassword] = useState<boolean>(false);
  const [disabledCodeButton, setDisabledCodeButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [result, setResult] = useState<string | number>();
  const [passwordSubmit, setPasswordSubmit] = useState<boolean>(false);
  const toast = useCustomToast();
  const navigate = useNavigate();
  const handlePasswordClick = () => setShow(!show);

  const handleCodeSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await UserServices.postCheckEmailCode({ inputEmail: email });
      console.log(data);
      setResult(data.data.verifyCode);
      console.log(result);
      toast.success('인증코드가 발급되었습니다.');
      setDisabledCodeButton(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async () => {
    setIsLoading(true);
    try {
      await UserServices.postCheckEmail({ inputEmail: email });
      toast.success('이메일 인증이 완료되었습니다.');
      setDisabledInput(true);
    } catch (e: any) {
      toast.error(e);
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const CheckCodeClick = () => {
    if (result?.toString() === code.toString()) {
      toast.success('인증에 성공하였습니다.');
      setOpenPassword(true);
    } else {
      toast.error('인증에 실패하였습니다.');
      console.log(code);
      console.log(result);
    }
  };

  const handleChangePasswordSubmit = async () => {
    setIsLoading(true);
    try {
      await UserServices.patchPassword({
        email: email,
        verificationCode: code,
        password: password,
        confirmPassword: rePassword,
      });
      toast.success('비밀번호가 수정되었습니다.');
      navigate('/');
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailKeyDown = e => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
      setOpen(true);
    }
  };

  const handleCodeKeyDown = e => {
    if (e.key === 'Enter') {
      handleCodeSubmit();
      setOpenPassword(true);
    }
  };

  const CheckPasswordClick = () => {
    if (password.trim().toString() === rePassword.trim().toString()) {
      toast.success('비밀번호 확인이 완료되었습니다.');
      setPasswordSubmit(true);
      setDisabledPassword(true);
    } else {
      toast.info('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <Container>
      <Logo />

      <Stack mx="auto" justifyContent="center" textAlign="center" my={50}>
        <Card maxW="max-content" py={10} px={5} mx="auto">
          <Heading size="md" color="gray" mb={3}>
            이메일 찾기
          </Heading>
          <HStack mx="auto" justifyContent="center">
            <Input
              w="300px"
              placeholder="이메일 주소를 적어주세요!"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={disabledInput}
              onKeyDown={handleEmailKeyDown}
            />
            {disabledInput ? null : (
              <Button
                colorScheme="brand"
                onClick={() => {
                  setOpen(true), handleEmailSubmit();
                }}
                isLoading={isLoading}
                disabled={disabledInput}
              >
                전송
              </Button>
            )}
          </HStack>
        </Card>
        <Card py={5} maxW="max-content" mx="auto" justifyContent="center" px={5}>
          <Heading size="md" color="gray" mb={3}>
            비밀번호를 재설정하기
          </Heading>

          {open ? null : <Text>이메일 확인 후 재설정 가능합니다 :)</Text>}

          {open ? (
            <Card py={10} px={2} maxW="max-content" mx={5}>
              <Text fontSize="xs">
                인증코드 유효기간은 10분입니다. <br />
                10분이 지난 후에는 자동으로 이 페이지에서 나가집니다.
              </Text>
              <Button
                colorScheme="brand"
                my={5}
                onClick={handleCodeSubmit}
                isLoading={disabledCodeButton}
                spinner={<Timer />}
              >
                이메일로 인증코드 받기!
              </Button>
              <HStack mx="auto">
                <Input
                  w="300px"
                  placeholder="인증코드를 적어주세요!"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  onKeyDown={handleCodeKeyDown}
                  type="number"
                />
                <Button colorScheme="brand" onClick={CheckCodeClick}>
                  확인
                </Button>
              </HStack>
            </Card>
          ) : null}
        </Card>

        {openPassword ? (
          <Card my={100} padding={5} minW="fit-content">
            <Heading size="md">비밀번호 재설정</Heading>
            <HStack mx="auto" my={5}>
              <InputGroup size="md">
                <Input
                  w="300px"
                  placeholder="재설정할 비밀번호를 적어주세요"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={show ? 'text' : 'password'}
                  disabled={disabledPassword}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
                    {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </HStack>
            <HStack mx="auto">
              <InputGroup size="md">
                <Input
                  w="300px"
                  placeholder="비밀번호 확인"
                  value={rePassword}
                  onChange={e => setRePassword(e.target.value)}
                  type={show ? 'text' : 'password'}
                  disabled={disabledPassword}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
                    {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {disabledPassword ? null : (
                <Button
                  colorScheme="brand"
                  onClick={CheckPasswordClick}
                  disabled={password.trim() === '' || rePassword.trim() === ''}
                >
                  확인
                </Button>
              )}
            </HStack>
            {passwordSubmit ? (
              <Button
                minW="100%"
                colorScheme="brand"
                my={10}
                isLoading={isLoading}
                onClick={handleChangePasswordSubmit}
              >
                비밀번호 재설정하기
              </Button>
            ) : null}
          </Card>
        ) : null}
      </Stack>
    </Container>
  );
};

export default LoginFindPage;
