import {e as Je,O as Oe}from'./chunk-CxKzt94T.js';import {M as Me$1,e as Ie,t as Nc,$ as $e,y,f as w,r as re$1,v,Y,C as mo,E as A,h as le,k as ke$1,K as qd,p as ie$1,ai as Ut,aj as Wt,L as Le,m as mr,F as Fi,u as uo,a as ln,d as Pe,S as Se,c as mt,g as go,N as Ne,q as ot,s as gt,a0 as U,a3 as Li,a2 as nc,a4 as Be,a5 as N,a9 as fo,W,x as sv,z as ue$1,B as aV,X,T as Kb,H as Hb,V as tc,_ as ho,a1 as _y,a8 as $s,Z as lo,D as Dr}from'./main-AI76VATY.js';var ne=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`;var ue=["icon"],pe=["*"];function he(e,a){if(e&1&&Dr(0,"span",1),e&2){let n=W(2);Se(n.cn(n.cx("icon"),n.icon())),mt("pBind",n.ptm("icon"));}}function fe(e,a){if(e&1&&Le(0,he,1,3,"span",0),e&2){let n=W();Pe(n.icon()?0:-1);}}function be(e,a){if(e&1&&(mr(0,"span",1),fo(1,2),uo()),e&2){let n=W();Se(n.cx("icon")),mt("pBind",n.ptm("icon")),ln(),mt("ngTemplateOutlet",n.iconTemplate());}}var me={root:({instance:e})=>{let a=e.severity(),n=e.rounded();return ["p-tag p-component",{"p-tag-info":a==="info","p-tag-success":a==="success","p-tag-warn":a==="warn","p-tag-danger":a==="danger","p-tag-secondary":a==="secondary","p-tag-contrast":a==="contrast","p-tag-rounded":n}]},icon:"p-tag-icon",label:"p-tag-label"},ie=(()=>{class e extends Be{name="tag";style=ne;classes=me;static \u0275fac=(()=>{let n;return function(t){return (n||(n=le(e)))(t||e)}})();static \u0275prov=N({token:e,factory:e.\u0275fac})}return e})();var oe=new w("TAG_INSTANCE"),we=(()=>{class e extends $e{componentName="Tag";$pcTag=y(oe,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=y(re$1,{self:true});severity=v();value=v();icon=v();rounded=v(false,{transform:Y});iconTemplate=mo("icon",{descendants:false});_componentStyle=y(ie);dataP=A(()=>{let n=this.severity(),i=this.rounded();return this.cn({rounded:i,[n]:n})});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}static \u0275fac=(()=>{let n;return function(t){return (n||(n=le(e)))(t||e)}})();static \u0275cmp=ke$1({type:e,selectors:[["p-tag"]],contentQueries:function(i,t,h){i&1&&Li(h,t.iconTemplate,ue,4),i&2&&nc();},hostVars:3,hostBindings:function(i,t){i&2&&(U("data-p",t.dataP()),Se(t.cx("root")));},inputs:{severity:[1,"severity"],value:[1,"value"],icon:[1,"icon"],rounded:[1,"rounded"]},features:[Ne([ie,{provide:oe,useExisting:e},{provide:ot,useExisting:e}]),gt([re$1]),ie$1],ngContentSelectors:pe,decls:5,vars:5,consts:[[3,"class","pBind"],[3,"pBind"],[3,"ngTemplateOutlet"]],template:function(i,t){i&1&&(Ut(),Wt(0),Le(1,fe,1,1)(2,be,2,4,"span",0),mr(3,"span",1),Fi(4),uo()),i&2&&(ln(),Pe(t.iconTemplate()?2:1),ln(2),Se(t.cx("label")),mt("pBind",t.ptm("label")),ln(),go(t.value()));},dependencies:[qd,Nc,re$1],encapsulation:2})}return e})(),ze=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=Me$1({type:e});static \u0275inj=Ie({imports:[we,Nc,Nc]})}return e})();var ae=`
    .p-toggleswitch {
        display: inline-block;
        width: dt('toggleswitch.width');
        height: dt('toggleswitch.height');
    }

    .p-toggleswitch-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border-radius: dt('toggleswitch.border.radius');
    }

    .p-toggleswitch-slider {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-width: dt('toggleswitch.border.width');
        border-style: solid;
        border-color: dt('toggleswitch.border.color');
        background: dt('toggleswitch.background');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            border-color dt('toggleswitch.transition.duration'),
            outline-color dt('toggleswitch.transition.duration'),
            box-shadow dt('toggleswitch.transition.duration');
        border-radius: dt('toggleswitch.border.radius');
        outline-color: transparent;
        box-shadow: dt('toggleswitch.shadow');
    }

    .p-toggleswitch-handle {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: dt('toggleswitch.handle.background');
        color: dt('toggleswitch.handle.color');
        width: dt('toggleswitch.handle.size');
        height: dt('toggleswitch.handle.size');
        inset-inline-start: dt('toggleswitch.gap');
        margin-block-start: calc(-1 * calc(dt('toggleswitch.handle.size') / 2));
        border-radius: dt('toggleswitch.handle.border.radius');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            inset-inline-start dt('toggleswitch.slide.duration'),
            box-shadow dt('toggleswitch.slide.duration');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.background');
        border-color: dt('toggleswitch.checked.border.color');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.background');
        color: dt('toggleswitch.handle.checked.color');
        inset-inline-start: calc(dt('toggleswitch.width') - calc(dt('toggleswitch.handle.size') + dt('toggleswitch.gap')));
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
        background: dt('toggleswitch.hover.background');
        border-color: dt('toggleswitch.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.hover.background');
        color: dt('toggleswitch.handle.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.hover.background');
        border-color: dt('toggleswitch.checked.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.hover.background');
        color: dt('toggleswitch.handle.checked.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
        box-shadow: dt('toggleswitch.focus.ring.shadow');
        outline: dt('toggleswitch.focus.ring.width') dt('toggleswitch.focus.ring.style') dt('toggleswitch.focus.ring.color');
        outline-offset: dt('toggleswitch.focus.ring.offset');
    }

    .p-toggleswitch.p-invalid > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }

    .p-toggleswitch.p-disabled {
        opacity: 1;
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-slider {
        background: dt('toggleswitch.disabled.background');
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.disabled.background');
    }
`;var ve=["handle"],ye=["input"];function ke(e,a){e&1&&fo(0);}function Te(e,a){if(e&1&&lo(0,ke,1,0,"ng-container",3),e&2){let n=W();mt("ngTemplateOutlet",n.handleTemplate())("ngTemplateOutletContext",n.getHandleContext());}}var Me={root:{position:"relative"}},Ce={root:({instance:e})=>["p-toggleswitch p-component",{"p-toggleswitch-checked":e.$checked(),"p-disabled":e.$disabled(),"p-invalid":e.invalid()}],input:"p-toggleswitch-input",slider:"p-toggleswitch-slider",handle:"p-toggleswitch-handle"},de=(()=>{class e extends Be{name="toggleswitch";style=ae;classes=Ce;inlineStyles=Me;static \u0275fac=(()=>{let n;return function(t){return (n||(n=le(e)))(t||e)}})();static \u0275prov=N({token:e,factory:e.\u0275fac})}return e})();var re=new w("TOGGLESWITCH_INSTANCE"),De={provide:Oe,useExisting:$s(()=>ce),multi:true},ce=(()=>{class e extends Je{componentName="ToggleSwitch";$pcToggleSwitch=y(re,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=y(re$1,{self:true});_componentStyle=y(de);tabindex=v(void 0,{transform:sv});inputId=v();readonly=v(false,{transform:Y});trueValue=v(true);falseValue=v(false);ariaLabel=v();size=v();ariaLabelledBy=v();autofocus=v(false,{transform:Y});onChange=ue$1();handleTemplate=mo("handle",{descendants:false});inputEl=aV.required("input");focused=X(false);$checked=A(()=>this.modelValue()===this.trueValue());attrRequired=A(()=>this.required()?"":void 0);attrDisabled=A(()=>this.$disabled()?"":void 0);dataP=A(()=>this.cn({checked:this.$checked(),disabled:this.$disabled(),invalid:this.invalid()}));onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}onHostClick(n){this.onClick(n);}onClick(n){!this.$disabled()&&!this.readonly()&&(this.writeModelValue(this.$checked()?this.falseValue():this.trueValue()),this.onModelChange(this.modelValue()),this.onChange.emit({originalEvent:n,checked:this.modelValue()}),this.inputEl().nativeElement.focus());}onFocus(){this.focused.set(true);}onBlur(){this.focused.set(false),this.onModelTouched();}getHandleContext(){return {checked:this.$checked()}}writeControlValue(n,i){i(n);}static \u0275fac=(()=>{let n;return function(t){return (n||(n=le(e)))(t||e)}})();static \u0275cmp=ke$1({type:e,selectors:[["p-toggleswitch"],["p-toggle-switch"]],contentQueries:function(i,t,h){i&1&&Li(h,t.handleTemplate,ve,4),i&2&&nc();},viewQuery:function(i,t){i&1&&_y(t.inputEl,ye,5),i&2&&nc();},hostVars:7,hostBindings:function(i,t){i&1&&tc("click",function(se){return t.onHostClick(se)}),i&2&&(U("data-p-checked",t.$checked())("data-p-disabled",t.$disabled())("data-p",t.dataP()),ho(t.sx("root")),Se(t.cx("root")));},inputs:{tabindex:[1,"tabindex"],inputId:[1,"inputId"],readonly:[1,"readonly"],trueValue:[1,"trueValue"],falseValue:[1,"falseValue"],ariaLabel:[1,"ariaLabel"],size:[1,"size"],ariaLabelledBy:[1,"ariaLabelledBy"],autofocus:[1,"autofocus"]},outputs:{onChange:"onChange"},features:[Ne([De,de,{provide:re,useExisting:e},{provide:ot,useExisting:e}]),gt([re$1]),ie$1],decls:5,vars:22,consts:[["input",""],["type","checkbox","role","switch",3,"focus","blur","checked","pAutoFocus","pBind"],[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(i,t){i&1&&(mr(0,"input",1,0),tc("focus",function(){return t.onFocus()})("blur",function(){return t.onBlur()}),uo(),mr(2,"div",2)(3,"div",2),Le(4,Te,1,2,"ng-container"),uo()()),i&2&&(Se(t.cx("input")),mt("checked",t.$checked())("pAutoFocus",t.autofocus())("pBind",t.ptm("input")),U("id",t.inputId())("required",t.attrRequired())("disabled",t.attrDisabled())("aria-checked",t.$checked())("aria-labelledby",t.ariaLabelledBy())("aria-label",t.ariaLabel())("name",t.name())("tabindex",t.tabindex()),ln(2),Se(t.cx("slider")),mt("pBind",t.ptm("slider")),U("data-p",t.dataP()),ln(),Se(t.cx("handle")),mt("pBind",t.ptm("handle")),U("data-p",t.dataP()),ln(),Pe(t.handleTemplate()?4:-1));},dependencies:[qd,Kb,Nc,Hb,re$1],encapsulation:2})}return e})(),at=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=Me$1({type:e});static \u0275inj=Ie({imports:[ce,Nc,Nc]})}return e})();export{at as a,ce as c,we as w,ze as z};