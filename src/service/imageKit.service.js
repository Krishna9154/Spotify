const {ImageKit,toFile} = require('@imagekit/nodejs')


const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


async function uriGenerator(buffer,originalname) {

  const response = await client.files.upload({
        file: await toFile(buffer, originalname),
        fileName: originalname,
  });
  return response

}

module.exports = uriGenerator