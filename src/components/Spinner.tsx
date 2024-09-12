const Spinner = () => {
  return (
    <div
      className="flex justify-center items-center h-screen"
      data-testid="spinner"
    >
      <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 border-t-4 border-b-4 border-[#36454F]"></div>
    </div>
  );
};

export default Spinner;
