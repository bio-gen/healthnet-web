webpackJsonp([1],[,function(t,e,a){"use strict";var s=a(56),n=a.n(s),r=a(4),i=a(20),o=a(121),c=a.n(o),l=i.a.API_URL+"auth/",u=i.a.API_URL+"users/";e.a={user:{id:-1,firstName:"",lastName:"",email:"",authenticated:!1,clear:function(){this.id=-1,this.firstName="",this.lastName="",this.email="",this.authenticated=!1},setUserArgs:function(t,e,a,s,n){this.id=t,this.firstName=e,this.lastName=a,this.email=s,this.authenticated=n},setUser:function(t){this.id=t.id,this.firstName=t.firstName,this.lastName=t.lastName,this.email=t.email,this.authenticated=t.authenticated}},getOptions:{headers:{"Content-Type":"application/json"}},postOptions:{headers:{"Content-Type":"application/json"}},getUser:function(t,e,a){var s=this;t.$http.get(u+e,this.getOptions).then(function(t){s.user.setUserArgs(e,t.body.data.attributes.first_name,t.body.data.attributes.last_name,t.body.data.attributes.email,!0),localStorage.setItem("user",n()(s.user)),a&&r.a.push(a)},function(e){404===e.status?t.error="User not found.":t.error="There was an error processing your request ("+e.status+" - "+e.data+"). Please contact the system administrator."})},login:function(t,e,a){var s=this;t.$http.post(l,e,this.postOptions).then(function(e){return t.loading=!1,localStorage.setItem("jwt",e.body.jwt),c()(e.body.jwt)},function(e){t.loading=!1,404===e.status?t.error="Invalid user/password.":t.error="There was an error processing your request ("+e.status+" - "+e.data+"). Please contact the system administrator."}).then(function(e){if(e){var n=e.sub;s.getUser(t,n,a)}})},signup:function(t,e,a){t.$http.post(u,e,this.postOptions).then(function(e){t.loading=!1,a&&r.a.push(a)},function(e){t.loading=!1,422===e.status?e.data.password_confirmation?t.error="Passwords do not match.":e.data.email&&(t.error="A user with this email already exists."):t.error="There was an error processing your request ("+e.status+" - "+e.data+"). Please contact the system administrator."})},logout:function(t){localStorage.removeItem("jwt"),localStorage.removeItem("user"),this.user.clear(),t&&r.a.push(t)},checkAuth:function(){var t=localStorage.getItem("jwt"),e=localStorage.getItem("user");return null==t||null==e?(this.logout(),!1):(this.user.setUser(JSON.parse(localStorage.getItem("user"))),!0)},getAuthHeader:function(){return{Authorization:"Bearer "+localStorage.getItem("jwt")}}}},,,function(t,e,a){"use strict";(function(t){var s=a(18),n=a(123),r=a.n(n),i=a(126),o=a.n(i),c=a(125),l=a.n(c),u=a(128),d=a.n(u),p=a(130),m=a.n(p),f=a(134),v=a.n(f),h=a(132),y=a.n(h),g=a(131),_=a.n(g),C=a(133),b=a.n(C),E=a(137),x=a.n(E),w=a(129),N=a.n(w);e.a=new s.a({mode:"history",base:t,routes:[{path:"/",name:"index",component:r.a},{path:"/signup",name:"signup",component:o.a},{path:"/dashboard",component:d.a,children:[{path:"",name:"home",component:m.a},{path:"profile",name:"profile",component:v.a},{path:"meeting",name:"meeting",component:y.a},{path:"inbox",name:"inbox",component:_.a},{path:"notifications",name:"notifications",component:b.a},{path:"settings",name:"settings",component:x.a},{path:"edit-account",name:"editAccount",component:N.a}]},{path:"*",component:l.a}]})}).call(e,"/")},,,,,,,,,,,,,,,function(t,e,a){"use strict";var s=a(20),n=s.a.API_URL+"users/";e.a={getExperienceURL:function(t,e){var a=n+t+"/work_experiences/";return e&&(a+=e+"/"),a},getExperienceList:function(t,e,a){t.loading=!0;var n=this.getExperienceURL(e);s.a.getEndpoint(t,n,a)},createExperience:function(t,e,a,n,r){var i=this.getExperienceURL(e),o={data:{type:"work_experiences",attributes:a}};s.a.postEndpoint(t,i,o,n,r)},deleteExperience:function(t,e,a,n){var r=this.getExperienceURL(e,a);s.a.deleteEndpoint(t,r,n)}}},function(t,e,a){"use strict";e.a={API_URL:"http://healthnetz.herokuapp.com/v1/",GET_OPTIONS:{headers:{"Content-Type":"application/json"}},POST_OPTIONS:{headers:{"Content-Type":"application/json"}},DELETE_OPTIONS:{headers:{"Content-Type":"application/json"}},errorMap:{404:"Not found.",422:"Data entry error"},logError:function(t,e,a){var s=null==a?this.errorMap:a,n="";n=s.hasOwnProperty(e)?s[e]:"There was an error processing your request ("+e+"). Please contact the system administrator.",t.error=n,console.log(n)},getEndpoint:function(t,e,a,s,n){var r=this;t.$http.get(e,this.GET_OPTIONS).then(function(t){a(t)},function(e){s?s(e):r.logError(t,e.status,n)})},postEndpoint:function(t,e,a,s,n,r){var i=this;t.$http.post(e,a,this.DELETE_OPTIONS).then(function(t){s(t)},function(e){n?n(e):i.logError(t,e.status,r)})},deleteEndpoint:function(t,e,a,s,n){var r=this;t.$http.delete(e,this.DELETE_OPTIONS).then(function(t){a(t)},function(e){s?s(e):r.logError(t,e.status,n)})}}},,,,,,,,,,,function(t,e,a){a(116);var s=a(0)(a(45),a(153),"data-v-7c31d750",null);t.exports=s.exports},,function(t,e,a){a(103);var s=a(0)(a(38),a(140),null,null);t.exports=s.exports},,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(35),n=a(33),r=a.n(n),i=a(4),o=a(1),c=a(34),l=a(18);s.a.use(c.a),s.a.use(l.a),s.a.config.productionTip=!1,s.a.http.options.xhr={withCredentials:!0},s.a.http.options.emulateJSON=!0,s.a.http.headers.common.Authorization=o.a.getAuthHeader().Authorization,o.a.checkAuth(),new s.a({el:"#app",router:i.a,template:"<App/>",components:{App:r.a}})},function(t,e,a){"use strict";(function(t){var s=a(17);t.jQuery=a(17),window.$=s;var n=a(58),r=a(57);console.log(n),e.a={confirmDialog:function(t,e,a,s){r.confirm({title:t,message:e,buttons:{cancel:{label:"Cancel"},confirm:{label:"Confirm"}},size:a,callback:function(t){t&&s()}})}}}).call(e,a(32))},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(127),n=a.n(s),r=a(122),i=a.n(r);e.default={name:"app",components:{Top:n.a,Bottom:i.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"bottom",data:function(){return{msg:"Bottom component",year:(new Date).getFullYear()}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(124),n=a.n(s),r=a(1),i=a(4);e.default={name:"index",components:{Login:n.a},data:function(){return{msg:"Index Page"}},mounted:function(){r.a.user.authenticated&&i.a.push("dashboard")}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(1);e.default={name:"login",data:function(){return{msg:"Login component",credentials:{email:"",password:""},error:"",loading:!1}},methods:{login:function(t){this.loading=!0,t.preventDefault();var e={auth:{email:this.credentials.email,password:this.credentials.password}};s.a.login(this,e,"dashboard"),this.credentials.password=""}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"not-found-component",components:{},data:function(){return{header:"Not found",msg:"The page you are looking for does not exist."}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(1),n=a(4),r=a(31),i=a.n(r);e.default={name:"signup",components:{AccountForm:i.a},data:function(){return{msg:"SignUp component"}},methods:{},computed:{},mounted:function(){s.a.user.authenticated&&n.a.push("dashboard")}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(21),n=a.n(s),r=a(1);e.default={name:"top",data:function(){return{msg:"Top component",user:r.a.user}},props:{},methods:{isActive:function(){for(var t=arguments.length,e=Array(t),a=0;a<t;a++)e[a]=arguments[a];var s=!0,r=!1,i=void 0;try{for(var o,c=n()(e);!(s=(o=c.next()).done);s=!0){var l=o.value;if(this.$route.path===l)return!0}}catch(t){r=!0,i=t}finally{try{!s&&c.return&&c.return()}finally{if(r)throw i}}return!1},logout:function(){r.a.logout("/")}},computed:{userAvatar:function(){return"/static/user-md.png"}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(1);e.default={name:"accountForm",data:function(){return{credentials:{firstName:"",lastName:"",email:"",password:"",passwordConfirmation:"",setCredentials:function(t){this.firstName=t.firstName,this.lastName=t.lastName,this.email=t.email}},successMsg:"",error:"",loading:!1}},props:{type:{type:String,required:!0}},methods:{submit:function(t){this.loading=!0,t.preventDefault(),"create"===this.type?this.signup():"update"===this.type&&this.update()},signup:function(){var t={data:{type:"users",attributes:{first_name:this.credentials.firstName,last_name:this.credentials.lastName,email:this.credentials.email,password:this.credentials.password,password_confirmation:this.credentials.passwordConfirmation}}};s.a.signup(this,t,"/")},update:function(t){console.log("Updating and stuff...")}},computed:{headerInformation:function(){return"create"===this.type?'<h2>Sign Up</h2>\n                <p>Sign up for a free account.</p>\n                <p>Already a user?\n                  <a href="/">Log in</a> to your account.\n                </p>':"update"===this.type?"<h2>My Account</h2>\n                <p>Edit your account information.</p>":""}},mounted:function(){"update"===this.type&&s.a.user.authenticated&&this.credentials.setCredentials(s.a.user)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(1),n=a(4);e.default={name:"index",components:{},data:function(){return{msg:"Dashboard page"}},mounted:function(){s.a.user.authenticated||n.a.push("/")},route:{canActivate:function(){return s.a.user.authenticated}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(1),n=a(31),r=a.n(n);e.default={name:"editAccount",components:{AccountForm:r.a},data:function(){return{msg:"Edit account component",user:s.a.user}},props:{},methods:{},computed:{},mounted:function(){}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"home",data:function(){return{msg:"Home component"}},props:{},methods:{}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"inbox",data:function(){return{msg:"Inbox component"}},props:{},methods:{}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"meeting",data:function(){return{msg:"Meeting component"}},props:{},methods:{}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"notifications",data:function(){return{msg:"Notifications component"}},props:{},methods:{}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(1),n=a(136),r=a.n(n);e.default={name:"profile",components:{ProfileEntryList:r.a},data:function(){return{user:s.a.user}},props:{},methods:{},computed:{fullName:function(){return this.user.firstName+" "+this.user.lastName}},mounted:function(){}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(19),n=a(37);e.default={name:"profileEntry",components:{},data:function(){return{deleting:!1,saving:!1,thisEntry:{title:"",company:"",location:"",start_date:"",end_date:"",current:!1,description:""},error:""}},props:{type:{type:String,required:!0},entryType:{type:String,required:!0},entry:{type:Object,required:!1},entryKey:{type:Number,required:!1},user:{type:Object,required:!0}},methods:{getEndDate:function(){return this.entry.attributes.current||null==this.entry.attributes.end_date?"Present":this.entry.attributes.end_date},deleteEntry:function(t,e){var a=this;n.a.confirmDialog("Delete Entry","Are you sure you want to delete this entry?","small",function(){switch(a.deleting=!0,a.type){case"experience":s.a.deleteExperience(a,a.user.id,t.id,function(t){a.error="",a.deleting=!1,a.$emit("delete",!0)})}})},saveEntry:function(t){var e=this;switch(t.preventDefault(),this.saving=!0,this.type){case"experience":s.a.createExperience(this,this.user.id,this.thisEntry,function(t){e.saving=!1,e.error="";var a=t.body.data;e.$emit("saveEntry",a)},function(t){e.saving=!1,422===t.status?e.error="Incorrect data input.":e.error="Server error ("+t.status+")."})}},cancel:function(){this.$emit("cancel",!0)},makeCurrent:function(){var t=this.$refs.current,e=this.$refs.endDate;t.checked?(e.disabled=!0,e.placeholder=""):(e.disabled=!1,e.required=!0,e.placeholder="yyyy-mm-dd")}},computed:{heading:function(){return this.type.charAt(0).toUpperCase()+this.type.slice(1)}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(21),n=a.n(s),r=a(19),i=a(135),o=a.n(i);e.default={name:"profileEntryList",components:{ProfileEntry:o.a},data:function(){return{entries:[],error:"",successMsg:"",loading:!1,newEntry:!1}},props:{type:{type:String,required:!0},user:{type:Object,required:!0}},methods:{addEntry:function(){this.newEntry=!0},deleteEntry:function(t){this.entries.splice(t,1),this.successMsg="Entry deleted successfully."},saveEntry:function(t){this.entries.unshift(t),this.newEntry=!1,this.successMsg="Entry added successfully."}},computed:{heading:function(){return this.type.charAt(0).toUpperCase()+this.type.slice(1)}},mounted:function(){var t=this;switch(this.type){case"experience":r.a.getExperienceList(this,this.user.id,function(e){var a=!0,s=!1,r=void 0;try{for(var i,o=n()(e.body.data);!(a=(i=o.next()).done);a=!0){var c=i.value;t.entries.push(c)}}catch(t){s=!0,r=t}finally{try{!a&&o.return&&o.return()}finally{if(s)throw r}}t.loading=!1})}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"settings",data:function(){return{msg:"Settings component"}},props:{},methods:{}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,function(t,e,a){a(105);var s=a(0)(a(39),a(142),"data-v-3b11a53e",null);t.exports=s.exports},function(t,e,a){a(110);var s=a(0)(a(40),a(147),"data-v-5bd40ee8",null);t.exports=s.exports},function(t,e,a){a(118);var s=a(0)(a(41),a(155),"data-v-c884c8ba",null);t.exports=s.exports},function(t,e,a){a(109);var s=a(0)(a(42),a(146),"data-v-529c9008",null);t.exports=s.exports},function(t,e,a){a(102);var s=a(0)(a(43),a(139),"data-v-1c969c24",null);t.exports=s.exports},function(t,e,a){a(114);var s=a(0)(a(44),a(151),"data-v-6969b80f",null);t.exports=s.exports},function(t,e,a){a(107);var s=a(0)(a(46),a(144),"data-v-4c0dd993",null);t.exports=s.exports},function(t,e,a){a(115);var s=a(0)(a(47),a(152),"data-v-723612fc",null);t.exports=s.exports},function(t,e,a){a(108);var s=a(0)(a(48),a(145),"data-v-4c35d530",null);t.exports=s.exports},function(t,e,a){a(104);var s=a(0)(a(49),a(141),"data-v-36061405",null);t.exports=s.exports},function(t,e,a){a(117);var s=a(0)(a(50),a(154),"data-v-be71090c",null);t.exports=s.exports},function(t,e,a){a(113);var s=a(0)(a(51),a(150),"data-v-647cae67",null);t.exports=s.exports},function(t,e,a){a(106);var s=a(0)(a(52),a(143),"data-v-3ff35830",null);t.exports=s.exports},function(t,e,a){a(111);var s=a(0)(a(53),a(148),"data-v-5cff029a",null);t.exports=s.exports},function(t,e,a){a(112);var s=a(0)(a(54),a(149),"data-v-645ac758",null);t.exports=s.exports},function(t,e,a){a(101);var s=a(0)(a(55),a(138),"data-v-0b69d418",null);t.exports=s.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"settings"},[a("h1",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"signup"},[a("account-form",{attrs:{type:"create"}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("top"),t._v(" "),a("main",{staticClass:"container-fluid"},[a("router-view")],1),t._v(" "),a("bottom")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"inbox"},[a("h1",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom"},[a("footer",{staticClass:"container-fluid text-center navbar-fixed-bottom"},[a("p",[t._v("© "+t._s(t.year)+" HealthNet Inc. All Rights Reserved")])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"profile"},[a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"jumbotron"},[a("div",{staticClass:"container text-center"},[a("h1",[t._v(t._s(t.fullName))]),t._v(" "),a("p",[t._v("Student / Degree / Specialization")]),t._v(" "),a("p",[t._v("Institution")]),t._v(" "),a("p",[t._v("Location")])])])]),t._v(" "),a("profileEntryList",{attrs:{type:"experience",user:t.user}}),t._v(" "),a("profileEntryList",{attrs:{type:"education",user:t.user}}),t._v(" "),a("profileEntryList",{attrs:{type:"certificates",user:t.user}}),t._v(" "),a("profileEntryList",{attrs:{type:"affiliations",user:t.user}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard"},[a("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("h1",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"not-found"},[a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"jumbotron"},[a("div",{staticClass:"container text-center"},[a("h1",[t._v(t._s(t.header))]),t._v(" "),a("p",[t._v(t._s(t.msg))])])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"index"},[a("login")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"profile-entry"},[t.error?a("div",{staticClass:"alert alert-danger"},[a("p",[t._v(t._s(t.error))])]):t._e(),t._v(" "),a("form",{on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"esc",27))return null;t.cancel(e)},submit:t.saveEntry}},[a("div",{staticClass:"panel",class:"read"===t.entryType?"panel-default":"panel-primary"},[a("div",{staticClass:"panel-heading"},["read"===t.entryType?a("a",{attrs:{title:"Delete entry",role:"button"},on:{click:function(e){t.deleteEntry(t.entry,t.entryKey)}}},[t.deleting?a("i",{staticClass:"fa fa-spinner fa-spin pull-right"}):a("i",{staticClass:"fa fa-trash pull-right"})]):t._e(),t._v(" "),a("h4",{staticClass:"panel-title"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"sr-only",attrs:{for:"title"}},[t._v("Title:")]),t._v(" "),"read"===t.entryType?a("strong",[t._v(t._s(t.entry.attributes.title))]):a("input",{directives:[{name:"model",rawName:"v-model",value:t.thisEntry.title,expression:"thisEntry.title"}],staticClass:"form-control",attrs:{type:"text",id:"title",placeholder:"Title",required:""},domProps:{value:t.thisEntry.title},on:{input:function(e){e.target.composing||(t.thisEntry.title=e.target.value)}}})])])]),t._v(" "),a("div",{attrs:{id:t.type+t.entryKey}},[a("div",{staticClass:"panel-body"},[a("ul",{staticClass:"list-group"},[a("li",{staticClass:"list-group-item row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group form-inline"},[a("label",{attrs:{for:"company"}},[t._v("Organization:")]),t._v(" "),"read"===t.entryType?a("span",[t._v("\n                      "+t._s(t.entry.attributes.company)+"\n                    ")]):a("input",{directives:[{name:"model",rawName:"v-model",value:t.thisEntry.company,expression:"thisEntry.company"}],staticClass:"form-control",attrs:{type:"text",id:"company",placeholder:"Organization name",required:""},domProps:{value:t.thisEntry.company},on:{input:function(e){e.target.composing||(t.thisEntry.company=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group form-inline"},[a("label",{attrs:{for:"location"}},[t._v("Location:")]),t._v(" "),"read"===t.entryType?a("span",[t._v("\n                      "+t._s(t.entry.attributes.location)+"\n                    ")]):a("input",{directives:[{name:"model",rawName:"v-model",value:t.thisEntry.location,expression:"thisEntry.location"}],staticClass:"form-control",attrs:{type:"text",id:"location",placeholder:"City/Country",required:""},domProps:{value:t.thisEntry.location},on:{input:function(e){e.target.composing||(t.thisEntry.location=e.target.value)}}})])])]),t._v(" "),a("li",{staticClass:"list-group-item row"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group form-inline"},[a("label",{attrs:{for:"startDate"}},[t._v("From:")]),t._v(" "),"read"===t.entryType?a("span",[t._v("\n                      "+t._s(t.entry.attributes.start_date)+"\n                    ")]):a("input",{directives:[{name:"model",rawName:"v-model",value:t.thisEntry.start_date,expression:"thisEntry.start_date"}],staticClass:"form-control",attrs:{type:"text",id:"startDate",placeholder:"yyyy-mm-dd",required:""},domProps:{value:t.thisEntry.start_date},on:{input:function(e){e.target.composing||(t.thisEntry.start_date=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"form-group form-inline"},[a("label",{attrs:{for:"endDate"}},[t._v("To:")]),t._v(" "),"read"===t.entryType?a("span",[t._v("\n                      "+t._s(t.getEndDate())+"\n                    ")]):a("div",{staticClass:"form-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.thisEntry.end_date,expression:"thisEntry.end_date"}],ref:"endDate",staticClass:"form-control",attrs:{type:"text",id:"endDate",placeholder:"yyyy-mm-dd"},domProps:{value:t.thisEntry.end_date},on:{input:function(e){e.target.composing||(t.thisEntry.end_date=e.target.value)}}}),t._v(" "),a("div",{staticClass:"checkbox"},[a("label",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.thisEntry.current,expression:"thisEntry.current"}],ref:"current",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.thisEntry.current)?t._i(t.thisEntry.current,null)>-1:t.thisEntry.current},on:{change:function(e){t.makeCurrent()},__c:function(e){var a=t.thisEntry.current,s=e.target,n=!!s.checked;if(Array.isArray(a)){var r=t._i(a,null);n?r<0&&(t.thisEntry.current=a.concat(null)):r>-1&&(t.thisEntry.current=a.slice(0,r).concat(a.slice(r+1)))}else t.thisEntry.current=n}}}),t._v("\n                          Current\n                        ")])])])])])]),t._v(" "),a("li",{staticClass:"list-group-item"},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"sr-only",attrs:{for:"location"}},[t._v("Description:")]),t._v(" "),"read"===t.entryType?a("span",[t._v("\n                    "+t._s(t.entry.attributes.description)+"\n                  ")]):a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.thisEntry.description,expression:"thisEntry.description"}],staticClass:"form-control",attrs:{id:"description",rows:"3",placeholder:"Description",required:""},domProps:{value:t.thisEntry.description},on:{input:function(e){e.target.composing||(t.thisEntry.description=e.target.value)}}})])])])]),t._v(" "),"read"!==t.entryType?a("div",{staticClass:"panel-footer"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-offset-9 col-md-1"},[a("div",{staticClass:"btn btn-primary",on:{click:t.cancel}},[t._v("\n                  Cancel\n                ")])]),t._v(" "),a("div",{staticClass:"col-md-1"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t.saving?a("i",{staticClass:"fa fa-spinner fa-spin"}):a("span",[t._v("Save")])])])])]):t._e()])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"profile-entry-list"},[a("div",{staticClass:"container-fluid bg-3"},[t.error?a("div",{staticClass:"alert alert-danger fade"},[a("p",[t._v(t._s(t.error))])]):t._e(),t._v(" "),t.successMsg?a("div",{staticClass:"alert alert-success alert-dismissable fade"},[a("a",{staticClass:"close",attrs:{href:"#","data-dismiss":"alert","aria-label":"close"}},[t._v("×")]),t._v(" "),a("strong",[t._v("Success!")]),t._v(" "+t._s(t.successMsg)+"\n    ")]):t._e(),t._v(" "),a("div",{staticClass:"panel-group"},[a("div",{staticClass:"panel panel-default"},[a("div",{staticClass:"panel-heading"},[a("h3",{staticClass:"panel-title"},[a("a",{staticClass:"h3 accordion-toggle",class:{collapsed:0==t.entries.length},attrs:{"data-toggle":"collapse",title:"Toggle hide/show",href:"#"+t.type+"List"}},[t._v("\n              "+t._s(t.heading)+"\n            ")]),t._v(" "),a("a",{attrs:{title:"New entry",role:"button"},on:{click:t.addEntry}},[a("i",{staticClass:"fa fa-plus-circle"})]),t._v(" "),t.loading?a("i",{staticClass:"fa fa-spinner fa-spin"}):t._e()])]),t._v(" "),a("div",{staticClass:"panel-collapse collapse in",attrs:{id:t.type+"List"}},[a("ul",{staticClass:"list-group"},[t.newEntry?a("li",{staticClass:"list-group-item"},[a("profileEntry",{attrs:{type:t.type,entryType:"create",user:t.user},on:{cancel:function(e){t.newEntry=!1},saveEntry:t.saveEntry}})],1):t._e(),t._v(" "),t._l(t.entries,function(e,s){return a("li",{staticClass:"list-group-item"},[a("profileEntry",{attrs:{type:t.type,entryType:"read",entry:e,entryKey:s,user:t.user},on:{delete:function(e){t.deleteEntry(s)}}})],1)})],2)])])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"notifications"},[a("h1",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top"},[a("nav",{staticClass:"navbar navbar-inverse navbar-fixed-top"},[a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"navbar-header"},[t.user.authenticated?a("button",{staticClass:"navbar-toggle",attrs:{type:"button","data-toggle":"collapse","data-target":"#myNavbar"}},[a("span",{staticClass:"icon-bar"}),t._v(" "),a("span",{staticClass:"icon-bar"}),t._v(" "),a("span",{staticClass:"icon-bar"})]):t._e(),t._v(" "),a("a",{staticClass:"navbar-brand",attrs:{href:"/"}},[t._v("Our Icon")])]),t._v(" "),t.user.authenticated?a("div",{staticClass:"collapse navbar-collapse",attrs:{id:"myNavbar"}},[t._m(0),t._v(" "),a("ul",{staticClass:"nav navbar-nav navbar-right small"},[a("li",{class:{active:t.isActive("/dashboard")}},[a("router-link",{attrs:{to:"/dashboard"}},[a("i",{staticClass:"glyphicon glyphicon-home"}),a("br"),t._v("\n              Home\n            ")])],1),t._v(" "),a("li",{class:{active:t.isActive("/dashboard/profile")}},[a("router-link",{attrs:{to:"/dashboard/profile"}},[a("i",{staticClass:"glyphicon glyphicon-user"}),a("br"),t._v("\n              Profile\n            ")])],1),t._v(" "),a("li",{class:{active:t.isActive("/dashboard/meeting")}},[a("router-link",{attrs:{to:"/dashboard/meeting"}},[a("i",{staticClass:"glyphicon glyphicon-comment"}),a("br"),t._v("\n              Meeting\n            ")])],1),t._v(" "),a("li",{class:{active:t.isActive("/dashboard/inbox")}},[a("router-link",{attrs:{to:"/dashboard/inbox"}},[a("i",{staticClass:"glyphicon glyphicon-envelope"}),a("br"),t._v("\n              Inbox\n            ")])],1),t._v(" "),a("li",{class:{active:t.isActive("/dashboard/notifications")}},[a("router-link",{attrs:{to:"/dashboard/notifications"}},[a("i",{staticClass:"glyphicon glyphicon-bell"}),a("br"),t._v("\n              Alerts\n            ")])],1),t._v(" "),a("li",{staticClass:"dropdown",class:{active:t.isActive("/dashboard/account","/dashboard/settings")}},[a("a",{staticClass:"dropdown-toggle",attrs:{"data-toggle":"dropdown",role:"button"}},[a("div",{attrs:{id:"userDropdown"}},[a("img",{staticClass:"img-rounded",attrs:{id:"avatar",src:t.userAvatar}}),t._v(" "),a("span",{staticClass:"caret"})])]),t._v(" "),a("ul",{staticClass:"dropdown-menu"},[a("li",[a("router-link",{attrs:{to:"/dashboard/profile"}},[t._v("\n                  "+t._s(t.user.email)+"\n                ")])],1),t._v(" "),a("li",{staticClass:"divider"}),t._v(" "),a("li",[a("router-link",{attrs:{to:"/dashboard/edit-account"}},[a("span",{staticClass:"glyphicon glyphicon-lock"}),t._v("  My Account\n                ")])],1),t._v(" "),a("li",[a("router-link",{attrs:{to:"/dashboard/settings"}},[a("span",{staticClass:"glyphicon glyphicon-cog"}),t._v("  Settings\n                ")])],1),t._v(" "),a("li",{staticClass:"divider"}),t._v(" "),a("li",[a("a",{attrs:{href:"#"},on:{click:t.logout}},[a("span",{staticClass:"glyphicon glyphicon-log-out"}),t._v("  Logout\n                ")])])])])])]):t._e()])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{staticClass:"navbar-form navbar-left"},[a("div",{staticClass:"input-group"},[a("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"Search"}}),t._v(" "),a("div",{staticClass:"input-group-btn"},[a("button",{staticClass:"btn btn-default",attrs:{type:"submit"}},[a("i",{staticClass:"glyphicon glyphicon-search"})])])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"edit-account"},[a("account-form",{attrs:{type:"update"}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"account-form"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4 col-md-offset-4"},[a("div",{domProps:{innerHTML:t._s(t.headerInformation)}}),t._v(" "),a("form",{on:{submit:t.submit}},[a("div",{staticClass:"form-group row"},[a("div",{staticClass:"col-md-6"},[a("label",{attrs:{for:"first-name"}},[t._v("First Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.firstName,expression:"credentials.firstName"}],staticClass:"form-control",attrs:{type:"text",id:"first-name",name:"first-name",placeholder:"Your first name",required:"",autofocus:""},domProps:{value:t.credentials.firstName},on:{input:function(e){e.target.composing||(t.credentials.firstName=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"col-md-6"},[a("label",{attrs:{for:"last-name"}},[t._v("Last Name")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.lastName,expression:"credentials.lastName"}],staticClass:"form-control",attrs:{type:"text",id:"last-name",name:"last-name",placeholder:"Your last name",required:""},domProps:{value:t.credentials.lastName},on:{input:function(e){e.target.composing||(t.credentials.lastName=e.target.value)}}})])]),t._v(" "),a("div",{staticClass:"input-group"},[t._m(0),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.email,expression:"credentials.email"}],staticClass:"form-control",attrs:{type:"email",id:"email",name:"email","aria-describedby":"emailHelp",placeholder:"Your email",required:"",disabled:"update"===t.type},domProps:{value:t.credentials.email},on:{input:function(e){e.target.composing||(t.credentials.email=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"input-group"},[t._m(1),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.password,expression:"credentials.password"}],staticClass:"form-control",attrs:{type:"password",id:"password",name:"password",placeholder:"update"===t.type?"New Password":"Password",required:"create"===t.type},domProps:{value:t.credentials.password},on:{input:function(e){e.target.composing||(t.credentials.password=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"input-group"},[t._m(2),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.passwordConfirmation,expression:"credentials.passwordConfirmation"}],staticClass:"form-control",attrs:{type:"password",id:"confirm-password",name:"confirm-password",placeholder:"update"===t.type?"Confirm New Password":"Confirm Password",required:"create"===t.type},domProps:{value:t.credentials.passwordConfirmation},on:{input:function(e){e.target.composing||(t.credentials.passwordConfirmation=e.target.value)}}})]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"form-group row"},[a("div",{staticClass:"offset-md-2 col-md-10"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t.loading?a("i",{staticClass:"fa fa-spinner fa-spin"}):a("span",{domProps:{innerHTML:t._s("update"===t.type?"Save":"Sign Up")}})])])])]),t._v(" "),t.successMsg?a("div",{staticClass:"alert alert-success"},[a("p",[t._v(t._s(t.successMsg))])]):t._e(),t._v(" "),t.error?a("div",{staticClass:"alert alert-danger"},[a("p",[t._v(t._s(t.error))])]):t._e()])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"input-group-addon"},[a("i",{staticClass:"glyphicon glyphicon-user"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"input-group-addon"},[a("i",{staticClass:"glyphicon glyphicon-lock"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"input-group-addon"},[a("i",{staticClass:"glyphicon glyphicon-lock"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"meeting"},[a("h1",[t._v(t._s(t.msg))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[a("div",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4 col-md-offset-4"},[a("h2",[t._v("Login")]),t._v(" "),a("p",[t._v("Log in to your account or "),a("router-link",{attrs:{to:"/signup"}},[t._v("Sign up")]),t._v(".")],1),t._v(" "),a("form",{on:{submit:t.login}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"email"}},[t._v("Email Address")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.email,expression:"credentials.email"}],staticClass:"form-control",attrs:{type:"email",id:"email",name:"email","aria-describedby":"emailHelp",placeholder:"Enter email",required:"",autofocus:""},domProps:{value:t.credentials.email},on:{input:function(e){e.target.composing||(t.credentials.email=e.target.value)}}}),t._v(" "),a("small",{staticClass:"form-text text-muted",attrs:{id:"emailHelp"}},[t._v("\n              We will never share your email with anyone else.\n            ")])]),t._v(" "),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"password"}},[t._v("Password")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.credentials.password,expression:"credentials.password"}],staticClass:"form-control",attrs:{type:"password",id:"password",name:"password",placeholder:"Password",required:""},domProps:{value:t.credentials.password},on:{input:function(e){e.target.composing||(t.credentials.password=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-group row"},[a("div",{staticClass:"offset-md-2 col-md-10"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t.loading?a("i",{staticClass:"fa fa-spinner fa-spin"}):a("span",[t._v("Log In")])])])])]),t._v(" "),t.error?a("div",{staticClass:"alert alert-danger"},[a("p",[t._v(t._s(t.error))])]):t._e()])])])])},staticRenderFns:[]}},,function(t,e){}],[36]);
//# sourceMappingURL=app.90be0d44526a3261f997.js.map