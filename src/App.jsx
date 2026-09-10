import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import TimelineSection from './components/TimelineSection';
import CabinetExplorer from './components/CabinetExplorer';
import MapSection from './components/MapSection';
import FusionSection from './components/FusionSection';
import CulturalConnections from './components/CulturalConnections';
import ClosingSection from './components/ClosingSection';
import ArtifactModal from './components/ArtifactModal';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import { artifacts } from './data/artifactsData';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenArtifact = (artifact) => {
    setSelectedArtifact(artifact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevArtifact = () => {
    if (!selectedArtifact) return;
    const currentIndex = artifacts.findIndex((a) => a.id === selectedArtifact.id);
    const prevIndex = (currentIndex - 1 + artifacts.length) % artifacts.length;
    setSelectedArtifact(artifacts[prevIndex]);
  };

  const handleNextArtifact = () => {
    if (!selectedArtifact) return;
    const currentIndex = artifacts.findIndex((a) => a.id === selectedArtifact.id);
    const nextIndex = (currentIndex + 1) % artifacts.length;
    setSelectedArtifact(artifacts[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-parchment text-ink selection:bg-terracotta selection:text-parchment-50 relative">
      {/* Museum Loader Screen */}
      {isLoading && <Loader onFinished={() => setIsLoading(false)} />}

      {/* Interactive Desktop Custom Cursor */}
      <CustomCursor />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Continuous Single Page Experience */}
      <main>
        {/* 01. Cinematic Hero */}
        <Hero />

        {/* 02. Curatorial Introduction */}
        <Introduction />

        {/* 03. Interactive Timeline (CO1) */}
        <TimelineSection onSelectArtifact={handleOpenArtifact} />

        {/* 04. Artifact Explorer Cabinet */}
        <CabinetExplorer onSelectArtifact={handleOpenArtifact} />

        {/* 05. Interactive India Map (CO1) */}
        <MapSection />

        {/* 06. Regional Painting Fusion (CO2) */}
        <FusionSection />

        {/* 07. Cultural Connections Matrix */}
        <CulturalConnections />

        {/* 08. Editorial Closing Statement & Credits */}
        <ClosingSection />
      </main>

      {/* Deep Archival Artifact Modal Drawer */}
      <ArtifactModal
        artifact={selectedArtifact}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPrev={handlePrevArtifact}
        onNext={handleNextArtifact}
      />
    </div>
  );
}
