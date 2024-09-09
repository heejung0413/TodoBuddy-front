import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import * as S from '@/styles/home/index.styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/utils/Logo';
import { UserServices } from '@/api/Services/User';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useAuth } from '@/hooks/useAuth';
import { PostLoginRequest } from '@/api/@types/User';
import { generateValidators } from '@/components/utils/formik';
import { Field, Form, Formik } from 'formik';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

type FormValues = PostLoginRequest;

const { validators, getFormikStates } = generateValidators<FormValues>({
  email: { required: true, range: { max: 30 }, regex: 'email' },
  password: { required: true, range: { min: 4, max: 20 }, regex: 'korEngNumSpace' },
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState<Boolean>(false);
  const navigate = useNavigate();
  const toast = useCustomToast();
  const { setIsLoggedIn } = useAuth();

  const LoginHandleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await UserServices.login(values);
      navigate('/');
      toast.success('로그인에 성공했습니다.');
      setIsLoggedIn(true);
    } catch (e) {
      toast.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      LoginHandleSubmit(e);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={LoginHandleSubmit}
    >
      {props => {
        const { showErrorDict, canSubmit, errors } = getFormikStates(props);

        return (
          <Form>
            <S.Container>
              <Logo />
              <Grid justifyContent="center">
                <VStack mt={10}>
                  <Flex margin="0 auto">
                    <Field name="email" validate={validators.email}>
                      {({ field }) => (
                        <FormControl isRequired isInvalid={showErrorDict.email} minW={400}>
                          <Input {...field} placeholder="이메일을 입력하세요." />
                          <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex>
                    <Field name="password" validate={validators.password}>
                      {({ field }) => (
                        <FormControl isRequired isInvalid={showErrorDict.password}>
                          <InputGroup size="md" width={300} minW={400}>
                            <Input {...field} placeholder="비밀번호를 입력하세요." type={show ? 'text' : 'password'} />
                            <InputRightElement width="4.5rem">
                              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {/* <Text minW="60px" margin="auto 10px">
                      비밀번호
                    </Text>
                    <InputGroup size="md" width={300}>
                      <Input
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                          {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </Button>
                      </InputRightElement>
                    </InputGroup> */}
                  </Flex>
                </VStack>
                <Button margin="10px 0" type="submit" colorScheme="brand" isLoading={isLoading} isDisabled={!canSubmit}>
                  로그인
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
            </S.Container>
          </Form>
        );
      }}
    </Formik>
  );
};
export default LoginPage;
