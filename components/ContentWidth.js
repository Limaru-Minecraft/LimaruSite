const ContentWidth = ({ children, className = "" }) => {
  return (
    <div className={`flex w-full max-w-screen-lg mx-auto py-4 px-6 ${className}`}>
      {children}
    </div>
  );
};

export default ContentWidth;
