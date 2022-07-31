#!/usr/bin/env node
const dedent=require('dedent')

const yargs=require('yargs/yargs')
const process=require("process")

// const {hideBin}=require("yargs/helpers")
// const arg =hideBin(process.argv)

const pkg=require('../package.json')
const context={arkVersion:pkg.version}

const cli=yargs()
const argv=process.argv.slice(2)

cli
.usage("Usage: arkmorn-test <command> [options]")
.demandCommand(1, "A command is required. Pass --help to see all available commands and options.")
.recommendCommands()
.alias("v","version")
.alias("h","help")
.wrap(cli.terminalWidth())
.fail((err,msg)=>{
    console.log(err)
})
.epilogue(dedent` When a command fails, all logs are written to lerna-debug.log in the current working directory.

For more information, find our manual at https://github.com/lerna/lerna`)
.options({
    debug:{
        type:"boolean",
        desc:"Bootstrap debug mode",
        alias:"d"
    }
})
.option('registry',{
    type:"string",
    desc:"rrr",
    alias:"r",
})
.group(['debug'],'Dev Options:')
.group(['registry'],'Registry Options:')
.command('init [name]','init a project',(yargs)=>{
    yargs.options({
        name:{
            type:'string',
            desc:"name of init",
            alias:"n"
        }
    })
},(argv)=>{
    console.log(argv)
})
.command({
    command:"list",
    aliases:['ls','ll','la'],
    describe:"List local packages",
    builder:(yargs)=>{},
    handler:(argv)=>{
        console.log('argv',argv)
    }
})
.strict()
.parse(argv,context)
