import img1 from "./img/01d.png";
import img2 from "./img/01n.png";
import img3 from "./img/02d.svg";
import img4 from "./img/03d.png";
import img5 from "./img/03n.png";
import img6 from "./img/04d.png";
import img7 from "./img/04n.png";
import img8 from "./img/09d.svg";
import img9 from "./img/10d.png";
import img10 from "./img/11d.png";
import img11 from "./img/11n.png";
import img12 from "./img/13d.png";
import img13 from "./img/50d.png";
import img14 from "./img/02n.svg";

function getImg(imgCode) {
  switch (imgCode) {
    case "01d":
      return img1;
    case "01n":
      return img2;
    case "02d":
      return img3;
    case "03d":
      return img4;
    case "03n":
      return img5;
    case "04d":
      return img6;
    case "04n":
      return img7;
    case "09d":
      return img8;
    case "10d":
      return img9;
    case "11d":
      return img10;
    case "11n":
      return img11;
    case "13d":
      return img12;
    case "50d":
      return img13;
    case "02n":
      return img14;
    default:
      return img3;
  }
}

export default getImg;
