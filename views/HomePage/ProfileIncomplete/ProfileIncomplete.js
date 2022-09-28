import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ImageUploader from "react-images-upload";
import imageCompression from "browser-image-compression";
import _ReactTooltip from "react-tooltip";

import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import uniqueId from "../../../utils/uniqueId";

import Modal from "../../../components/Modals";
import TFlogo from "../../../components/Assets/LogoIcon";
import _H2 from "../../../components/elements/H2";
import socialicons from "../../../components/Assets/images/socialIcons.png";
import Button from "../../../components/elements/Button";
import Loader from '../../../components/Loader';
import TermsAndConditions from '../../../components/TermsAndConditions/TermsAndConditions.js';

const Body = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const FormCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 1em;
  max-width: 430px;
  text-align: center;
`;

const TopColour = styled.div`
  background-color: ${colors.grey[1]};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 15px;
`;

const IMG = styled.div`
  padding: 5%;
`;

const H2 = styled(_H2)`
  font-size: 1.2rem;
`;

const Span = styled.span`
  color: #bf1650;
  font-size: 12px;
  margin-bottom: 5px;

  &::after {
    content: " ⚠ ";
    display: inline;
  }
`;

const Input = styled.input`
  border-style: solid;
  border-color: #f1f1f1;
  display: block;
  flex-basis: 100%;
  padding: 15px;
  font-size: 18px;
  margin-bottom: 10px;
  transition: all 0.2s ease-in-out;
  width: 100%;
  -webkit-transition: all 0.2s ease-in-out;

  &::placeholder {
    transition: all 0.2s ease-in-out;
    color: #999;
    font: 18px Helvetica, Arial, sans-serif;
  }

  &:focus,
  &.populated {
    &::placeholder {
      color: transparent;
    }
  }
`;

const Wrapper = styled.div`
  margin-bottom: 20px;
  position: relative;
  width: 100%;

  & ${Input} {
    margin-bottom: 0;
    width: calc(100% - 90px);
  }
`;

const ReactTooltip = styled(_ReactTooltip)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const HelperWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
`;

const Helper = styled.span`
  color: ${colors.grey[5]};
  cursor: pointer;
  display: block;
  font-size: 1.4em;
  font-weight: ${fonts.fontWeight.bold};
  width: 50px;
`;

const HelperText = styled.span`
  display: block;
  font-size: 1.2rem;
  text-align: left;
`;

const BoldHelperText = styled.span`
  font-weight: bolder;
  font-size: 1.3rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  padding: 1em;
`;

const TermsWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const TermsContentWrapper = styled.div`
  max-height: 500px;
  overflow-y: scroll;
  margin: 15px;
`

const CheckBox = styled.input`
  height: 1.4em;
  margin-left: 15px;
  width: 1.4em;
`;

const Submit = styled.input`
  background-color: #ea5323;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  color: white;
  display: inline-block;
  font-size: 16px;
  padding: 5%;
  text-align: center;
  text-decoration: none;
  width: 100%;
`;

const ProfileBuilder = ({ onSubmit, setUserProfileBuild, userProfileBuild, imageInvalid, profileSubmissionViewIsLoading }) => {
  const { register, handleSubmit, errors } = useForm();

  const handleChange = (event) => {
    setUserProfileBuild({
      ...userProfileBuild,
      [event.target.name]: event.target.value,
    });
  };

  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.openModal();
  };

  const closeModal = () => {
    modalRef.current.closeModal();
  };

  async function handleImageUpload(event) {
    if (event[0] == null) {
      return
    }
    // const imageFile 
    const imageFile = event[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);

      await imageCompression.getDataUrlFromFile(compressedFile).then((res) => {
        setUserProfileBuild({
          ...userProfileBuild,
          picture: res.split(",").pop(),
        });
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function validateInput(input) {
    var letters = /^[A-Za-z ]+$/;
    return input.match(letters) ? true : false;
  }

  return (
    profileSubmissionViewIsLoading ? (
      <>
        <Loader />
      </>
    ) : (
        <>
          <Body>
            <FormCard>
              <TopColour>
                <IMG>
                  <TFlogo uniqueId={uniqueId} />
                </IMG>
              </TopColour>
              <H2>Account Information</H2>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <InputWrapper>
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={userProfileBuild.name}
                    onChange={handleChange}
                    ref={register({ required: true, maxLength: 30, validate: validateInput })}
                  />
                  {errors.name && errors.name.type === "required" && <Span>Name is required</Span>}
                  {errors.name && errors.name.type === "maxLength" && <Span>Max length exceeded</Span>}
                  {errors.name && errors.name.type === "validate" && <Span>Please enter a valid name</Span>}
                  <Input
                    type="text"
                    placeholder="Hometown"
                    name="town"
                    value={userProfileBuild.town}
                    onChange={handleChange}
                    ref={register({ required: true, maxLength: 35, validate: validateInput })}
                  />
                  {errors.town && errors.town.type === "required" && <Span>Hometown is required</Span>}
                  {errors.town && errors.town.type === "maxLength" && <Span>Max length exceeded</Span>}
                  {errors.town && errors.town.type === "validate" && <Span>Please enter a valid Hometown</Span>}
                  <Input
                    type="text"
                    placeholder="Major"
                    name="major"
                    value={userProfileBuild.major}
                    onChange={handleChange}
                    ref={register({ required: true, maxLength: 25, validate: validateInput })}
                  />
                  {errors.major && errors.major.type === "required" && <Span>Major is required</Span>}
                  {errors.major && errors.major.type === "maxLength" && <Span>Max length exceeded</Span>}
                  {errors.major && errors.major.type === "validate" && <Span>Please enter a valid Major</Span>}
                  <Wrapper>
                    <Input
                      type="text"
                      placeholder="Contact Detail (Optional)"
                      name="otherContact"
                      value={userProfileBuild.otherContact}
                      onChange={handleChange}
                      ref={register({ required: false })}
                    />
                    <HelperWrapper>
                      <Helper data-tip data-for="contactDetail">
                        ?
                  </Helper>
                    </HelperWrapper>
                    <ReactTooltip
                      id="contactDetail"
                      delayHide={1000}
                      effect="solid"
                      place="right"
                      type="light"
                    >
                      <HelperText>
                        {" "}
                        <BoldHelperText>Contact Detail:</BoldHelperText> <br />
                    This will stay private until you <br />
                    choose to share it with a <br />
                    new friend 😄 <br />
                        <img src={socialicons} alt="Logo" />
                      </HelperText>
                    </ReactTooltip>
                  </Wrapper>
                  <ImageUploader
                    withIcon={false}
                    buttonText="Choose a Profile picture (Optional)"
                    onChange={(e) => handleImageUpload(e)}
                    withPreview={true}
                  />
                  <TermsWrapper>
                    <Button onClick={() => openModal()} type="button" styleas="link">
                      Agree to the terms and conditions
                </Button>
                    <CheckBox
                      type="checkbox"
                      name="Agree"
                      ref={register({ required: true })}
                    />
                  </TermsWrapper>
                  {errors.Agree && <Span>Must agree to terms and conditions</Span>}
                </InputWrapper>
                <Modal ref={modalRef}>
                  <H2>Terms and Conditions</H2>
                  <TermsContentWrapper>
                    <TermsAndConditions />
                  </TermsContentWrapper>
                  <Button
                    type="button"
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    Close
              </Button>
                </Modal>
                <Submit type="submit" />
              </form>
            </FormCard>
          </Body>
        </>
      )

  );
};
export default ProfileBuilder;
