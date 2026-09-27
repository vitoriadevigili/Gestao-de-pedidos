import {M as Me,e as Ie,t as Nc,H as Hb,$ as $e,y,f as w,r as re$1,v,C as mo,ag as JU,ah as e8,E as A,h as le$1,k as ke,K as qd,p as ie$1,ai as Ut,L as Le,m as mr,aj as Wt,Z as lo,u as uo,d as Pe,a as ln,S as Se$1,c as mt,N as Ne,q as ot,s as gt,a3 as Li,a2 as nc,a4 as Be,a5 as N,W as W$1,a9 as fo,F as Fi,ak as Pd}from'./main-AI76VATY.js';var $=`
    .p-card {
        display: block;
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
        font-size: dt('card.subtitle.font.size');
        font-weight: dt('card.subtitle.font.weight');
    }
`;var K=["header"],L=["title"],U=["subtitle"],W=["content"],X=["footer"],Y=["*",[["p-header"]],[["p-footer"]]],Z=["*","p-header","p-footer"];function ee(e,d){e&1&&fo(0);}function te(e,d){if(e&1&&(mr(0,"div",1),Wt(1,1),lo(2,ee,1,0,"ng-container",2),uo()),e&2){let t=W$1();Se$1(t.cx("header")),mt("pBind",t.ptm("header")),ln(2),mt("ngTemplateOutlet",t.headerTemplate());}}function ne(e,d){if(e&1&&Fi(0),e&2){let t=W$1(2);Pd(" ",t.header()," ");}}function ie(e,d){e&1&&fo(0);}function ae(e,d){if(e&1&&(mr(0,"div",1),Le(1,ne,1,1),lo(2,ie,1,0,"ng-container",2),uo()),e&2){let t=W$1();Se$1(t.cx("title")),mt("pBind",t.ptm("title")),ln(),Pe(t.showHeaderText()?1:-1),ln(),mt("ngTemplateOutlet",t.titleTemplate());}}function oe(e,d){if(e&1&&Fi(0),e&2){let t=W$1(2);Pd(" ",t.subheader()," ");}}function de(e,d){e&1&&fo(0);}function re(e,d){if(e&1&&(mr(0,"div",1),Le(1,oe,1,1),lo(2,de,1,0,"ng-container",2),uo()),e&2){let t=W$1();Se$1(t.cx("subtitle")),mt("pBind",t.ptm("subtitle")),ln(),Pe(t.showSubheaderText()?1:-1),ln(),mt("ngTemplateOutlet",t.subtitleTemplate());}}function ce(e,d){e&1&&fo(0);}function le(e,d){e&1&&fo(0);}function pe(e,d){if(e&1&&(mr(0,"div",1),Wt(1,2),lo(2,le,1,0,"ng-container",2),uo()),e&2){let t=W$1();Se$1(t.cx("footer")),mt("pBind",t.ptm("footer")),ln(2),mt("ngTemplateOutlet",t.footerTemplate());}}var se={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},G=(()=>{class e extends Be{name="card";style=$;classes=se;static \u0275fac=(()=>{let t;return function(n){return (t||(t=le$1(e)))(n||e)}})();static \u0275prov=N({token:e,factory:e.\u0275fac})}return e})();var J=new w("CARD_INSTANCE"),me=(()=>{class e extends $e{componentName="Card";$pcCard=y(J,{optional:true,skipSelf:true})??void 0;bindDirectiveInstance=y(re$1,{self:true});_componentStyle=y(G);header=v();subheader=v();headerFacet=mo(JU,{descendants:false});footerFacet=mo(e8,{descendants:false});headerTemplate=mo("header",{descendants:false});titleTemplate=mo("title",{descendants:false});subtitleTemplate=mo("subtitle",{descendants:false});contentTemplate=mo("content",{descendants:false});footerTemplate=mo("footer",{descendants:false});hasHeader=A(()=>!!(this.headerFacet()||this.headerTemplate()));hasTitle=A(()=>!!(this.header()||this.titleTemplate()));hasSubtitle=A(()=>!!(this.subheader()||this.subtitleTemplate()));hasFooter=A(()=>!!(this.footerFacet()||this.footerTemplate()));showHeaderText=A(()=>this.header()&&!this.titleTemplate());showSubheaderText=A(()=>this.subheader()&&!this.subtitleTemplate());onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]));}getBlockableElement(){return this.el.nativeElement}static \u0275fac=(()=>{let t;return function(n){return (t||(t=le$1(e)))(n||e)}})();static \u0275cmp=ke({type:e,selectors:[["p-card"]],contentQueries:function(o,n,l){o&1&&Li(l,n.headerFacet,JU,4)(l,n.footerFacet,e8,4)(l,n.headerTemplate,K,4)(l,n.titleTemplate,L,4)(l,n.subtitleTemplate,U,4)(l,n.contentTemplate,W,4)(l,n.footerTemplate,X,4),o&2&&nc(7);},hostVars:2,hostBindings:function(o,n){o&2&&Se$1(n.cx("root"));},inputs:{header:[1,"header"],subheader:[1,"subheader"]},features:[Ne([G,{provide:J,useExisting:e},{provide:ot,useExisting:e}]),gt([re$1]),ie$1],ngContentSelectors:Z,decls:8,vars:11,consts:[[3,"pBind","class"],[3,"pBind"],[4,"ngTemplateOutlet"]],template:function(o,n){o&1&&(Ut(Y),Le(0,te,3,4,"div",0),mr(1,"div",1),Le(2,ae,3,5,"div",0),Le(3,re,3,5,"div",0),mr(4,"div",1),Wt(5),lo(6,ce,1,0,"ng-container",2),uo(),Le(7,pe,3,4,"div",0),uo()),o&2&&(Pe(n.hasHeader()?0:-1),ln(),Se$1(n.cx("body")),mt("pBind",n.ptm("body")),ln(),Pe(n.hasTitle()?2:-1),ln(),Pe(n.hasSubtitle()?3:-1),ln(),Se$1(n.cx("content")),mt("pBind",n.ptm("content")),ln(2),mt("ngTemplateOutlet",n.contentTemplate()),ln(),Pe(n.hasFooter()?7:-1));},dependencies:[qd,Nc,Hb,re$1],encapsulation:2})}return e})(),Se=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=Me({type:e});static \u0275inj=Ie({imports:[me,Nc,Hb,Nc,Hb]})}return e})();export{Se as S,me as m};