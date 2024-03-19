import React, { useEffect, useState } from 'react'
import CircleButton from '../ui/button/CircleButton'
import pen from 'assets/images/pen.png'
import penWhite from 'assets/images/pen_white.png';
import highlighter from 'assets/images/highlight.png'
import highlighterWhite from 'assets/images/HighLight_white.png'
import eraser from 'assets/images/eraser.png'
import eraserWhite from 'assets/images/erazer_white.png'
import { Tools } from 'lib/enum/Tools'
import ControlContainer from '../ui/container/ControlContainer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { toolState } from 'lib/store/ToolState'
import { darkState } from 'lib/store/setting/DarkState'

const ToolBox = () => {
  const [ activeTool, setActiveTool ] = useRecoilState(toolState);
  const [ tools, setTools ] = useState([
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
  ]);
  const isDarkMode = useRecoilValue(darkState);

  const onClickFn = (name: string) => {
    if(activeTool === name) {
      setActiveTool(Tools.NONE);
      return;
    }
    setActiveTool(name);
  }

  useEffect(() => {
    if(isDarkMode) {
      setTools([
        {
          name: Tools.PEN,
          img: penWhite,
        },
        {
          name: Tools.HIGHLIGHTER,
          img: highlighterWhite,
        },
        {
          name: Tools.ERASER,
          img: eraserWhite,
        }
      ]);
    } else {
      setTools([
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
      ]);
    }
  }, [isDarkMode])
  
  return (
    <div className='relative w-full h-full'>
      <ControlContainer>
        {tools.map(({
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
        {tools.map(({
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
