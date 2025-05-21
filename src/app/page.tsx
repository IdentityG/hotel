import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import RoomsPreview from "../components/home/RoomsPreview";
import AmenitiesSection from "../components/home/AmenitiesSection";
import GallerySection from "../components/home/GallerySection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <RoomsPreview />
      <AmenitiesSection />
      <GallerySection />
      {/* Add other sections here */}
    </div>
  );
}