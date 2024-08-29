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
  Text,
  IconProps,
  HStack,
} from '@chakra-ui/react';
import header from '@/../public/index/TodolistHeader.svg';
import styled from 'styled-components';
import SettingCategory from './SettingCategory';
import SettingMemo from './SettingMemo';
import { useEffect, useState } from 'react';
import { CategoryServices } from '@/api/Services/Category';
import { CategoryData } from '@/api/@types/Category';
import { MemoServices } from '@/api/Services/Memo';
import { MemoData } from '@/api/@types/Memo';

const MemoList = () => {
  const [category, setCategory] = useState<CategoryData[]>([]);
  const [memo, setMemo] = useState<MemoData[]>([]);
  const fetchCategory = async () => {
    try {
      const data = await CategoryServices.get();
      setCategory(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMemo = async () => {
    try {
      const result = await MemoServices.get({ memoStatus: 'NOT_COMPLETED' });
      setMemo(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  console.log(memo);

  useEffect(() => {
    fetchCategory();
    fetchMemo();
  }, []);

  const MemoContents = ({ id }) => {
    return (
      <>
        {category
          .filter(item => item.categoryOrderId === id)
          .map(v => (
            <Badge padding="10px 20px" backgroundColor={`category.${id}`} borderRadius={10}>
              {v.categoryName}
            </Badge>
          ))}
        {memo
          .filter(item => item.categoryOrderId === id)
          .map((memoItem, index) => {
            return (
              <Flex key={index} margin="5px 0" flexDirection="column" gap={5} w="100%">
                <Flex>
                  <Checkbox size="lg" colorScheme="gray" flexGrow={1}>
                    <HStack>
                      <Text my="auto">{memoItem.memoContent}</Text>
                    </HStack>
                    <Text color="gray" fontSize="0.8em">
                      {memoItem.memoDeadline}
                    </Text>
                  </Checkbox>
                  <SettingMemo memo={memoItem} category={category} />
                </Flex>
              </Flex>
            );
          })}
      </>
    );
  };
  return (
    <>
      <Flex flexDirection="row-reverse">
        <SettingCategory />
      </Flex>
      <Card backgroundColor="brand.50" minW="100%" minH="80%">
        <CardHeader textAlign="center">
          <Image src={header} margin="0 auto" />
          <Heading size="md">TODO LIST</Heading>
        </CardHeader>

        <CardBody>
          <Flex flexDirection="column">
            <Box>
              {category.map(value => (
                <MemoContents id={value.categoryOrderId} />
              ))}
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default MemoList;

export const IconStyle = styled.button<IconProps>`
  border-radius: 20px;
  margin-top: 0;
  background-color: ${props => props['background-color']};
  width: auto;
  position: relative;
  border-radius: ${props => props['border-radius']};
  display: inline-block;
  padding: 5px;
  margin: auto 5px;
  min-width: max-content;
`;
