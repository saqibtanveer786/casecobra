"use client"
import LoginModal from '@/components/LoginModal'
import Phone from '@/components/Phone'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'
import DesginCustomizeForm from './DesginCustomizeForm'
import { TextElement, textElements } from './dummyTextElements'
import * as fabric from 'fabric';
import { FabricImage } from 'fabric'; // Make sure to import FabricImage

function DesignCustomizer() {
    const [textElementState, setTextElementState] = useState<TextElement[]>(textElements)
    // let canvas: fabric.Canvas;
    useEffect(()=> {
      const img = makeImgEle()
      const width = img.width
      const height = img.height

      const canvas = new fabric.Canvas("myCanvas", {width, height})

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
        fontSize: 23,
        height: 30,
        width: 30
      })

      canvas.add(text)
    }

    const makeImgEle = () => {
      const img = document.createElement("img")
      img.src = "/desdes.png"
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
        textElementState.forEach((ele)=> renderTextElement(canvas ,ele))
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
          <div className='mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
                
            <div className='mt-6 sm:col-span-12 md:row-end-1 border'>
              <h3 className='text-3xl font-bold tracking-tight text-gray-900'>
                Personalize Your Design
              </h3>
    
            <div className='sm:col-span-12 md:col-span-12 text-base border'>
              <div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-3 sm:items-center sm:gap-x-6 sm:py-6 md:py-10'>
                <div className='flex items-center justify-center col-span-2'>
                      <canvas id='myCanvas' className='absolute'></canvas>
                </div>
                <div className='col-span-1'>
                    {/* <DesginCustomizeForm textElements={textElementState} setTextElements={setTextElementState}/> */}
                </div>
              </div>
            </div>
            </div>
          </div>
        </>
      )
}

export default DesignCustomizer