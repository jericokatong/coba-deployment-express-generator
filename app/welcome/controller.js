const getHomePage = async (req, res) => {
  try {
    res.json("Welcome to jerico api");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getHomePage,
};
