import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

export default function SubmitButton({
  isLoading,
  loadingTitle,
  title,
}: {
  isLoading: boolean;
  loadingTitle: string;
  title: string;
}) {
  return (
    <Button className="w-full" type="submit" size={'lg'} disabled={isLoading}>
      {isLoading && <Loader className="animate-spin w-4 h-4 mr-2" />}
      {isLoading ? loadingTitle : title}
    </Button>
  );
}
