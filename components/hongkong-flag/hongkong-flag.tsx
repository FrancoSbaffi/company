import { FC } from "react";
import { chakra, HTMLChakraProps } from "@chakra-ui/react";

const HongKongFlag: FC<HTMLChakraProps<"svg">> = (props) => (
  <chakra.svg
    viewBox="0 0 36 24"
    width="6"
    height="4"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Fondo rojo */}
    <rect width="36" height="24" fill="#de2910" rx="2" />
    {/* Flor Bauhinia blanca, fiel a la bandera oficial */}
    <g transform="translate(18 12) scale(0.7)">
      <g fill="#fff">
        <path d="M0,-8 
          C2,-8 5,-5 4,-3.5 
          C3,-1.5 0,-2.5 0,-5 
          Q1,-3 2,-2
          Q1.5,-5 0,-8Z" />
        <path d="M6,-2 
          C7.5,-0.5 6,3 4,2.5
          C2,2 3,-1 5,-1
          Q4,0 4.2,1
          Q5,-2 6,-2Z" transform="rotate(72)" />
        <path d="M6,-2 
          C7.5,-0.5 6,3 4,2.5
          C2,2 3,-1 5,-1
          Q4,0 4.2,1
          Q5,-2 6,-2Z" transform="rotate(144)" />
        <path d="M6,-2 
          C7.5,-0.5 6,3 4,2.5
          C2,2 3,-1 5,-1
          Q4,0 4.2,1
          Q5,-2 6,-2Z" transform="rotate(216)" />
        <path d="M6,-2 
          C7.5,-0.5 6,3 4,2.5
          C2,2 3,-1 5,-1
          Q4,0 4.2,1
          Q5,-2 6,-2Z" transform="rotate(288)" />
      </g>
      {/* Puntos rojos dentro de los pétalos */}
      <g fill="#de2910">
        <circle r="0.6" cx="2.5" cy="-4.5" />
        <circle r="0.6" cx="4" cy="-0.5" transform="rotate(72)" />
        <circle r="0.6" cx="4" cy="-0.5" transform="rotate(144)" />
        <circle r="0.6" cx="4" cy="-0.5" transform="rotate(216)" />
        <circle r="0.6" cx="4" cy="-0.5" transform="rotate(288)" />
      </g>
    </g>
  </chakra.svg>
);

export default HongKongFlag;
