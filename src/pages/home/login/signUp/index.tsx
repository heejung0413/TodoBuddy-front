import { PostSignUpRequest } from '@/api/@types/User';
import { UserServices } from '@/api/Services/User';
import { generateValidators } from '@/components/utils/formik';
import Logo from '@/components/utils/Logo';
import {
  Text,
  Input,
  VStack,
  HStack,
  Button,
  Grid,
  InputGroup,
  InputRightElement,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type FormValues = PostSignUpRequest;

const { validators, getFormikStates } = generateValidators<FormValues>({
  email: { required: true, range: { min: 4, max: 30 }, regex: 'email' },
  password: { required: true, range: { min: 4, max: 15 }, regex: 'korEngNumSpace' },
  nickname: { required: true, range: { min: 1, max: 10 }, regex: 'korEngNumSpace' },
});

const SignUpPage = () => {
  const [show, setShow] = useState<Boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    try {
      const result = await UserServices.postSignup(values);
      console.log(result);
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
        nickname: '',
      }}
      onSubmit={handleSubmit}
    >
      {props => {
        const { showErrorDict, canSubmit, errors } = getFormikStates(props);
        return (
          <Form>
            <Container>
              <Logo />
              <VStack my="30px" justifyContent="center" gap={5}>
                <HStack w={500} justifyContent="center">
                  <Text my="auto" w={100} textAlign="center">
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
                  {/* <Input width={300} onChange={e => setEmail(e.target.value)} /> */}
                </HStack>
                <HStack w={500} justifyContent="center">
                  <Text my="auto" w={100} textAlign="center">
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
                </HStack>
                {/* <HStack w={500} justifyContent="center">
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
                </HStack> */}
                <HStack w={500} justifyContent="center">
                  <Text my="auto" w={100} textAlign="center">
                    닉네임
                  </Text>
                  <Field name="nickname" validate={validators.nickname}>
                    {({ field }) => (
                      <FormControl isRequired isInvalid={showErrorDict.nickname}>
                        <FormHelperText>글자 수는 1~ 10자 입니다.</FormHelperText>
                        <Input {...field} />
                        <FormErrorMessage>{errors.nickname}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>
                <Grid>
                  <Button minW={500} colorScheme="brand" isDisabled={!canSubmit}>
                    회원 가입하기
                  </Button>
                </Grid>
              </VStack>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpPage;

export const Container = styled.div`
  margin: 100px;
`;
