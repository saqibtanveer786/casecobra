import { TextElement } from '@/app/configure/customize/dummyTextElements';
import * as fabric from 'fabric'

type Dimensions = {
    width: number;
    height: number
}

export class DiginviteCanvas {
    public canvas: fabric.Canvas

    constructor(canvas: fabric.Canvas) {
            this.canvas = canvas
    }

    public setImgToCanvas(imgURL: string, scaleDownFactor: number) {
        const img = document.createElement('img');
        img.src = imgURL;
        img.crossOrigin = "annonymous";

        // get Image Dimensions
        const imgWidth = img.width;
        const imgHeight = img.height;

        img.width = imgWidth/scaleDownFactor;
        img.height = imgHeight/scaleDownFactor;

        const scale = this.calScale(this.canvas, img)

        const fabricImage = new fabric.FabricImage(img, {left: 0, top: 0, scaleX: scale, scaleY: scale, selectable: false, evented: false})

        img.onload = () => {
            this.canvas.add(fabricImage);
            this.canvas.sendObjectToBack(fabricImage);

            this.canvas.renderAll();
        }
    }

    /**
     * renderTextElement
     */
    public renderTextElement(textElement: TextElement) {
        const {content, top, left, fontFamily, fontColor, fontSize} = textElement
        console.log("working")
      const text = new fabric.IText(content, {
        top,
        left,
        fontFamily,
        fill: "red",
        fontSize
      })

      this.canvas.add(text)
      this.canvas.renderAll()
    }

    private calScale(canvas: fabric.Canvas, img: HTMLImageElement) {
        const scale = Math.min((canvas.width/4)/img.width, (canvas.height/4)/img.height)
        return scale
    }
    
    /**
     * disposeCanvas
     */
    public disposeCanvas() {
        this.canvas.dispose();
    }
}