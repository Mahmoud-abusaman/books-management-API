const app = require("./app");
const { connectToDB } = require("./db");

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectToDB();
    app.listen(port, () => {
      console.log(`Server is runing on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
