import { useStateStore } from '@/stores/status';
import { Button } from '@chakra-ui/react';

const FilteredMemo = () => {
  const Status: string[] = ['', 'COMPLETED', 'NOT_COMPLETED'];
  const { status, setStatus } = useStateStore();

  const statusText = (status: string): string => {
    switch (status) {
      case '':
        return '전체';
      case 'COMPLETED':
        return '완료';
      case 'NOT_COMPLETED':
        return '미완료';
      default:
        return '알 수 없음';
    }
  };

  return (
    <>
      {Status.map(value => (
        <Button
          colorScheme="brand"
          value={value}
          onClick={() => setStatus(value)}
          variant={status === value ? 'solid' : 'outline'}
        >
          {statusText(value)}
        </Button>
      ))}
    </>
  );
};

export default FilteredMemo;
