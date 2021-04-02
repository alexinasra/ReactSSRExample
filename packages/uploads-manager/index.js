const { createWriteStream, createReadStream, mkdirSync, readdirSync } = require('fs');
const path = require("path");


const PROFILE_PICTURE = 'profile-picture.png';
const COVER = 'cover.png';
const DOCUMENTS = 'documents';

function applyMiddleware({
  uploadsDir,
  baseUrl = '/uploads',
}) {
  return (req, res, next) => {
    if(!req.uploadsManager) {
      req.uploadsManager = {
        initUserDirectory: async (userId) => {
          return mkdir (t_dir, { recursive });
        },
        saveProfilePicutre(userId, stream): {

        },
        saveFile: ({
          userId,
          filename,
          stream,
          saveTo = ""
        }) => {
          const savePath = path.resolve(
            uploadsDir,
            userId,
            saveTo
          )


        },
      };
    }
    next();
  }
}
const rootDir = path.join(__dirname, "../../../uploads/user_data/")
const rootUrl = '/uploads/user_data';
const defaultProfilePicture = require.resolve('@foodle/assets/public/defaults/default-profile-picture.png');

function getHomeDir(userId) {
  return path.join(rootDir, userId);
}
function getProfilePicturesDir(userId) {
  return path.join(getHomeDir(userId), 'profile-pictures');
}
function getItemsDataDir(userId, itemId) {
  return path.join(getHomeDir(userId), 'items-data', itemId);
}
function getHomeUrl(userId) {
  return path.join(rootUrl, userId)
}
function getProfilePictureUrl(userId, filename) {
  return path.join(getHomeUrl(userId), 'profile-pictures', filename);
}
function getItemsDataUrl(userId, itemId, filename) {
  return path.join(getHomeUrl(userId), 'items-data', itemId, filename);
}

async function addProfilePicture(userId, stream, filename) {
  const t_dir = getProfilePicturesDir(userId);
  await new Promise((res,rej) =>
      stream
        .pipe(
          createWriteStream(
            path.join(t_dir, filename)
          )
        )
        .on("error", rej)
        .on("close", res)
    );
}

async function addFileToItem(userId, itemId, stream, filename) {
  const t_dir = getItemsDataDir(userId, itemId);
  mkdirSync(t_dir, { recursive: true });
  console.log(`writing file (${filename})`)
  await (new Promise(function(resolve, reject) {
    console.log(`start writing file (${filename})`)
    const wstream = createWriteStream(path.join(t_dir, filename))
    wstream.on('error', reject).on('finish', ()=>{
      console.log(`done writing file (${filename})`)
      resolve();
    });

    stream
      .pipe(wstream)
        .on('data', (chunk) => {
          console.log(`Received ${chunk.length} bytes of data.`);
        })
        .on('error', reject)
  }));
}

async function createHomeDir(userId) {
  mkdirSync(getHomeDir(userId), { recursive: true });
  mkdirSync(getProfilePicturesDir(userId));
  const ppicStream = await createReadStream(defaultProfilePicture);
  await addProfilePicture(userId, ppicStream, 'default-profile-picture.png');
}

function getProfilePictures(userId) {
  return readdirSync(getProfilePicturesDir(userId));
}



module.exports = {
  getHomeDir,
  getProfilePicturesDir,
  getHomeUrl,
  getProfilePictureUrl,
  addProfilePicture,
  createHomeDir,
  getProfilePictures,
  addFileToItem,
  getItemsDataUrl,
  getItemsDataDir,
}
