"use client";
import React, { useEffect, useState } from "react";
import { CustomizedDesign, CustomizedTextElement } from "@prisma/client";
import Image from "next/image";
import { TextElement, textElements } from "../customize/dummyTextElements";
import { useRouter } from "next/navigation";
import * as fabric from "fabric";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Rnd } from "react-rnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup } from "@headlessui/react";

type Props = {
  image: string;
  customizedTextElements: TextElement[];
};

function CustomizedDesignPreview({
  customizedDesign,
}: {
  customizedDesign: Props;
}) {
  const [imgDimens, setImgDimens] = useState({ width: 0, height: 0 });
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [canvasRendered, setCanvasRendered] = useState(false);
  const { image, customizedTextElements } = customizedDesign;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!bgImage) {
      makeImgEle();
      console.log("image made");
    }
  });

  useEffect(() => {
    if (bgImage && !canvas) {
      const { width, height } = bgImage;
      const fabricCanvas = new fabric.Canvas("myCanvas", { width, height });
      setCanvas(fabricCanvas);
      console.log("canvas rendered");
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
      console.log("intialized");
    }
  }, [canvas]);

  useEffect(() => {
    if (canvasRendered) {
      makePreviewImage();
    }
  }, [canvasRendered]);

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
    img.src = image;
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
    const fabricImage = new fabric.FabricImage(bgImage, {
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
    customizedTextElements.forEach((ele) => renderTextElement(canvas, ele));
    setCanvasRendered(true);
  };

  const calScale = (canvas: fabric.Canvas) => {
    const scale = Math.min(
      canvas.width / 4 / imgDimens.width,
      canvas.height / 4 / imgDimens.height
    );
    return scale;
  };

  const makePreviewImage = () => {
    if (!canvas || !customizedTextElements || !bgImage) return;
    const binary = canvas.toDataURL({ format: "png", multiplier: 4 });

    setPreviewImage(binary);
  };

  return (
    <>
      <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
        <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          {previewImage && (
            <>
              <img width={400} src={previewImage} alt="preveiw" />
              <p className="self-end text-gray-600">
                {bgImage?.height} x {bgImage?.width}
              </p>
            </>
          )}
        </div>

        <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />

          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Preview your design
            </h2>

            <div className="w-full h-px bg-zinc-200 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="relative flex flex-col gap-3 w-full"></div>
              </div>
            </div>
          </div>

          <div className="w-full px-8 h-16 bg-white">
            <div className="h-px w-full bg-zinc-200" />
            <div className="w-full h-full flex justify-end items-center">
              <div className="w-full flex gap-6 items-center flex-col">
                <Button loadingText="Saving" size="sm" className="w-full">
                  Print
                  <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                </Button>
                <Button loadingText="Saving" size="sm" className="w-full">
                  Download
                  <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <canvas
        id="myCanvas"
        className={`absolute ${previewImage && "hidden"}`}
      ></canvas>
    </>
  );
}

export default CustomizedDesignPreview;
