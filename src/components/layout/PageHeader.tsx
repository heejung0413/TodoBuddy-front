import { useAuth } from '@/hooks/useAuth';
import * as S from '@/styles/layout/layout.styles';
import { Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PageHeader = () => {
  const { isLoggedIn, handleLoginOrLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <S.Container>
      <Flex onClick={() => navigate('/')} cursor="pointer">
        <Image src="/Pavicon.svg" width={30} />
        <Image src="/Logo.svg" width={200} margin="10px 20px" />
      </Flex>
      <S.LoginText onClick={handleLoginOrLogout}>{isLoggedIn ? 'Logout' : 'Login'}</S.LoginText>
    </S.Container>
  );
};

export default PageHeader;
