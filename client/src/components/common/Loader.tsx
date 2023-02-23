interface LoaderProps {
  isLoading: boolean;
  label: string;
  className?: string;
}

const Loader = ({ isLoading, label, className }: LoaderProps) => {
  if (!isLoading) return null;
  return (
    <h1 className={`mx-auto animate-pulse text-secondary ${className ? className : ''}`}>
      {label}
    </h1>
  );
};

export default Loader;
