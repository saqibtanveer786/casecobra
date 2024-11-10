import React from 'react'
import { CustomizedDesign } from '@prisma/client'
import Image from 'next/image'

function CustomizedDesignPreview({customizedDesign}: {customizedDesign: CustomizedDesign}) {
  return (
    <div>
        <Image alt="previewImage" src={customizedDesign.image} />
    </div>
  )
}

export default CustomizedDesignPreview