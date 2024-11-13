import Image from 'next/image';
import type { NextPage } from 'next';
import Navbar from '@/components/navbar';

const Home: NextPage = () => {
  return (
    <div>
      <section className="bg-primary text-white p-px">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:m-20 m-10">
          {/* Heading and Image in a Row */}
          <h2 className="text-3xl lg:text-6xl font-bold mb-6 lg:mt-10 text-center lg:text-left">
            WHO WE ARE?
          </h2>
          <Image
            src="/img/heritage.jpg"
            alt="Heritage Image"
            width={800}
            height={500}
            className="rounded w-full lg:w-auto"
          />
        </div>

        {/* Centered Paragraph */}
        <p className="lg:m-20 mx-4 my-10 text-justify text-lg lg:text-2xl font-semibold">
          HeritageLink Sri Lanka is a dedicated platform committed to preserving and
          celebrating the rich cultural heritage of Sri Lanka. In a rapidly modernizing world,
          our mission is to bridge the gap between tradition and the present by connecting
          artisans, historians, and the public. We offer an online marketplace where traditional
          craftsmen can showcase and sell their unique creations, ensuring that ancient crafts
          are passed down to future generations.
        </p>
      </section>

      {/* ATTENTION Section */}
      <section className="w-full bg-white p-6 lg:p-10 text-gray-900">
        <h2 className="text-4xl lg:text-5xl lg:mb-14 font-bold text-primary mb-8 text-center">ATTENTION!</h2>

        {/* Yapahuwa Section */}
        <div className="flex flex-col lg:flex-row items-center lg:space-x-6 my-6">
          <Image
            src="/img/yapahuwa.jpg"
            alt="Yapahuwa Image"
            width={500}
            height={350}
            className="w-full lg:w-auto"
          />
          <p className="lg:p-16 p-4 text-lg lg:text-2xl font-semibold text-justify">
            Yapahuwa, an ancient rock fortress in Sri Lanka, was once the island's capital in
            the 13th century. Its iconic stone stairway leads to the ruins of a royal palace,
            showcasing the rich history and architectural brilliance of the era.
          </p>
        </div>
        <div className="text-center lg:text-right mt-4 lg:-mt-20 lg:mr-20 lg:mb-14">
          <a href="https://en.wikipedia.org/wiki/Yapahuwa">
            <button className="bg-primary text-white font-semibold text-lg lg:text-xl py-2 lg:py-3 px-6 lg:px-10 rounded-md">
              MORE
            </button>
          </a>
        </div>

        {/* Sigiriya Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:space-x-6 my-6">
          <p className="lg:p-16 p-4 text-lg lg:text-2xl font-semibold text-justify">
            Sigiriya, a UNESCO World Heritage site, is a towering rock fortress in Sri Lanka,
            known for its stunning frescoes and the ancient ruin of a royal palace. Built in the
            5th century, it stands as a testament to the island's rich history and architectural
            ingenuity.
          </p>
          <Image
            src="/img/sigiriya.jpg"
            alt="Sigiriya Image"
            width={500}
            height={350}
            className="w-full lg:w-auto"
          />
        </div>
        <div className="text-center lg:text-left mt-4 lg:-mt-16 lg:ml-20">
          <a href="https://en.wikipedia.org/wiki/Sigiriya">
            <button className="bg-primary text-white font-semibold text-lg lg:text-xl py-2 lg:py-3 px-6 lg:px-10 rounded-md">
              MORE
            </button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
