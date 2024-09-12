const Spinner = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      data-testid="spinner"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#36454F]"></div>
    </div>
  );
};

export default Spinner;
