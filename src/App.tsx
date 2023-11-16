import HeroSection from "./sections/HeroSection";

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7 border-start border-end">
            <HeroSection />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
