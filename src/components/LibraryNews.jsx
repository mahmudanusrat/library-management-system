import React from "react";

const LibraryNews = () => {
    const libraryNews = [
        { title: "New Fiction Section Launched", date: "2024-12-20" },
        { title: "Library Closed on Public Holidays", date: "2024-12-25" },
        { title: "Community Reading Program Starts", date: "2024-12-15" },
        { title: "Book Donation Drive Success", date: "2024-12-10" },
        { title: "Winter Reading Challenge Begins", date: "2024-12-01" },
        { title: "New eBooks Now Available", date: "2024-11-30" },
        { title: "Children's Book Fair Announced", date: "2024-11-25" },
        { title: "Library Renovation Complete", date: "2024-11-18" },
      ];
    
  return (
    <div className="p-10">
      <div className="text-center space-y-5 mb-7">
        <h1 className="text-[#00000080] uppercase text-lg">Library News</h1>
        <p className="uppercase text-[#181d38] text-3xl font-bold lg:px-20">
          {" "}
          Stay informed with the latest updates and events happening at
          <span className="text-[#06bbcc]"> our library</span>
        </p>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        {libraryNews.map((news, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow "
          >
              <h3 className="text-lg font-semibold">{news.title}</h3>
              <p className="text-gray-500 text-sm">Date: {news.date}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryNews;
