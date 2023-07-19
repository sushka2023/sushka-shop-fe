import { ReactSVG } from "react-svg";
import svgSprite from "../../icons/symbol-defs.svg";

const MainPage = () => {
  return (
    <div className="test-container">
      <ReactSVG src={svgSprite} />
      <svg width={30} height={30}>
        <use xlinkHref="#icon-inst" />
      </svg>
      <h1 className="test">Sushka shop TEST123</h1>
    </div>
  );
};

export default MainPage;
