import React from "react";
import { useDrag } from "react-dnd";
import { ComponentContainer } from "./StyledComponents";
import { ItemTypes } from "./ItemTypes";

interface ComponentProps {
  type: string;
}

const Component: React.FC<ComponentProps> = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <ComponentContainer ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {type}
    </ComponentContainer>
  );
};

export default Component;
