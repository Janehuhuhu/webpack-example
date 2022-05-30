#! /usr/bin/env node

const path = require('path')
const config = require(path.resolve(process.cwd(), 'webpack.config.js'))
const Complier = require('../src/complier.js')

const complier = new Complier(config)
complier.hooks.entryOption.call()
complier.run()
