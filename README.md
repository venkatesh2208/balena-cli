# balena CLI

The official balena CLI tool.

[![npm version](https://badge.fury.io/js/balena-cli.svg)](http://badge.fury.io/js/balena-cli)
[![dependencies](https://david-dm.org/balena-io/balena-cli.svg)](https://david-dm.org/balena-io/balena-cli)

## About

The balena CLI (Command-Line Interface) allows you to interact with the balenaCloud and the
[balena API](https://www.balena.io/docs/reference/api/overview/) through a terminal window
on Linux, macOS or Windows. You can also write shell scripts around it, or import its Node.js
modules to use it programmatically.
As an [open-source project on GitHub](https://github.com/balena-io/balena-cli/), your contribution
is also welcome!

## Installation

Check the [balena CLI installation instructions on GitHub](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md).

## Getting Started

### Choosing a shell (command prompt/terminal)

On **Windows,** the standard Command Prompt (`cmd.exe`) and
[PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/getting-started-with-windows-powershell?view=powershell-6)
are supported. We are aware of users also having a good experience with alternative shells,
including:

* [MSYS2](https://www.msys2.org/):
  * Install additional packages with the command:  
    `pacman -S git openssh rsync`
  * [Set a Windows environment variable](https://www.onmsft.com/how-to/how-to-set-an-environment-variable-in-windows-10): `MSYS2_PATH_TYPE=inherit`
  * Note that a bug in the MSYS2 launch script (`msys2_shell.cmd`) makes text-based interactive CLI
    menus to break. [Check this Github issue for a
    workaround](https://github.com/msys2/MINGW-packages/issues/1633#issuecomment-240583890).
* [MSYS](http://www.mingw.org/wiki/MSYS): select the `msys-rsync` and `msys-openssh` packages too
* [Git for Windows](https://git-for-windows.github.io/)
  * During the installation, you will be prompted to choose between _"Use MinTTY"_ and _"Use
    Windows' default console window"._ Choose the latter, because of the same [MSYS2
    bug](https://github.com/msys2/MINGW-packages/issues/1633) mentioned above (Git for Windows
    actually uses MSYS2). For a screenshot, check this
    [comment](https://github.com/balena-io/balena-cli/issues/598#issuecomment-556513098).
* Microsoft's [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about)
  (WSL). In this case, a Linux distribution like Ubuntu is installed via the Microsoft Store, and a
  balena CLI release **for Linux** is recommended. See
  [FAQ](https://github.com/balena-io/balena-cli/blob/master/TROUBLESHOOTING.md) for using balena
  CLI with WSL and Docker Desktop for Windows.

On **macOS** and **Linux,** the standard terminal window is supported. _Optionally,_ `bash` command
auto completion may be enabled by copying the
[balena-completion.bash](https://github.com/balena-io/balena-cli/blob/master/balena-completion.bash)
file to your system's `bash_completion` directory: check [Docker's command completion
guide](https://docs.docker.com/compose/completion/) for system setup instructions.

### Logging in

Several CLI commands require access to your balenaCloud account, for example in order to push a
new release to your application. Those commands require creating a CLI login session by running:

```sh
$ balena login
```

### Proxy support

HTTP(S) proxies can be configured through any of the following methods, in precedence order
(from higher to lower):

* The `BALENARC_PROXY` environment variable in URL format, with protocol (`http` or `https`),
  host, port and optionally basic auth. Examples:
  * `export BALENARC_PROXY='https://bob:secret@proxy.company.com:12345'`
  * `export BALENARC_PROXY='http://localhost:8000'`

* The `proxy` setting in the [CLI config
  file](https://www.npmjs.com/package/balena-settings-client#documentation). It may be:
  * A string in URL format, e.g. `proxy: 'http://localhost:8000'`
  * An object in the format:

    ```yaml
    proxy:
        protocol: 'http'
        host: 'proxy.company.com'
        port: 12345
        proxyAuth: 'bob:secret'
    ```

* The `HTTPS_PROXY` and/or `HTTP_PROXY` environment variables, in the same URL format as
  `BALENARC_PROXY`.

> Note: The `balena ssh` command has additional setup requirements to work behind a proxy.
> Check the [installation instructions](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md),
> and ensure that the proxy server is configured to allow proxy requests to ssh port 22, using
> SSL encryption. For example, in the case of the [Squid](http://www.squid-cache.org/) proxy
> server, it should be configured with the following rules in the `squid.conf` file:  
> `acl SSL_ports port 22`  
> `acl Safe_ports port 22`  

#### Proxy exclusion

The `BALENARC_NO_PROXY` variable may be used to exclude specified destinations from proxying.

> * This feature requires balena CLI version 11.30.8 or later. In the case of the npm [installation
>   option](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md), it also requires
>   Node.js version 10.16.0 or later.
> * To exclude a `balena ssh` target from proxying (IP address or `.local` hostname), the
>   `--noproxy` option should be specified in addition to the `BALENARC_NO_PROXY` variable.

By default (if `BALENARC_NO_PROXY` is not defined), all [private IPv4
addresses](https://en.wikipedia.org/wiki/Private_network) and `'*.local'` hostnames are excluded
from proxying. Other hostnames that resolve to private IPv4 addresses are **not** excluded by
default, because matching takes place before name resolution.

`localhost` and `127.0.0.1` are always excluded from proxying, regardless of the value of
BALENARC_NO_PROXY.

The format of the `BALENARC_NO_PROXY` environment variable is a comma-separated list of patterns
that are matched against hostnames or IP addresses. For example:

```
export BALENARC_NO_PROXY='*.local,dev*.mycompany.com,192.168.*'
```

Matched patterns are excluded from proxying. Wildcard expressions are documented at
[matcher](https://www.npmjs.com/package/matcher#usage). Matching takes place _before_ name
resolution, so a pattern like `'192.168.*'` will **not** match a hostname that resolves to an IP
address like `192.168.1.2`.

## Command reference documentation

The full CLI command reference is available [on the web](https://www.balena.io/docs/reference/cli/
) or by running `balena help` and `balena help --verbose`.

## Support, FAQ and troubleshooting

If you come across any problems or would like to get in touch:

* Check our [FAQ / troubleshooting document](https://github.com/balena-io/balena-cli/blob/master/TROUBLESHOOTING.md).
* Ask us a question through the [balenaCloud forum](https://forums.balena.io/c/balena-cloud).
* For bug reports or feature requests,
  [have a look at the GitHub issues or create a new one](https://github.com/balena-io/balena-cli/issues/).

## Deprecation policy

Several of the balena CLI commands make use of balenaCloud backend services, such as the
balena HTTP API and the balenaCloud builder. While a specific balena CLI version may be remain
available for download and installation for a long period of time, the backend services (HTTP
API) evolve independently and may eventually become incompatible with older versions of the
balena CLI. Several commands of such older balena CLI versions would then stop working. This
deprecation policy aims at providing some clarity to balena CLI users as to the period of time
that an older balena CLI version should remain compatible with balenaCloud backend services.

This deprecation policy is expressed in terms of [semver versioning](https://semver.org/),
which is used to identify balena CLI releases with the concepts of major, minor and patch
version releases.

**The latest release of the previous major version of the balena CLI shall remain compatible
with balenaCloud backend services for one year from the date when the next major version is
released.** For example, balena CLI v10.17.5 (the latest v10 release) shall remain compatible
with balenaCloud backend services for one year from the date when v11.0.0 is released.

To be clear, this statement is limited to balenaCloud backend service compatibility and does
not extend to software maintenance such as, for example, bug fixes and security patches. Such
maintenance is normally only provided for the latest major version. For this reason, users are
advised to regularly update their installation of the balena CLI.

## Contributing (including editing documentation files)

Please have a look at the [CONTRIBUTING.md](./CONTRIBUTING.md) file for some guidance before
submitting a pull request or updating documentation (because some files are automatically
generated). Thank you for your help and interest!

## License

The project is licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).
A copy is also available in the LICENSE file in this repository.
