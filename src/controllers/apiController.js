import Toilet from "../../models/Toilet";
import { findNearToilet, findBoxToilets } from "../../db";

export const getMaps = async (req, res) => {
  try {
    const toilets = await Toilet.find({});
    res.send(toilets);
    res.status(200);
  } catch (err) {
    res.status(400);
    console.log(err);
  } finally {
    res.end();
  }
};

export const postAddLatLng = async (req, res) => {
  try {
    const toilets = await Toilet.find({});
    let addressArr = [];
    for (const toilet in toilets) {
      let addressObj = {};
      addressObj["id"] = toilets[toilet]._id;
      addressObj["address"] = toilets[toilet].address;
      addressArr.push(addressObj);
    }
    res.send(addressArr);
    res.status(200);
  } catch (err) {
    res.status(400);
    console.log(err);
  } finally {
    res.end();
  }
};

export const getToilets = async (req, res) => {
  const {
    query: { latt, long },
  } = req;

  const toilets = await findNearToilet(latt, long);

  try {
    res.send(toilets);
  } catch (err) {
    res.status(400);
    console.log(err);
  } finally {
    res.end();
  }
};

export const getToiletDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  const toilet = await Toilet.findById({ _id: id });

  try {
    res.send(toilet);
  } catch (err) {
    res.status(400);
    console.log(err);
  } finally {
    res.end();
  }
};

export const getBoxToilet = async (req, res) => {
  const {
    body: { bl, ur },
  } = req;
  const toilets = await findBoxToilets(bl, ur);

  try {
    res.send(toilets);
  } catch (err) {
    res.status(400);
    console.log(err);
  } finally {
    res.end();
  }

  // findBoxToilets([127.374834, 36.3161141], [127.4427072, 36.3467431]);
};
