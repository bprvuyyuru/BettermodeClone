import Navbar from "./Navbar";

interface MyComponentProps {
  children: React.ReactNode;
}

const Layout = ({ children }: MyComponentProps) => {
  return (
    <>
      <main className="bg-[#D3D3D3] min-h-screen">
        <Navbar />
        <div>{children}</div>
      </main>
    </>
  );
};

export default Layout;
