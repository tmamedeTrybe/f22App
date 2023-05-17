const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(_req: any, _file: any, cb: (arg0: null, arg1: string) => void) {
    cb(null, "../Frontend/ftwentytwo-app/src/assets/images/casamentos");
  },
  filename: async function(req: any, file: any, cb: (arg0: null, arg1: any) => void) {
    const namePhoto = `${req.params.id}.jpg`;
    cb(null, namePhoto);
  },
});

const uploads = multer({ storage: storage });

export default uploads;