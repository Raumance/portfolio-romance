const Profile = require('../models/Profile');

exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne() || await Profile.create({});
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    });
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
