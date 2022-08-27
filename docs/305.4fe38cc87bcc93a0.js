"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[305],{3334:(E,h,s)=>{s.d(h,{U:()=>Z});var _=s(805),l=s(659),m=s(2500),t=s(4650),d=s(1740),f=s(2022),a=s(1495),c=s(6895),u=s(4247),g=s(5593),x=s(8433),M=s(2435),L=s(3608),O=s(2453),v=s(4006);function I(n,r){if(1&n&&(t.TgZ(0,"span",5),t._uU(1),t.ALo(2,"titlecase"),t.qZA()),2&n){const e=t.oxw();t.Q6J("routerLink","/"+e.type+"/"+("user"!==e.type?e.content.id:e.content.username)),t.xp6(1),t.hij(" ","movie"===e.type?e.content.original_title:t.lcZ(2,2,"tv"===e.type?e.content.original_name:e.content.username)," ")}}function y(n,r){if(1&n&&(t.TgZ(0,"div",7),t._UZ(1,"img",8),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("src",null!=e.content&&e.content.poster_path?"https://image.tmdb.org/t/p/w500"+e.content.poster_path:"https://png.clipart.me/previews/90c/movie-poster-background-vector-material-17011.jpg",t.LSH)("routerLink","/"+e.type+"/"+("user"!==e.type?e.content.id:e.content.username))}}function A(n,r){if(1&n&&t.YNc(0,y,2,2,"div",6),2&n){const e=t.oxw();t.Q6J("ngIf","user"!==e.type)}}function P(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",13)(1,"button",14),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(3);return t.KtG(i.addFollower(i.content.id))}),t.qZA()()}}function b(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",15)(1,"button",16),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(3);return t.KtG(i.addToViewed(i.type+"/"+i.content.id))}),t.qZA()()}if(2&n){const e=t.oxw(3);t.xp6(1),t.Q6J("icon",e.viewed?"fa-solid fa-eye":"fa-regular fa-eye")}}function S(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",15)(1,"button",17),t.NdJ("click",function(i){t.CHM(e),t.oxw(3);const p=t.MAs(6);return t.KtG(p.toggle(i))}),t.qZA()()}}function D(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"div",15)(1,"button",18),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(3);return t.KtG(i.deleteContentFromList(i.content.id))}),t.qZA()()}}function w(n,r){if(1&n&&(t.TgZ(0,"div",10),t.YNc(1,P,2,0,"div",11),t.YNc(2,b,2,1,"div",12),t.YNc(3,S,2,0,"div",12),t.YNc(4,D,2,0,"div",12),t.qZA()),2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngIf",(null==e.user?null:e.user.username)!==e.content.username&&"user"===e.type),t.xp6(1),t.Q6J("ngIf",e.crud&&"user"!==e.type),t.xp6(1),t.Q6J("ngIf",e.crud&&"user"!==e.type),t.xp6(1),t.Q6J("ngIf",e.crud&&"user"!==e.type&&e.deleteButton)}}function R(n,r){if(1&n&&t.YNc(0,w,5,4,"div",9),2&n){const e=t.oxw();t.Q6J("ngIf",e.isLoggedIn)}}function N(n,r){if(1&n&&(t.TgZ(0,"div",21)(1,"span"),t._uU(2),t.qZA()()),2&n){const e=r.$implicit;t.xp6(2),t.Oqu(e.label)}}const U=function(){return{width:"15rem"}},B=function(){return{"max-height":"250px"}};function k(n,r){if(1&n){const e=t.EpF();t.TgZ(0,"p-listbox",19),t.NdJ("ngModelChange",function(i){t.CHM(e);const p=t.oxw();return t.KtG(p.selectedLists=i)})("onClick",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.toggleAdd(i.content.id,i.selectedLists))}),t.YNc(1,N,3,1,"ng-template",20),t.qZA()}if(2&n){const e=t.oxw();t.Akn(t.DdM(11,U)),t.Q6J("showToggleAll",!1)("filter",!1)("options",e.groupedLists)("group",!0)("ngModel",e.selectedLists)("metaKeySelection",!1)("checkbox",!0)("multiple",!0)("listStyle",t.DdM(12,B))}}let Z=(()=>{class n{constructor(e,o,i,p){this.activatedRoute=e,this.ls=o,this.messageService=i,this.store=p,this.type=this.activatedRoute.snapshot.data.content,this.crud=!0,this.deleteButton=!1,this.groupedLists=[],this.oldCollection=[],this.selectedLists=[],this.isLoggedIn=!1,this.user=void 0,this._subscriptions=[],this.viewed=!1}ngOnInit(){this.groupedLists=[{label:"Mis Listas",value:"ml",items:[]}],this._subscriptions.push(this.store.select("auth").subscribe(({user:e,isLoggedIn:o})=>{this.isLoggedIn=o,this.user=e})),this._subscriptions.push(this.store.select("list").subscribe(({lists:e})=>{this.groupedLists[0].items=e,e.length>0&&this.uploadChecks(this.groupedLists[0].items)}))}ngOnDestroy(){this._subscriptions.forEach(e=>e.unsubscribe())}uploadChecks(e){this.sliceOption="movie"==this.type?6:3,this.selectedLists=[],e.length>0&&e?.forEach(o=>{JSON.parse(o.contentId).forEach(p=>{(p=p.toString().slice(this.sliceOption))==this.content.id&&(2==o.user_list_count&&(this.viewed=!0),this.selectedLists.push(o),this.oldCollection=this.selectedLists)})})}toggleAdd(e,o){if(this.oldCollection>o){let i=this.catchDeletetedList(this.oldCollection,o);this.store.dispatch(l.nz({id:i.user_list_count,content:this.type+"/"+e.toString()})),this.messageService.add({severity:"warn",summary:"Pel\xedcula descartada de la lista de "+i.title})}else if(o.length>0){const i=o.slice(-1)[0]||0;this.store.dispatch(l.tA({list:i,content:this.type+"/"+e.toString()})),this.messageService.add({severity:"success",summary:"Pel\xedcula a\xf1adida a la lista de "+o.slice(-1)[0].title})}}addToViewed(e){this.viewed?(this.store.dispatch(l.nz({id:2,content:e.toString()})),this.messageService.add({severity:"warn",summary:"Pel\xedcula descartada de la lista de Vistos"}),this.viewed=!1):(this.store.dispatch(l.tA({list:{username:this.user?.username,user_list_count:2},content:e.toString()})),this.messageService.add({severity:"success",summary:"Pel\xedcula a\xf1adida a la lista de Vistos"}))}addFollower(e){this.store.dispatch(m.ZN({userId:this.user?.id,followId:e}))}deleteContentFromList(e){this.activatedRoute.params.subscribe(({listId:o})=>{this.store.dispatch(l.nz({id:o,content:this.type+"/"+e}))})}catchDeletetedList(e,o){let C,p=o;return e.forEach(T=>{-1==p.findIndex(K=>K.user_list_count===T.user_list_count)&&(C=T)}),C}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(d.gz),t.Y36(f.X),t.Y36(_.ez),t.Y36(a.yh))},n.\u0275cmp=t.Xpm({type:n,selectors:[["component-small-info-card"]],inputs:{content:"content",type:"type",crud:"crud",deleteButton:"deleteButton"},features:[t._Bn([_.ez])],decls:8,vars:0,consts:[["pTemplate","title"],["pTemplate","content"],["pTemplate","footer","style","padding: 0 !important;"],["op",""],["pTemplate",""],[3,"routerLink"],["class","imageContainer",4,"ngIf"],[1,"imageContainer"],["alt","Card",2,"width","100%",3,"src","routerLink"],["class","grid mt-1","style","text-align: center",4,"ngIf"],[1,"grid","mt-1",2,"text-align","center"],["class","col-12","style","text-align: right",4,"ngIf"],["class","col",4,"ngIf"],[1,"col-12",2,"text-align","right"],["pButton","","pRipple","","icon","pi pi-user-plus","pTooltip","Seguir al usuario",1,"p-button-rounded",3,"click"],[1,"col"],["pButton","","pRipple","","type","button","pTooltip","Visto",1,"p-button-rounded","p-button-help",3,"icon","click"],["pButton","","pRipple","","type","button","icon","pi pi-bookmark","pTooltip","A\xf1adir a una lista",1,"p-button-rounded","p-button-warning",3,"click"],["pButton","","pRipple","","type","button","icon","pi pi-times","pTooltip","Quitar de la lista",1,"p-button-rounded","p-button-danger",3,"click"],["optionLabel","title",3,"showToggleAll","filter","options","group","ngModel","metaKeySelection","checkbox","multiple","listStyle","ngModelChange","onClick"],["pTemplate","group"],[1,"flex","align-items-center"]],template:function(e,o){1&e&&(t._UZ(0,"p-toast"),t.TgZ(1,"p-card"),t.YNc(2,I,3,4,"ng-template",0),t.YNc(3,A,1,1,"ng-template",1),t.YNc(4,R,1,1,"ng-template",2),t.TgZ(5,"p-overlayPanel",null,3),t.YNc(7,k,2,13,"ng-template",4),t.qZA()())},dependencies:[c.O5,u.Z,_.jx,g.Hq,x.Ri,M.T,d.rH,L.u,O.FN,v.JJ,v.On,c.rS],styles:["[_nghost-%COMP%]     img, [_nghost-%COMP%]     span{cursor:pointer}[_nghost-%COMP%]     .p-card, [_nghost-%COMP%]     .p-card-footer, [_nghost-%COMP%]     .p-card-content{padding:0!important}[_nghost-%COMP%]     .p-card-title{width:100%;height:35px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-align:center}[_nghost-%COMP%]     .imageContainer{height:311.78px;overflow:hidden}[_nghost-%COMP%]     .imageContainer img{height:100%}"]}),n})()},3747:(E,h,s)=>{s.d(h,{_:()=>t});var _=s(529),l=s(2340),m=s(4650);let t=(()=>{class d{constructor(a){this.http=a,this._baseUrlImg="https://image.tmdb.org/t/p/w500/zFTLPipninMF4THDbdkQUZLWMEw.jpg"}popularMoviesOrTv(a,c=1){const u=(new _.LE).set("api_key",l.N.tmdbApiToken).set("language","es").set("page",c);return this.http.get("movie"===a?`${l.N.tmdbApiURL}/3/movie/popular`:`${l.N.tmdbApiURL}/3/tv/popular`,{params:u})}getImagesOfMovieOrTvshows(a){const c=(new _.LE).set("api_key",l.N.tmdbApiToken).set("language","es");return this.http.get(`${l.N.tmdbApiURL}/3/${a}/images`,{params:c})}getMovieOrTvshowsById(a){const c=(new _.LE).set("api_key",l.N.tmdbApiToken).set("language","es");return this.http.get(`${l.N.tmdbApiURL}/3/${a}`,{params:c})}getMovieOrTvshowsSearchResult(a,c,u=1){const g=(new _.LE).set("api_key",l.N.tmdbApiToken).set("language","es").set("query",c).set("page",u).set("include_adult",!1);return this.http.get("movie"===a?`${l.N.tmdbApiURL}/3/search/movie`:`${l.N.tmdbApiURL}/3/search/tv`,{params:g})}getMovieOrTvshowsCategories(a){const c=(new _.LE).set("api_key",l.N.tmdbApiToken).set("language","es");return this.http.get("movie"===a?`${l.N.tmdbApiURL}/3/genre/movie/list`:`${l.N.tmdbApiURL}/3/genre/tv/list`,{params:c})}}return d.\u0275fac=function(a){return new(a||d)(m.LFG(_.eN))},d.\u0275prov=m.Yz7({token:d,factory:d.\u0275fac,providedIn:"root"}),d})()}}]);