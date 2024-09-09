import { UserServices } from '@/api/Services/User';
import { Button, Card, CardBody, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Secession = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await UserServices.delete();
      navigate('/login');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row-reverse">
        <Text mx={20} cursor="pointer" color="red" textDecoration="underline" onClick={() => setIsOpen(true)}>
          탈퇴하기
        </Text>
      </Flex>
      {isOpen && (
        <Card mx="auto">
          <CardBody display="flex" gap={3}>
            <Text my="auto">정말 회원 탈퇴하시겠습니까? </Text>
            <Button colorScheme="red" isLoading={isLoading} onClick={handleSubmit}>
              네
            </Button>
            <Button colorScheme="red" variant="outline" onClick={() => setIsOpen(false)}>
              아니요
            </Button>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
};

export default Secession;
