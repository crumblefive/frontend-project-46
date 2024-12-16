install:
	npm ci

lint:
	npx eslint

gendiff:
	node bin/gendiff.js

publish:
	nmp publish --dry-run

test:
	npm test --test-reporter=spec

test-coverage:
	npm test -- --coverage --coverageProvider=v8
