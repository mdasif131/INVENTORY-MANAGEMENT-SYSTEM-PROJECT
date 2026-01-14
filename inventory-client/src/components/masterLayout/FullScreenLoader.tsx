import '@/assets/css/progress.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store/store';
const FullScreenLoader = () => {
  const loader = useSelector((state: RootState) => state.settings.loader);
  return (
    <>
      <div className={`${loader} lodingOverlay`}>
        <div className="lineProgress">
          <div className="ineterminate"></div>
        </div>
      </div>
    </>
  );
};

export default FullScreenLoader;
