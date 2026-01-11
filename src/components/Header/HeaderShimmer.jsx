import "../Shimmer/Shimmer.css"; 
const HeaderShimmer = () => {
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800">
      <div className="shimmer md:w-14 md:h-14 w-10 h-10 rounded-full"></div>
      <div className="shimmer w-96 h-8 rounded-md hidden md:block"></div>    
      <div className="flex items-center space-x-4">
        <div className="shimmer w-10 h-10 rounded-md"></div>  
        <div className="shimmer w-10 h-10 rounded-md"></div>  
        <div className="shimmer w-10 h-10 rounded-md"></div>  
        <div className="shimmer w-10 h-10 rounded-full"></div> 
      </div>
    </div>
  );
};

export default HeaderShimmer;