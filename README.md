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
