/**
 * @license
 * Copyright 2017-2020 Balena Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const DEBUG_MODE = !!process.env.DEBUG;

export const reachingOut = `\
If you need help, or just want to say hi, don't hesitate in reaching out
through our discussion and support forums at https://forums.balena.io

For bug reports or feature requests, have a look at the GitHub issues or
create a new one at: https://github.com/balena-io/balena-cli/issues/\
`;

const debugHint = `\
Additional information may be available with the \`--debug\` flag.
`;

export const help = `\
For help, visit our support forums: https://forums.balena.io
For bug reports or feature requests, see: https://github.com/balena-io/balena-cli/issues/
`;

export const getHelp = (DEBUG_MODE ? '' : debugHint) + help;

export const balenaAsciiArt = `\
 _            _
| |__   __ _ | |  ____  _ __    __ _
| '_ \\ / _\` || | / __ \\| '_ \\  / _\` |
| |_) | (_) || ||  ___/| | | || (_) |
|_.__/ \\__,_||_| \\____/|_| |_| \\__,_|
`;

export const registrySecretsHelp = `\
REGISTRY SECRETS
The --registry-secrets option specifies a JSON or YAML file containing private
Docker registry usernames and passwords to be used when pulling base images.
Sample registry-secrets YAML file:

	'my-registry-server.com:25000':
		username: ann
		password: hunter2
	'':  # Use the empty string to refer to the Docker Hub
		username: mike
		password: cze14
	'eu.gcr.io':  # Google Container Registry
		username: '_json_key'
		password: '{escaped contents of the GCR keyfile.json file}'

For a sample project using registry secrets with the Google Container Registry,
check: https://github.com/balena-io-playground/sample-gcr-registry-secrets

If the --registry-secrets option is not specified, and a secrets.yml or
secrets.json file exists in the balena directory (usually $HOME/.balena),
this file will be used instead.`;

export const dockerignoreHelp = `\
DOCKERIGNORE AND GITIGNORE FILES
By default, both '.dockerignore' and '.gitignore' files are taken into account
in order to prevent files from being sent to the balenaCloud builder or a local
or remote Docker or balenaEngine server/daemon. However, this behavior has been
deprecated and will stop working in a future balena CLI release.  A warning
message will be printed unless the --nogitignore (-G) option is used.

The --nogitignore (-G) option should be used to enable the new recommended ignore
file treatment, which will become the default behaviour in a future release.
This option will cause the CLI to:

* Disregard all '.gitignore' files at the source directory and subdirectories,
  and consider only the '.dockerignore' file (if any) at the source directory.
* Consequently, allow files to be sent to balenaCloud / Docker / balenaEngine
  even if they are listed in '.gitignore' files (a longstanding feature request).
* Use a new '.dockerignore' parser and filter library that improves compatibility
  with "docker build" and fixes several issues (mainly on Windows).
* Prevent the deprecation warning message from being printed.

When --nogitignore (-G) is specified, a few "hardcoded" dockerignore patterns
are also used and "merged" with the patterns found in the '.dockerignore' file
(if any), in the following order:

    **/.git
    <user's patterns from the '.dockerignore' file are inserted here>
    !**/.balena
    !**/.resin
    !**/Dockerfile
    !**/Dockerfile.*
    !**/docker-compose.yml

Note that the effect of the '**/.git' pattern may be modified or undone by
adding counter patterns to the '.dockerignore' file, for example a counter
pattern such as '!service1/.git'. For documentation on pattern format, see:
- https://docs.docker.com/engine/reference/builder/#dockerignore-file
- https://www.npmjs.com/package/@balena/dockerignore`;
