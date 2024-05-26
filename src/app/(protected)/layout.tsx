interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex justify-center">
      {children}
    </div>
  );
};

export default ProtectedLayout;
