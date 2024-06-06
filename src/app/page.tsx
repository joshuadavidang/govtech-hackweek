"use client";

import AnimatedLogoCloud from "@/components/AnimatedCloud";
import Tabs from "@/components/Tabs";
import { logos } from "@/data/logos";
import { TabsEnum, tabs } from "@/models/tabs";
import { useContext, useEffect } from "react";
import { Button } from "./components/Button";
import Camera from "./components/Camera";
import { NavigationContext } from "./context/NavigationContext";

export default function Home() {
  const { selected, setSelected } = useContext(NavigationContext);
  const { openCamera, setOpenCamera } = useContext(NavigationContext);

  useEffect(() => {
    if (selected === TabsEnum.SCAN) {
      setOpenCamera(true);
    }
  }, [selected, setOpenCamera]);

  const renderContent = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return (
          <div>
            <AnimatedLogoCloud logos={logos} />
            <AnimatedLogoCloud logos={logos} />
            <AnimatedLogoCloud logos={logos} />
            <AnimatedLogoCloud logos={logos} />
            <AnimatedLogoCloud logos={logos} />
            <AnimatedLogoCloud logos={logos} />
            <AnimatedLogoCloud logos={logos} />
            <AnimatedLogoCloud logos={logos} />
            <AnimatedLogoCloud logos={logos} />
            <AnimatedLogoCloud logos={logos} />
            <AnimatedLogoCloud logos={logos} />
          </div>
        );
      case TabsEnum.SCAN:
        return <Camera />;
      case TabsEnum.PROFILE:
        return <div>Profile Content</div>;
      default:
    }
  };

  const renderHeader = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return <h1 className="h1-special">{TabsEnum.REWARDS}</h1>;
      case TabsEnum.PROFILE:
        return <h1 className="h1-special">{TabsEnum.PROFILE}</h1>;
      case TabsEnum.VERIFICATION:
        return (
          <div>
            <h1 className="h1-special">{TabsEnum.VERIFICATION}</h1>
            <div className="mt-20 flex pl-6">
              {/* render info here */}
              <Button onClick={() => setSelected(TabsEnum.SCAN)}>Retake</Button>
            </div>
          </div>
        );
      default:
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden p-8">
      <div className="flex w-screen">{renderHeader()}</div>
      <div className="mt-16 flex-grow">{renderContent()}</div>
      <div className="fixed bottom-0 flex w-full justify-center">
        {!openCamera && selected !== TabsEnum.VERIFICATION && (
          <Tabs
            tabsMapping={tabs}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </div>
    </main>
  );
}
