import User from "../data-access/models/exModel";

async function saveUser() {
  const createdUser = new User({
    name: "test",
    email: "XXXXXXXXXXXXX",
    // etc..
  });
  await createdUser.save();
}
