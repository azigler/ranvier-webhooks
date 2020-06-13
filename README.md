# ranvier-webhooks

> Handle webhooks with Ranvier state

This bundle comes with a webhook that handles GitHub events. Using the options below, you can trigger an automatic rebuild and relaunch of your Ranvier instance when committing to your public repository. More webhooks can be easily added to this bundle, and those webhooks can use both command line arguments and the game state.

##### Instructions

In your `ranvier.json` config file, add the following:

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
      "path": "../../"
    }
  }
```

##### Extending

To create more webhooks, add more keys to the `webhooks` object to apply new configs. Then add initialization instructions to the `startup` listener in `server-events/webhooks.js`.