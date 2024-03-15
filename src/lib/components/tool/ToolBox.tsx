import React, { useEffect } from 'react'
import CircleButton from '../ui/button/CircleButton'
import pen from 'assets/images/pen.png'
import highlighter from 'assets/images/highlight.png'
import eraser from 'assets/images/eraser.png'
import { Tools } from 'lib/enum/Tools'
import ControlContainer from '../ui/container/ControlContainer'
import { useRecoilState } from 'recoil'
import { toolState } from 'lib/store/ToolState'

const ToolList = [
  {
    name: Tools.PEN,
    img: pen,
  },
  {
    name: Tools.HIGHLIGHTER,
    img: highlighter,
  },
  {
    name: Tools.ERASER,
    img: eraser,
  }
]
const ToolBox = () => {
  const [ activeTool, setActiveTool ] = useRecoilState(toolState);

  const onClickFn = (name: string) => {
    if(activeTool === name) {
      setActiveTool(Tools.NONE);
      return;
    }
    setActiveTool(name);
  }
  useEffect(() => {
    // setTimeout(() => {
    //   setActiveTool(Tools.PEN);
    // }, 100);
    // setTimeout(() => {
    //   setActiveTool(Tools.HIGHLIGHTER);
    // }, 200);
    // setTimeout(() => {
    //   setActiveTool(Tools.ERASER);
    // }, 300);
    // setTimeout(() => {
    //   setActiveTool(Tools.NONE);
    // }, 400);
  }, []);
  
  return (
    <div className='relative w-full h-full'>
      <ControlContainer>
        {ToolList.map(({
          img,
          name
        }, index) => {
          return (
            <CircleButton 
              key={index} 
              img={img} 
              name={name}
              onClickFn={() => onClickFn(name)}
              isShadow
            />
          )
        })}
      </ControlContainer>
      <ControlContainer isShadow/>
      <ControlContainer>
        {ToolList.map(({
          img,
          name
        }, index) => {
          return (
            <CircleButton 
              key={index} 
              img={img} 
              name={name}
              onClickFn={() => onClickFn(name)}
            />
          )
        })}
      </ControlContainer>
    </div>
  )
}

export default ToolBox
