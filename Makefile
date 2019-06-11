# add local .bin folder to $PATH
export PATH := $(PATH):$(PWD)/node_modules/.bin/

# set default value for env var
env ?= development

# define tasks
build: clean
	NODE_ENV=$(env) webpack --config ./webpack-client.js --bail
	NODE_ENV=$(env) webpack --config ./webpack-server.js --bail

run:
	NODE_ENV=$(env) node release/index

clean:
	@rm -rf release

.PHONY: build run clean
