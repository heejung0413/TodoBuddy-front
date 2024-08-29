import { VStack, Text, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <VStack
      gap={3}
      onClick={() => {
        navigate('/');
      }}
    >
      <Image src="/Logo.svg" width={200} margin="0 auto" />
      <Text color="brand.900">메모장과 친구가 되어보세요!</Text>
    </VStack>
  );
};

export default Logo;
