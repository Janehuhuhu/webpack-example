#! /usr/bin/env node

const path = require('path')
const Complier = require('../src/complier')

const config = require(path.resolve(process.cwd(), 'webpack.config.js'))

const complier = new Complier(config)

complier.run()
