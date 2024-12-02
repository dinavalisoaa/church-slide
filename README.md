
#  Program presentation for the church during worship
## Lyrics,  Liturgy, Holy song

![preview](https://raw.githubusercontent.com/dinavalisoaa/church-slide/refs/heads/tauri-integration/examples/1.png)

![preview](https://raw.githubusercontent.com/dinavalisoaa/church-slide/refs/heads/tauri-integration/examples/2.png)

![preview](https://raw.githubusercontent.com/dinavalisoaa/church-slide/refs/heads/tauri-integration/examples/3.png)
## Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Pre-existing](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
<!-- - [Commands](#commands) -->
<!-- - [Utilities](#utilities) -->
<!-- - [Extension](#extension) -->
<!-- - [Related projects](#related-projects) -->
- [Contributing](#contributing)


### Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

![Tauri](https://img.shields.io/badge/tauri-%23646CFF.svg?style=for-the-badge&logo=tauri&logoColor=white)
![Rust](https://img.shields.io/badge/rust-%23646CFF.svg?style=for-the-badge&logo=rust&logoColor=white)
![SQlite](https://img.shields.io/badge/SQlite-%23646CFF.svg?style=for-the-badge&logo=SQlite&logoColor=white)

<img src="https://static.slid.es/reveal/logo-v1/reveal-white-text.svg" width="90" alt="React Icons">

<!-- ![GraphQL](https://img.shields.io/badge/GraphQL-%23646CFF.svg?style=for-the-badge&logo=GraphQL&logoColor=pink) -->

## Features

It currently provides the following features:
- [x] Desktop UI
- [x] Lyrics displaying
- [x] Church program presentation
- [x] Next/Prev command
- [x] Overview slide
- [x] Search specific slide
- [x] Handle Song,Lyrics,Category,Verses
- [x] Media content
- [ ] GraphQL instead of ``invoke`` method
- [ ] Auto scroll
- [ ] Handle extra songs
- [ ] Real time scroll (Karaoke)

## Prerequisites

- Rust  (1.82.0)(https://www.rust-lang.org/learn/get-started)
- Cargo 1.82.0  
- Node (v18.18.1.)
- sea-orm-cli (v1.1.0)



## Pre-existing

- Using Powerpoint
- Need to create a slide for each use 
- Time-consuming to load
- Not reusable


## Installation


Using [lazy.nvim](https://github.com/folke/lazy.nvim):

```cmd
npm install 
```

```cmd
cd scr-tauri
cargo install 
```
For database migration`db.sqlite` 

``cmd
 sea-orm-cli migrate
``

In package.json
> [!IMPORTANT]
>  Need to install tauri-apps
``
  "@tauri-apps/cli": "^1.5.6"
``

## Configuration

> [!TIP]
> To customize Tauri App

``src-tauri/tauri.conf.json``
```json 
{
  "build": {
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build",
    "devPath": " http://localhost:5173", // Front url
    "distDir": "../dist"
  },
  "package": {
    "productName": "tauri-seaorm-template",// app name
    "version": "0.0.0"
  },
  "tauri": {
    "allowlist": {
      "all": false,
      "shell": {
        "all": false,
        "open": true
      }
    },
    "bundle": {
      "active": true,
      "targets": "all",
      "identifier": "com.tauri.dev", //  bundle identifier
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/128x128@2x.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ]
    },
    "security": {
      "csp": null
    },
    "windows": [
      {
        "fullscreen": false, 
        "resizable": true,
        "title": "tauri-seaorm-template",// window title
        "width": 800,
        "height": 600
      }
    ]
  }
}

```

<!-- ## Commands

Available commands:

- `TailwindConcealEnable`: enables conceal for all buffers. -->


# License
[![Static Badge](https://img.shields.io/badge/License-MIT-415a77?style=for-the-badge)](https://github.com/bouzidanas/react-reveal-slides/blob/master/LICENSE)
