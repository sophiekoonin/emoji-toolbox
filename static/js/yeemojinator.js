const stage = new Konva.Stage({
  container: 'canvas',
});

const konvaImages = [];

function yeeify(image) {
  const { width, height } = getScaledImageDimensions(
    image.width,
    image.height,
    MAX_SIZE
  );

  stage.width(width + width / 2);
  stage.height(height + height / 2);
  init();
  document.getElementById('actions').classList.remove('hidden');
  document.getElementById('add-hat').classList.remove('hidden');

  const hatImg = document.getElementById('cowboy-hat').cloneNode();
  hatImg.classList.remove('visually-hidden');
  const hatHeight = (width / hatImg.width) * hatImg.height;
  hatImg.width = width;
  hatImg.height = hatHeight;

  let numHats = 0;

  stage.add(baseLayer);
  const baseImg = new Konva.Image({
    width,
    height,
    image,
    x: width / 4 + width / 2,
    y: height / 4 + height / 2,
    draggable: true,
    offsetX: width / 2,
    offsetY: height / 2,
  });

  konvaImages.push(baseImg);
  baseLayer.add(baseImg);
  baseLayer.draw();

  baseLayer.add(tr);

  addHat(numHats++);
  baseLayer.add(selectionRectangle);

  document.getElementById('add-hat').addEventListener('click', (e) => {
    addHat(numHats++);
  });

  document.getElementById('download').addEventListener('click', (e) => {
    fitToScreen(() => {
      tr.nodes([]);
      var dataURL = stage.toDataURL();
      downloadURI(dataURL, `yee${filename}.png`);
    });
  });

  function addHat(numHats) {
    const hat = new Konva.Image({
      width: hatImg.width,
      image: hatImg,
      height: hatImg.height,
      x: hatImg.width / 2,
      y: hatImg.height / 2,
      name: `hat-${numHats}`,
      draggable: true,
      offsetX: hatImg.width / 2,
      offsetY: hatImg.height / 2,
    });
    konvaImages.push(hat);
    baseLayer.add(hat);
    const nodes = tr.nodes().concat([hat]);
    tr.nodes(nodes);
    baseLayer.batchDraw();
  }
}

function yeeFormSubmit(event) {
  event.preventDefault();
  yeeify(img);
}

document.getElementById('yee-input').onchange = onImageSelect;
document.getElementById('yee-form').onsubmit = yeeFormSubmit;
