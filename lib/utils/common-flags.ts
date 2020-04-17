/**
 * @license
 * Copyright 2019 Balena Ltd.
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

import { flags } from '@oclif/command';

type IBooleanFlag<T> = import('@oclif/parser/lib/flags').IBooleanFlag<T>;

export const application = flags.string({
	char: 'a',
	description: 'application name',
});

export const device = flags.string({
	char: 'd',
	description: 'device UUID',
});

export const help: IBooleanFlag<void> = flags.help({ char: 'h' });

export const quiet: IBooleanFlag<boolean> = flags.boolean({
	char: 'q',
	description: 'suppress warning messages',
	default: false,
});

export const service = flags.string({
	char: 's',
	description: 'service name',
});

export const verbose: IBooleanFlag<boolean> = flags.boolean({
	char: 'v',
	description: 'produce verbose output',
});

export const yes: IBooleanFlag<boolean> = flags.boolean({
	char: 'y',
	description: 'answer "yes" to all questions (non interactive use)',
});
