import Spline from '@splinetool/react-spline';

const RobotModel = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-auto"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Spline scene="https://prod.spline.design/qSj32lp8DhyJ6Hoe/scene.splinecode" />
    </div>
  );
};

export default RobotModel;
