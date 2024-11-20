"use client"
import React, { useEffect } from 'react'
import { CustomizedDesign } from '@prisma/client'
import Image from 'next/image'
import * as fabric from 'fabric'
import { FabricImage } from 'fabric'; // Make sure to import FabricImage
import { TextElement } from '../customize/dummyTextElements'
import { Button } from '@/components/ui/button'

function CustomizedDesignPreview({customizedDesign}: {customizedDesign: CustomizedDesign}) {
  const {image} = customizedDesign
  let canvas: fabric.Canvas;

  useEffect(()=> {
    const img = makeImgEle()
    const width = img.width
    const height = img.height

    canvas = new fabric.Canvas("myCanvas", {width, height})

    const scale = calScale(canvas, img)
    
    renderInitialCanvas(canvas ,img, scale)

    return ()=>{
      canvas.dispose()
    }
  })

  const renderTextElement = (canvas: fabric.Canvas, ele: TextElement) => {

    const text = new fabric.IText(ele.content, {
      top: ele.top,
      left: ele.left,
      fontFamily: ele.fontFamily,  
      fill: ele.fontColor,
      fontSize: ele.fontSize,
      selectable: false
    })

    canvas.add(text)
  }

  const makeImgEle = () => {
    const img = document.createElement("img")
    img.src = customizedDesign.image
    img.crossOrigin = "anonymous"  
    const imgWidth = img.width
    const imgHeight = img.height

    img.width = imgWidth/4
    img.height = imgHeight/4

    return img
  }

  const renderInitialCanvas = (canvas: fabric.Canvas ,img: HTMLImageElement, scale: number) => {
    const fabricImage = new FabricImage(img, {left: 0, top: 0, scaleX: scale, scaleY: scale, selectable: false, evented: false})

    img.onload = ()=> {
      canvas.renderAll()
      //@ts-ignore
      customizedDesign.customizedTextElements.forEach((ele)=> renderTextElement(canvas ,ele))
          }

    canvas.add(fabricImage)
    canvas.sendObjectToBack(fabricImage)
  }

  const calScale = (canvas: fabric.Canvas, img: HTMLImageElement) => {
    const scale = Math.min((canvas.width/4)/img.width, (canvas.height/4)/img.height)
    return scale
  }

  return (
    <>
      <div className='flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
            
        <div className='mt-6 sm:col-span-12 md:row-end-1 border'>
          <div className='flex justify-between p-4'>
          <h3 className='text-3xl font-bold tracking-tight text-gray-900'>
            Personalize Your Design
          </h3>
            <Button>Next</Button>
          </div>

        <div className='sm:col-span-12 md:col-span-12 text-base border'>
          <div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:items-center sm:gap-x-6 sm:py-6 md:py-10'>
            <div className='flex items-center justify-center border border-red-500'>
                  <canvas id='myCanvas' className='absolute'></canvas>
            </div>
            {/* <div className='col-span-1'>
            </div> */}
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default CustomizedDesignPreview