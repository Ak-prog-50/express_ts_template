import UserModel from "../data-access/models/exModel";

async function saveUser() {
  const createdUser = new UserModel({
    name: "test",
    email: "XXXXXXXXXXXXX",
    // etc..
  });
  return await createdUser.save();
}

export default { saveUser };
