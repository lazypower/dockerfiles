# Swarm Standup

This is a great way to stand up a quick and dirty swarm cluster. It assumes you have
a `kvstore` host already deployed with docker-machine, and subsequently have kicked up
the consul-cluster service found in this repository.

This work is a derivative of [Nathan Leclaire's](http://nathanleclaire.com/blog/2015/11/17/seamless-docker-multihost-overlay-networking-on-digitalocean-with-machine-swarm-and-compose-ft.-rethinkdb/) published multi-host swarm demo for RethinkDB.
