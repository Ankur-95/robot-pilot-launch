import Spline from '@splinetool/react-spline';

const RobotModel = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-auto"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Spline scene="https://prod.spline.design/qSj32lp8DhyJ6Hoe/scene.splinecode" />
      {/* Edge fade overlays to hide plate discontinuity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, hsl(var(--background)) 0%, transparent 15%, transparent 85%, hsl(var(--background)) 100%),
            linear-gradient(to bottom, transparent 60%, hsl(var(--background)) 95%),
            linear-gradient(to top, transparent 70%, hsl(var(--background)) 100%)
          `,
        }}
      />
    </div>
  );
};

export default RobotModel;
