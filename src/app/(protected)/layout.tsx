interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return <div className="my-4 flex justify-center">{children}</div>;
};

export default ProtectedLayout;
