# EZStream

CLI auto-dj application for icecast servers. Supports encoding via LAME.


### Usage

```
docker run --rm -ti \
-v $HOME/Music:/music \
-v $PWD/config:/ezstream \
--rm lazypower/ezstream
```

### Playlist generator helper

```
find /path/to/music -name *.mp3 >/path/to/playlist.m3u
```
