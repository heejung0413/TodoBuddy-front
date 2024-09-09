import { PostSignUpRequest } from '@/api/@types/User';
import { UserServices } from '@/api/Services/User';
import { generateValidators } from '@/components/utils/formik';
import Logo from '@/components/utils/Logo';
import { useCustomToast } from '@/hooks/useCustomToast';
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
  FormLabel,
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
  password: { required: true, range: { min: 4, max: 20 }, regex: 'korEngNumSpace' },
  nickName: { required: true, range: { max: 20 }, regex: 'nickname' },
});

const SignUpPage = () => {
  const [show, setShow] = useState<Boolean>(false);
  const navigate = useNavigate();
  const toast = useCustomToast();

  const handleSubmit = async (values: FormValues) => {
    try {
      const result = await UserServices.postSignup(values);
      console.log(result);
      navigate('/');
    } catch (e) {
      toast.error(e);
    }
  };
  return (
    <Formik<FormValues>
      initialValues={{
        email: '',
        password: '',
        nickName: '',
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
                  <Field name="email" validate={validators.email}>
                    {({ field }) => (
                      <FormControl isRequired isInvalid={showErrorDict.email}>
                        <FormLabel as="h4" size="md">
                          이메일
                        </FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>

                <HStack w={500} justifyContent="center">
                  <Field name="password" validate={validators.password}>
                    {({ field }) => (
                      <FormControl isRequired isInvalid={showErrorDict.password}>
                        <FormLabel as="h4" size="md">
                          비밀번호
                        </FormLabel>
                        <InputGroup size="md">
                          <Input {...field} type={show ? 'text' : 'password'} />
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
                <HStack w={500} justifyContent="center">
                  <Field name="nickName" validate={validators.nickName}>
                    {({ field }) => (
                      <FormControl isRequired isInvalid={showErrorDict.nickName}>
                        <FormLabel as="h4" size="md">
                          닉네임
                        </FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>{errors.nickName}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>
                <Grid>
                  <Button minW={500} colorScheme="brand" isDisabled={!canSubmit} type="submit">
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
  margin: 100px auto;
`;
