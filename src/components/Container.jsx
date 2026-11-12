export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[76rem] px-4 sm:px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
