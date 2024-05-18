interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="container flex justify-center my-4">
      {children}
    </div>
  );
};

export default ProtectedLayout;
