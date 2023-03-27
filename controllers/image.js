
const handleApiCall = (req, res, fetch) => {
  const PAT = process.env.API_CLARIFAI;
  const USER_ID = process.env.API_CLARIFAI_USER;       
  const APP_ID = 'Face-Detection';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
  const IMAGE_URL = req.body.input;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
  
  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id).increment('entries', 1).returning('entries')
    .then(entries => {
      res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('Unable to get entries.'))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}