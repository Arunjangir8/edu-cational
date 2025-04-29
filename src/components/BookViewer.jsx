import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { Book, Download, ArrowLeft, ExternalLink } from 'lucide-react'

function BookViewer() {
  const contentRef = useRef()
  const [htmlUrl, setHtmlUrl] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const [bookTitle, setBookTitle] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)

    fetch(`https://gutendex.com/books/?ids=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const book = data.results[0]
          const htmlLink = book.formats["text/html"];
          const secureHtmlLink = htmlLink ? htmlLink.replace("http://", "https://") : ""

          setHtmlUrl(secureHtmlLink)
          setPdfUrl(book.formats["application/pdf"] || "")
          setBookTitle(book.title || "Book")

          if (!secureHtmlLink) setLoading(false)
        } else {
          setError(true)
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error("Error fetching book:", error)
        setError(true)
        setLoading(false)
      })
  }, [id])

  const handleIframeLoad = () => {
    setLoading(false)
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 animate-fade-down">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 bg-[#E5D9F2] hover:bg-[#CDC1FF] text-[#333] font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md mb-4 md:mb-0"
          >
            <ArrowLeft size={16} className="animate-pulse-subtle" />
            Back to Library
          </button>

          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-[#A594F9] mr-4 truncate max-w-xs md:max-w-md">
              {loading ? "Loading..." : bookTitle}
            </h1>

            {pdfUrl && (
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#CDC1FF] hover:bg-[#A594F9] text-gray-800 hover:text-white py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
              >
                <Download size={16} className="animate-bounce-subtle" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </a>
            )}
          </div>
        </div>

        <div className="w-full rounded-2xl border border-[#f9f9f9] overflow-hidden h-[calc(100vh-160px)] md:h-[calc(100vh-180px)] animate-fade-up">
          {loading && (
            <div className="flex flex-col justify-center items-center h-full bg-white">
              <Book size={48} className="text-[#A594F9] mb-4 animate-pulse" />
              <Loader />
              <p className="mt-4 text-[#A594F9] font-medium animate-pulse">Loading your book...</p>
            </div>
          )}

          {htmlUrl && !error && (
            <iframe 
              src={htmlUrl} 
              ref={contentRef} 
              width="100%" 
              height="100%" 
              onLoad={handleIframeLoad} 
              title={bookTitle}
              className={`bg-white ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
            ></iframe>
          )}

          {!htmlUrl && !loading && !error && (
            <div className="flex flex-col justify-center items-center h-full bg-white p-6">
              <Book size={48} className="text-[#A594F9] mb-4" />
              <h2 className="text-xl font-bold text-[#A594F9] mb-2">HTML Version Not Available</h2>
              {pdfUrl ? (
                <div className="text-center">
                  <p className="text-gray-700 mb-4">This book is only available as a PDF.</p>
                  <a 
                    href={pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#CDC1FF] hover:bg-[#A594F9] text-gray-800 hover:text-white py-2 px-6 rounded-xl transition-all duration-300 shadow-md"
                  >
                    <Download size={16} />
                    Download PDF
                  </a>
                </div>
              ) : (
                <p className="text-gray-700">This book is not available in readable format.</p>
              )}
            </div>
          )}

          {!loading && htmlUrl && (
            <div className="absolute bottom-6 right-6">
              <a 
                href={htmlUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-[#E5D9F2] hover:bg-[#CDC1FF] text-gray-800 hover:text-[#333] px-3 py-1 rounded-lg shadow transition"
              >
                <ExternalLink size={16} />
                Open Externally
              </a>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-fade-down {
          animation: fade-down 0.5s ease-out;
        }

        .animate-fade-up {
          animation: fade-up 0.5s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }

        .animate-pulse {
          animation: pulse-subtle 2s infinite ease-in-out;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default BookViewer
