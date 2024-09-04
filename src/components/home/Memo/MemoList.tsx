import { Card, CardBody, CardHeader, Heading, Image, Flex, Box, IconProps, HStack, Button } from '@chakra-ui/react';
import header from '@/../public/index/TodolistHeader.svg';
import SettingCategory from '../Category/SettingCategory';
import { useEffect, useState } from 'react';
import { CategoryServices } from '@/api/Services/Category';
import { CategoryData } from '@/api/@types/Category';
import { MemoServices } from '@/api/Services/Memo';
import { MemoData } from '@/api/@types/Memo';
import styled from 'styled-components';
import { useRenderStore } from '@/stores/render';
import MemoContents from './MemoContents';
import { useStateStore } from '@/stores/status';
import FilteredMemo from './FilteredMemo';

const MemoList = () => {
  const [category, setCategory] = useState<CategoryData[]>([]);
  const [memo, setMemo] = useState<MemoData[]>([]);
  const { render } = useRenderStore();
  const { status } = useStateStore();

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
      const result = await MemoServices.get({ memoStatus: status === '' ? null : status });
      setMemo(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchMemo();
  }, [render, status]);

  return (
    <>
      <Flex flexDirection="row-reverse">
        <SettingCategory />
      </Flex>
      <Card backgroundColor="brand.50" minW="100%" h="80%">
        <CardHeader textAlign="center">
          <Image src={header} margin="0 auto" />
          <Heading size="md">TODO LIST</Heading>
        </CardHeader>

        <HStack ml={5}>
          <FilteredMemo />
        </HStack>

        <CardBody overflow="auto">
          <Flex flexDirection="column">
            <Box>
              {category.map(value => (
                <MemoContents id={value.categoryOrderId} memo={memo} category={category} />
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
