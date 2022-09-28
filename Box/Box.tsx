// External imports, installed libraries, etc
import React from "react";
import styled from "styled-components";

// Internal data, functions, custom hooks, etc
import colors from "../../styles/colors";

// Internal components, images, etc

export const boxPaddingVertical = 1;
export const boxPaddingHorizontal = 1.05;
export const boxBorderRadius = '10px';

interface ComponentProps {
  children?: any;
  className?: string;
  marginbottom?: number;
  marginBottom?: number;
  hasShadow?: boolean;
  background?:string;
}

const Box = styled.div<ComponentProps>`
  background: ${colors.white};
  border-radius: ${boxBorderRadius};
  box-shadow: ${(props) => props.hasShadow ? '0px 4px 10px rgba(0, 0, 0, 0.1);': '' } 
  margin-bottom: ${(props) => props.marginbottom};
  padding: ${boxPaddingVertical}rem ${boxPaddingHorizontal}rem;
  background: ${(props) => props.background };
`;

const Component = ({ children, className, marginBottom, hasShadow, background }: ComponentProps) => {
  return (
    <Box className={className} marginbottom={marginBottom} hasShadow={hasShadow} background={background}>
      {children}
    </Box>
  );
};

Component.defaultProps = {
	hasShadow: true,
};

export default Component;
