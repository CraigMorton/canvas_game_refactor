export default class Sprite{
  constructor(image_url){
    var sprite = new Image();
    sprite.src = image_url;
    return sprite
  }
}