// External imports, installed libraries, etc
import React from 'react';
import styled from 'styled-components';
import _Emoji from 'react-emoji-render';

// Internal data, functions, custom hooks, etc
import fonts from '../../styles/fonts';
import breakpoints from '../../styles/breakpoints';

// Internal components, images, etc
import Box from '../Box';
import LoungeBoxTitleArea from '../Lounges/LoungeBoxTitleArea';
import LoungeBoxTitle from '../Lounges/LoungeBoxTitle';
import UserImage from '../UserImage';
import LeaderboardIcon from '../Assets/GameSamplerIcons/leaderboardicon.svg';
import Info from '../Assets/GameSamplerIcons/infoIcon.svg';
import User1 from '../Assets/LeaderboardFaces/user1.png';
import User2 from '../Assets/LeaderboardFaces/user2.png';
import User3 from '../Assets/LeaderboardFaces/user3.png';
import Paragraph from '../elements/Paragraph';

const TitleIcon = styled.img`
    margin-right: .5em;
`;

const Position = styled(Box)`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px;
`;

const Left = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

const UserWrapper = styled.div`
    align-items: center;
    display: flex;
    @media (min-width: ${breakpoints.smUp}px) {
        margin-left: 10px;
    }
`;

const EmojiWrapper = styled.div`
    align-items: center;
    display: flex;
    margin-left: 10px;
`;

const PositionRank = styled.span`
    display: none;

    @media (min-width: ${breakpoints.smUp}px) {
        color: #326ae8; 
        display: initial;
        font-weight: ${fonts.fontWeight.bold};
	}
`;

const Bold = styled.span`
    font-weight: ${fonts.fontWeight.bold};
`;

const Stats = styled.div`
    display: flex;
    flex-direction: column;
    font-size: .89em;
    margin-left: 15px;
    line-height: 1.5em;
`;

const Emoji = styled(_Emoji)`
    font-size: 19px;
`;

const EmojiAward = styled(_Emoji)`
    font-size: 19px;
    @media (min-width: ${breakpoints.smUp}px) {
        font-size: 36px;
	}
`;

const BottomText = styled.span`
    display: flex;
`;

const InfoIcon = styled.img`
    margin-right: 8px;
    margin-top: 5px;
`;

const Leaderboard = ({ marginBottom }) => {
    return (
        <Box marginBottom={marginBottom}>
            <LoungeBoxTitleArea>
                <LoungeBoxTitle>
                    <TitleIcon src={LeaderboardIcon} aria-hidden="true" alt={'Leaderboard icon'}/>
                    Leaderboard
                </LoungeBoxTitle>
            </LoungeBoxTitleArea>
            <Position hasShadow={false} background={"#F6F6F6"}>
                <Left>
                    <PositionRank>1</PositionRank>
                    <UserWrapper>
                        <UserImage height={55} width={55} userName={'Jameson'} src={User1} />
                    </UserWrapper>
                    <EmojiWrapper>
                        <Emoji text=":fire:" />
                    </EmojiWrapper>
                    <Stats>
                        <span><Bold>Jameson Fletcher</Bold></span>
                        <span><Bold>1000+</Bold> minutes in chat</span>
                        <span><Bold>70</Bold> chat rooms</span>
                    </Stats>
                </Left>
                <div>
                    <EmojiAward text=":trophy:" />
                </div>
            </Position>
            <Position hasShadow={false} background={"#F6F6F6"}>
                <Left>
                    <PositionRank>2</PositionRank>
                    <UserWrapper>
                        <UserImage height={55} width={55} userName={'Kristie'} src={User3} />
                    </UserWrapper>
                    <EmojiWrapper>
                        <Emoji text=":party_popper:" />
                    </EmojiWrapper>
                    <Stats>
                        <span><Bold>Kristie Owens</Bold></span>
                        <span><Bold>900+</Bold> minutes in chat</span>
                        <span><Bold>63</Bold> chat rooms</span>
                    </Stats>
                </Left>
                <div>
                    <EmojiAward text=":sports_medal:" />
                </div>
            </Position>
            <Position hasShadow={false} background={"#F6F6F6"}>
                <Left>
                    <PositionRank>3</PositionRank>
                    <UserWrapper>
                        <UserImage height={55} width={55} userName={'Shawn Dyer'} src={User2} />
                    </UserWrapper>
                    <EmojiWrapper>
                        <Emoji text=":sparkles:" /> 
                    </EmojiWrapper>
                    <Stats>
                        <span><Bold>Shawn Dyer</Bold></span>
                        <span><Bold>450+</Bold> minutes in chat</span>
                        <span><Bold>36</Bold> chat rooms</span>
                    </Stats>
                </Left>
                <div>
                    <EmojiAward text=":sports_medal:" />
                </div>
            </Position>
            <BottomText>
                <InfoIcon src={Info} height={14} alt="Information" />
                <Paragraph marginBottom={'0'}><small>On average our top users connect with 3 new friends per hour of time online!</small></Paragraph>
            </BottomText>
        </Box>
    );
}

export default Leaderboard;