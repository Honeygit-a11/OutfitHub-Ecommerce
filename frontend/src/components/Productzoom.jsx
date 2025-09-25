import { useState } from "react"
import '../Style/ProductZoom.css'
const ProductZoom = ({src,alt}) =>{
    const [backgroundPos,setBackgroundPos] = useState('center');

    const handleMouseMove =(e) =>{
        const {left,top,width,height} = e.target.getBoundingClientRect();
        const x=((e.pageX -left) /width)*100;
        const y=((e.pageY - top)/height)*100;
        setBackgroundPos(`${x}%${y}%`);
    };
    return(
        <>
        <div className="zoom-container"
        style={{backgroundImage: `url(${src})`,
    backgroundPosition: backgroundPos,
         }}
         onMouseMove={handleMouseMove}
        >
            <img src={src} alt={alt || 'product'}/>

        </div>
        </>
    )
}
export default ProductZoom;