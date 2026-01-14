import '@/assets/css/progress.css';
const LazyLoader = () => {
  return (
    <>
      <div className="lodingOverlay">
        <div className="lineProgress">
          <div className="ineterminate"></div>
        </div>
      </div>
    </>
  );
};

export default LazyLoader;
