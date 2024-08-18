import CreateMemo from '@/components/home/CreateMemo';
import MemoCalendar from '@/components/home/MemoCalendar';
import MemoList from '@/components/home/MemoList';
import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

const HomePage = () => {
  const [open, setOpen] = useState<Boolean>(false);

  return (
    <div>
      <CreateMemo setOpen={setOpen} />
      <Flex flexDirection={{ base: 'column', md: 'row' }}>
        <Box flexGrow={1}>
          <MemoCalendar />
        </Box>
        {open ? (
          <Box flexGrow={1}>
            <MemoList />
          </Box>
        ) : null}
      </Flex>
    </div>
  );
};

export default HomePage;
