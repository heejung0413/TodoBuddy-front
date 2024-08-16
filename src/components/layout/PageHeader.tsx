import * as S from '@/styles/layout/layout.styles';
import { Flex, Image } from '@chakra-ui/react';

const PageHeader = () => {
  return (
    <S.Container>
      <Flex>
        <Image src="/Pavicon.svg" width={30} />
        <Image src="/Logo.svg" width={200} margin="10px 20px" />
      </Flex>
      <S.LoginText>log out</S.LoginText>
    </S.Container>
  );
};

export default PageHeader;
