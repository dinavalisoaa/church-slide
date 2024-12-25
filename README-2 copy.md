
# Lyrics and program presentation in church cult

![preview](https://raw.githubusercontent.com/dinavalisoaa/church-slide/refs/heads/tauri-integration/examples/1.png)

![preview](https://raw.githubusercontent.com/dinavalisoaa/church-slide/refs/heads/tauri-integration/examples/2.png)

![preview](https://raw.githubusercontent.com/dinavalisoaa/church-slide/refs/heads/tauri-integration/examples/3.png)
## Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
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

## Commands

Available commands:

- `TailwindConcealEnable`: enables conceal for all buffers.
- `TailwindConcealDisable`: disables conceal.
- `TailwindConcealToggle`: toggles conceal.
- `TailwindColorEnable`: enables color hints for all buffers.
- `TailwindColorDisable`: disables color hints.
- `TailwindColorToggle`: toggles color hints.
- `TailwindSort(Sync)`: sorts all classes in the current buffer.
- `TailwindSortSelection(Sync)`: sorts selected classes in visual mode.
- `TailwindNextClass`: moves the cursor to the nearest next class node.
- `TailwindPrevClass`: moves the cursor to the nearest previous class node.

> [!NOTE]
> In normal mode, `TailwindNextClass` and `TailwindPrevClass` can be used with a count to jump through multiple classes at once.

## Utilities

### nvim-cmp

Utility function for highlighting colors in [nvim-cmp](https://github.com/hrsh7th/nvim-cmp) using [lspkind.nvim](https://github.com/onsails/lspkind.nvim):

```lua
-- nvim-cmp.lua
return {
  "hrsh7th/nvim-cmp",
  dependencies = {
    "tailwind-tools",
    "onsails/lspkind-nvim",
    -- ...
  },
  opts = function()
    return {
      -- ...
      formatting = {
        format = require("lspkind").cmp_format({
          before = require("tailwind-tools.cmp").lspkind_format
        }),
      },
    }
  end,
},
```

> [!TIP]
> You can extend it by calling the function and get the returned `vim_item`, see the nvim-cmp [wiki](https://github.com/hrsh7th/nvim-cmp/wiki/Menu-Appearance) to learn more.

### telescope.nvim

The plugins registers by default a telescope extension that you can call using `:Telescope tailwind <subcommand>`

Available subcommands:

- `classes`: Lists all the classes in the current file and allows to jump to the selected location.

- `utilities`: Lists all utility classes available in the current project with a custom callback.

## Extension

The plugin already supports many languages, but requests for additional language support and PRs are welcome. You can also extend the language support in your configuration by using Treesitter queries or Lua patterns (or both).

### Treesitter queries

Treesitter queries are recommended because they can precisely capture the class values at the AST level, but they can be harder to write. If you are not familiar with Treesitter queries, check out the documentation from [Neovim](https://neovim.io/doc/user/treesitter.html#treesitter-query) or [Treesitter](https://tree-sitter.github.io/tree-sitter/using-parsers#query-syntax).

You can define custom queries for a filetype by adding the filetype to the `queries` list, like this:

```lua
{
  extension = {
    queries = { "myfiletype" },
  }
}
```

The plugin will search for a `class.scm` file (classexpr) associated with that filetype in your `runtimepath`. You can use your Neovim configuration folder to store queries in the following way:

```
~/.config/nvim
.
├── init.lua
├── lua
│   └── ...
└── queries
    └── myfiletype
        └── class.scm
```

The `class.scm` file should contain a query used to extract the class values for a given filetype. The class value should be captured using `@tailwind`, as shown in the following example:

```scheme
; queries/myfiletype/class.scm
(attribute
  (attribute_name) @_attribute_name
  (#eq? @_attribute_name "class")
  (quoted_attribute_value
    (attribute_value) @tailwind))
```

Note that quantified captures (using `+` or `?`) cannot be captured using `@tailwind`. Instead, you must capture the parent node using `@tailwind.inner`.

```scheme
(arguments
  (_)+) @tailwind.inner
```

You can also define node offsets by using the `#set!` directive and assign the `start` or `end` variables to some offset values (defaults to 0).

```scheme
((postcss_statement
   (at_keyword) @_keyword
   (#eq? @_keyword "@apply")
   (plain_value)+) @tailwind.inner
 (#set! @tailwind.inner "start" 1))
```

### Lua patterns

[Lua patterns](https://www.lua.org/pil/20.2.html) are easier to write, but they have some limitations. Unlike Treesitter queries, Lua patterns cannot capture nested structures, they are limited to basic pattern matching.

You can define custom patterns by attaching a list of patterns to filetypes. Each pattern should have exactly **one** capture group representing the class value, as shown below:

```lua
{
  extension = {
    patterns = {
      javascript = { "clsx%(([^)]+)%)" },
    },
  }
}
```

> [!TIP]
> Lua patterns can be combined with Treesitter queries. You can use both for a single filetype to get the combined results.

## Related projects

Here are some related projects:

- [tailwindcss-intellisense](https://github.com/tailwindlabs/tailwindcss-intellisense) (official vscode extension)
- [tailwind-sorter.nvim](https://github.com/laytan/tailwind-sorter.nvim) (uses external scripts)
- [tailwind-fold](https://github.com/stivoat/tailwind-fold) (vscode extension)
- [tailwind-fold.nvim](https://github.com/razak17/tailwind-fold.nvim)
- [document-color.nvim](https://github.com/mrshmllow/document-color.nvim) (archived)

## Contributing

Read the documentation carefully before submitting any issue.

Feature and pull requests are welcome.