import { useEffect, useRef, useState } from "react";
import { Preloader } from "./components/Preloader";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Ticker } from "./components/Ticker";
import { Collection } from "./components/Collection";
import { BlurTest } from "./components/BlurTest";
import { Craft } from "./components/Craft";
import { Visit } from "./components/Visit";
import { Footer } from "./components/Footer";
import { Cursor } from "./components/Cursor";
import { MotionToggle } from "./components/MotionToggle";
import { useLenis } from "./hooks/useLenis";
import { useReveals } from "./hooks/useReveals";
import type { GlassesController } from "./three/glasses";

export default function App() {
  const [entered, setEntered] = useState(false);
  const stage = useRef<GlassesController | null>(null);
  useLenis();
  useReveals();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Preloader onDone={() => setEntered(true)} />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Header />
      <main id="top">
        <Hero entered={entered} onStageReady={(c) => (stage.current = c)} />
        <Ticker />
        <Collection />
        <BlurTest />
        <Craft />
        <Visit />
      </main>
      <Footer />
      <MotionToggle onToggle={(p) => stage.current?.setPaused(p)} />
    </>
  );
}
