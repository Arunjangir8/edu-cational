import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { Book, ChevronLeft, ChevronRight } from 'lucide-react'

function DigitalLibrary() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageNo, setPageNo] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch(`https://gutendex.com/books/?page=${pageNo}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.results)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching books:", error)
        setLoading(false)
      })
  }, [pageNo])

  function handleNextPage() {
    setPageNo(pageNo + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handlePrevPage() {
    if (pageNo > 1) {
      setPageNo(pageNo - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="pt-20 sm:pt-24 px-4 sm:px-6 md:px-8 lg:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#818cf8] mb-6 sm:mb-8 text-center animate-fade-in">
          <span className="inline-block mr-2">
            <Book className="inline-block mb-1 animate-pulse" size={28} />
          </span>
          Digital Library
        </h1>
        
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <button
            onClick={handlePrevPage}
            disabled={pageNo <= 1}
            className={`flex items-center gap-1 sm:gap-2 ${
              pageNo <= 1 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-[#E5D9F2] hover:bg-[#CDC1FF] text-[#333] hover:shadow-md"
            } font-medium py-2 px-3 sm:py-2.5 sm:px-5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95`}
          >
            <ChevronLeft size={16} />
            <span className="hidden xs:inline">Previous</span>
          </button>
          
          <div className="bg-[#F5EFFF] px-3 sm:px-5 py-2 rounded-full shadow-sm border border-[#E5D9F2]">
            <p className="text-[#818cf8] font-semibold text-sm sm:text-base">Page {pageNo}</p>
          </div>
          
          <button
            onClick={handleNextPage}
            className="flex items-center gap-1 sm:gap-2 bg-[#E5D9F2] hover:bg-[#CDC1FF] text-[#333] font-medium py-2 px-3 sm:py-2.5 sm:px-5 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-md"
          >
            <span className="hidden xs:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-2 sm:gap-y-10 mb-8 sm:mb-12 animate-fade-in">
            {data.map((item, index) => {
              if (item.formats["text/html"]) {
                return (
                  <div
                    key={item.id}
                    className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl border border-[#E5D9F2] flex flex-col h-full w-full max-w-[360px] min-h-[360px] group transition-all duration-300 animate-fade-up mx-auto"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-xl font-bold text-[#818cf8] mb-2 sm:mb-3 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">
                        <span className="font-semibold">Author:</span>{" "}
                        {item.authors.length > 0 ? item.authors[0].name : "Unknown"}
                      </p>
                      <div className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb- mx-2">
                        {item.summaries?.[0].slice(0,400)+"..." || "No summary available."}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/Books/${item.id}`)}
                      className="w-full bg-[#CDC1FF] hover:bg-[#818cf8] text-gray-800 hover:text-white py-2 sm:py-2.5 px-4 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 group-hover:transform group-hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <Book size={16} className="animate-bounce-subtle" />
                      Read Book
                    </button>
                  </div>
                )
              }
              return null;
            })}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow-md border border-[#E5D9F2] animate-fade-in">
            <p className="text-[#818cf8] font-medium">No books available on this page.</p>
          </div>
        )}

        {!loading && data.length > 0 && (
          <div className="flex justify-center mb-8 sm:mb-12 animate-fade-in">
            <button
              onClick={handlePrevPage}
              disabled={pageNo <= 1}
              className={`mx-1 sm:mx-2 ${
                pageNo <= 1 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-[#E5D9F2] hover:bg-[#CDC1FF] text-[#333] hover:shadow-md"
              } font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95`}
            >
              <ChevronLeft size={16} className="sm:hidden" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <div className="bg-[#818cf8] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-medium shadow-md">
              {pageNo}
            </div>
            <button
              onClick={handleNextPage}
              className="mx-1 sm:mx-2 bg-[#E5D9F2] hover:bg-[#CDC1FF] text-[#333] font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-md"
            >
              <ChevronRight size={16} className="sm:hidden" />
              <span className="hidden sm:inline">Next</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Add these animations to your CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
  
  .animate-fade-up {
    animation: fade-up 0.5s ease-out;
  }
  
  .animate-bounce-subtle {
    animation: bounce-subtle 2s infinite ease-in-out;
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @media (min-width: 480px) {
    .xs\\:inline {
      display: inline;
    }
  }
`;
document.head.appendChild(style);

export default DigitalLibrary
