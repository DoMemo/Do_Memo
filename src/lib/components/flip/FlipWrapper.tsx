import { TodoService } from 'lib/service/TodoService';
import { toolState } from 'lib/store/ToolState';
import { todoOrderState } from 'lib/store/todoStore/todoOrderState';
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';

const FlipWrapper = ({ scroll, list, children }: {
  scroll: number;
  list: any;
  children: React.ReactNode;
}) => {
  const [ todoOrder, setTodoOrder ] = useRecoilState(todoOrderState);
  const currentTool = useRecoilValue(toolState);
  const rectMap = useRef<Map<string, DOMRect>>(new Map()).current;
  const wrapperElement = useRef<HTMLDivElement>(null);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if(!destination) return;

    const destinationIndex = destination.index;
    const sourceIndex = source.index;
    const newOrder = Array.from(todoOrder);

    newOrder.splice(sourceIndex, 1);
    newOrder.splice(destinationIndex, 0, Number(draggableId));
    setTodoOrder(newOrder);
    TodoService.updateTodoOrder(newOrder);
  }

  useEffect(() => {
    const flippers = document.querySelectorAll('.fliper');
    flippers.forEach((flipper) => {
      const currentRect = flipper.getBoundingClientRect();
      const id = flipper.id;
      if(id) {
        rectMap.set(id, currentRect);
      }
    });
  }, [rectMap, scroll, currentTool]);

  useLayoutEffect(() => {
    const filppers = document.querySelectorAll('.fliper');

    filppers.forEach((flipper) => {
      const cachedRect = rectMap.get(flipper.id);
      
      const nextRect = flipper.getBoundingClientRect();
      if(cachedRect) {

        flipper.animate([
          {
            transform: `translateY(${cachedRect.top - nextRect.top}px)`,
          },
          {
            transform: `translateY(0px)`,
          },
        ], {
          duration: 300,
          easing: 'ease-in-out',
        });

      }
      rectMap.set(flipper.id, nextRect);
    })
  }, [rectMap, list]);
  return (
    <div ref={wrapperElement}>
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        {children}
      </DragDropContext>
    </div>
  )
}

export default FlipWrapper
