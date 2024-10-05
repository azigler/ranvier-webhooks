![](https://images.prismic.io/andrewzigler/fe53cc80-63b2-4abb-a598-3b01d81bda3b_ranvier-webhooks.jpg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=50&rect=0%2C0%2C1200%2C628&w=1200&h=628)

# ranvier-webhooks

> Handle webhooks with Ranvier state

This bundle comes with a webhook that handles GitHub events. Using the options below, you can trigger an automatic rebuild and relaunch of your Ranvier instance when committing to your public repository. More webhooks can be easily added to this bundle, and those webhooks can use both command line arguments and the game state.

To use this bundle, you will need a checkout of Ranvier. You can use my experimental fork ([azigler/zigmud](https://github.com/azigler/zigmud)) alongside a checkout of my experimental core:develop branch ([azigler/core:develop](https://github.com/azigler/core/tree/develop)), but this bundle also works with a [regular Ranvier checkout](https://github.com/RanvierMUD/ranviermud).

### Instructions

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
      "path": <PATH TO PROJECT ROOT>,
      "link": <BOOLEAN>
    }
  }
```

The `branch` value corresponds to the branch of your repository that you wish to trigger the rebuild upon commit. For most uses, this should be `master`. The `command` is what rebuilds your server from the command line, and the `path` is the root path of your Ranvier repository. If you are using a local version of `ranvier`, make sure `link` is set to `true` in order to re-establish your link after the rebuild.

Example config:

```
"webhooks": {
    "github": {
      "port": 8586,
      "url": "https://www.github.com/azigler/zigmud",
      "branch": "master",
      "command": "pm2 restart zigmud",
      "path": "~/zigmud",
      "link": true
    }
  }
```

### Extending

To create more webhooks, add more keys to the `webhooks` object to apply new configs. Then add initialization instructions to the `startup` listener in `server-events/webhooks.js`.
