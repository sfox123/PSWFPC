function Top() {
  return (
    <main className="flex flex-row justify-between">
      <div className="bg-black flex items-center justify-center text-white w-[45%] p-5">
        <h2 className="text-4xl text-left font-sans uppercase font-light">
          Saving lives <br /> changing lives
        </h2>
      </div>
      <div className="flex justify-center items-center">
        <video
          autoPlay
          loop
          muted
          className="clip-box object-cover w-1/2 h-3/4"
          src={
            "https://drive.google.com/file/d/1Jb8wPqU97R84NaY1Jrt2GJ3YEE1Y7Cin/view?usp=sharing"
          }
        ></video>
      </div>
      <div className="capitalize text-2xl font-weight p-4 font-playfair">
        <p>triumph through quenching basic needs</p>
      </div>
    </main>
  );
}

export default Top;
