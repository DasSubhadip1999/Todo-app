const mongooseModule = require(__dirname + "/mongoose.js");

//fetch lists
exports.fetchLists = async () => {
  try {
    let res = await mongooseModule.ListingModel.find({});
    return res;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteItem = async (id) => {
  try {
    let res = await mongooseModule.ListingModel.deleteOne({ _id: id });
    return res;
  } catch (error) {
    console.log(error);
  }
};
