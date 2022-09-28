
import React from "react";
import CookieConsent from "react-cookie-consent"; 
import styled from 'styled-components';

import breakpoints from "../../styles/breakpoints"; 
import fonts from "../../styles/fonts"; 

const Container = styled.div`
    bottom: 0;
    left: 0;
    position: fixed;
    width: 100%;
    z-index: 99999;

    @media (min-width: ${breakpoints.smUp}px) {
        left: 60px;
        width: calc(100% - 60px);
    }
`;

const buttonStyle = {
    background: 'transparent',
    color: 'white',
	display: 'inline-block',
	fontFamily: fonts.fontFamily,
	fontSize: 'inherit',
    fontWeight: fonts.fontWeight.bold,
    margin: 0,
    padding: '1em',
	position: 'relative',
	textDecoration: 'none',
    transition: 'background-color 0.3s',
};
    
const bannerStyle = {
    alignItems: 'center',
    borderTopRightRadius: "12px",
    borderTopLeftRadius: "12px",
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    color: '#ededed',
    display: 'flex',
    minHeight: '70px',
    justifyContent: 'space-between',
    position: 'relative',
};

const CookieBanner = ()=> { 
    const cookieName = "30fCookie";  

    return (
        <Container>
            <CookieConsent 
                cookie="user-has-accepted-cookies" 
                location="bottom" 
                buttonText="Accept" 
                cookieName={cookieName} 
                style={bannerStyle} 
                buttonStyle={buttonStyle} 
                hideOnAccept={true} 
                expires={150} >
                Thirty Friends website uses cookies to enhance the user experience.{" "} 
            </CookieConsent> 
        </Container>
);
}
export default CookieBanner;