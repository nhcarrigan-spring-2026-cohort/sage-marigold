
const Hero = () => {
  return (
    <section className="mx-auto max-w-4xl text-center py-20 px-4">
        <div className='text-center'>
            <h1 className='text-4xl font-bold text-emerald-700'>Your stuff can change someone's life</h1>
            <p className='max-w-2xl w-full mx-auto bg-emerald-50 p-4 rounded-lg mt-6'>Every item you no longer need is something someone else is searching for. We bridge the gap between donors and receivers to keep resources moving through our community.</p>
        </div>
        <div>
            <button className='bg-emerald-700 text-white px-6 py-3 rounded-full mt-6 hover:bg-emerald-800 transition-colors duration-300'>I want to donate</button>
            <button className='ml-4 bg-white text-emerald-700 border border-emerald-700 px-6 py-3 rounded-full mt-6 hover:bg-emerald-50 transition-colors duration-300'>I want to receive</button>
        </div>
    </section>
  );
}

export default Hero;