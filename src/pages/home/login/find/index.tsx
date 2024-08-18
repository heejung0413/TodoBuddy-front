import Logo from '@/components/utils/Logo';
import { Button, HStack, Input, PinInput, PinInputField, Stack } from '@chakra-ui/react';
import { Container } from '../signUp';
import { useState } from 'react';

const LoginFindPage = () => {
  const [open, setOpen] = useState<Boolean>(false);
  return (
    <Container>
      <Logo />
      <Stack mx="auto" justifyContent="center" textAlign="center" my={50}>
        <HStack mx="auto">
          <Input w="300px" placeholder="이메일 주소를 적어주세요!" />
          <Button colorScheme="brand" onClick={() => setOpen(true)}>
            전송
          </Button>
        </HStack>
        {open ? (
          <HStack mx="auto">
            <PinInput>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        ) : null}
      </Stack>
    </Container>
  );
};

export default LoginFindPage;
