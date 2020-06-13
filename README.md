# ranvier-webhooks

> Handle webhooks with Ranvier state

This bundle comes with a webhook that handles GitHub events. Using the options below, you can trigger an automatic rebuild and relaunch of your Ranvier instance when committing to your public repository. More webhooks can be easily added to this bundle, and those webhooks can use both command line arguments and the game state.

##### Instructions

To use the included GitHub webhook, you first need to set up your webhook directly on GitHub. You can do this in the settings menu for your repository on the GitHub website. The payload URL is your server address, and don't forget to add the websocket port to the end (e.g., `mymudserver.com:85856`). The webhook's content type needs to be `application/json`. You also need to define a secret key to decrypt your webhook, for added security.

Once you set this key on your repository, create a `.env` file in the root of your Ranvier repository and add `GITHUB_WEBHOOK_SECRET='mysecret'` where `mysecret` is your webhook's secret key. You will also need to install [dotenv](https://www.npmjs.com/package/dotenv) in the root of your Ranvier repository with `npm install --save dotenv`.

Then, in your `ranvier.json` config file, add the following:

```
"webhooks": {
    "github": {
      "port": <PORT OF GITHUB WEBHOOK>,
      "url": <URL TO YOUR GITHUB REPOSITORY>,
      "branch": <BRANCH NAME>,
      "command": <COMMAND TO RELAUNCH RANVIER>,
      "path": <PATH TO PROJECT ROOT>
    }
  }
```

Example config:

```
"webhooks": {
    "github": {
      "port": 8586,
      "url": "https://www.github.com/azigler/zigmud",
      "branch": "master",
      "command": "pm2 restart zigmud",
      "path": "~/zigmud"
    }
  }
```

##### Extending

To create more webhooks, add more keys to the `webhooks` object to apply new configs. Then add initialization instructions to the `startup` listener in `server-events/webhooks.js`.