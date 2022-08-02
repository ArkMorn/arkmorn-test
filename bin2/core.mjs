
import path from 'path'
import {pathExistsSyncFnc} from './utils.mjs'


console.log(path.resolve('.'))
console.log(pathExistsSyncFnc(path.resolve('.')))

async function demo(){
    await new Promise(resolve=>setTimeout(resolve,1000))
    console.log('ok')
}
demo()