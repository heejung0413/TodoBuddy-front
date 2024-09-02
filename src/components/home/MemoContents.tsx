import { CategoryData } from '@/api/@types/Category';
import { MemoData } from '@/api/@types/Memo';
import { MemoServices } from '@/api/Services/Memo';
import { useRenderStore } from '@/stores/render';
import { Badge, Box, Flex, HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IconStyle } from './MemoList';
import { MdOutlineLink } from 'react-icons/md';
import { colors } from '@/styles/theme/styled-components/palette';
import SettingMemo from './SettingMemo';

interface Props {
  id: number;
  memo: MemoData[];
  category: CategoryData[];
}

const MemoContents: FC<Props> = ({ id, memo, category }) => {
  const { render, setRender } = useRenderStore();

  const filteredMemo = (id: number) => {
    return memo.filter(item => item.categoryOrderId === id);
  };

  const ChangeMemoStatus = async (id: number, status: string) => {
    try {
      await MemoServices.patchStatus({ memoId: id, memoStatus: status });
      setRender(!render);
    } catch (e) {
      console.error(e);
    }
  };

  const StatusIcon = ({ status, id }: { status: string; id: number }) => {
    const handleChangeStatus = () => {
      if (status === 'COMPLETED') {
        ChangeMemoStatus(id, 'NOT_COMPLETED');
      } else {
        ChangeMemoStatus(id, 'COMPLETED');
      }
    };

    if (status === 'COMPLETED') {
      return <IoIosCheckmarkCircle style={{ margin: 'auto 3px', fontSize: '30px' }} onClick={handleChangeStatus} />;
    } else {
      return <FaRegCircle style={{ margin: 'auto 3px', fontSize: '25px' }} onClick={handleChangeStatus} />;
    }
  };
  return (
    <Box mb={10}>
      {category
        .filter(item => item.categoryOrderId === id)
        .map(v => (
          <Badge key={v.categoryOrderId} padding="10px 20px" backgroundColor={`category.${id}`} borderRadius={10}>
            {v.categoryName}
          </Badge>
        ))}

      {filteredMemo(id).length > 0 ? (
        filteredMemo(id).map((memoItem, index) => (
          <Flex key={index} margin="5px 0" flexDirection="column" gap={5} w="100%" my={5}>
            <Flex>
              <StatusIcon status={memoItem.memoStatus} id={memoItem.memoId} />

              <HStack>
                <Text my="auto">{memoItem.memoContent}</Text>
                {memoItem.memoLink !== '' ? (
                  <IconStyle background-color={colors.brand[300]}>
                    <a href={memoItem.memoLink} target="_blank">
                      <MdOutlineLink />
                    </a>
                  </IconStyle>
                ) : null}
              </HStack>
              <Text color="gray" fontSize="0.8em">
                {memoItem.memoDeadline}
              </Text>

              <SettingMemo memo={memoItem} category={category} />
            </Flex>
          </Flex>
        ))
      ) : (
        <Text textAlign="center" color="gray" my={5}>
          (해당 카테고리에 메모 없음)
        </Text>
      )}
    </Box>
  );
};
export default MemoContents;
