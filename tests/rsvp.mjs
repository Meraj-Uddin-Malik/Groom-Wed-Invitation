import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import {DatabaseSync} from 'node:sqlite';
// Disposable in-memory database only: no Site, preview, network or guest database access.
const memory=new DatabaseSync(':memory:');memory.exec(fs.readFileSync('drizzle/0000_long_aaron_stack.sql','utf8').replaceAll('--> statement-breakpoint',''));
function compile(path,dependencies={}){const source=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const exports={};vm.runInNewContext(source,{exports,require:(id)=>{if(!(id in dependencies))throw new Error(id);return dependencies[id]},Response,URL,console:{error(){}},Date});return exports;}
const validation=compile('lib/rsvp.ts');const helpers=compile('lib/auth.ts',{'@/app/chatgpt-auth':{getChatGPTUser:async()=>null}});
let unavailable=false;const fakeDb=()=>{if(unavailable)throw new Error('Unavailable');return {prepare(sql){return {bind(...args){return {async run(){return memory.prepare(sql).run(...args)}}}}}}};
const route=compile('app/api/rsvp/route.ts',{'@/lib/db':{db:fakeDb},'@/lib/auth':helpers,'@/lib/rsvp':validation});
const sample={id:'12345678-1234-4234-8234-123456789abc',name:'Fixture Household',phone:'0000000000',nikkah:4,mehndi:0,walima:6,message:'Disposable test'};
function request(data,origin='https://fixture.invalid'){return new Request('https://fixture.invalid/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json','Origin':origin},body:JSON.stringify(data)})}
assert.equal((await route.POST(request(sample))).status,200);assert.equal((await route.POST(request(sample))).status,200);assert.equal(memory.prepare('SELECT COUNT(*) AS n FROM replies').get().n,1);const saved=memory.prepare('SELECT * FROM replies').get();assert.equal(saved.nikkah,0);assert.equal(saved.mehndi,0);assert.equal(saved.walima,6);
assert.equal((await route.POST(request({...sample,walima:-1}))).status,400);assert.equal((await route.POST(request({...sample,walima:31}))).status,400);assert.equal((await route.POST(request({...sample,phone:''}))).status,400);assert.equal((await route.POST(request(sample,'https://other.invalid'))).status,403);
unavailable=true;assert.equal((await route.POST(request(sample))).status,503);assert.equal(await helpers.isOwner(),false);memory.close();console.log('PASS: RSVP saved in disposable memory, retries do not duplicate, counts preserved, invalid inputs and cross-origin writes rejected, storage failure handled, anonymous owner access denied.');
