import CreateMemo from '@/components/home/CreateMemo';
import MemoCalendar from '@/components/home/MemoCalendar';
import MemoList from '@/components/home/MemoList';
import { Box, Flex } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <div>
      <CreateMemo />
      <Flex>
        <Box>
          <MemoCalendar />
        </Box>
        <Box flexGrow={1}>
          <MemoList />
        </Box>
      </Flex>
    </div>
  );
};

export default HomePage;
