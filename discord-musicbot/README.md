# JAMBOT

This is a discord bot. It requires a bot user account token from: https://discordapp.com/developers/applications

You'll also likely want your user id. See the file in `templates/options.ini.j2` for details.


### Usage

```
docker run --rm -e BOT_TOKEN='xxx' -e OWNER_ID='12345' lazypower/jambot
```

