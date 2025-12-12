export default function GradientText({
  children,
  className = '',
  colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
  animationSpeed = 8,
  showBorder = false
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`
  };

  return (
    <span className={`relative inline-block ${className}`}>
      {showBorder && (
        <span
          className="absolute inset-0 rounded-md bg-cover animate-gradient pointer-events-none"
          style={{
            ...gradientStyle,
            backgroundSize: '300% 100%'
          }}
        ></span>
      )}

      <span
        className="relative inline-block text-transparent bg-cover animate-gradient"
        style={{
          ...gradientStyle,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundSize: '300% 100%'
        }}
      >
        {children}
      </span>
    </span>
  );
}
