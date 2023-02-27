module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
		'type-enum': [
			2,
			'always',
			[
				'build',
				'docs',
				'feat',
				'fix',
        'style',
				'refactor',
				'revert',
				'test',
				'chore',
			],
		],
	},
};
