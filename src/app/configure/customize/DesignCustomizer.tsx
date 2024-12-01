"use client";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TextElement, textElements } from "./dummyTextElements";
import * as fabric from "fabric";
import { FabricImage } from "fabric"; // Make sure to import FabricImage
import { saveCustomization } from "./action";

type Props = {
  design: {
    id: string;
    mainImg: string;
    textElements: TextElement[];
  };
};

function DesignCustomizer({ design }: Props) {
  const [imgDimens, setImgDimens] = useState({ width: 0, height: 0 });
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const { mainImg, textElements } = design;
  const router = useRouter();

  useEffect(() => {
    if (!bgImage) {
      makeImgEle();
    }
  });

  useEffect(() => {
    if (bgImage && !canvas) {
      const { width, height } = bgImage;
      const fabricCanvas = new fabric.Canvas("myCanvas", { width, height });
      setCanvas(fabricCanvas);
      // setCanvasRendered((pre) => true);
    }

    return () => {
      canvas?.dispose();
    };
  }, [bgImage, setBgImage]);

  useEffect(() => {
    if (canvas) {
      const scale = calScale(canvas);
      renderInitialCanvas(canvas, scale);
    }
  }, [canvas]);

  const renderTextElement = (canvas: fabric.Canvas, ele: TextElement) => {
    const text = new fabric.IText(ele.content, {
      top: ele.top,
      left: ele.left,
      fontFamily: ele.fontFamily,
      fill: ele.fontColor,
      fontSize: ele.fontSize,
    });

    canvas.add(text);
  };

  const makeImgEle = () => {
    const img = document.createElement("img");
    img.src = mainImg;
    img.crossOrigin = "anonymous";
    const imgWidth = img.width / 4;
    const imgHeight = img.height / 4;

    img.width = imgWidth;
    img.height = imgHeight;

    setImgDimens({ width: imgWidth, height: imgHeight });

    img.onload = () => {
      setBgImage(img);
    };
  };

  const renderInitialCanvas = (
    canvas: fabric.Canvas,
    // img: HTMLImageElement,
    scale: number
  ) => {
    if (!bgImage) return;
    const fabricImage = new FabricImage(bgImage, {
      left: 0,
      top: 0,
      scaleX: scale,
      scaleY: scale,
      selectable: false,
      evented: false,
    });

    canvas.add(fabricImage);
    canvas.sendObjectToBack(fabricImage);
    canvas.renderAll();
    textElements.forEach((ele) => renderTextElement(canvas, ele));
    // setCanvasRendered(true);
  };

  const calScale = (canvas: fabric.Canvas) => {
    const scale = Math.min(
      canvas.width / 4 / imgDimens.width,
      canvas.height / 4 / imgDimens.height
    );
    return scale;
  };

  const exportImage = () => {
    if (!canvas) return;
    const binary = canvas.toDataURL({ format: "png", multiplier: 4 });

    // Create a link to download the image
    const link = document.createElement("a");
    link.href = binary; // Set the data URL as the href for the link
    link.download = "design.png"; // Set the default filename
    link.click();
  };

  const saveCustomization_Redirect = async () => {
    // make a design to save
    const canvasJson = canvas?.toJSON();
    let customizedTextElements = canvasJson.objects
      .filter((txtEle: any) => txtEle.type === "IText")
      .map((txtEle: any) => {
        if (txtEle.type === "IText") {
          console.log("working");
          const { text, top, left, fontFamily, fontSize, fill } = txtEle;
          return {
            title: text,
            content: text,
            top,
            left,
            fontFamily,
            fontSize,
            fontColor: fill,
          };
        }
      });

    const design = {
      mainImg,
      textElements: customizedTextElements,
    };

    // save the customizations
    const id = await saveCustomization(design);

    // redirect to preview page
    router.push(`/configure/preview?=${id}`);
  };

  return (
    <>
      <div className="flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="mt-6 sm:col-span-12 md:row-end-1 border">
          <div className="flex justify-between p-4">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              Personalize Your Design
            </h3>
            <Button onClick={saveCustomization_Redirect}>Next</Button>
          </div>

          <div className="sm:col-span-12 md:col-span-12 text-base border">
            <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:items-center sm:gap-x-6 sm:py-6 md:py-10">
              <div className="flex items-center justify-center">
                {!canvas && <p>Loading ........</p>}
                <canvas id="myCanvas" className="absolute"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignCustomizer;
