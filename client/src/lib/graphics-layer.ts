import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

const graphicsLayerToMap = (id: string, points: any) => {
  const gl = new GraphicsLayer({ id });
  gl.addMany(points);

  return gl;
};
export default graphicsLayerToMap;
