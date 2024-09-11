import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import styled from 'styled-components';
import CreateMemo from '@/components/home/Memo/CreateMemo';
import MemoList from '@/components/home/Memo/MemoList';
import MemoCalendar from '@/components/home/MemoCalendar';
import Secession from '@/components/utils/Secession';

const HomePage = () => {
  const [open, setOpen] = useState<boolean>(true);

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
      <Secession />
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
