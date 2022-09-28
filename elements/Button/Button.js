// External imports, installed libraries, etc
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

// Internal data, functions, custom hooks, etc
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import buttonColors from "./buttonColors";

// Internal components, images, etc
import { AnchorStyles } from "../Anchor";

const blueButtonBackground = {
  normal:
    "linear-gradient(140deg," +
    buttonColors.blue.top +
    "," +
    buttonColors.blue.bottom +
    ")",
  hover:
    "linear-gradient(140deg," +
    buttonColors.blue.topDark +
    "," +
    buttonColors.blue.bottomDark +
    ")",
};

const SolidButtonStyles = css`
  background: ${(props) =>
    props.color
      ? "linear-gradient(140deg," +
        buttonColors[props.color].top +
        "," +
        buttonColors[props.color].bottom +
        ")"
      : blueButtonBackground.normal};
  border: 1px solid ${(props) => props.color && buttonColors[props.color].top};
  color: ${(props) => 
    props.color === colors.black ? colors.black : colors.white
    };
  padding: 12px 19px;

  &:hover,
  &:focus {
    background: ${(props) =>
      props.color
        ? "linear-gradient(140deg," +
          buttonColors[props.color].hover.top +
          "," +
          buttonColors[props.color].hover.bottom +
          ")"
        : blueButtonBackground.hover};
    border-color: ${(props) =>
      props.color && buttonColors[props.color].hover.top};
      color: ${(props) => 
      props.color === colors.black ? colors.black : colors.white
      }
`;

const HollowButtonStyles = css`
  background: ${colors.white};

  border: 2px solid
    ${(props) =>
      props.color ? buttonColors[props.color].solid : 'buttonColors.blue.solid'};

  color: ${(props) =>
    props.color ? buttonColors[props.color].solid : buttonColors.blue.solid};

  padding: 12px 19px;

  &:hover,
  &:focus {
    background: ${(props) =>
      props.color
        ? "linear-gradient(140deg," +
          buttonColors[props.color].top +
          "," +
          buttonColors[props.color].bottom +
          ")"
        : blueButtonBackground.hover};
    border-color: ${(props) =>
      props.color
        ? buttonColors[props.color].hover.top
        : buttonColors.blue.solid};

    color: ${(props) => props.color && buttonColors[props.color].hover.color};
  }
`;

export const ButtonStyles = css`
  align-items: center;
  border-radius: 35px;
  display: inline-flex;
  font-family: ${fonts.fontFamily};
  font-weight: ${fonts.fontWeight.bold};
  justify-content: center;
  margin-bottom: ${(props) => props.marginbottom && props.marginbottom + `em`};
  text-decoration: none;
  transition: background-color 0.3s, border-color 0.3s;

  ${(props) => props.variant === "solid" && SolidButtonStyles};
  ${(props) => props.variant === "hollow" && HollowButtonStyles};

  &:disabled {
    background: #efefef;
    border-color: #cccccc;
    color: #adadad;
    cursor: auto;
  }
`;

const ButtonTag = styled.button`
  ${(props) => props.styleas === "button" && ButtonStyles};
  ${(props) => props.styleas === "link" && AnchorStyles};

  &:hover {
    text-decoration: ${
      (props) => props.styleas === 'button' ? 'none' : 'none'
    }
  }
`;

const Component = ( { children, className, styleas, title, onClick, marginBottom, color, variant, type, disabled, ariaLabel } ) => {
	return (
		<ButtonTag className={className}
				   styleas={styleas}
				   title={title} 
				   onClick={onClick} 
				   marginbottom={marginBottom}
				   color={color}
				   variant={variant}
				   type={type}
           disabled={disabled}
           aria-label={ariaLabel}
           >
			{children}
		</ButtonTag>
	);
}

export default Component;

Component.defaultProps = {
  styleas: "button",
  color: "blue",
  variant: "solid",
};

Component.propTypes = {
	children: PropTypes.any,
	styleas: PropTypes.oneOf(['button', 'link']),
	title: PropTypes.string,
	marginbottom: PropTypes.number,
	color: PropTypes.oneOf(['blue', 'red', '#D1373D', '#D60710', 'orange']),
	variant: PropTypes.oneOf(['solid', 'hollow']),
	type: PropTypes.oneOf(['reset', 'button', 'submit']),
};
