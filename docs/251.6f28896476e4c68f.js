"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[251],{9251:(at,U,i)=>{i.r(U),i.d(U,{UserModule:()=>rt});var u=i(6895),a=i(4006),c=i(2582),g=i(9646),Z=i(8372),T=i(3900),A=i(4128),F=i(4813),w=i(8505),I=i(262),Y=i(7450),t=i(4650),f=i(3937),d=i(2022),m=i(1495),v=i(9993),L=i(4247),b=i(805),O=i(5054),x=i(5593),D=i(3054);function J(s,n){1&s&&t._UZ(0,"p-image",12)}function M(s,n){if(1&s&&(t.TgZ(0,"p"),t._uU(1),t.ALo(2,"async"),t.qZA()),2&s){const e=t.oxw(2);let o;t.xp6(1),t.Oqu(null==(o=t.lcZ(2,1,e.dashboardUser))||null==o.user?null:o.user.description)}}function R(s,n){if(1&s&&(t.TgZ(0,"textarea",13),t._uU(1),t.ALo(2,"async"),t.qZA()),2&s){const e=t.oxw(2);let o;t.Q6J("autoResize",!0),t.xp6(1),t.Oqu(null==(o=t.lcZ(2,2,e.dashboardUser))||null==o.user?null:o.user.description)}}function S(s,n){if(1&s){const e=t.EpF();t.TgZ(0,"button",14),t.NdJ("click",function(){t.CHM(e);const r=t.oxw(2);return t.KtG(r.changeDataUser())}),t.qZA()}}function z(s,n){if(1&s&&(t.TgZ(0,"main",2)(1,"p-card",3),t.YNc(2,J,1,0,"ng-template",4),t.qZA(),t.TgZ(3,"p-card",5)(4,"form",6)(5,"h1"),t._uU(6),t.ALo(7,"titlecase"),t.ALo(8,"async"),t.qZA(),t.YNc(9,M,3,3,"p",7),t.YNc(10,R,3,4,"textarea",8),t.YNc(11,S,1,0,"button",9),t.qZA()(),t.TgZ(12,"p-card",10)(13,"h1"),t._uU(14,"Listas"),t.qZA(),t._UZ(15,"component-list-table",11),t.ALo(16,"async"),t.ALo(17,"async"),t.qZA()()),2&s){const e=t.oxw();let o,r,l;t.xp6(4),t.Q6J("formGroup",e.profileForm),t.xp6(2),t.Oqu(t.lcZ(7,10,null==(o=t.lcZ(8,12,e.dashboardUser))||null==o.user?null:o.user.username)),t.xp6(3),t.Q6J("ngIf",!e.ownProfile),t.xp6(1),t.Q6J("ngIf",e.ownProfile),t.xp6(1),t.Q6J("ngIf",e.ownProfile),t.xp6(4),t.Q6J("lists",null==(r=t.lcZ(16,14,e.dashboardUser))?null:r.list)("userLists",null==(l=t.lcZ(17,16,e.dashboardUser))?null:l.user)("rows",5)("paginator",!1)("authorColumn",!1)}}let N=(()=>{class s{constructor(e,o,r,l,p,y){this.ar=e,this.us=o,this.ls=r,this.router=l,this.fb=p,this.store=y,this.error=(0,g.of)(!1),this.ownProfile=!1,this.userData={}}ngOnInit(){this.subs=this.store.select("auth").subscribe(({user:e})=>{this.userData={...e},this.dashboardUser=this.ar.params.pipe((0,Z.b)(500),(0,T.w)(({username:o})=>(this.ownProfile=o===e?.username,(0,A.D)({user:this.us.getUser(void 0,o).pipe((0,F.j)(0)),list:this.ls.getMovieLists(void 0,o).pipe((0,T.w)(r=>(0,g.of)(this.ownProfile?r:r.filter(l=>l.public))))}))),(0,w.b)(({user:o})=>{this.profileForm=this.fb.group({description:[o?.description||"",[a.kI.required,a.kI.minLength(3)]]})}),(0,I.K)(()=>(this.router.navigateByUrl("not-found"),(0,g.of)({user:void 0}))))})}ngOnDestroy(){this.subs.unsubscribe()}changeDataUser(){if(this.profileForm.valid){const e=this.profileForm.get("description")?.value;this.userData.description=e,this.store.dispatch((0,Y.$5)({user:this.userData}))}}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(c.gz),t.Y36(f.u),t.Y36(d.X),t.Y36(c.F0),t.Y36(a.qu),t.Y36(m.yh))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-user-dashboard"]],decls:4,vars:5,consts:[[1,"grid"],["class","lg:col-8 lg:col-offset-2 col-12 col-offset-0 grid","style","padding: 1em",4,"ngIf"],[1,"lg:col-8","lg:col-offset-2","col-12","col-offset-0","grid",2,"padding","1em"],["styleClass","avatar",1,"md:col-5","col-12"],["pTemplate","content"],["styleClass","userinfo",1,"md:col-7","col-12"],["action","",3,"formGroup"],[4,"ngIf"],["rows","5","cols","30","pInputTextarea","","formControlName","description",3,"autoResize",4,"ngIf"],["pButton","","pRipple","","type","button","label","Cambiar descripci\xf3n","class","p-button-rounded",3,"click",4,"ngIf"],[1,"col-12"],[3,"lists","userLists","rows","paginator","authorColumn"],["src","https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png","alt","Image","width","100%"],["rows","5","cols","30","pInputTextarea","","formControlName","description",3,"autoResize"],["pButton","","pRipple","","type","button","label","Cambiar descripci\xf3n",1,"p-button-rounded",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.YNc(1,z,18,18,"main",1),t.ALo(2,"async"),t.ALo(3,"async"),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngIf",!t.lcZ(2,1,o.error)&&t.lcZ(3,3,o.dashboardUser)))},dependencies:[u.O5,a._Y,a.Fj,a.JJ,a.JL,a.sg,a.u,v.z,L.Z,b.jx,O.E,x.Hq,D.g,u.Ov,u.rS],styles:["[_nghost-%COMP%]     .avatar{overflow:hidden;display:flex;justify-content:center;align-items:center;height:400px}[_nghost-%COMP%]     .avatar .p-card-body{height:100%}[_nghost-%COMP%]     .avatar .p-card-body .p-card-content{overflow:hidden;height:100%;padding:0}[_nghost-%COMP%]     .avatar .p-card-body .p-card-content .p-image{width:100%}@media (max-width: 480px){[_nghost-%COMP%]     .avatar{height:350px}}[_nghost-%COMP%]     textarea{width:100%}"]}),s})(),P=(()=>{class s{constructor(e,o){this.activatedRoute=e,this.ls=o,this.lists=[]}ngOnInit(){this.activatedRoute.params.subscribe(({username:e})=>{this.ls.getSavedLists(e).subscribe(o=>{this.lists=o})})}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(c.gz),t.Y36(d.X))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-saved-lists"]],decls:4,vars:3,consts:[[1,"grid"],[1,"lg:col-8","lg:col-offset-2","col-12","col-offset-0","grid",2,"padding","1em"],[1,"card","col-12"],[3,"lists","buttonDeleteSavedList","modeColumn"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"main",1)(2,"div",2),t._UZ(3,"component-list-table",3),t.qZA()()()),2&e&&(t.xp6(3),t.Q6J("lists",o.lists)("buttonDeleteSavedList",!0)("modeColumn",!1))},dependencies:[v.z]}),s})();var Q=i(6518),B=i(3608),C=i(8396);function X(s,n){1&s&&(t.TgZ(0,"tr")(1,"th",6),t._uU(2,"Nombre de usuario "),t._UZ(3,"p-sortIcon",7),t.qZA(),t._UZ(4,"th"),t.qZA())}function j(s,n){if(1&s){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._uU(2),t.ALo(3,"titlecase"),t.qZA(),t.TgZ(4,"td"),t._UZ(5,"button",8),t.TgZ(6,"button",9),t.NdJ("click",function(){const l=t.CHM(e).$implicit,p=t.oxw();return t.KtG(p.cancelSuscrption(l.id))}),t.qZA()()()}if(2&s){const e=n.$implicit;t.xp6(2),t.Oqu(t.lcZ(3,2,e.username)),t.xp6(3),t.Q6J("routerLink","/user/"+e.username)}}function E(s,n){if(1&s&&(t.TgZ(0,"div",10),t._uU(1),t.qZA()),2&s){const e=t.oxw();t.xp6(1),t.hij(" En total sigues a ",e.users?e.users.length:0," usuarios. ")}}const G=function(){return["username"]};let _=(()=>{class s{constructor(e,o,r){this.as=e,this.crud=o,this.messageService=r,this.rows=10,this.paginator=!0}ngOnInit(){}cancelSuscrption(e){this.crud.cancelFollow(e).subscribe({next:o=>{this.users=this.users?.filter(r=>r.id!==e),this.messageService.add({severity:"warn",summary:"Suscripci\xf3n cancelada"})}})}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(Q.e),t.Y36(f.u),t.Y36(b.ez))},s.\u0275cmp=t.Xpm({type:s,selectors:[["component-user-table"]],inputs:{users:"users",rows:"rows",paginator:"paginator"},decls:6,vars:7,consts:[[1,"card","col-12","mb-3"],["responsiveLayout","scroll","dataKey","id","currentPageReportTemplate","Mostrando desde el usuario {first} al {last} de {totalRecords} usuarios que sigues.",3,"value","rows","paginator","globalFilterFields","rowHover","showCurrentPageReport"],["dt",""],["pTemplate","header"],["pTemplate","body"],["pTemplate","summary"],["pSortableColumn","username"],["field","title"],["pButton","","pRipple","","icon","pi pi-eye","pTooltip","Ver usuario",1,"p-button-rounded","mr-2",3,"routerLink"],["pButton","","pRipple","","icon","pi pi-user-minus","pTooltip","Dejar de seguir",1,"p-button-rounded","p-button-danger",3,"click"],[1,"flex","align-items-center","justify-content-between"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"p-table",1,2),t.YNc(3,X,5,0,"ng-template",3),t.YNc(4,j,7,4,"ng-template",4),t.YNc(5,E,2,1,"ng-template",5),t.qZA()()),2&e&&(t.xp6(1),t.Q6J("value",o.users)("rows",o.rows)("paginator",o.paginator)("globalFilterFields",t.DdM(6,G))("rowHover",!0)("showCurrentPageReport",!0))},dependencies:[b.jx,x.Hq,c.rH,B.u,C.iA,C.lQ,C.fz,u.rS]}),s})(),H=(()=>{class s{constructor(e,o){this.activatedRoute=e,this.cs=o,this.followers=[]}ngOnInit(){this.activatedRoute.params.subscribe(({username:e})=>{this.cs.getUserFollowers(e).subscribe(o=>this.followers=o)})}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(c.gz),t.Y36(f.u))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-follows"]],decls:3,vars:1,consts:[[1,"grid"],[1,"lg:col-8","lg:col-offset-2","col-12","col-offset-0","grid",2,"padding","1em"],[1,"col-12",3,"users"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"main",1),t._UZ(2,"component-user-table",2),t.qZA()()),2&e&&(t.xp6(2),t.Q6J("users",o.followers))},dependencies:[_]}),s})();var K=i(5246);let $=(()=>{class s{constructor(e,o,r){this.activatedRoute=e,this.store=o,this.ls=r,this.lists=[],this.permission=!1,this.subscriptions=[]}ngOnInit(){this.subscriptions.push(this.store.subscribe(({auth:e,list:o})=>{e.guest?(this.lists=[...o.lists],this.permission=!0):this.getCollection(e.user)}))}ngOnDestroy(){K.r(this.subscriptions)}getCollection(e){this.subscriptions.push(this.activatedRoute.params.subscribe(({username:o})=>{this.permission=e?.username===o,this.subscriptions.push(this.ls.getMovieLists(e?.username!==o||void 0,o).subscribe(r=>{this.lists=r,this.permission?this.lists=r:r.forEach(l=>{l.public&&this.lists.push(l)})}))}))}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(c.gz),t.Y36(m.yh),t.Y36(d.X))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-lists"]],decls:4,vars:5,consts:[[1,"grid"],[1,"lg:col-8","lg:col-offset-2","col-12","col-offset-0","grid",2,"padding","1em"],[1,"card","col-12"],[3,"lists","buttonAddList","buttonEditList","buttonDeleteList","authorColumn"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"main",1)(2,"div",2),t._UZ(3,"component-list-table",3),t.qZA()()()),2&e&&(t.xp6(3),t.Q6J("lists",o.lists)("buttonAddList",o.permission)("buttonEditList",o.permission)("buttonDeleteList",o.permission)("authorColumn",!1))},dependencies:[v.z]}),s})();var V=i(3747),W=i(3334),q=i(2665);function k(s,n){if(1&s&&t._UZ(0,"component-small-info-card",4),2&s){const e=n.$implicit,o=t.oxw();t.Q6J("content",e)("crud",o.authorColumn)("type",e.type)("deleteButton",!0)}}function tt(s,n){1&s&&(t.TgZ(0,"div",5),t._UZ(1,"p-message",6),t.qZA())}let et=(()=>{class s{constructor(e,o,r,l){this.activatedRoute=e,this.ls=o,this.cs=r,this.store=l,this.contentCpllection=[],this.authorColumn=!1}ngOnInit(){this.activatedRoute.params.subscribe(({username:e,listId:o})=>{this._list={user_list_count:o,username:e},this.store.select("auth").pipe((0,Z.b)(500)).subscribe(({user:r})=>{this.authorColumn=r?.username===this._list.username,this.store.select("list").subscribe(()=>{this.ls.getMovieLists(void 0,this._list.username,this._list.user_list_count).subscribe(l=>{this.contentCpllection=this.extractContent(l[0],this.authorColumn)})})})})}extractContent(e,o){const r=JSON.parse(e.contentId);let l=[];return r.forEach(p=>{if(1==e.public||o){let y=p.includes("tv")?"tv":"movie";this.cs.getMovieOrTvshowsById(p).subscribe(lt=>l.push({...lt,type:y}))}}),l}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(c.gz),t.Y36(d.X),t.Y36(V._),t.Y36(m.yh))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-list"]],decls:4,vars:2,consts:[[1,"grid"],[1,"lg:col-10","lg:col-offset-1","col-12","grid",2,"margin","0 auto"],["class","lg:col-2 md:col-3 sm:col-4 col-12",3,"content","crud","type","deleteButton",4,"ngFor","ngForOf"],["class","col-12",4,"ngIf"],[1,"lg:col-2","md:col-3","sm:col-4","col-12",3,"content","crud","type","deleteButton"],[1,"col-12"],["severity","info","text","La lista no tiene contenido","styleClass","mr-2"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"main",1),t.YNc(2,k,1,4,"component-small-info-card",2),t.YNc(3,tt,2,0,"div",3),t.qZA()()),2&e&&(t.xp6(2),t.Q6J("ngForOf",o.contentCpllection),t.xp6(1),t.Q6J("ngIf",0===(null==o.contentCpllection?null:o.contentCpllection.length)))},dependencies:[u.sg,u.O5,W.U,q.q],styles:["[_nghost-%COMP%]     .p-inline-message{margin:0 auto;width:100%}"]}),s})(),h=(()=>{class s{constructor(e,o){this.router=e,this.store=o,this._isLoggedIn=!1}ngOnInit(){}ngOnDestroy(){this.subs.unsubscribe()}canActivate(e,o){return this.subs=this.store.select("auth").subscribe(({isLoggedIn:r})=>{this._isLoggedIn=r}),!!this._isLoggedIn||(this.router.navigateByUrl(""),!1)}canLoad(e,o){return this.subs=this.store.select("auth").subscribe(({isLoggedIn:r})=>{this._isLoggedIn=r}),!!this._isLoggedIn||(this.router.navigateByUrl(""),!1)}}return s.\u0275fac=function(e){return new(e||s)(t.LFG(c.F0),t.LFG(m.yh))},s.\u0275prov=t.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();const st=[{path:"",children:[{path:":username",component:N},{path:":username/lists",component:$},{path:":username/follows",component:H,canLoad:[h],canActivate:[h]},{path:":username/lists/saved",component:P,canLoad:[h],canActivate:[h]},{path:":username/list/:listId",component:et}]}];let ot=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[c.Bz.forChild(st),c.Bz]}),s})();var nt=i(4466),it=i(6860);let rt=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[u.ez,a.UX,ot,nt.m,a.u5,it.W,L.d]}),s})()}}]);