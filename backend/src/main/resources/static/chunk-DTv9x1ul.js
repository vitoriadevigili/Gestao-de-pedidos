import {V as Vt,d as dn,O as Oe$1,a as Rt,u as un,C as C$1,F as Ft,J as J$1,b as Re$1,D as Dt$1,t as te$1}from'./chunk-CxKzt94T.js';import {y,al as ze$1,am as Hr$1,f as w,M as Me,e as Ie$1,t as Nc,$ as $e$1,r as re,v,Y,x as sv,E as A$1,an as l,z as ue$1,X,C as mo,h as le,k as ke$1,K as qd,U as A3,ao as Bc,ap as Z3,p as ie,ai as Ut,m as mr$1,L as Le$1,u as uo,S as Se,c as mt$1,a0 as U$1,a as ln,d as Pe$1,N as Ne,q as ot$1,s as gt$1,aq as ma,ar as ya,P as Pi,a3 as Li,a2 as nc,as as ao,at as pt$1,au as ht$1,av as m,aw as Er$1,ax as Hd,ay as M,az as ne$1,i as he$1,aA as QT,V as tc,aB as Mh,aC as w0,a4 as Be$1,a5 as N,D as Dr$1,W,aj as Wt,a7 as wS,aD as sV,B as aV,aE as pc,aF as Q_,G as XU,aG as NU,aH as Rn$1,aI as Gt,aJ as X3,aK as TU,aL as Yv,aM as IU,aN as EU,aO as Yb,aP as BU,aQ as tx,a1 as _y,Z as lo,ab as pe,aR as we,aS as xh,aT as ee$1,a9 as fo,ad as ah,ae as ch,_ as ho,aU as c0,aV as a0}from'./main-AI76VATY.js';var et=0;function qn(){return et}function V(n,e){return (...t)=>{try{return et=e,n(...t)}finally{et=0;}}}function Zn(n){return !n}function yn(n){return n}function T(n){return Array.isArray(n)}function Ae(n){return (typeof n=="object"||typeof n=="function")&&n!=null}var U=Symbol(),Be=Symbol(),ue=class{predicates;fns=[];constructor(e){this.predicates=e;}push(e){this.fns.push(vn(this.predicates,e));}mergeIn(e){let t=this.predicates?e.fns.map(r=>vn(this.predicates,r)):e.fns;this.fns.push(...t);}hasRules(){return this.fns.length>0}},Ie=class extends ue{get defaultValue(){return  false}compute(e){return this.fns.some(t=>{let r=t(e);return r&&r!==Be})}},ee=class n extends ue{ignore;static ignoreNull(e){return new n(e,t=>t===null)}constructor(e,t){super(e),this.ignore=t;}get defaultValue(){return []}compute(e){return this.fns.reduce((t,r)=>{let i=r(e);return i===void 0||i===Be?t:T(i)?[...t,...this.ignore?i.filter(s=>!this.ignore(s)):i]:this.ignore&&this.ignore(i)?t:[...t,i]},[])}},tt=class extends ee{constructor(e){super(e,void 0);}},nt=class extends ue{key;get defaultValue(){return this.key.reducer.getInitial()}constructor(e,t){super(e),this.key=t;}compute(e){if(this.fns.length===0)return this.key.reducer.getInitial();let t=this.key.reducer.getInitial();for(let r=0;r<this.fns.length;r++){let i=this.fns[r](e);i!==Be&&(t=this.key.reducer.reduce(t,i));}return t}};function vn(n,e){return n.length===0?e:t=>{for(let r of n){let i=t.stateOf(r.path),s=Er$1(i.structure.pathKeys).length-r.depth;for(let o=0;o<s;o++)i=i.structure.parent;if(!r.fn(i.context))return Be}return e(t)}}var te=class{predicates;hidden;disabledReasons;readonly;syncErrors;syncTreeErrors;asyncErrors;metadata=new Map;constructor(e){this.predicates=e,this.hidden=new Ie(e),this.disabledReasons=new tt(e),this.readonly=new Ie(e),this.syncErrors=ee.ignoreNull(e),this.syncTreeErrors=ee.ignoreNull(e),this.asyncErrors=ee.ignoreNull(e);}hasAnyLogic(){return this.hidden.hasRules()||this.disabledReasons.hasRules()||this.readonly.hasRules()||this.syncErrors.hasRules()||this.syncTreeErrors.hasRules()||this.asyncErrors.hasRules()||this.metadata.size>0}hasMetadata(e){return this.metadata.has(e)}hasMetadataKeys(){return this.metadata.size>0}getMetadataKeys(){return this.metadata.keys()}getMetadata(e){return this.metadata.has(e)||this.metadata.set(e,new nt(this.predicates,e)),this.metadata.get(e)}mergeIn(e){this.hidden.mergeIn(e.hidden),this.disabledReasons.mergeIn(e.disabledReasons),this.readonly.mergeIn(e.readonly),this.syncErrors.mergeIn(e.syncErrors),this.syncTreeErrors.mergeIn(e.syncTreeErrors),this.asyncErrors.mergeIn(e.asyncErrors);for(let t of e.getMetadataKeys()){let r=e.metadata.get(t);this.getMetadata(t).mergeIn(r);}}},ke=class{depth;constructor(e){this.depth=e;}build(){return new Re(this,[],0)}},ne=class n extends ke{constructor(e){super(e);}current;all=[];addHiddenRule(e){this.getCurrent().addHiddenRule(e);}addDisabledReasonRule(e){this.getCurrent().addDisabledReasonRule(e);}addReadonlyRule(e){this.getCurrent().addReadonlyRule(e);}addSyncErrorRule(e){this.getCurrent().addSyncErrorRule(e);}addSyncTreeErrorRule(e){this.getCurrent().addSyncTreeErrorRule(e);}addAsyncErrorRule(e){this.getCurrent().addAsyncErrorRule(e);}addMetadataRule(e,t){this.getCurrent().addMetadataRule(e,t);}getChild(e){if(e===U){let t=this.getCurrent().children;t.size>(t.has(U)?1:0)&&(this.current=void 0);}return this.getCurrent().getChild(e)}hasLogic(e){return this===e?true:this.all.some(({builder:t})=>t.hasLogic(e))}hasRules(){return this.all.length>0}anyChildHasLogic(){return this.all.some(({builder:e})=>e.anyChildHasLogic())}mergeIn(e,t){t?this.all.push({builder:e,predicate:{fn:V(t.fn,this.depth),path:t.path}}):this.all.push({builder:e}),this.current=void 0;}getCurrent(){return this.current===void 0&&(this.current=new he(this.depth),this.all.push({builder:this.current})),this.current}static newRoot(){return new n(0)}},he=class extends ke{logic=new te([]);children=new Map;constructor(e){super(e);}addHiddenRule(e){this.logic.hidden.push(V(e,this.depth));}addDisabledReasonRule(e){this.logic.disabledReasons.push(V(e,this.depth));}addReadonlyRule(e){this.logic.readonly.push(V(e,this.depth));}addSyncErrorRule(e){this.logic.syncErrors.push(V(e,this.depth));}addSyncTreeErrorRule(e){this.logic.syncTreeErrors.push(V(e,this.depth));}addAsyncErrorRule(e){this.logic.asyncErrors.push(V(e,this.depth));}addMetadataRule(e,t){this.logic.getMetadata(e).push(V(t,this.depth));}getChild(e){return this.children.has(e)||this.children.set(e,new ne(this.depth+1)),this.children.get(e)}hasLogic(e){return this===e}hasRules(){return this.logic.hasAnyLogic()||this.children.size>0}anyChildHasLogic(){for(let e of this.children.values())if(e.hasRules())return  true;return  false}},Re=class n{builder;predicates;depth;logic;constructor(e,t,r){this.builder=e,this.predicates=t,this.depth=r,this.logic=e?Wn(e,t,r):new te([]);}getChild(e){let t=this.builder?En(this.builder,e):[];if(t.length===0)return new n(void 0,[],this.depth+1);if(t.length===1){let{builder:r,predicates:i}=t[0];return new n(r,[...this.predicates,...i.map(s=>it(s,this.depth))],this.depth+1)}else {let r=t.map(({builder:i,predicates:s})=>new n(i,[...this.predicates,...s.map(o=>it(o,this.depth))],this.depth+1));return new rt(r)}}hasLogic(e){return this.builder?this.builder.hasLogic(e):false}hasRules(){return this.builder?this.builder.hasRules():false}anyChildHasLogic(){return this.builder?this.builder.anyChildHasLogic():false}},rt=class n{all;logic;constructor(e){this.all=e,this.logic=new te([]);for(let t of e)this.logic.mergeIn(t.logic);}getChild(e){return new n(this.all.flatMap(t=>t.getChild(e)))}hasLogic(e){return this.all.some(t=>t.hasLogic(e))}hasRules(){return this.all.some(e=>e.hasRules())}anyChildHasLogic(){return this.all.some(e=>e.anyChildHasLogic())}};function En(n,e){if(n instanceof ne)return n.all.flatMap(({builder:t,predicate:r})=>{let i=En(t,e);return r?i.map(({builder:s,predicates:o})=>({builder:s,predicates:[...o,r]})):i});if(n instanceof he)return [...e!==U&&n.children.has(U)?[{builder:n.getChild(U),predicates:[]}]:[],...n.children.has(e)?[{builder:n.getChild(e),predicates:[]}]:[]];throw new M(1909,false)}function Wn(n,e,t){let r=new te(e);if(n instanceof ne){let i=n.all.map(({builder:s,predicate:o})=>new Re(s,o?[...e,it(o,t)]:e,t));for(let s of i)r.mergeIn(s.logic);}else if(n instanceof he)r.mergeIn(n.logic);else throw new M(1909,false);return r}function it(n,e){return m(l({},n),{depth:e})}var wn=Symbol("PATH"),x=class n{keys;parent;keyInParent;root;children=new Map;fieldPathProxy=new Proxy(this,Yn);logicBuilder;constructor(e,t,r,i){this.keys=e,this.parent=r,this.keyInParent=i,this.root=t??this,r||(this.logicBuilder=ne.newRoot());}get builder(){return this.logicBuilder?this.logicBuilder:this.parent.builder.getChild(this.keyInParent)}getChild(e){return this.children.has(e)||this.children.set(e,new n([...this.keys,e],this.root,this,e)),this.children.get(e)}mergeIn(e,t){let r=e.compile();this.builder.mergeIn(r.builder,t);}static unwrapFieldPath(e){return e[wn]}static newRoot(){return new n([],void 0,void 0,void 0)}},Yn={get(n,e){return e===wn?n:n.getChild(e).fieldPathProxy}},Oe,ce=new Map,Pe=class n{schemaFn;constructor(e){this.schemaFn=e;}compile(){if(ce.has(this))return ce.get(this);let e=x.newRoot();ce.set(this,e);let t=Oe;try{Oe=e,this.schemaFn(e.fieldPathProxy);}finally{Oe=t;}return e}static create(e){return e instanceof n?e:new n(e)}static rootCompile(e){try{return ce.clear(),e===void 0?x.newRoot():e instanceof n?e.compile():new n(e).compile()}finally{ce.clear();}}};function Xn(n){return n instanceof Pe||typeof n=="function"}function je(n){if(Oe!==x.unwrapFieldPath(n).root)throw new M(1908,false)}function O(n,e,t){return je(n),x.unwrapFieldPath(n).builder.addMetadataRule(e,t),e}var G={list(){return {reduce:(n,e)=>e===void 0?n:[...n,e],getInitial:()=>[]}},min(){return {reduce:(n,e)=>n===void 0||e===void 0?n??e:e<n?e:n,getInitial:()=>{}}},max(){return {reduce:(n,e)=>n===void 0||e===void 0?n??e:e>n?e:n,getInitial:()=>{}}},or(){return {reduce:(n,e)=>n||e,getInitial:()=>false}},and(){return {reduce:(n,e)=>n&&e,getInitial:()=>true}},override:Qn};function Qn(n){return {reduce:(e,t)=>t,getInitial:()=>n?.()}}var gt=Symbol("IS_ASYNC_VALIDATION_RESOURCE"),Le=class{reducer;create;brand;[gt];constructor(e,t){this.reducer=e,this.create=t;}};function C(n){return new Le(n??G.override())}function pt(){return C()}var yt=C(G.or()),vt=pt();var bt=C(G.max()),Nn=pt();var Mt=C(G.max()),Cn=C(G.min()),Et=C(G.list());function E(n,e){if(n===e)return  true;if(!n||!e||n.length!==e.length)return  false;for(let t=0;t<n.length;t++)if(!Object.is(n[t],e[t]))return  false;return  true}function Jn(n){return n.errors().length>0?"invalid":n.pending()?"unknown":"valid"}var st=class{node;constructor(e){this.node=e;}rawSyncTreeErrors=A$1(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncTreeErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawSyncTreeErrors()??[]],{equal:E});syncErrors=A$1(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncErrors.compute(this.node.context),...this.syncTreeErrors(),...er(this.node.submitState.submissionErrors())],{equal:E});syncValid=A$1(()=>this.shouldSkipValidation()?true:this.node.structure.reduceChildren(this.syncErrors().length===0,(e,t)=>t&&e.validationState.syncValid(),Zn));syncTreeErrors=A$1(()=>this.rawSyncTreeErrors().filter(e=>e.fieldTree===this.node.fieldTree),{equal:E});rawAsyncErrors=A$1(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.asyncErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawAsyncErrors()??[]],{equal:E});asyncErrors=A$1(()=>this.shouldSkipValidation()?[]:this.rawAsyncErrors().filter(e=>e==="pending"||e.fieldTree===this.node.fieldTree),{equal:E});parseErrors=A$1(()=>this.node.formFieldBindings().flatMap(e=>e.parseErrors()),{equal:E});errors=A$1(()=>[...this.parseErrors(),...this.syncErrors(),...this.asyncErrors().filter(e=>e!=="pending")],{equal:E});errorSummary=A$1(()=>{let e=this.node.structure.reduceChildren(this.errors(),(t,r)=>[...r,...t.errorSummary()]);return Er$1(()=>e.sort(tr)),e},{equal:E});pending=A$1(()=>this.node.structure.reduceChildren(this.asyncErrors().includes("pending"),(e,t)=>t||e.validationState.asyncErrors().includes("pending")));status=A$1(()=>{if(this.shouldSkipValidation())return "valid";let e=Jn(this);return this.node.structure.reduceChildren(e,(t,r)=>r==="invalid"||t.validationState.status()==="invalid"?"invalid":r==="unknown"||t.validationState.status()==="unknown"?"unknown":"valid",t=>t==="invalid")});valid=A$1(()=>this.status()==="valid");invalid=A$1(()=>this.status()==="invalid");shouldSkipValidation=A$1(()=>this.node.hidden()||this.node.disabled()||this.node.readonly()||this.node.structure.isOrphaned())};function er(n){return n===void 0?[]:T(n)?n:[n]}function wt(n,e){if(T(n))for(let t of n)t.fieldTree??=e;else n&&(n.fieldTree??=e);return n}function bn(n){return n.formField?n.formField.element:n.fieldTree().formFieldBindings().reduce((e,t)=>!e||!t.element?e??t.element:e.compareDocumentPosition(t.element)&Node.DOCUMENT_POSITION_PRECEDING?t.element:e,void 0)}function tr(n,e){let t=bn(n),r=bn(e);return t===r?0:t===void 0||r===void 0?t===void 0?1:-1:t.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}var ot=C(),at=class{node;cache=new WeakMap;constructor(e){this.node=e,this.fieldTreeOf=this.fieldTreeOf.bind(this),this.stateOf=this.stateOf.bind(this);}resolve(e){if(!this.cache.has(e)){let t=A$1(()=>{let r=x.unwrapFieldPath(e),i=this.node,s=qn();for(;s>0||!i.structure.logic.hasLogic(r.root.builder);)if(s--,i=i.structure.parent,i===void 0)throw new M(1900,false);for(let o of r.keys)if(i=i.structure.getChild(o),i===void 0)throw new M(1901,false);return i.fieldTree});this.cache.set(e,t);}return this.cache.get(e)()}get fieldTree(){return this.node.fieldProxy}get state(){return this.node}get value(){return this.node.structure.value}get key(){return this.node.structure.keyInParent}get pathKeys(){return this.node.structure.pathKeys}index=A$1(()=>{let e=this.key();if(!T(Er$1(this.node.structure.parent.value)))throw new M(1906,false);return Number(e)});fieldTreeOf(e){return this.resolve(e)}stateOf(e){return this.resolve(e)()}valueOf=e=>{let t=this.resolve(e)().value();if(t instanceof te$1)throw new M(1907,false);return t}},dt=class{node;metadata=new Map;constructor(e){this.node=e;}runMetadataCreateLifecycle(){this.node.logicNode.logic.hasMetadataKeys()&&Er$1(()=>Hr$1(this.node.structure.injector,()=>{for(let e of this.node.logicNode.logic.getMetadataKeys())if(e.create){let t=this.node.logicNode.logic.getMetadata(e),r=e.create(this.node,A$1(()=>t.compute(this.node.context)));this.metadata.set(e,r);}}));}get(e){if(this.has(e)&&!this.metadata.has(e)){if(e.create)throw new M(1912,false);let t=this.node.logicNode.logic.getMetadata(e);this.metadata.set(e,A$1(()=>t.compute(this.node.context)));}return this.metadata.get(e)}has(e){return this.node.logicNode.logic.hasMetadata(e)}},nr={get(n,e,t){let r=n(),i=r.structure.getChild(e);if(i!==void 0)return i.fieldTree;let s=Er$1(r.value);if(T(s)){if(e==="length")return r.value().length;if(e===Symbol.iterator)return ()=>(r.value(),Array.prototype[Symbol.iterator].apply(r.fieldTree))}if(Ae(s)&&e===Symbol.iterator)return function*(){for(let o in t)yield [o,t[o]];}},getOwnPropertyDescriptor(n,e){let t=Er$1(n().value),r=Reflect.getOwnPropertyDescriptor(t,e);return r&&!r.configurable&&(r.configurable=true),r},ownKeys(n){let e=Er$1(n().value);return typeof e=="object"&&e!==null?Reflect.ownKeys(e):[]}};function rr(n,e){let t=A$1(()=>n()[e()]);return t[ee$1]=n[ee$1],t.set=r=>{Object.is(Er$1(t),r)||n.update(i=>ir(i,r,e()));},t.update=r=>{t.set(r(Er$1(t)));},t.asReadonly=()=>t,t}function ir(n,e,t){if(T(n)){let r=[...n];return r[t]=e,r}else return m(l({},n),{[t]:e})}var J=Symbol(""),Sn=A$1(()=>false),Fe=class{logic;node;createChildNode;identitySymbol=Symbol();_injector=void 0;_anyChildHasLogic;get injector(){return this._injector??=ze$1.create({providers:[],parent:this.fieldManager.injector}),this._injector}constructor(e,t,r){this.logic=e,this.node=t,this.createChildNode=r;}children(){this.ensureChildrenMap();let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>Er$1(t.reader))}materializedChildren(){let e=this.childrenMap();return e===void 0?[]:Array.from(e.byPropertyKey.values()).map(t=>t.node)}_areChildrenMaterialized(){return Er$1(this.childrenMap)!==void 0}ensureChildrenMap(){this._areChildrenMaterialized()||Er$1(()=>{this.childrenMap.update(e=>this.computeChildrenMap(this.value(),e,true));});}getChild(e){this.ensureChildrenMap();let t=e.toString(),r=Er$1(this.childrenMap)?.byPropertyKey.get(t)?.reader;return r||(r=this.createReader(t)),r()}reduceChildren(e,t,r){let i=this.childrenMap();if(!i)return e;let s=e;for(let o of i.byPropertyKey.values()){if(r?.(s))break;s=t(Er$1(o.reader),s);}return s}destroy(){this.injector.destroy();}createKeyOrOrphanSignals(e,t,r){if(e==="root")return {keyInParent:_n,isOrphaned:Sn};let i=this.parent,s=r,o=A$1(()=>{if(i.structure.isOrphaned())return J;let g=i.structure.childrenMap();if(!g)return J;let v=g.byPropertyKey.get(s);if(v&&v.node===this.node)return s;if(t===void 0)return J;for(let[re,He]of g.byPropertyKey)if(He.node===this.node)return s=re;return J}),d=A$1(()=>o()===J);return {keyInParent:A$1(()=>{let g=o();if(g===J)throw t===void 0?new M(-1902,false):new M(1904,false);return g}),isOrphaned:d}}createChildrenMap(){return w0({source:this.value,computation:(e,t)=>this.computeChildrenMap(e,t?.value,false)})}computeChildrenMap(e,t,r){if(!Ae(e)||!r&&t===void 0&&!(this._anyChildHasLogic??=this.logic.anyChildHasLogic()))return;t??={byPropertyKey:new Map};let i,s=T(e);t!==void 0&&(s?i=or(t,e,this.identitySymbol):i=ar(t,e));for(let o of Object.keys(e)){let d,l$1=e[o];if(l$1===void 0){t.byPropertyKey.has(o)&&(i??=l({},t),i.byPropertyKey.delete(o));continue}s&&Ae(l$1)&&!T(l$1)&&(d=l$1[this.identitySymbol]??=Symbol(""));let g;d&&(t.byTrackingKey?.has(d)||(i??=l({},t),i.byTrackingKey??=new Map,i.byTrackingKey.set(d,this.createChildNode(o,d,s))),g=(i??t).byTrackingKey.get(d));let v=t.byPropertyKey.get(o);v===void 0?(i??=l({},t),i.byPropertyKey.set(o,{reader:this.createReader(o),node:g??this.createChildNode(o,d,s)})):g&&g!==v.node&&(i??=l({},t),v.node=g);}return i??t}createReader(e){return A$1(()=>this.childrenMap()?.byPropertyKey.get(e)?.node)}},lt=class extends Fe{fieldManager;value;get parent(){}get root(){return this.node}get pathKeys(){return sr}get keyInParent(){return _n}isOrphaned=Sn;childrenMap;constructor(e,t,r,i,s){super(t,e,s),this.fieldManager=r,this.value=i,this.childrenMap=this.createChildrenMap();}},ct=class extends Fe{logic;parent;root;pathKeys;keyInParent;value;childrenMap;isOrphaned;get fieldManager(){return this.root.structure.fieldManager}constructor(e,t,r,i,s,o){super(t,e,o),this.logic=t,this.parent=r,this.root=this.parent.structure.root;let d=this.createKeyOrOrphanSignals("child",i,s);this.isOrphaned=d.isOrphaned,this.keyInParent=d.keyInParent,this.pathKeys=A$1(()=>[...r.structure.pathKeys(),this.keyInParent()]),this.value=rr(this.parent.structure.value,this.keyInParent),this.childrenMap=this.createChildrenMap(),this.fieldManager.structures.add(this);}};var sr=A$1(()=>[]),_n=A$1(()=>{throw new M(1905,false)});function or(n,e,t){let r,i=new Set(n.byPropertyKey.keys()),s=new Set(n.byTrackingKey?.keys());for(let o=0;o<e.length;o++){let d=e[o];i.delete(o.toString()),Ae(d)&&d.hasOwnProperty(t)&&s.delete(d[t]);}if(i.size>0){r??=l({},n);for(let o of i)r.byPropertyKey.delete(o);}if(s.size>0){r??=l({},n);for(let o of s)r.byTrackingKey?.delete(o);}return r}function ar(n,e){let t;for(let r of n.byPropertyKey.keys())e.hasOwnProperty(r)||(t??=l({},n),t.byPropertyKey.delete(r));return t}var ut=class{node;selfSubmitting=X(false);submissionErrors;constructor(e){this.node=e,this.submissionErrors=w0({source:this.node.structure.value,computation:()=>[]});}submitting=A$1(()=>this.selfSubmitting()||(this.node.structure.parent?.submitting()??false))},fe=class{structure;validationState;metadataState;nodeState;submitState;fieldAdapter;controlValue;_context=void 0;get context(){return this._context??=new at(this)}fieldProxy=new Proxy(()=>this,nr);pathNode;constructor(e){this.pathNode=e.pathNode,this.fieldAdapter=e.fieldAdapter,this.structure=this.fieldAdapter.createStructure(this,e),this.validationState=this.fieldAdapter.createValidationState(this,e),this.nodeState=this.fieldAdapter.createNodeState(this,e),this.metadataState=new dt(this),this.submitState=new ut(this),this.controlValue=this.controlValueSignal(),this.metadataState.runMetadataCreateLifecycle();}focusBoundControl(e){this.getBindingForFocus()?.focus(e);}getBindingForFocus(){let e=this.formFieldBindings().filter(t=>t.focus!==void 0).reduce(Mn,void 0);return e||this.structure.children().map(t=>t.getBindingForFocus()).reduce(Mn,void 0)}pendingSync=w0({source:()=>this.value(),computation:(e,t)=>{t?.value?.abort();}});get fieldTree(){return this.fieldProxy}get logicNode(){return this.structure.logic}get value(){return this.structure.value}get keyInParent(){return this.structure.keyInParent}get errors(){return this.validationState.errors}get parseErrors(){return this.validationState.parseErrors}get errorSummary(){return this.validationState.errorSummary}get pending(){return this.validationState.pending}get valid(){return this.validationState.valid}get invalid(){return this.validationState.invalid}get dirty(){return this.nodeState.dirty}get touched(){return this.nodeState.touched}get disabled(){return this.nodeState.disabled}get disabledReasons(){return this.nodeState.disabledReasons}get hidden(){return this.nodeState.hidden}get readonly(){return this.nodeState.readonly}get formFieldBindings(){return this.nodeState.formFieldBindings}get submitting(){return this.submitState.submitting}get name(){return this.nodeState.name}get max(){let e=this.metadata(Nn)?.();return e?this.metadata(e):void 0}get maxLength(){return this.metadata(Cn)}get min(){let e=this.metadata(vt)?.();return e?this.metadata(e):void 0}get minLength(){return this.metadata(Mt)}get pattern(){return this.metadata(Et)??dr}get required(){return this.metadata(yt)??lr}metadata(e){return this.metadataState.get(e)}getError(e){return this.errors().find(t=>t.kind===e)}hasMetadata(e){return this.metadataState.has(e)}markAsTouched(e){this.structure.isOrphaned()||Er$1(()=>{this.markAsTouchedInternal(e),this.flushSync();});}markAsTouchedInternal(e){if(!this.structure.isOrphaned()&&!this.validationState.shouldSkipValidation()&&(this.nodeState.markAsTouched(),!e?.skipDescendants))for(let t of this.structure.children())t.markAsTouchedInternal();}markAsDirty(){this.nodeState.markAsDirty();}markAsPristine(){this.nodeState.markAsPristine();}markAsUntouched(){this.nodeState.markAsUntouched();}reset(e){Er$1(()=>this._reset(e));}_reset(e){this.pendingSync()?.abort(),e!==void 0&&this.value.set(e),this.controlValue.rawSet(this.value()),this.nodeState.markAsUntouched(),this.nodeState.markAsPristine();for(let t of this.formFieldBindings())t.reset();for(let t of this.structure.materializedChildren())t._reset();}reloadValidation(){Er$1(()=>this._reloadValidation());}_reloadValidation(){let e=this.logicNode.logic.getMetadataKeys();for(let t of e)t[gt]&&this.metadata(t).reload?.();for(let t of this.structure.children())t._reloadValidation();}controlValueSignal(){let e=w0(this.value);e.rawSet=e.set,e.set=r=>{e.rawSet(r),this.markAsDirty(),this.debounceSync();};let t=e.update;return e.update=r=>{t(r),this.markAsDirty(),this.debounceSync();},e}sync(){this.value.set(this.controlValue());}flushSync(){let e=this.pendingSync();e&&!e.signal.aborted&&(e.abort(),this.sync());}async debounceSync(){let e=Er$1(()=>(this.pendingSync()?.abort(),this.nodeState.debouncer()));if(e){let t=new AbortController,r=e(t.signal);if(r&&(this.pendingSync.set(t),await r,t.signal.aborted))return}this.structure.isOrphaned()||this.sync();}static newRoot(e,t,r,i){return i.newRoot(e,t,r,i)}createStructure(e){return e.kind==="root"?new lt(this,e.logic,e.fieldManager,e.value,this.newChild.bind(this)):new ct(this,e.logic,e.parent,e.identityInParent,e.initialKeyInParent,this.newChild.bind(this))}newChild(e,t,r){let i,s;return r?(i=this.pathNode.getChild(U),s=this.structure.logic.getChild(U)):(i=this.pathNode.getChild(e),s=this.structure.logic.getChild(e)),this.fieldAdapter.newChild({kind:"child",parent:this,pathNode:i,logic:s,initialKeyInParent:e,identityInParent:t,fieldAdapter:this.fieldAdapter})}},dr=A$1(()=>[]),lr=A$1(()=>false);function Mn(n,e){return n?e&&n.element.compareDocumentPosition(e.element)&Node.DOCUMENT_POSITION_PRECEDING?e:n:e}var ht=class{node;selfTouched=X(false);selfDirty=X(false);markAsTouched(){this.selfTouched.set(true);}markAsDirty(){this.selfDirty.set(true);}markAsPristine(){this.selfDirty.set(false);}markAsUntouched(){this.selfTouched.set(false);}formFieldBindings=X([]);constructor(e){this.node=e;}dirty=A$1(()=>{let e=this.selfDirty()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,r)=>r||t.nodeState.dirty(),yn)});touched=A$1(()=>{let e=this.selfTouched()&&!this.isNonInteractive();return this.node.structure.reduceChildren(e,(t,r)=>r||t.nodeState.touched(),yn)});disabledReasons=A$1(()=>[...this.node.structure.parent?.nodeState.disabledReasons()??[],...this.node.logicNode.logic.disabledReasons.compute(this.node.context)],{equal:E});disabled=A$1(()=>!!this.disabledReasons().length);readonly=A$1(()=>(this.node.structure.parent?.nodeState.readonly()||this.node.logicNode.logic.readonly.compute(this.node.context))??false);hidden=A$1(()=>(this.node.structure.parent?.nodeState.hidden()||this.node.logicNode.logic.hidden.compute(this.node.context))??false);name=A$1(()=>{let e=this.node.structure.parent;return e?`${e.name()}.${this.node.structure.keyInParent()}`:this.node.structure.fieldManager.rootName});debouncer=A$1(()=>{if(this.node.logicNode.logic.hasMetadata(ot)){let t=this.node.logicNode.logic.getMetadata(ot).compute(this.node.context);if(t)return r=>t(this.node.context,r)}return this.node.structure.parent?.nodeState.debouncer?.()});isNonInteractive=A$1(()=>this.hidden()||this.disabled()||this.readonly())},ft=class{newRoot(e,t,r,i){return new fe({kind:"root",fieldManager:e,value:t,pathNode:r,logic:r.builder.build(),fieldAdapter:i})}newChild(e){return new fe(e)}createNodeState(e){return new ht(e)}createValidationState(e){return new st(e)}createStructure(e,t){return e.createStructure(t)}},mt=class{injector;rootName;submitOptions;constructor(e,t,r){this.injector=e,this.rootName=t??`${this.injector.get(Mh)}.form${cr++}`,this.submitOptions=r;}structures=new Set;createFieldManagementEffect(e){ne$1(()=>{let t=new Set;this.markStructuresLive(e,t);for(let r of this.structures)t.has(r)||(this.structures.delete(r),Er$1(()=>r.destroy()));},{injector:this.injector});}markStructuresLive(e,t){t.add(e);for(let r of e.children())this.markStructuresLive(r.structure,t);}},cr=0,Dn=new w("");function ur(n){let e,t,r;return n.length===3?[e,t,r]=n:n.length===2?Xn(n[1])?[e,t]=n:[e,r]=n:[e]=n,[e,t,r]}function hr(...n){let[e,t,r]=ur(n),i=r?.injector??y(ze$1),s=Hr$1(i,()=>Pe.rootCompile(t)),o=new mt(i,r?.name,r?.submission),d=r?.adapter??new ft,l=fe.newRoot(o,e,s,d);o.createFieldManagementEffect(l.structure);let{experimentalWebMcpTool:g}=r??{};if(g){let v=Hr$1(i,()=>y(Dn,{optional:!0}));v&&Hr$1(i,()=>v(l.fieldTree,{name:g.name,description:g.description}));}return l.fieldTree}async function Tn(n,e){let t=Er$1(n);if(Er$1(t.submitState.submitting))return  false;let r=e===void 0?t.structure.root.fieldProxy:n,i={root:t.structure.root.fieldProxy,submitted:n};e=typeof e=="function"?{action:e}:e??t.structure.fieldManager.submitOptions;let s=e?.action;if(!s)throw new M(1915,false);t.markAsTouched();let o=e?.onInvalid,d=fr(t,e?.ignoreValidators);try{if(d){t.submitState.selfSubmitting.set(!0);let l=await Er$1(()=>s?.(r,i));return l&&mr(t,l),!l||T(l)&&l.length===0}else Er$1(()=>o?.(r,i));return !1}finally{t.submitState.selfSubmitting.set(false);}}function fr(n,e){switch(e){case "all":return  true;case "none":return Er$1(n.valid);default:return !Er$1(n.invalid)}}function mr(n,e){T(e)||(e=[e]);let t=new Map;for(let r of e){let i=wt(r,n.fieldTree),s=i.fieldTree(),o=t.get(s);o||(o=[],t.set(s,o)),o.push(i);}for(let[r,i]of t)r.submitState.submissionErrors.set(i);}var Ve=class{kind="compat";control;fieldTree;context;message;constructor({context:e,kind:t,control:r}){this.context=e,this.kind=t,this.control=r;}};function xn(n){if(n.length===0)return null;let e={};for(let t of n)e[t.kind]=t instanceof Ve?t.context:t;return e}function On(n,e){return n===null?[]:Object.entries(n).map(([t,r])=>new Ve({context:r,kind:t,control:e}))}var gr=new w("");function $i(n,e){je(n);let t=x.unwrapFieldPath(n),r;typeof e=="function"||typeof e=="string"?r=e:r=e?.when,t.builder.addDisabledReasonRule(i=>{let s=true;return typeof r=="string"?s=r:r&&(s=r(i)),typeof s=="string"?{fieldTree:i.fieldTree,message:s}:s?{fieldTree:i.fieldTree}:void 0});}function pr(n){let e=n;return typeof e.length=="number"?e.length:e.size}function A(n,e){return n instanceof Function?n(e):n}function Ke(n){return typeof n=="number"?isNaN(n):n===""||n===false||n==null}function An(n){return n===void 0?[]:Array.isArray(n)?n:[n]}function me(n,e){je(n),x.unwrapFieldPath(n).builder.addSyncErrorRule(r=>wt(e(r),r.fieldTree));}function yr(n){return new Nt(n)}function vr(n,e){return new Ct(n,e)}function br(n,e){return new St(n,e)}function Mr(n,e){return new _t(n,e)}function Er(n){return new Dt(n)}var B=class{__brand=void 0;kind="";fieldTree;message;constructor(e){e&&Object.assign(this,e);}},Nt=class extends B{kind="required"},Ct=class extends B{min;kind="min";constructor(e,t){super(t),this.min=e;}};var St=class extends B{minLength;kind="minLength";constructor(e,t){super(t),this.minLength=e;}};var _t=class extends B{pattern;kind="pattern";constructor(e,t){super(t),this.pattern=e;}},Dt=class extends B{kind="email"},$e=class extends B{kind="parse"};var wr=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;function Ki(n,e){me(n,t=>{if(!(e?.when&&!e.when(t))&&!Ke(t.value())&&!wr.test(t.value()))return e?.error?A(e.error,t):Er({message:A(e?.message,t)})});}function zi(n,e,t){let r=C();O(n,r,i=>{return typeof e=="function"?e(i):e}),O(n,bt,({state:i})=>i.metadata(r)()),O(n,vt,()=>bt),me(n,i=>{let s=i.value();if(s===null||Number.isNaN(s))return;let o=i.state.metadata(r)();if(!(o===void 0||Number.isNaN(o))&&s<o)return vr(o,{message:A(t?.message,i)})});}function Hi(n,e,t){let r=O(n,C(),i=>{if(!(t?.when&&!t.when(i)))return typeof e=="number"?e:e(i)});O(n,Mt,({state:i})=>i.metadata(r)()),me(n,i=>{if(Ke(i.value()))return;let s=i.state.metadata(r)();if(s!==void 0&&pr(i.value())<s)return t?.error?A(t.error,i):br(s,{message:A(t?.message,i)})});}function Ui(n,e,t){let r=O(n,C(),i=>{return e instanceof RegExp?e:e(i)});O(n,Et,({state:i})=>i.metadata(r)()),me(n,i=>{if(Ke(i.value()))return;let s=i.state.metadata(r)();if(s!==void 0&&!s.test(i.value()))return Mr(s,{message:A(t?.message,i)})});}function Gi(n,e){let t=O(n,C(),r=>e?.when?e.when(r):true);O(n,yt,({state:r})=>r.metadata(t)()),me(n,r=>{if(r.state.metadata(t)()&&Ke(r.value()))return e?.error?A(e.error,r):yr({message:A(e?.message,r)})});}function Nr(n,e,t){let r=w0({source:n,computation:()=>[],equal:E}),i=o=>{let d=t(o);r.set(An(d.error)),d.value!==void 0&&e(d.value),r.set(An(d.error));},s=()=>{r.set([]);};return {errors:r.asReadonly(),setRawValue:i,reset:s}}var Tt=class{field;constructor(e){this.field=e;}control=this;get value(){return this.field().controlValue()}get valid(){return this.field().valid()}get invalid(){return this.field().invalid()}get pending(){return this.field().pending()}get disabled(){return this.field().disabled()}get enabled(){return !this.field().disabled()}get errors(){return xn(this.field().errors())}get pristine(){return !this.field().dirty()}get dirty(){return this.field().dirty()}get touched(){return this.field().touched()}get untouched(){return !this.field().touched()}get status(){if(this.field().disabled())return "DISABLED";if(this.field().valid())return "VALID";if(this.field().invalid())return "INVALID";if(this.field().pending())return "PENDING";throw new M(1910,false)}valueAccessor=null;hasValidator(e){return e===J$1.required?this.field().required():false}updateValueAndValidity(){}},xt={disabled:"disabled",disabledReasons:"disabledReasons",dirty:"dirty",errors:"errors",hidden:"hidden",invalid:"invalid",max:"max",maxLength:"maxLength",min:"min",minLength:"minLength",name:"name",pattern:"pattern",pending:"pending",readonly:"readonly",required:"required",touched:"touched"},Cr=(()=>{let n={};for(let e of Object.keys(xt))n[xt[e]]=e;return n})();function Ot(n,e){let t=Cr[e];return n[t]?.()}var At=Object.values(xt);function ze(){return {}}function q(n,e,t){return n[e]!==t?(n[e]=t,true):false}function Sr(n,e,t){let r;if(Ln(n)&&t.isBadInput(n))return {error:new $e};switch(n.type){case "checkbox":return {value:n.checked};case "number":case "range":case "datetime-local":if(r=Er$1(e),typeof r=="number"||r===null)return {value:n.value===""?null:n.valueAsNumber};break;case "date":case "month":case "time":case "week":if(r=Er$1(e),r===null||r instanceof Date)return {value:n.valueAsDate};if(typeof r=="number")return {value:n.valueAsNumber};break}if(n.tagName==="INPUT"&&n.type==="text"&&(r??=Er$1(e),typeof r=="number"||r===null)){if(n.value==="")return {value:null};let i=Number(n.value);return Number.isNaN(i)?{error:new $e}:{value:i}}return {value:n.value}}function In(n,e){switch(n.type){case "checkbox":n.checked=e;return;case "radio":n.checked=e===n.value;return;case "number":case "range":case "datetime-local":if(typeof e=="number"){kn(n,e);return}else if(e===null){n.value="";return}break;case "date":case "month":case "time":case "week":if(e===null||e instanceof Date){n.valueAsDate=e;return}else if(typeof e=="number"){kn(n,e);return}}if(n.tagName==="INPUT"&&n.type==="text"){if(typeof e=="number"){n.value=isNaN(e)?"":String(e);return}if(e===null){n.value="";return}}n.value=e;}function kn(n,e){isNaN(e)?n.value="":n.valueAsNumber=e;}function Ln(n){return n.tagName==="INPUT"}function _r(n){return n.type==="date"||n.type==="datetime-local"||n.type==="month"||n.type==="time"||n.type==="week"}function Dr(n,e){let t=n.getUTCFullYear(),r=String(n.getUTCMonth()+1).padStart(2,"0");if(e==="month")return `${t}-${r}`;let i=String(n.getUTCDate()).padStart(2,"0");return `${t}-${r}-${i}`}function Fn(n,e,t){return e instanceof Date&&(n==="min"||n==="max")&&(t==="date"||t==="month")?Dr(e,t):e}function Tr(n,e){n.listenToCustomControlModel(r=>e.state().controlValue.set(r)),n.listenToCustomControlOutput("touch",()=>e.state().markAsTouched()),e.registerAsBinding(n.customControl);let t=ze();return ()=>{let r=e.state(),i=r.controlValue();q(t,"controlValue",i)&&n.setCustomControlModelInput(i);for(let s of At){let o;if(s==="errors"?o=e.errors():o=Ot(r,s),q(t,s,o)&&(n.setInputOnDirectives(s,o),e.elementAcceptsNativeProperty(s)&&!n.customControlHasInput(s))){let d=Fn(s,o,e.nativeFormElement.type);Dt$1(e.renderer,e.nativeFormElement,s,d);}}}}function xr(n){return typeof n=="object"&&n!==null}function Or(n,e){let t=ze();e.controlValueAccessor.registerOnChange(i=>{t.controlValue=i,e.state().controlValue.set(i);}),e.controlValueAccessor.registerOnTouched(()=>e.state().markAsTouched());let r=e.injector.get(Re$1,null,{optional:true,self:true});if(r){let i;for(let l of r)xr(l)&&l.registerOnValidatorChange&&(i??=X(0),l.registerOnValidatorChange(()=>{i.update(g=>g+1);}));let s=r.map(l=>typeof l=="function"?l:l.validate.bind(l)),o=J$1.compose(s),d=A$1(()=>{i?.();let l=o?o(e.interopNgControl.control):null;return On(l,e.interopNgControl.control)});e.parseErrorsSource.set(d);}return e.registerAsBinding({reset:()=>{let i=e.state().value();t.controlValue=i,Er$1(()=>e.controlValueAccessor.writeValue(i));}}),()=>{let i=e.state(),s=i.value();q(t,"controlValue",s)&&Er$1(()=>e.controlValueAccessor.writeValue(s));for(let o of At){let d=Ot(i,o);if(q(t,o,d)){let l=n.setInputOnDirectives(o,d);o==="disabled"&&e.controlValueAccessor.setDisabledState?Er$1(()=>e.controlValueAccessor.setDisabledState(d)):!l&&e.elementAcceptsNativeProperty(o)&&Dt$1(e.renderer,e.nativeFormElement,o,d);}}}}function Ar(n,e,t){if(typeof MutationObserver!="function")return;let r=new MutationObserver(i=>{i.some(s=>Ir(s))&&e();});r.observe(n,{attributes:true,attributeFilter:["value"],characterData:true,childList:true,subtree:true}),t.onDestroy(()=>r.disconnect());}function Ir(n){if(n.type==="childList"||n.type==="characterData"){if(n.target instanceof Comment)return  false;for(let e of n.addedNodes)if(!(e instanceof Comment))return  true;for(let e of n.removedNodes)if(!(e instanceof Comment))return  true;return  false}return n.type==="attributes"&&n.target instanceof HTMLOptionElement}function kr(n,e,t,r){let i=false,s=e.nativeFormElement,o=Nr(()=>e.state().value(),l=>e.state().controlValue.set(l),l=>Sr(s,e.state().value,r));t.set(o.errors),e.onReset=()=>{o.reset();let l=e.state().value();d.controlValue=l,In(s,l);},n.listenToDom("input",()=>o.setRawValue(void 0)),n.listenToDom("blur",()=>e.state().markAsTouched()),Ln(s)&&_r(s)&&r.watchValidity(e.destroyRef,s,()=>o.setRawValue(void 0)),e.registerAsBinding(),s.tagName==="SELECT"&&Ar(s,()=>{i&&(s.value=e.state().controlValue());},e.destroyRef);let d=ze();return ()=>{let l=e.state();for(let v of At){let re=Ot(l,v);if(q(d,v,re)&&(n.setInputOnDirectives(v,re),e.elementAcceptsNativeProperty(v))){let He=Fn(v,re,s.type);Dt$1(e.renderer,s,v,He);}}let g=l.controlValue();q(d,"controlValue",g)&&In(s,g),i=true;}}var Vn=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275prov=N({token:n,factory:t=>Rr.\u0275fac(t),providedIn:"root"})}return n})(),Rr=(()=>{class n extends Vn{document=y(we);cspNonce=y(xh,{optional:true});injectedStyles=new WeakMap;watchValidity(t,r,i){let s=r.getRootNode();this.injectedStyles.has(s)||this.injectedStyles.set(s,this.createTransitionStyle(s));let o=d=>{let l=d;(l.animationName==="ng-valid"||l.animationName==="ng-invalid")&&i();};r.addEventListener("animationstart",o),t.onDestroy(()=>{r.removeEventListener("animationstart",o);});}isBadInput(t){return t.validity?.badInput??false}createTransitionStyle(t){let r=this.document.createElement("style");return this.cspNonce&&(r.nonce=this.cspNonce),r.textContent=`
      @keyframes ng-valid {}
      @keyframes ng-invalid {}
      input:valid, textarea:valid {
        animation: ng-valid 0.001s;
      }
      input:invalid, textarea:invalid {
        animation: ng-invalid 0.001s;
      }
    `,t.nodeType===9?t.head?.appendChild(r):t.appendChild(r),r}ngOnDestroy(){this.injectedStyles.get(this.document)?.remove();}static \u0275fac=(()=>{let t;return function(i){return (t||(t=le(n)))(i||n)}})();static \u0275prov=N({token:n,factory:n.\u0275fac})}return n})(),Pr=Symbol(),Rn=new w(""),qi=(()=>{class n{field=v.required({alias:"formField"});state=A$1(()=>this.field()());renderer=y(ao);destroyRef=y(pt$1);injector=y(ze$1);element=y(ht$1).nativeElement;elementIsNativeFormElement=Vt(this.element);elementAcceptsTextualValues=dn(this.element);_elementAcceptsMinMax;nativeFormElement=this.elementIsNativeFormElement?this.element:void 0;focuser=t=>this.element.focus(t);controlValueAccessors=y(Oe$1,{optional:true,self:true});config=y(gr,{optional:true});validityMonitor=y(Vn);parseErrorsSource=X(void 0);_interopNgControl;get interopNgControl(){return this._interopNgControl??=new Tt(this.state)}parseErrors=A$1(()=>this.parseErrorsSource()?.().map(t=>m(l({},t),{fieldTree:Er$1(this.state).fieldTree,formField:this}))??[],{equal:E});errors=A$1(()=>this.state().errors().filter(t=>!t.formField||t.formField===this),{equal:E});isFieldBinding=false;resetter=()=>{};parseErrorsResetCallback;setParseErrors(t){this.parseErrorsSource.set(t);}set onReset(t){this.parseErrorsResetCallback=t;}get onReset(){return this.parseErrorsResetCallback}get controlValueAccessor(){return !this.controlValueAccessors||this.controlValueAccessors.length===0?this.interopNgControl?.valueAccessor??void 0:Rt(this.interopNgControl,this.controlValueAccessors)??void 0}installClassBindingEffect(){let t=Object.entries(this.config?.classes??{}).map(([i,s])=>[i,A$1(()=>s(this))]);if(t.length===0)return;let r=ze();Hd({write:()=>{for(let[i,s]of t){let o=s();q(r,i,o)&&(o?this.renderer.addClass(this.element,i):this.renderer.removeClass(this.element,i));}}},{injector:this.injector});}focus(t){this.focuser(t);}reset(){this.resetter(),this.parseErrorsResetCallback?.(this.state().value());}registerAsBinding(t){if(this.isFieldBinding)throw new M(1913,false);this.isFieldBinding=true,this.installClassBindingEffect(),t?.focus&&(this.focuser=r=>t.focus(r)),t?.reset&&(this.resetter=()=>t.reset()),ne$1(r=>{let i=this.state();i.nodeState.formFieldBindings.update(s=>[...s,this]),r(()=>{i.nodeState.formFieldBindings.update(s=>s.filter(o=>o!==this));});},{injector:this.injector});}[Pr];\u0275ngControlCreate(t){if(!t.hasPassThrough)if(this.controlValueAccessor)this.\u0275ngControlUpdate=Or(t,this);else if(t.customControl)this.\u0275ngControlUpdate=Tr(t,this);else if(this.elementIsNativeFormElement)this.\u0275ngControlUpdate=kr(t,this,this.parseErrorsSource,this.validityMonitor);else throw new M(1914,false)}\u0275ngControlUpdate;elementAcceptsNativeProperty(t){if(!this.elementIsNativeFormElement)return  false;switch(t){case "min":case "max":return this._elementAcceptsMinMax??=un(this.element);case "minLength":case "maxLength":return this.elementAcceptsTextualValues;case "disabled":case "required":case "readonly":case "name":return  true;default:return  false}}static \u0275fac=function(r){return new(r||n)};static \u0275dir=he$1({type:n,selectors:[["","formField",""]],inputs:{field:[1,"formField","field"]},exportAs:["formField"],features:[Ne([{provide:Rn,useExisting:n},{provide:C$1,useFactory:()=>y(n).interopNgControl},{provide:Ft,useFactory:()=>y(Rn,{self:true})}]),QT("formField")]})}return n})(),Zi=(()=>{class n{fieldTree=v.required({alias:"formRoot"});onSubmit(t){t.preventDefault(),Er$1(()=>{let r=this.fieldTree();r().structure.fieldManager.submitOptions&&Tn(r);});}static \u0275fac=function(r){return new(r||n)};static \u0275dir=he$1({type:n,selectors:[["form","formRoot",""]],hostAttrs:["novalidate",""],hostBindings:function(r,i){r&1&&tc("submit",function(o){return i.onSubmit(o)});},inputs:{fieldTree:[1,"formRoot","fieldTree"]}})}return n})();var Bn=`
    .p-message {
        display: grid;
        grid-template-rows: 1fr;
        border-radius: dt('message.border.radius');
        outline-width: dt('message.border.width');
        outline-style: solid;
    }

    .p-message-content-wrapper {
        min-height: 0;
    }

    .p-message-content {
        display: flex;
        align-items: center;
        padding: dt('message.content.padding');
        gap: dt('message.content.gap');
    }

    .p-message-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-inline-start: auto;
        overflow: hidden;
        position: relative;
        width: dt('message.close.button.width');
        height: dt('message.close.button.height');
        border-radius: dt('message.close.button.border.radius');
        background: transparent;
        transition:
            background dt('message.transition.duration'),
            color dt('message.transition.duration'),
            outline-color dt('message.transition.duration'),
            box-shadow dt('message.transition.duration'),
            opacity 0.3s;
        outline-color: transparent;
        color: inherit;
        padding: 0;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    .p-message-close-button svg,
    .p-message-close-button i {
        font-size: dt('message.close.icon.size');
        width: dt('message.close.icon.size');
        height: dt('message.close.icon.size');
    }

    .p-message-close-button:focus-visible {
        outline-width: dt('message.close.button.focus.ring.width');
        outline-style: dt('message.close.button.focus.ring.style');
        outline-offset: dt('message.close.button.focus.ring.offset');
    }

    .p-message-info {
        background: dt('message.info.background');
        outline-color: dt('message.info.border.color');
        color: dt('message.info.color');
        box-shadow: dt('message.info.shadow');
    }

    .p-message-info .p-message-close-button:focus-visible {
        outline-color: dt('message.info.close.button.focus.ring.color');
        box-shadow: dt('message.info.close.button.focus.ring.shadow');
    }

    .p-message-info .p-message-close-button:hover {
        background: dt('message.info.close.button.hover.background');
    }

    .p-message-info.p-message-outlined {
        color: dt('message.info.outlined.color');
        outline-color: dt('message.info.outlined.border.color');
    }

    .p-message-info.p-message-simple {
        color: dt('message.info.simple.color');
    }

    .p-message-success {
        background: dt('message.success.background');
        outline-color: dt('message.success.border.color');
        color: dt('message.success.color');
        box-shadow: dt('message.success.shadow');
    }

    .p-message-success .p-message-close-button:focus-visible {
        outline-color: dt('message.success.close.button.focus.ring.color');
        box-shadow: dt('message.success.close.button.focus.ring.shadow');
    }

    .p-message-success .p-message-close-button:hover {
        background: dt('message.success.close.button.hover.background');
    }

    .p-message-success.p-message-outlined {
        color: dt('message.success.outlined.color');
        outline-color: dt('message.success.outlined.border.color');
    }

    .p-message-success.p-message-simple {
        color: dt('message.success.simple.color');
    }

    .p-message-warn {
        background: dt('message.warn.background');
        outline-color: dt('message.warn.border.color');
        color: dt('message.warn.color');
        box-shadow: dt('message.warn.shadow');
    }

    .p-message-warn .p-message-close-button:focus-visible {
        outline-color: dt('message.warn.close.button.focus.ring.color');
        box-shadow: dt('message.warn.close.button.focus.ring.shadow');
    }

    .p-message-warn .p-message-close-button:hover {
        background: dt('message.warn.close.button.hover.background');
    }

    .p-message-warn.p-message-outlined {
        color: dt('message.warn.outlined.color');
        outline-color: dt('message.warn.outlined.border.color');
    }

    .p-message-warn.p-message-simple {
        color: dt('message.warn.simple.color');
    }

    .p-message-error {
        background: dt('message.error.background');
        outline-color: dt('message.error.border.color');
        color: dt('message.error.color');
        box-shadow: dt('message.error.shadow');
    }

    .p-message-error .p-message-close-button:focus-visible {
        outline-color: dt('message.error.close.button.focus.ring.color');
        box-shadow: dt('message.error.close.button.focus.ring.shadow');
    }

    .p-message-error .p-message-close-button:hover {
        background: dt('message.error.close.button.hover.background');
    }

    .p-message-error.p-message-outlined {
        color: dt('message.error.outlined.color');
        outline-color: dt('message.error.outlined.border.color');
    }

    .p-message-error.p-message-simple {
        color: dt('message.error.simple.color');
    }

    .p-message-secondary {
        background: dt('message.secondary.background');
        outline-color: dt('message.secondary.border.color');
        color: dt('message.secondary.color');
        box-shadow: dt('message.secondary.shadow');
    }

    .p-message-secondary .p-message-close-button:focus-visible {
        outline-color: dt('message.secondary.close.button.focus.ring.color');
        box-shadow: dt('message.secondary.close.button.focus.ring.shadow');
    }

    .p-message-secondary .p-message-close-button:hover {
        background: dt('message.secondary.close.button.hover.background');
    }

    .p-message-secondary.p-message-outlined {
        color: dt('message.secondary.outlined.color');
        outline-color: dt('message.secondary.outlined.border.color');
    }

    .p-message-secondary.p-message-simple {
        color: dt('message.secondary.simple.color');
    }

    .p-message-contrast {
        background: dt('message.contrast.background');
        outline-color: dt('message.contrast.border.color');
        color: dt('message.contrast.color');
        box-shadow: dt('message.contrast.shadow');
    }

    .p-message-contrast .p-message-close-button:focus-visible {
        outline-color: dt('message.contrast.close.button.focus.ring.color');
        box-shadow: dt('message.contrast.close.button.focus.ring.shadow');
    }

    .p-message-contrast .p-message-close-button:hover {
        background: dt('message.contrast.close.button.hover.background');
    }

    .p-message-contrast.p-message-outlined {
        color: dt('message.contrast.outlined.color');
        outline-color: dt('message.contrast.outlined.border.color');
    }

    .p-message-contrast.p-message-simple {
        color: dt('message.contrast.simple.color');
    }

    .p-message-text {
        font-size: dt('message.text.font.size');
        font-weight: dt('message.text.font.weight');
    }

    .p-message-icon {
        display: inline-flex;
    }

    .p-message-icon,
    .p-message-icon svg,
    .p-message-icon i {
        flex-shrink: 0;
        font-size: dt('message.icon.size');
        width: dt('message.icon.size');
        height: dt('message.icon.size');
    }

    .p-message-sm .p-message-content {
        padding: dt('message.content.sm.padding');
    }

    .p-message-sm .p-message-text {
        font-size: dt('message.text.sm.font.size');
    }

    .p-message-sm .p-message-icon,
    .p-message-sm .p-message-icon svg,
    .p-message-sm .p-message-icon i {
        font-size: dt('message.icon.sm.size');
        width: dt('message.icon.sm.size');
        height: dt('message.icon.sm.size');
    }

    .p-message-sm .p-message-close-button svg,
    .p-message-sm .p-message-close-button i {
        width: dt('message.close.icon.sm.size');
        height: dt('message.close.icon.sm.size');
    }

    .p-message-lg .p-message-content {
        padding: dt('message.content.lg.padding');
    }

    .p-message-lg .p-message-text {
        font-size: dt('message.text.lg.font.size');
    }

    .p-message-lg .p-message-icon,
    .p-message-lg .p-message-icon svg,
    .p-message-lg .p-message-icon i {
        font-size: dt('message.icon.lg.size');
        width: dt('message.icon.lg.size');
        height: dt('message.icon.lg.size');
    }

    .p-message-lg .p-message-close-button svg,
    .p-message-lg .p-message-close-button i {
        font-size: dt('message.close.icon.lg.size');
        width: dt('message.close.icon.lg.size');
        height: dt('message.close.icon.lg.size');
    }

    .p-message-outlined {
        background: transparent;
        outline-width: dt('message.outlined.border.width');
    }

    .p-message-simple {
        background: transparent;
        outline-color: transparent;
        box-shadow: none;
    }

    .p-message-simple .p-message-content {
        padding: dt('message.simple.content.padding');
    }

    .p-message-outlined .p-message-close-button:hover,
    .p-message-simple .p-message-close-button:hover {
        background: transparent;
    }

    .p-message-enter-active {
        animation: p-animate-message-enter 0.3s ease-out forwards;
        overflow: hidden;
    }

    .p-message-leave-active {
        animation: p-animate-message-leave 0.15s ease-in forwards;
        overflow: hidden;
    }

    @keyframes p-animate-message-enter {
        from {
            opacity: 0;
            grid-template-rows: 0fr;
        }
        to {
            opacity: 1;
            grid-template-rows: 1fr;
        }
    }

    @keyframes p-animate-message-leave {
        from {
            opacity: 1;
            grid-template-rows: 1fr;
        }
        to {
            opacity: 0;
            margin: 0;
            grid-template-rows: 0fr;
        }
    }
`;var Fr=["container"],Vr=["icon"],Br=["closeicon"],jr=["*"];function $r(n,e){n&1&&fo(0);}function Kr(n,e){if(n&1&&lo(0,$r,1,0,"ng-container",3),n&2){let t=W();mt$1("ngTemplateOutlet",t.iconTemplate());}}function zr(n,e){if(n&1&&Dr$1(0,"i",0),n&2){let t=W();Se(t.cn(t.cx("icon"),t.icon())),mt$1("pBind",t.ptm("icon")),U$1("data-p",t.dataP());}}function Hr(n,e){n&1&&fo(0);}function Ur(n,e){if(n&1&&lo(0,Hr,1,0,"ng-container",4),n&2){let t=W();mt$1("ngTemplateOutlet",t.containerTemplate())("ngTemplateOutletContext",t.containerContext);}}function Gr(n,e){if(n&1&&(mr$1(0,"span",0),Wt(1),uo()),n&2){let t=W();Se(t.cx("text")),mt$1("pBind",t.ptm("text")),U$1("data-p",t.dataP());}}function qr(n,e){if(n&1&&Dr$1(0,"i",0),n&2){let t=W(2);Se(t.cn(t.cx("closeIcon"),t.closeIcon())),mt$1("pBind",t.ptm("closeIcon")),U$1("data-p",t.dataP());}}function Zr(n,e){n&1&&fo(0);}function Wr(n,e){if(n&1&&lo(0,Zr,1,0,"ng-container",3),n&2){let t=W(2);mt$1("ngTemplateOutlet",t.closeIconTemplate());}}function Yr(n,e){if(n&1&&(pe(),Dr$1(0,"svg",7)),n&2){let t=W(2);Se(t.cx("closeIcon")),mt$1("pBind",t.ptm("closeIcon")),U$1("data-p",t.dataP());}}function Xr(n,e){if(n&1){let t=wS();mr$1(0,"button",5),tc("click",function(i){ah(t);let s=W();return ch(s.close(i))}),Le$1(1,qr,1,4,"i",1)(2,Wr,1,1,"ng-container")(3,Yr,1,4,":svg:svg",6),uo();}if(n&2){let t=W();Se(t.cx("closeButton")),mt$1("pBind",t.ptm("closeButton")),U$1("aria-label",t.closeAriaLabel)("data-p",t.dataP()),ln(),Pe$1(t.closeIcon()?1:t.closeIconTemplate()?2:3);}}var Qr={root:({instance:n})=>{let e=n.severity(),t=n.variant(),r=n.size();return ["p-message p-component p-message-"+e,t&&"p-message-"+t,{"p-message-sm":r==="small","p-message-lg":r==="large"}]},contentWrapper:"p-message-content-wrapper",content:"p-message-content",icon:"p-message-icon",text:"p-message-text",closeButton:"p-message-close-button",closeIcon:"p-message-close-icon"},jn=(()=>{class n extends Be$1{name="message";style=Bn;classes=Qr;static \u0275fac=(()=>{let t;return function(i){return (t||(t=le(n)))(i||n)}})();static \u0275prov=N({token:n,factory:n.\u0275fac})}return n})();var $n=new w("MESSAGE_INSTANCE"),Jr=(()=>{class n extends $e$1{componentName="Message";_componentStyle=y(jn);bindDirectiveInstance=y(re,{self:true});$pcMessage=y($n,{optional:true,skipSelf:true})??void 0;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}severity=v("info");closable=v(false,{transform:Y});icon=v();closeIcon=v();life=v(void 0,{transform:sv});size=v();variant=v();motionOptions=v();computedMotionOptions=A$1(()=>l(l({},this.ptm("motion")),this.motionOptions()));onClose=ue$1();get closeAriaLabel(){return this.config.translation.aria?this.config.translation.aria.close:void 0}visible=X(true);containerTemplate=mo("container",{descendants:false});iconTemplate=mo("icon",{descendants:false});closeIconTemplate=mo("closeicon",{descendants:false});closeCallback=t=>{this.close(t);};containerContext={closeCallback:this.closeCallback};onInit(){let t=this.life();t&&setTimeout(()=>{this.visible.set(false);},t);}close(t){this.visible.set(false),this.onClose.emit({originalEvent:t});}dataP=A$1(()=>this.cn({outlined:this.variant()==="outlined",simple:this.variant()==="simple",[this.severity()]:this.severity(),[this.size()]:this.size()}));static \u0275fac=(()=>{let t;return function(i){return (t||(t=le(n)))(i||n)}})();static \u0275cmp=ke$1({type:n,selectors:[["p-message"]],contentQueries:function(r,i,s){r&1&&Li(s,i.containerTemplate,Fr,4)(s,i.iconTemplate,Vr,4)(s,i.closeIconTemplate,Br,4),r&2&&nc(3);},hostAttrs:["role","alert","aria-live","polite"],hostVars:5,hostBindings:function(r,i){r&1&&(ma(function(){return "p-message-enter-active"}),ya(function(){return "p-message-leave-active"})),r&2&&(U$1("data-p",i.dataP()),Se(i.cx("root")),Pi("p-message-leave-active",!i.visible()));},inputs:{severity:[1,"severity"],closable:[1,"closable"],icon:[1,"icon"],closeIcon:[1,"closeIcon"],life:[1,"life"],size:[1,"size"],variant:[1,"variant"],motionOptions:[1,"motionOptions"]},outputs:{onClose:"onClose"},features:[Ne([jn,{provide:$n,useExisting:n},{provide:ot$1,useExisting:n}]),gt$1([re]),ie],ngContentSelectors:jr,decls:7,vars:12,consts:[[3,"pBind"],[3,"pBind","class"],["pRipple","","type","button",3,"pBind","class"],[4,"ngTemplateOutlet"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["pRipple","","type","button",3,"click","pBind"],["data-p-icon","times",3,"pBind","class"],["data-p-icon","times",3,"pBind"]],template:function(r,i){r&1&&(Ut(),mr$1(0,"div",0)(1,"div",0),Le$1(2,Kr,1,1,"ng-container"),Le$1(3,zr,1,4,"i",1),Le$1(4,Ur,1,2,"ng-container")(5,Gr,2,4,"span",1),Le$1(6,Xr,4,6,"button",2),uo()()),r&2&&(Se(i.cx("contentWrapper")),mt$1("pBind",i.ptm("contentWrapper")),U$1("data-p",i.dataP()),ln(),Se(i.cx("content")),mt$1("pBind",i.ptm("content")),U$1("data-p",i.dataP()),ln(),Pe$1(i.iconTemplate()?2:-1),ln(),Pe$1(i.icon()?3:-1),ln(),Pe$1(i.containerTemplate()?4:5),ln(2),Pe$1(i.closable()?6:-1));},dependencies:[qd,A3,Bc,Nc,re,Z3],encapsulation:2})}return n})(),ms=(()=>{class n{static \u0275fac=function(r){return new(r||n)};static \u0275mod=Me({type:n});static \u0275inj=Ie$1({imports:[Jr,Nc,Nc]})}return n})();var Kn=["content"],ei=["overlay"],zn=["*","*"],ti=()=>({mode:null}),Gn=n=>({$implicit:n}),ni=n=>({mode:n});function ri(n,e){n&1&&fo(0);}function ii(n,e){if(n&1&&(Wt(0),lo(1,ri,1,0,"ng-container",2)),n&2){let t=W();ln(),mt$1("ngTemplateOutlet",t.contentTemplate())("ngTemplateOutletContext",c0(3,Gn,a0(2,ti)));}}function si(n,e){n&1&&fo(0);}function oi(n,e){if(n&1){let t=wS();mr$1(0,"div",4,0),tc("click",function(){ah(t);let i=W(2);return ch(i.onOverlayClick())}),mr$1(2,"p-motion",5),tc("onBeforeEnter",function(i){ah(t);let s=W(2);return ch(s.onOverlayBeforeEnter(i))})("onEnter",function(i){ah(t);let s=W(2);return ch(s.onOverlayEnter(i))})("onAfterEnter",function(i){ah(t);let s=W(2);return ch(s.onOverlayAfterEnter(i))})("onBeforeLeave",function(i){ah(t);let s=W(2);return ch(s.onOverlayBeforeLeave(i))})("onLeave",function(i){ah(t);let s=W(2);return ch(s.onOverlayLeave(i))})("onAfterLeave",function(i){ah(t);let s=W(2);return ch(s.onOverlayAfterLeave(i))}),mr$1(3,"div",4,1),tc("click",function(i){ah(t);let s=W(2);return ch(s.onOverlayContentClick(i))}),Wt(5,1),lo(6,si,1,0,"ng-container",2),uo()()();}if(n&2){let t=W(2);ho(t.sx("root")),Se(t.cn(t.cx("root"),t.mergedStyleClass())),mt$1("pBind",t.ptm("root")),ln(2),mt$1("visible",t.visible())("appear",true)("options",t.computedMotionOptions()),ln(),ho(t.sx("content")),Se(t.cn(t.cx("content"),t.mergedContentStyleClass())),mt$1("pBind",t.ptm("content")),ln(3),mt$1("ngTemplateOutlet",t.contentTemplate())("ngTemplateOutletContext",c0(17,Gn,c0(15,ni,t.overlayMode())));}}function ai(n,e){if(n&1&&Le$1(0,oi,7,19,"div",3),n&2){let t=W();Pe$1(t.modalVisible()?0:-1);}}var di={root:({instance:n})=>{let t=n.modal()?n.$overlayResponsiveOptions()?.style:n.$overlayOptions()?.style;return l(l({position:"absolute",top:"0"},t),n.style())},content:({instance:n})=>{let t=n.modal()?n.$overlayResponsiveOptions()?.contentStyle:n.$overlayOptions()?.contentStyle;return l(l({},t),n.contentStyle())}},li=`
.p-overlay-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-content {
    transform-origin: inherit;
    will-change: transform;
}

/* Github Issue #18560 */
.p-component-overlay.p-component {
    position: relative;
}

.p-overlay-modal > .p-overlay-content {
    z-index: 1;
    width: 90%;
}

/* Position */
/* top */
.p-overlay-top {
    align-items: flex-start;
}
.p-overlay-top-start {
    align-items: flex-start;
    justify-content: flex-start;
}
.p-overlay-top-end {
    align-items: flex-start;
    justify-content: flex-end;
}

/* bottom */
.p-overlay-bottom {
    align-items: flex-end;
}
.p-overlay-bottom-start {
    align-items: flex-end;
    justify-content: flex-start;
}
.p-overlay-bottom-end {
    align-items: flex-end;
    justify-content: flex-end;
}

/* left */
.p-overlay-left {
    justify-content: flex-start;
}
.p-overlay-left-start {
    justify-content: flex-start;
    align-items: flex-start;
}
.p-overlay-left-end {
    justify-content: flex-start;
    align-items: flex-end;
}

/* right */
.p-overlay-right {
    justify-content: flex-end;
}
.p-overlay-right-start {
    justify-content: flex-end;
    align-items: flex-start;
}
.p-overlay-right-end {
    justify-content: flex-end;
    align-items: flex-end;
}

.p-overlay-content ~ .p-overlay-content {
    display: none;
}
`,ci={host:"p-overlay-host",root:({instance:n})=>{let e=n.modal(),t=n.overlayResponsiveDirection();return ["p-overlay p-component",{"p-overlay-modal p-overlay-mask p-overlay-mask-enter-active":e,"p-overlay-center":e&&t==="center","p-overlay-top":e&&t==="top","p-overlay-top-start":e&&t==="top-start","p-overlay-top-end":e&&t==="top-end","p-overlay-bottom":e&&t==="bottom","p-overlay-bottom-start":e&&t==="bottom-start","p-overlay-bottom-end":e&&t==="bottom-end","p-overlay-left":e&&t==="left","p-overlay-left-start":e&&t==="left-start","p-overlay-left-end":e&&t==="left-end","p-overlay-right":e&&t==="right","p-overlay-right-start":e&&t==="right-start","p-overlay-right-end":e&&t==="right-end"}]},content:"p-overlay-content"},Hn=(()=>{class n extends Be$1{name="overlay";style=li;classes=ci;inlineStyles=di;static \u0275fac=(()=>{let t;return function(i){return (t||(t=le(n)))(i||n)}})();static \u0275prov=N({token:n,factory:n.\u0275fac})}return n})(),Un=new w("OVERLAY_INSTANCE"),ks=(()=>{class n extends $e$1{componentName="Overlay";$pcOverlay=y(Un,{optional:true,skipSelf:true})??void 0;hostName=v("");visible=sV(false);mode=v();style=v();styleClass=v();contentStyle=v();contentStyleClass=v();target=v();autoZIndex=v();baseZIndex=v();listener=v();responsive=v();options=v();appendTo=v(void 0);inline=v(false);motionOptions=v(void 0);onBeforeShow=ue$1();onShow=ue$1();onBeforeHide=ue$1();onHide=ue$1();onAnimationStart=ue$1();onAnimationDone=ue$1();onBeforeEnter=ue$1();onEnter=ue$1();onAfterEnter=ue$1();onBeforeLeave=ue$1();onLeave=ue$1();onAfterLeave=ue$1();overlayViewChild=aV("overlay");contentViewChild=aV("content");contentTemplate=mo("content",{descendants:false});hostAttrSelector=v();$appendTo=A$1(()=>this.appendTo()||this.config.overlayAppendTo());$overlayOptions=A$1(()=>l(l({},this.config?.overlayOptions),this.options()));$overlayResponsiveOptions=A$1(()=>l(l({},this.$overlayOptions()?.responsive),this.responsive()));overlayResponsiveDirection=A$1(()=>this.$overlayResponsiveOptions()?.direction||"center");$mode=A$1(()=>this.mode()||this.$overlayOptions()?.mode);mergedStyleClass=A$1(()=>this.cn(this.styleClass(),this.modal()?this.$overlayResponsiveOptions()?.styleClass:this.$overlayOptions()?.styleClass));mergedContentStyleClass=A$1(()=>this.cn(this.contentStyleClass(),this.modal()?this.$overlayResponsiveOptions()?.contentStyleClass:this.$overlayOptions()?.contentStyleClass));$target=A$1(()=>{let t=this.target()||this.$overlayOptions()?.target;return t===void 0?"@prev":t});$autoZIndex=A$1(()=>{let t=this.autoZIndex()||this.$overlayOptions()?.autoZIndex;return t===void 0?true:t});$baseZIndex=A$1(()=>{let t=this.baseZIndex()||this.$overlayOptions()?.baseZIndex;return t===void 0?0:t});$listener=A$1(()=>this.listener()||this.$overlayOptions()?.listener);modal=A$1(()=>{if(pc(this.platformId))return this.$mode()==="modal"||this.$overlayResponsiveOptions()&&this.document.defaultView?.matchMedia(this.$overlayResponsiveOptions().media?.replace("@media","")||`(max-width: ${this.$overlayResponsiveOptions().breakpoint})`).matches});overlayMode=A$1(()=>this.$mode()||(this.modal()?"modal":"overlay"));overlayEl=A$1(()=>this.overlayViewChild()?.nativeElement);contentEl=A$1(()=>this.contentViewChild()?.nativeElement);targetEl=A$1(()=>Q_(this.$target(),this.el?.nativeElement));computedMotionOptions=A$1(()=>l(l({},this.ptm("motion")),this.motionOptions()||this.$overlayOptions()?.motionOptions));modalVisible=X(false);isOverlayClicked=false;isOverlayContentClicked=false;scrollHandler;documentClickListener;documentResizeListener;_componentStyle=y(Hn);bindDirectiveInstance=y(re,{self:true});documentKeyboardListener;parentDragSubscription=null;transformOptions={default:"scaleY(0.8)",center:"scale(0.7)",top:"translate3d(0px, -100%, 0px)","top-start":"translate3d(0px, -100%, 0px)","top-end":"translate3d(0px, -100%, 0px)",bottom:"translate3d(0px, 100%, 0px)","bottom-start":"translate3d(0px, 100%, 0px)","bottom-end":"translate3d(0px, 100%, 0px)",left:"translate3d(-100%, 0px, 0px)","left-start":"translate3d(-100%, 0px, 0px)","left-end":"translate3d(-100%, 0px, 0px)",right:"translate3d(100%, 0px, 0px)","right-start":"translate3d(100%, 0px, 0px)","right-end":"translate3d(100%, 0px, 0px)"};overlayService=y(XU);constructor(){super(),ne$1(()=>{this.visible()&&!this.modalVisible()&&this.modalVisible.set(true);});}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"));}show(t,r=false){this.onVisibleChange(true),this.handleEvents("onShow",{overlay:t||this.overlayEl(),target:this.targetEl(),mode:this.overlayMode()}),r&&NU(this.targetEl()),this.modal()&&Rn$1(this.document?.body,"p-overflow-hidden");}hide(t,r=false){if(this.visible())this.onVisibleChange(false),this.handleEvents("onHide",{overlay:t||this.overlayEl(),target:this.targetEl(),mode:this.overlayMode()}),r&&NU(this.targetEl()),this.modal()&&Gt(this.document?.body,"p-overflow-hidden");else return}onVisibleChange(t){this.visible.set(t);}onOverlayClick(){this.isOverlayClicked=true;}onOverlayContentClick(t){this.overlayService.add({originalEvent:t,target:this.targetEl()}),this.isOverlayContentClicked=true;}container=X(void 0);onOverlayBeforeEnter(t){this.handleEvents("onBeforeShow",{overlay:this.overlayEl(),target:this.targetEl(),mode:this.overlayMode()}),this.container.set(this.overlayEl()||t.element),this.show(this.overlayEl(),true),this.hostAttrSelector()&&this.overlayEl()&&this.overlayEl().setAttribute(this.hostAttrSelector(),""),this.appendOverlay(),this.alignOverlay(),this.bindParentDragListener(),this.setZIndex(),this.handleEvents("onBeforeEnter",t);}onOverlayEnter(t){this.handleEvents("onEnter",t);}onOverlayAfterEnter(t){this.bindListeners(),this.handleEvents("onAfterEnter",t);}onOverlayBeforeLeave(t){this.handleEvents("onBeforeHide",{overlay:this.overlayEl(),target:this.targetEl(),mode:this.overlayMode()}),this.handleEvents("onBeforeLeave",t);}onOverlayLeave(t){this.handleEvents("onLeave",t);}onOverlayAfterLeave(t){this.hide(this.overlayEl(),true),this.container.set(null),this.unbindListeners(),this.appendOverlay(),X3.clear(this.overlayEl()),this.modalVisible.set(false),this.cd.markForCheck(),this.handleEvents("onAfterLeave",t);}handleEvents(t,r){this[t].emit(r);let i=this.options();i&&i[t]&&i[t](r),this.config?.overlayOptions&&(this.config?.overlayOptions)[t]&&(this.config?.overlayOptions)[t](r);}setZIndex(){this.$autoZIndex()&&X3.set(this.overlayMode(),this.overlayEl(),this.$baseZIndex()+this.config?.zIndex[this.overlayMode()]);}appendOverlay(){this.$appendTo()&&this.$appendTo()!=="self"&&(this.$appendTo()==="body"?TU(this.document.body,this.overlayEl()):TU(this.$appendTo(),this.overlayEl()));}alignOverlay(){this.modal()||this.overlayEl()&&this.targetEl()&&(this.overlayEl().style.minWidth=Yv(this.targetEl())+"px",this.$appendTo()==="self"?IU(this.overlayEl(),this.targetEl()):EU(this.overlayEl(),this.targetEl()));}bindListeners(){this.bindScrollListener(),this.bindDocumentClickListener(),this.bindDocumentResizeListener(),this.bindDocumentKeyboardListener();}unbindListeners(){this.unbindScrollListener(),this.unbindDocumentClickListener(),this.unbindDocumentResizeListener(),this.unbindDocumentKeyboardListener(),this.unbindParentDragListener();}bindParentDragListener(){!this.parentDragSubscription&&this.$appendTo()!=="self"&&this.targetEl&&(this.parentDragSubscription=this.overlayService.parentDragObservable.subscribe(t=>{t.contains(this.targetEl())&&this.hide(this.overlayEl(),true);}));}unbindParentDragListener(){this.parentDragSubscription&&(this.parentDragSubscription.unsubscribe(),this.parentDragSubscription=null);}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new Yb(this.targetEl(),t=>{(!this.$listener()||this.$listener()(t,{type:"scroll",mode:this.overlayMode(),valid:true}))&&this.hide(t,true);})),this.scrollHandler.bindScrollListener();}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener();}bindDocumentClickListener(){this.documentClickListener||(this.documentClickListener=this.renderer.listen(this.document,"click",t=>{let i=!(this.targetEl()&&(this.targetEl().isSameNode(t.target)||!this.isOverlayClicked&&this.targetEl().contains(t.target)))&&!this.isOverlayContentClicked;(this.$listener()?this.$listener()(t,{type:"outside",mode:this.overlayMode(),valid:t.which!==3&&i}):i)&&this.hide(t),this.isOverlayClicked=this.isOverlayContentClicked=false;}));}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null);}bindDocumentResizeListener(){this.documentResizeListener||(this.documentResizeListener=this.renderer.listen(this.document.defaultView,"resize",t=>{(this.$listener()?this.$listener()(t,{type:"resize",mode:this.overlayMode(),valid:!BU()}):!BU())&&this.hide(t,true);}));}unbindDocumentResizeListener(){this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null);}bindDocumentKeyboardListener(){this.documentKeyboardListener||(this.documentKeyboardListener=this.renderer.listen(this.document.defaultView,"keydown",t=>{if(this.$overlayOptions().hideOnEscape===false||t.code!=="Escape")return;(this.$listener()?this.$listener()(t,{type:"keydown",mode:this.overlayMode(),valid:!BU()}):!BU())&&this.hide(t,true);}));}unbindDocumentKeyboardListener(){this.documentKeyboardListener&&(this.documentKeyboardListener(),this.documentKeyboardListener=null);}onDestroy(){this.hide(this.overlayEl(),true),this.overlayEl()&&this.$appendTo()!=="self"&&(this.renderer.appendChild(this.el.nativeElement,this.overlayEl()),X3.clear(this.overlayEl())),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.unbindListeners();}static \u0275fac=function(r){return new(r||n)};static \u0275cmp=ke$1({type:n,selectors:[["p-overlay"]],contentQueries:function(r,i,s){r&1&&Li(s,i.contentTemplate,Kn,4),r&2&&nc();},viewQuery:function(r,i){r&1&&_y(i.overlayViewChild,ei,5)(i.contentViewChild,Kn,5),r&2&&nc(2);},inputs:{hostName:[1,"hostName"],visible:[1,"visible"],mode:[1,"mode"],style:[1,"style"],styleClass:[1,"styleClass"],contentStyle:[1,"contentStyle"],contentStyleClass:[1,"contentStyleClass"],target:[1,"target"],autoZIndex:[1,"autoZIndex"],baseZIndex:[1,"baseZIndex"],listener:[1,"listener"],responsive:[1,"responsive"],options:[1,"options"],appendTo:[1,"appendTo"],inline:[1,"inline"],motionOptions:[1,"motionOptions"],hostAttrSelector:[1,"hostAttrSelector"]},outputs:{visible:"visibleChange",onBeforeShow:"onBeforeShow",onShow:"onShow",onBeforeHide:"onBeforeHide",onHide:"onHide",onAnimationStart:"onAnimationStart",onAnimationDone:"onAnimationDone",onBeforeEnter:"onBeforeEnter",onEnter:"onEnter",onAfterEnter:"onAfterEnter",onBeforeLeave:"onBeforeLeave",onLeave:"onLeave",onAfterLeave:"onAfterLeave"},features:[Ne([Hn,{provide:Un,useExisting:n},{provide:ot$1,useExisting:n}]),gt$1([re]),ie],ngContentSelectors:zn,decls:2,vars:1,consts:[["overlay",""],["content",""],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"class","style","pBind"],[3,"click","pBind"],["name","p-anchored-overlay",3,"onBeforeEnter","onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave","visible","appear","options"]],template:function(r,i){r&1&&(Ut(zn),Le$1(0,ii,2,5)(1,ai,1,1)),r&2&&Pe$1(i.inline()?0:1);},dependencies:[qd,Nc,re,Z3,tx],encapsulation:2})}return n})();export{$i as $,Gi as G,Hi as H,Jr as J,Ki as K,Ui as U,Zi as Z,hr as h,ks as k,ms as m,qi as q,zi as z};