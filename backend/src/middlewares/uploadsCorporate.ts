const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(_req: any, _file: any, cb: (arg0: null, arg1: string) => void) {
    cb(null, '../Frontend/ftwentytwo-app/src/assets/images/corporativo');
  },
  filename: async function(req: any, file: any, cb: (arg0: null, arg1: any) => void) {
    const namePhoto = `${req.params.id}.jpg`;
    cb(null, namePhoto);
  },
});

const uploadsCorporate = multer({ storage: storage });

export default uploadsCorporate;