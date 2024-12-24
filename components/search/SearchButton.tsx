import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

type SearchButtonProps = {
  className?: string;
  disabled?: boolean;
  onFocus?: () => void;
};

export default function SearchButton({
  className,
  onFocus,
  disabled = false,
}: Readonly<SearchButtonProps>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'w-12 p-1',
              {
                'bg-gray-500 hover:bg-gray-500': disabled,
                'bg-primary': !disabled,
              },
              className,
            )}
            size="icon"
            onFocus={onFocus}
          >
            <Search color="white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={cn({
            'bg-gray-500 hover:bg-gray-500': disabled,
            'bg-primary': !disabled,
          })}
        >
          <p>Search</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
