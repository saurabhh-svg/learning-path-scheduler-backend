const router = require("express").Router();
const Enroll = require("../models/enroll");
const moment = require("moment");
const Hrwise = require("../models/register.js");

router.post("/enroll", async (req, res) => {
  const { course, hours, date } = req.body;
  const hrwiseData = await Hrwise.find({ hrsPerDay: hours });
  const hrwiseid = hrwiseData[0]._id;
  const newEnroll = new Enroll({
    course,
    hours,
    date,
    schedule: hrwiseid,
  });
  try {
    const savedEnroll = await newEnroll.save();
    const populatedEnroll = await Enroll.findById(savedEnroll._id).populate(
      "schedule"
    );

    const currDate = moment(populatedEnroll.date).add(1, "days");

    for (let i = 0; i < populatedEnroll.schedule.schedule.length; i++) {
      // console.log(currDate.day());
      if (currDate.day() === 0) {
        currDate.add(1, "days");
      } else if (currDate.day() === 6) {
        currDate.add(2, "days");
      }
      populatedEnroll.schedule.schedule[i].date = currDate.format("YYYY-MM-DD");
      currDate.add(1, "days");
    }
    res.status(200).json(populatedEnroll);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
