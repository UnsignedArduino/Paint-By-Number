import p5 from "p5";

interface PaintSketchImageFormatterResult {
  image: p5.Image;
  colors: p5.Color[];
}

export class PaintSketchImageFormatter {
  private sketch: p5;

  constructor(sketch: p5) {
    this.sketch = sketch;
  }

  public formatImage(
    img: p5.Image,
    width: number,
    height: number,
    colors: number
  ): PaintSketchImageFormatterResult {
    const result = <PaintSketchImageFormatterResult>{};

    const newImg = this.copyImage(img);

    console.log(`Resizing to ${width}x${height}`);
    newImg.resize(width, height);

    this.quantifyImage(newImg, colors);

    result.image = newImg;

    result.colors = this.getUniqueColors(newImg);

    return result;
  }

  private copyImage(img: p5.Image): p5.Image {
    const c = this.sketch.createImage(img.width, img.height);
    c.copy(img, 0, 0, img.width, img.height, 0, 0, c.width, c.height);
    return c;
  }

  private quantifyImage(img: p5.Image, colors: number): void {
    const colorsPerChannel = Math.pow(colors, 1 / 3);
    console.log(
      `Quantifying to ${colors} colors (${colorsPerChannel} unique values per channel)`
    );
    img.filter(this.sketch.POSTERIZE, colorsPerChannel);
  }

  private getUniqueColors(img: p5.Image): p5.Color[] {
    console.log("Getting colors");

    const allColors: p5.Color[] = [];

    img.loadPixels();
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        const [r, g, b, _] = img.get(x, y);
        const c = this.sketch.color(r, g, b);
        if (!this.colorInList(c, allColors)) {
          allColors.push(c);
        }
      }
    }
    img.updatePixels();

    console.log(`Found ${allColors.length} unique colors`);

    console.debug("All colors: ");
    for (const c of allColors) {
      console.debug(c.toString("#rrggbb"));
    }

    return allColors;
  }

  private colorInList(color: p5.Color, colorList: p5.Color[]): boolean {
    const cf: string = "#rrggbbaa";
    const s: string = color.toString(cf);
    for (const c of colorList) {
      if (s == c.toString(cf)) {
        return true;
      }
    }
    return false;
  }
}

export default PaintSketchImageFormatter;
