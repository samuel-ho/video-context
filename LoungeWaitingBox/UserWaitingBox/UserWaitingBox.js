// External imports, installed libraries, etc
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router';

import useWindowSize from '../../../hooks/useWindowSize'
import breakpoints from '../../../styles/breakpoints'
import { readyHandler } from '../../../utils/LoungePage/readyHandler'
import { formatTime } from '../LoungeUtils/LoungeUtils'

import Button from '../../elements/Button'
import Paragraph from '../../elements/Paragraph'
import SrOnly from '../../SrOnly'
import UserImage from '../../UserImage/UserImage'
import ChatGuestsLoading from '../ChatGuestsLoading'
import UserLoungeStatus from './UserLoungeStatus'
import LoungeGuest from '../../LoungePeopleBox/LoungeGuests/LoungeGuest'
import { readyAPISetter } from '../../../utils/LoungePage/readyAPISetter'
import { createMeetingRequest } from '../../../hooks/createMeetingRequest/createMeetingRequest'
import rejoinChat from '../../../hooks/rejoinChat/rejoinChat';

const MainUserStatus = styled.div`
  align-items: center;
  display: flex;
`

const UserImageWrapper = styled.div`
  margin-right: 1.7em;
`

const MainContent = styled.div`
  text-align: center;
  padding: ${props => (!props.isReady ? '2em 0' : '2em 0 0')};
`

const JoinParagraph = styled(Paragraph)`
  max-width: 675px;
  margin: 0 auto 0.5em;
  :last-of-type {
    margin-bottom: 1.5em;
  }
`

const SkeletonContainer = styled.div`
  display: inline-block;
  width: 50%;
  @media (min-width: ${breakpoints.smUp}px) {
    width: 33%;
  }
  @media (min-width: ${breakpoints.mdUp}px) {
    width: 20%;
  }
`

export const Component = ({
  loungeId,
  isReady,
  user,
  setReadiness,
  timeLeft,
  totalWaveTime,
  setIsLeaveDisabled,
  randomGroup,
  notEnoughUsers
}) => {
  const { width: currentWidth } = useWindowSize()
  const history = useHistory()
  const [width, setWidth] = useState(currentWidth)
  const mobileViewDownSize = 430
  const isMobile = width < mobileViewDownSize
  const [hideButton, setHideButton] = useState(false)
  const JOIN_CUTT_OFF = parseInt(
    `${process.env.REACT_APP_CHAT_RANDOMISER_CUT_OFF}`
  )
  totalWaveTime = Math.floor(totalWaveTime / 60)
    
  useEffect(() => {
    if (currentWidth !== width) setWidth(currentWidth)
  }, [currentWidth, width])

  useEffect(() => {
    timeLeft <= JOIN_CUTT_OFF ? setHideButton(true) : setHideButton(false)
  }, [timeLeft, JOIN_CUTT_OFF])

  const skeletonJson = { id: 'skeleton' }
  let [guestsLoadingArr] = useState([
    skeletonJson,
    skeletonJson,
    skeletonJson,
    skeletonJson,
    skeletonJson
  ])
  let [loadingSkeletonCount, setLoadingSkeletonCount] = useState(0)

  useEffect(() => {
    if (timeLeft < JOIN_CUTT_OFF && loadingSkeletonCount < randomGroup.length) {
      const interval = setInterval(() => {
        guestsLoadingArr[loadingSkeletonCount] =
          randomGroup[loadingSkeletonCount]
        setLoadingSkeletonCount(loadingSkeletonCount + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [
    timeLeft,
    randomGroup,
    JOIN_CUTT_OFF,
    loadingSkeletonCount,
    guestsLoadingArr
  ])

  const formatWaveTime = timeRemaining => {
    if (timeRemaining > JOIN_CUTT_OFF) {
      timeRemaining = timeRemaining - JOIN_CUTT_OFF
    }
    return (
      <>
        {formatTime(timeRemaining)}
        <SrOnly> seconds</SrOnly>
      </>
    )
  }

  return (
    <>
      <MainUserStatus>
        {!isMobile && (
          <UserImageWrapper>
            <UserImage
              src={user.picture}
              userName={user.name}
              height={70}
              width={70}
            />
          </UserImageWrapper>
        )}

        <UserLoungeStatus
          isReady={isReady}
          userId={user.id}
          setReadiness={setReadiness}
          readyHandler={readyHandler}
          timeLeft={timeLeft}
          setIsLeaveDisabled={setIsLeaveDisabled}
          hideButton={hideButton}
        />
      </MainUserStatus>
      <MainContent isReady={isReady}>
        {!isReady ? (
          <>
            {timeLeft > JOIN_CUTT_OFF ? (
              <>
                <JoinParagraph>Join a chat with a new group now.</JoinParagraph>
                <JoinParagraph>
                  To ensure you don't have to wait {totalWaveTime} minutes for
                  the next wave of chats to start
                  <br /> join within {formatWaveTime(timeLeft)}.
                </JoinParagraph>
              </>
            ) : (
              <>
                <JoinParagraph>
                  You have missed the wave cut off point. After{' '}
                  {formatTime(timeLeft)}, you will be able to join the next chat
                  wave.
                </JoinParagraph>
                <h1> OR </h1>
                <Button
                  onClick={() => {
                    // use setRandomGroup to update randomGroup state
                    readyAPISetter(user.id, isReady)
                    rejoinChat(loungeId, user.id).then(item => {

                      var flag = 0
                      for (let i = 0; i < randomGroup.length; i += 1) {
                        if (randomGroup[i].groupName == item.groupName) {
                          flag = 1
                          break
                        }
                      }

                      if ((flag = 0)) {
                        createMeetingRequest(item.data.groupName, user.name, "eu-west-1")
                      }

                      if (item?.data?.groupName) {
                        history.push(
                          `/video/chat?title=${item.data.groupName}&name=${
                            user.name
                          }&region=${'eu-west-1'}&lid=${user.currentLoungeId}`
                        )
                      }
                    })
                  }}
                >
                  {' '}
                  Join existing chat
                </Button>
              </>
            )}
            {!hideButton && (
              <Button
                color={'blue'}
                onClick={() => {
                  readyHandler(user.id, setReadiness, isReady)
                }}
              >
                Join a chat
              </Button>
            )}
          </>
        ) : (
          <>
            {notEnoughUsers === true ? (
              <JoinParagraph>
                Unfortunately not enough users were ready, please wait till the
                next chat wave
              </JoinParagraph>
            ) : (
              guestsLoadingArr.map((user, i) => {
                return (
                  <SkeletonContainer key={`LOADINGUSER_${i}`}>
                    {user.id === 'skeleton' ? (
                      <ChatGuestsLoading />
                    ) : (
                      <LoungeGuest picture={user.picture} name={user.name} />
                    )}
                  </SkeletonContainer>
                )
              })
            )}
          </>
        )}
      </MainContent>
    </>
  )
}

export default Component

Component.propTypes = {
  loungeId: PropTypes.string,
  isReady: PropTypes.bool,
  user: PropTypes.object,
  setReadiness: PropTypes.func,
  timeLeft: PropTypes.any,
  totalWaveTime: PropTypes.number,
  setIsLeaveDisabled: PropTypes.func
}
