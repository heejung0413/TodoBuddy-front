import { Button } from '@chakra-ui/react';
import { MEMO_STATUS_LABEL } from '@/constant/label';
import { useStateStore } from '@/stores/status';

const FilteredMemo = () => {
  const Status: string[] = ['', 'COMPLETED', 'NOT_COMPLETED'];
  const { status, setStatus } = useStateStore();

  return (
    <>
      {Status.map(value => (
        <Button
          colorScheme="brand"
          value={value}
          onClick={() => setStatus(value)}
          variant={status === value ? 'solid' : 'outline'}
        >
          {MEMO_STATUS_LABEL[value]}
        </Button>
      ))}
    </>
  );
};

export default FilteredMemo;
