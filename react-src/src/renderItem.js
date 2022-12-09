import { useState, useEffect, Fragment, useRef } from "react";

function rafThrottle(fn) {
  let locked = false;
  return function (...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame((_) => {
      fn.apply(this, args);
      locked = false;
    });
  };
}
function getProperty(ele) {
  const styleObj = getComputedStyle(ele);
  const left = parseFloat(styleObj.left);
  const top = parseFloat(styleObj.top);
  const width = parseFloat(styleObj.width);
  const height = parseFloat(styleObj.height);
  return {
    left,
    top,
    width,
    height,
  };
}
const renderItem = ({ item, index, imgArr, setImgArr }) => {
  const imgRef = useRef(null);
  const toolRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(()=>{
    setLeft((window.innerWidth / imgArr.length) * index);
    setTop(0);
    setWidth(window.innerWidth / imgArr.length);
  }, [imgArr])
  useEffect(() => {
    if (!imgRef.current.complete) {
      return
    }
    if (imgRef.current){
      renderTool();
    }
  }, [width, left, top]);
  const renderTool = () => {
    const tool = toolRef.current;
    const { width: toolWidth, height: toolHeight } = getProperty(tool);
    const {
      left: imgLeft,
      top: imgTop,
      width: imgWidth,
      height: imgHeight
    } = getProperty(imgRef.current);
    tool.style.left = imgLeft + imgWidth / 2 - toolWidth / 2 + "px";
    tool.style.top = imgTop + imgHeight / 2 - toolHeight / 2 + "px";
    tool.style.display = "block";
  };
  const handleZoomIn = (e) => {
    setWidth(width + 50);
    setLeft(left - 25);
    setTop(top - 25);
  };
  const handleZoomOut = (e) => {
    setWidth(width - 50);
    setLeft(left + 25);
    setTop(top + 25);
  };
  const handleRemove = (id) => {
    setImgArr(imgArr.filter((item) => item.id !== id));
  };
  const handleMouseDown = rafThrottle(function (e) {
    e.preventDefault();
    const startX = e.pageX;
    const startY = e.pageY;
    const handleMouseMove = (e) => {
      setLeft(left + e.pageX - startX);
      setTop(top + e.pageY - startY);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", (e) => {
      document.removeEventListener("mousemove", handleMouseMove);
    });
  });
 
  return (
    <Fragment key={index}>
      <img
        style={{
          left: left,
          top: top,
          width: width,
        }}
        ref={imgRef}
        className={`drag drag${index + 1} a${width}`}
        onMouseDown={handleMouseDown}
        onMouseEnter={(e) => {
        }}
        onLoad={renderTool}
        draggable="false"
        src={item.url}
      />
      <div ref={toolRef} className={`tool tool${index}`}>
        <div className="tool_inner">
          <img
            onClick={handleZoomIn}
            className="zoom_in"
            src={require("./imgs/zoom-in.png")}
            alt=""
          />
          <img
            onClick={handleZoomOut}
            className="zoom_out"
            src={require("./imgs/zoom-out.png")}
            alt=""
          />
          <img
            onClick={()=>{handleRemove(item.id)}}
            className="remove"
            src={require("./imgs/remove.png")}
            alt=""
          />
        </div>
      </div>
    </Fragment>
  );
}
export default renderItem