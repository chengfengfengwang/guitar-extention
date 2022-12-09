import { useState } from "react";
import RenderItem from './renderItem'
let count = 0;
const data = [
  {
    url: "https://iph.href.lu/600x848",
    id: count++,
  },
  {
    url: "https://iph.href.lu/600x848",
    id: count++,
  },
  {
    url: "https://iph.href.lu/600x848",
    id: count++,
  },
];


function App() {
  const imgs = Array.from(document.querySelectorAll("img"));
  const maxWidth = Math.max(
    ...imgs.map((img) => img.width)
  );
  const guitarImgs = imgs.filter((img) => img.width === maxWidth);
  const data = guitarImgs.map((item) => ({id: count++, url: item.src}));
  // const results = guitarImgs.map((e) => e.src);

  // const results = [
  //   // "https://pic.jitapai.com/wp-content/uploads/2020/09/2020092413191722.jpeg?x-oss-process=image/format,webp",
  //   // "https://pic.jitapai.com/wp-content/uploads/2020/09/2020092413191734.jpeg?x-oss-process=image/format,webp",
  //   // "https://www.jitakong.com/wp-content/uploads/2022/05/1-117.png",
  //   // "https://www.jitakong.com/wp-content/uploads/2022/05/2-118.png",
  //   "https://iph.href.lu/600x848",
  //   "https://iph.href.lu/600x848"
  // ];
  const [imgArr, setImgArr] = useState(data);

  return (
    <>
      {imgArr.map((item, index) => (
        <RenderItem
          item={item}
          key={item.id}
          index={index}
          imgArr={imgArr}
          setImgArr={setImgArr}
        ></RenderItem>
      ))}
    </>
  );
}
export default App;
