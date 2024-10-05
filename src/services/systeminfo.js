const si = require("systeminformation");

function gather() {
  return new Promise((resolve, reject) => {
    si.cpu()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error));
  });
}

module.exports = {
  gather,
};
