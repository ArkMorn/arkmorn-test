#!/usr/bin/env node

const {Command} =require('commander')

const pkg=require('../package.json')

const program=new Command()

// 主命令
program
    .name(Object.keys(pkg.bin)[0])
    .usage(`<command> [options]`)
    .version(pkg.version)
    .option('-d,--debug','是否开启debug模式',false)
    .option('-e,--envName <envName>','获取环境变量')
    

// 注册命令
const clone=program.command('clone <source> [destination]')
clone
    // .arguments('<source> [destination]')
    .description('clone a repository')
    .option('-f,--force','是否强制克隆')
    .action((source,destination,cmdObj)=>{
        console.log('do clone',source,destination,cmdObj.force)
    })

// 注册子命令
const service=new Command().command('service')
service
    .command('start [port]')
    // .arguments('[port]')
    .action((port)=>{
        console.log('start service',port);
    })
service
    .command('stop [port]')
    .action((port)=>{
        console.log('stop service',port);
    })
// command description
program
    .command('install [name]','install package',{
        executableFile:'arkmorn-cli-dev',
        // isDefault:true,
    })
    .alias('i')
    // .action((name)=>{
    //     console.log('install');
    // })

// cmd必须输入
// program
//     .arguments('<cmd> [options]')
//     .description('test command',{
//         cmd:"command to run",
//         options:"options to command"
//     })
//     .action((cmd,options)=>{
//         console.log(cmd,options)
//     })

// 自定义帮助信息
// program.helpInformation=function(){
//     return 'help information'
// }
// 监听option
// program.on('--help',()=>{
// })
program.on('option:debug',()=>{
    if(program.opts().debug){
        process.env.LOG_LEVEL='verbose'
    }
    console.log(process.env.LOG_LEVEL)
})
// 监听未知command
program.on('command:*',(obj)=>{
    console.log(obj);
    console.error('未知命令:'+obj[0])
    const avaliableCommand=program.commands.map(command=>command.name()).join(',')
    console.log('可用命令:'+avaliableCommand)
})

program.addCommand(service)
program.parse(process.argv)