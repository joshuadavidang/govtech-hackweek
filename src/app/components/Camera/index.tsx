import { Button } from "@/components/Button";
import { NavigationContext } from "@/context/NavigationContext";
import { errMessages } from "@/errorMessages/errMessages";
import { tabs } from "@/models/tabs";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { Camera as ReactCamera } from "react-camera-pro";
import { GrPowerReset } from "react-icons/gr";

export default function Camera() {
  const camera = useRef<any>(null);
  const [image, setImage] = useState(null);
  const { setSelected } = useContext(NavigationContext);
  const { setOpenCamera } = useContext(NavigationContext);

  const handleReset = () => {
    setImage(null);
    setOpenCamera(false);
    setSelected(tabs[0].label);
  };

  const handleCamera = () => {
    const capture = camera.current.takePhoto();
    setImage(capture);
  };

  const handleSubmit = () => {
    setOpenCamera(false);
    setSelected(tabs[3].label);
  };

  return (
    <div className="mx-auto flex max-h-screen w-screen flex-col justify-center bg-black">
      {!image && (
        <ReactCamera
          ref={camera}
          errorMessages={errMessages}
          facingMode="environment"
        />
      )}
      {image && (
        <div>
          <Image src={image} alt="Photo" fill={true} />
        </div>
      )}
      <div className="fixed bottom-0 mx-auto grid w-full grid-cols-3 items-center justify-center bg-black p-8 text-center">
        <span></span>
        {!image && (
          <>
            <div
              className="relative flex items-center justify-center"
              onClick={handleCamera}
            >
              <div className="absolute flex h-24 w-24 items-center justify-center rounded-full">
                <div className="h-16 w-16 rounded-full bg-white"></div>
              </div>
              <div className="border-1 relative z-10 h-14 w-14 rounded-full border-2 border-black bg-white"></div>
            </div>
            <p className="text-sm text-white" onClick={handleReset}>
              Cancel
            </p>
          </>
        )}
        {image && (
          <>
            <div className="flex justify-center">
              <GrPowerReset
                size={60}
                onClick={() => setImage(null)}
                className="rounded-full bg-white p-1.5"
              />
            </div>
            <div>
              <Button variant="white" onClick={handleSubmit} size="sm">
                Submit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
