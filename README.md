# Developing with QRL
## A JS-based guide using Meteor

This guide is intended to get you up a running with using the QRL’s ecosystem.  For the purposes of this guide, we’ll be using [Meteor](https://www.meteor.com/) but the same principles could be applied to most (if not all) JavaScript based ecosystems.

If you’re interested in contributing to this guide, or transposing it into another JS environment, [get in touch](mailto:info@theqrl.org) with the QRL dev team or submit pull requests to this repo.

### 1. Getting started

You’ll need to have Meteor installed.  On OSX/Linux this is a case of running:

``curl https://install.meteor.com/ | sh``

from your console.  For more details and Windows instructions, see the [Meteor installation site](https://www.meteor.com/install).

Once Meteor is available on your system, which you can verify by entering

``meteor --version``

at the console, you’ll need to create a bare-bones Meteor app.  Change to an appropriate directory and enter:

``meteor create QRLapp --minimal``

Meteor will bootstrap a minimal new app with bare-bones packages.  Once it’s done, enter the newly created QRLapp’s directory:

``cd QRLapp``

Meteor’s minimal app is missing a crucial component in developing with the QRL: **QRLLIB**, our multi-language library opening up access to all of the QRL’s API.  For JavaScript development, this is hosted on npmjs and can be installed with:

### 2. Installing QRLLIB

``meteor npm install qrllib``

You should see ``+ qrllib@1.0.4`` in the console to indicate the package has been added to the project.

### 3. Running the development server

We need another basic meteor package installed:

``meteor add meteor-base``

You’re now ready to get started with writing code.  Meteor has an inbuilt development platform which you can start by entering the QRLapp directory, then entering:

``meteor``

If all is well, you should see:

``=> App running at: http://localhost:3000/`` in your console.

In a browser, open up [http://localhost:3000](http://localhost:3000)

### 4. Putting together a rudimentary UI

Not very exciting… so let’s do something QRL-related.

In the Meteor ecosystem, everything in the _client_ folder is only run on the client, whilst everything in the _server_ folder is only run on the server.

Open the _client/main.html_ file and replace the whole file with:

```
<head>
  <title>QRLapp</title>
</head>

<body>

  <h1>QRL Meteor Tutorial app</h1>
  <p>
    Click the button to generate a QRL address
  </p>

  <button id='generateButton'>Generate</button>

  <p id='output'></p>
  
</body>
```

Go back to your browser and reload.  You should now see some (ugly!) UI elements… but note that they don’t do anything yet!

### 5. Using QRLLIB within the client

To access the QRL API, we’ll need to access the QRLLIB module installed earlier.  Replace the whole of the _client/main.js_ file with the line:

```
import { QRLLIBload } from 'qrllib/build/offline-libjsqrl';
```

This loader will fetch the QRLLIB webassembly file and instantiate a QRLLIB object which can then be used in the client.  It’s important to include some logic to ensure this object is loaded correctly before using other functions.  To demonstrate, we’ll disable the _Generate_ button in the UI while we’re waiting for the QRLLIB webassembly to become available.  Add the following to the _client/main.js_ file:

```
document.getElementById('generateButton').style.display = 'none';

const waitForQRLLIB = (callBack) => {
  setTimeout(() => {
    // Test the QRLLIB object has the str2bin function.
    // This is sufficient to tell us QRLLIB has loaded.
    if (typeof QRLLIB.str2bin === 'function') {
      callBack();
    } else {
      return waitForQRLLIB(callBack);
    }
    return false;
  }, 50);
};

waitForQRLLIB(() => {
  document.getElementById('generateButton').style.display = 'block';
  console.log('QRLLIB loaded!')
});
```