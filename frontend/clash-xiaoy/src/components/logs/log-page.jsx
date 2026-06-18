import ClearLogButton from './clear-log-button';
import { LogList } from './log-list';
export const LogPage = ({ scrollRef, }) => {
    return (<>
      <LogList scrollRef={scrollRef}/>

      <ClearLogButton />
    </>);
};
export default LogPage;
