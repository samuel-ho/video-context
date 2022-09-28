var express = require("express");
var router = express.Router();
require("dotenv").config();
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");
const getUuid = require("uuid-by-string");

//Initialising chime endpoint
const chime = new AWS.Chime({ region: "us-east-1" });
chime.endpoint = new AWS.Endpoint(
  "https://service.chime.aws.amazon.com/console"
);

// Get Request

router.get("/", function (req, res, next) {
  chimeSetup(req).then(function (data) {
    res.send(data);
  });
});

const chimeSetup = async (req) => {
  const meet = await chime.getMeeting({ MeetingId: req.query.yo }).promise();

  return meet;
};

router.get("/attendee", function (req, res, next) {
  getAttendee(req).then(function (data) {
    res.send(data);
  });
});

/* Need to add a token of some kind to make this secure */
const getAttendee = async (req) => {
  const attendeeName = await chime
    .listAttendeeTags({
      MeetingId: req.query.meeting,
      AttendeeId: req.query.attendee,
    })
    .promise();

  const name = attendeeName.Tags.find((item) => item.Key === "NAME").Value;

  return {
    AttendeeInfo: {
      Name: name,
    },
  };
};

// Post

router.post("/join", function (req, res, next) {
  chimeJoin(req).then(function (data) {
    res.send(data);
  });
});

const chimeJoin = async (req) => {
  let chatKey = getUuid(req.query.title, 3);
  let doesExist = await getMeetingIfExists(chatKey);
  if (doesExist.length == 0) {
    const meetingResponse = await chime
      .createMeeting({
        ClientRequestToken: uuid(),
        ExternalMeetingId: chatKey,
        MediaRegion: "us-east-1",
      })
      .promise();

    const attendeeResponse = await chime
      .createAttendee({
        MeetingId: meetingResponse.Meeting.MeetingId,
        ExternalUserId: uuid(),
        Tags: [
          {
            Key: "NAME",
            Value: req.query.name,
          },
        ],
      })
      .promise();

    return {
      MeetingResponse: meetingResponse,
      AttendeeResponse: attendeeResponse,
    };
  } else {
    const attendeeResponse = await chime
      .createAttendee({
        MeetingId: doesExist[0].MeetingId,
        ExternalUserId: uuid(),
        Tags: [
          {
            Key: "NAME",
            Value: req.query.name,
          },
        ],
      })
      .promise();
    return {
      MeetingResponse: doesExist[0],
      AttendeeResponse: attendeeResponse,
    };
  }
};

// Post util

const getMeetingIfExists = async (chatKey) => {
  try {
    const allMeetings = await chime.listMeetings().promise();
    return allMeetings.Meetings.filter(
      (item) => item.ExternalMeetingId === chatKey
    ).sort((a, b) => (a.MeetingId > b.MeetingId) ? 1 : ((b.MeetingId > a.MeetingId) ? -1 : 0));
  } catch {
    return [];
  }
};

// Delete

const deleteMeeting = async (req) => {
  try {
    await chime
      .deleteMeeting({
        meetingId: req.query.meeting,
      })
      .promise();
  } catch {
    return e;
  }
};

router.delete("/end", function (req, res, next) {
  deleteMeeting(req).then(function (data) {
    res.send("Deleted OK");
  });
});

module.exports = router;
