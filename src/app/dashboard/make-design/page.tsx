"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import * as fabric from 'fabric';
import { Button } from '@/components/ui/button';

type CanvasDims = {
  width: number,
  height: number
}

function Page() {
  const [canvasDimensions, setCanvasDimensions] = useState<CanvasDims>({width: 300, height: 391})
  const scaleDownFactor = 4
  let canvas : fabric.Canvas
  useEffect(()=> {
    canvas = new fabric.Canvas("myCanvas")

    return ()=> {
      canvas.dispose();
    }
  })

  const addMainImage = async (e: React.ChangeEvent<HTMLInputElement>)=> {
        e.preventDefault();
        const {files} = e.target
        if(!files)
          return

        const url = URL.createObjectURL(files[0])

        const img = await loadImage(url) as HTMLImageElement

        const pimg = doStuffWithImg(img);

        const scale = calScale(canvas, pimg);

        const fabricImage = new fabric.FabricImage(pimg, {top: 0, left: 0, scaleX: scale, scaleY: scale, selectable: false, evented: false})

        
        canvas.add(fabricImage);
        canvas.sendObjectToBack(fabricImage)
        canvas.renderAll();
  }

  const loadImage = (url: string)=> {
    return new Promise((resolve, reject)=> {
      let img = new Image()
      img.onload = ()=> {
        resolve(img)
      }
      img.src = url
    })
  }

  const calScale = (canvas: fabric.Canvas, img: HTMLImageElement) => {
    const scale = Math.min((canvas.width/4)/img.width, (canvas.height/4)/img.height)
    return scale
  }

  const addText = ()=> {
    const text = new fabric.IText("New Text", {
      top: 100,
      left: 100,
      fontFamily: "Arial",  
      fill: "red",
      fontSize: 23,
    })

    canvas.add(text)

    canvas.renderAll()
  }

  const clickInput = ()=> {
   const inputField = document.getElementById("mainImg")
   if(inputField) inputField.click();
  }

  const doStuffWithImg = (img: HTMLImageElement)=> {
      const imgW = img.width
      const imgH = img.height

      img.width = imgW/scaleDownFactor;
      img.height = imgH/scaleDownFactor;
      
      canvas.setWidth(img.width)
      canvas.setHeight(img.height)

      return img
  }

  const uploadDesign = ()=> {
    const allTextElements = getAllTextElements();
    const imageElement = canvas.getObjects("image")
    console.log(allTextElements)
    console.log(imageElement)
  }

  const getAllTextElements = ()=> {
    return canvas.getObjects("i-text")
  }

  return (
  <>
    <div className='mt-10 flex flex-col items-center text-sm'>
      <div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
      </div>

      <div className='flex gap-2'>
          <Button onClick={addText} variant={'outline'}>Add Text</Button>
          <label htmlFor="mainImg" className='flex flex-col'>
            <Button variant={'outline'} onClick={clickInput}>Main Img</Button>
            <input type="file" name="mainImg" id="mainImg" className='invisible' onChange={addMainImage}/>
          </label>
      </div>

      <div className='mt-6'>
        <h3 className='text-2xl font-bold tracking-tight text-gray-900'>
          Publish A New Design
          <Button className='ml-4' onClick={uploadDesign}>Upload</Button>
        </h3>
      </div>
      <div className='text-base'>
        <div className='border-b border-gray-200 py-8 sm:py-6 md:py-10'>
          <div>
            <canvas id='myCanvas' className='border border-red-400'/>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Page