import { keyframes } from 'styled-components';

export const loader = keyframes`
   0% { left: -100px }
  100% { left: 110%; }
`
export const animate = keyframes`
  17% { border-bottom-right-radius: 3px; }
  25% { transform: translateY(9px) rotate(22.5deg); }
  50% {
    transform: translateY(18px) scale(1,.9) rotate(45deg) ;
    border-bottom-right-radius: 40px;
  }
  75% { transform: translateY(9px) rotate(67.5deg); }
  100% { transform: translateY(0) rotate(90deg); }
`
export const shadow = keyframes`
  50% {
    transform: scale(1.2,1);
  }
`
export const colourAnimate = keyframes`
  16% { background: #FDBE11 }
  33% { background: #01B7A2 }
  49% { background: #4789C8 }
  65% { background: #BA7CAC }
  81% { background: #F15473 }
  97% { background: #F47A3D }
`

