import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import * as S from '@/styles/home/index.styles';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/utils/Logo';
import { UserServices } from '@/api/Services/User';
import { Field, Form, Formik } from 'formik';
import { PostLoginRequest } from '@/api/@types/User';
import { generateValidators } from '@/components/utils/formik';

type FormValues = PostLoginRequest;

const { validators, getFormikStates } = generateValidators<FormValues>({
  email: { required: true, range: { min: 4, max: 30 }, regex: 'email' },
  password: { required: true, range: { min: 4, max: 15 }, regex: 'korEngNumSpace' },
});

const IndexPage = () => {
  const [show, setShow] = useState<Boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (value: FormValues) => {
    try {
      await UserServices.postLogin(value);
      navigate('/home');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Formik<FormValues>
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
    >
      {props => {
        const { showErrorDict, canSubmit, errors } = getFormikStates(props);

        return (
          <Form>
            <S.Container>
              <Logo />
              <Grid justifyContent="center">
                <VStack>
                  <Flex margin="0 auto">
                    <Text minW="60px" margin="auto 10px">
                      이메일
                    </Text>
                    <Field name="email" validate={validators.email}>
                      {({ field }) => (
                        <FormControl isRequired isInvalid={showErrorDict.email}>
                          <FormHelperText>글자 수는 4~30자 입니다.</FormHelperText>
                          <Input {...field} />
                          <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Flex>
                    <Text minW="60px" margin="auto 10px">
                      비밀번호
                    </Text>
                    <Field name="password" validate={validators.password}>
                      {({ field }) => (
                        <FormControl isRequired isInvalid={showErrorDict.password}>
                          <FormHelperText>글자 수는 4 ~15자 입니다.</FormHelperText>
                          <InputGroup size="md" width={300}>
                            <Input {...field} type={show ? 'text' : 'password'} width="100%" />
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
                  </Flex>
                </VStack>
                <Button margin="10px 0" colorScheme="brand" isDisabled={!canSubmit}>
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
              <Text my="30px" color="gray" fontSize={12} textAlign="center">
                Copyright © 2024 All rights reserved | This Site is made with by heejung/heemang/sun-ae
              </Text>
            </S.Container>
          </Form>
        );
      }}
    </Formik>
  );
};
export default IndexPage;
