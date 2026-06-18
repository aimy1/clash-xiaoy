import { Public } from '@mui/icons-material';
import { cn } from '@nyanpasu/ui';
export const ContentDisplay = ({ message, children, className, }) => (<div className={cn('absolute top-0 left-0 flex h-full w-full items-center justify-center', className)}>
    <div className="flex flex-col items-center gap-4">
      {children || (<>
          <Public className="!size-16"/>

          <b>{message}</b>
        </>)}
    </div>
  </div>);
export default ContentDisplay;
