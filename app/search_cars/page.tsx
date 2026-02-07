import Navbar from "../navbar";

export default function SearchCars() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-500 items-center">
      <Navbar />
        <div className='justify-center items-center flex-grow p-6 md:p-10 max-w-4xl text-white text-center mt-10'>
            <h1 className="text-4xl font-bold mb-6">Search Cars</h1>
            <p className="text-lg text-center max-w-2xl">
                Welcome to our application! We are dedicated to providing the best service possible.
                Our team is passionate about delivering high-quality solutions that meet your needs.
                Thank you for choosing us!
            </p>
        </div>
    </div>
  );
}