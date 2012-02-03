# Alice

## Installation

```bash
git clone git://github.com/mrtesla/alice-scaffold.git
```

## Configuration

**Edit:** `config.json`

```json
{
  "alice": {
    "router":     { "enabled" : true },
    "passer":     { "enabled" : true },
    "prober":     { "enabled" : true },
    "varnish":    { "enabled" : true },
    "controller": { "enabled" : true }
  },
  "pluto": {
    "user": {
      "separation" : false,
      "default"    : "simon"
    },
    "runit": {
      "dir": "/usr/local/var/service"
    },
    "syslog" : false
  }
}
```

**Configure and start**

```bash
bin/alice setup
bin/pluto start sys:alice:**
```

## Upgrading

```bash
bin/pluto stop sys:alice:**
bin/alice upgrade
bin/pluto start sys:alice:**
```


# Core principles

## Routing

### Domain lookup

When a request is made for the domain `alice.p.a.mrhenry.be`

```
HMGET alice.http|domains alice.p.a.mrhenry.be. *.alice.p.a.mrhenry.be. *.p.a.mrhenry.be. *.a.mrhenry.be. *.mrhenry.be. *.be. *.
1) NULL
2) "[[\"forward\", \"alice\"]]"
3) NULL
4) NULL
5) "[[\"forward\", \"client_mrhenry-production\"]]"
6) NULL
7) NULL
```

The first non-NULL result is used.

### Path lookup

When a request is made for the path `/images/logo.png`

```
HMGET alice.http|app|paths /images/logo.png /images/logo.png/* /images/* /*
1) NULL
2) NULL
3) "[[\"forward\", \"static\"]]"
4) "[[\"forward\", \"web\"]]"
```

Again the first non-NULL result is used.
