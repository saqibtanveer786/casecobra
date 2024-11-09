"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import * as fabric from 'fabric';

function Page() {
  let canvas = new fabric.Canvas("myCanvas")
  useEffect(()=> {
  })

  const addMainImage = (e: any)=> {
        e.preventDefault();
        console.log(e.file)
  }

  return (
  <>
    <div className='mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
      <div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
      </div>

      <div className='mt-6 sm:col-span-9 md:row-end-1'>
        <h3 className='text-3xl font-bold tracking-tight text-gray-900'>
          Publish A New Design
        </h3>
      </div>

      <div className='sm:col-span-12 md:col-span-9 text-base'>
        <div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
          <div>
            <canvas id='myCanvas' height={391} width={300} className='border border-red-400 bg-gray-500'/>
          </div>
          <div>
            {/* column 2 */}
            <Input type='file' placeholder='Add Photo' className='w-20 ' title="photo" onChange={addMainImage}/>
          </div>
        </div>

        <div className='mt-8'>
          <div className='bg-gray-50 p-6 sm:rounded-lg sm:p-8'>
            <div className='flow-root text-sm'>
              <div className='flex items-center justify-between py-1 mt-2'>
              </div>
            </div>
          </div>

          <div className='mt-8 flex justify-end pb-12'>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Page