// External imports, installed libraries, etc
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import colors from '../../styles/colors';
import DefaultProfileIcon from "../Assets/ProfileIcons/DefaultProfileIcon"

interface SpanProps {
	height?: number;
	width?: number;
	userName?: string;
}
const Span = styled.span<SpanProps>` 
	align-items: center;
	background: ${colors.grey[2]};
	border-radius: 50%;
	display: inline-flex;  
	height: ${props => props.width}px;
	justify-content: center;
	min-width: ${props => props.width}px;
	overflow: hidden;
	position: relative;
	width: ${props => props.width}px;
`;

interface ImgProps {
	tabIndex?: any;
}
const Image = styled.img<ImgProps>`
	display: inline-block;
	margin: 0 auto;
	width: 100%;
	height: 100%;
`;

interface UserImageProps {
	height?: number;
	width?: number;
	src: string;
	userName: string;
	className?: string;
	ariaHidden?: boolean;
}
const UserImage = ({ height, width, src, userName, className, ariaHidden = false }: UserImageProps) => {
	const [imageLoaded, setImageLoaded] = useState(true);
	const [secs, setSecs] = useState(0);
	const [numOfRetries, setNumOfRetries] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const noThumb = src.replace("thumbs", "images");

	const setLoaded = () => {
		setImageLoaded(true);
		setIsLoading(false);
		setNumOfRetries(0);
	}

	useEffect(() => {
		if (!imageLoaded && numOfRetries <= 3) {
			const timer =  setInterval(() => {setImageLoaded(true)}, secs);
			setSecs(secs + 300000)
			setNumOfRetries(numOfRetries + 1)
			return () => clearInterval(timer);
		}
	  }, [imageLoaded, numOfRetries, secs]);

	  useEffect(() => {
		setImageLoaded(true)
	  }, [src]);

	return (
		<Span className={className} height={height} width={width} userName={userName} aria-hidden={ariaHidden}>
			{isLoading &&
				<DefaultProfileIcon className={""} height={height} width={width}/> 
			}
			{imageLoaded ?
				<Image src={src} onLoad={() => setLoaded()} alt={`User image of ${userName}`} onError={() => setImageLoaded(false)} tabIndex="-1"/> 	:
				null
			}			
		</Span>
	);
}

export default UserImage;


UserImage.defaultProps = {
	height: 44,
	width: 44,
};

UserImage.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
};
