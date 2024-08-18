import { colors } from '@/styles/theme/styled-components/palette';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Flex,
  Badge,
  Checkbox,
  Box,
  Divider,
  Text,
  IconProps,
} from '@chakra-ui/react';
import { MdOutlineLink } from 'react-icons/md';

import styled from 'styled-components';
import SettingCategory from './SettingCategory';
import SettingMemo from './SettingMemo';

const MemoList = () => {
  return (
    <>
      <Flex flexDirection="row-reverse">
        <SettingCategory />
      </Flex>
      <Card backgroundColor="brand.50" minW="100%" minH="80%">
        <CardHeader textAlign="center">
          <Image src="/index/TodolistHeader.svg" margin="0 auto" />
          <Heading size="md">TODO LIST</Heading>
        </CardHeader>

        <CardBody>
          <Flex flexDirection="column">
            <Box>
              <Badge padding="10px 20px" backgroundColor="category.1" borderRadius={10}>
                토익
              </Badge>
            </Box>

            <Flex margin="5px 0" flexDirection="column" gap={5}>
              <Checkbox size="lg" colorScheme="gray" defaultChecked>
                <Box>
                  <Flex justifyContent="space-around" borderBottom="2px solid black" width="100%">
                    <Text my="auto">토익영단어 외우기</Text>
                    <Flex>
                      <SettingMemo />
                    </Flex>
                  </Flex>

                  <Text color="gray" fontSize="0.8em">
                    3월 28일, 18시
                  </Text>
                </Box>
              </Checkbox>
              <Checkbox size="lg" colorScheme="gray" defaultChecked>
                <Box>
                  토익영단어 외우기
                  <IconStyle background-color={colors.brand[300]}>
                    <a href="https://www.naver.com">
                      <MdOutlineLink />
                    </a>
                  </IconStyle>
                  <Divider />
                  <Text color="gray" fontSize="0.8em">
                    3월 28일, 18시
                  </Text>
                </Box>
              </Checkbox>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default MemoList;

export const IconStyle = styled.button<IconProps>`
  border-radius: 20px;
  background-color: ${props => props['background-color']};
  width: auto;
  position: relative;
  border-radius: ${props => props['border-radius']};
  display: inline-block;
  padding: 5px;
  margin: 5px;
  min-width: max-content;
`;
