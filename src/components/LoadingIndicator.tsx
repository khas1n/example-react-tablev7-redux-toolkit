const LoadingIndicator = () => {
  return (
    <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-zinc-50 font-semibold text-zinc-900 opacity-80">
      <svg
        className="-ml-1 mr-2 h-5 w-5 animate-spin text-zinc-900"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      loading...
    </div>
  );
};

export default LoadingIndicator;
