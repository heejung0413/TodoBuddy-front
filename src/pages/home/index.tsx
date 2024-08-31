import CreateMemo from '@/components/home/CreateMemo';
import MemoCalendar from '@/components/home/MemoCalendar';
import MemoList from '@/components/home/MemoList';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import styled from 'styled-components';

const HomePage = () => {
  const [open, setOpen] = useState<Boolean>(true);

  return (
    <div>
      <CreateMemo setOpen={setOpen} />
      <MemoBox>
        <Box flexGrow={1}>
          <MemoCalendar />
        </Box>
        {open && (
          <Box flexGrow={2} mb={50} ml={{ md: '20px' }} mx={{ base: '20px', md: '50px' }} minW="fit-content">
            <MemoList />
          </Box>
        )}
      </MemoBox>
    </div>
  );
};

export default HomePage;

export const MemoBox = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`;
