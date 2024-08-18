import { VStack, Text, Image } from '@chakra-ui/react';

const Logo = () => {
  return (
    <VStack gap={3}>
      <Image src="/Logo.svg" width={200} margin="0 auto" />
      <Text color="brand.900">메모장과 친구가 되어보세요!</Text>
    </VStack>
  );
};

export default Logo;
