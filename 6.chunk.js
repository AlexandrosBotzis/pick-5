(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{278:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this.$createElement,e=this._self._c||t;return e("v-card",{staticClass:"history"},[e("history-table")],1)};a._withStripped=!0;var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"history-table"},[n("v-data-table",{attrs:{headers:t.headers,items:t.historyData,color:"#66BB6A"},on:{"click:row":t.handleClick},scopedSlots:t._u([{key:"item.draw",fn:function(e){var a=e.item;return t._l(a.draw,(function(e){return n("v-chip",{key:e,attrs:{color:"orange"}},[t._v("\n      "+t._s(e)+"\n    ")])}))}},{key:"item.bet",fn:function(e){var a=e.item;return t._l(a.bet,(function(e){return n("v-chip",{key:e,attrs:{color:a.draw.includes(e)?"green":"red"}},[t._v("\n      "+t._s(e)+"\n    ")])}))}},{key:"item.actions",fn:function(e){var a=e.item;return[n("v-icon",{on:{click:function(e){return t.toggleDialog()}}},[t._v("mdi-delete")]),t._v(" "),n("v-dialog",{attrs:{persistent:"","max-width":"500"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-card-title",{staticClass:"headline"},[t._v("\n          Do you really want to delete it?\n        ")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){return t.toggleDialog()}}},[t._v("\n            Cancel\n          ")]),t._v(" "),n("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:function(e){return t.deleteEntry(a.id)}}},[t._v("\n            Yes, Delete\n          ")])],1)],1)],1)]}}],null,!0),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1)};r._withStripped=!0;var i=n(11),o=n(16),l={name:"HistoryTable",data:function(){return{headers:[{text:"Draw",value:"draw",sortable:!1},{text:"Bet",value:"bet",sortable:!1},{text:"Status",value:"result"},{text:"Amount",value:"amount"},{text:"Date",value:"createdOn"},{text:"Time",value:"createdAt"},{text:"Actions",value:"actions",sortable:!1}],dialog:!1,selected:[]}},mounted:function(){this.fetchHistoricalData()},computed:Object(i.a)(Object(i.a)({},Object(o.c)(["history"])),{},{historyData:function(){return this.history}}),methods:Object(i.a)(Object(i.a)({},Object(o.b)(["fetchHistoricalData","removeEntry"])),{},{toggleDialog:function(){this.dialog=!this.dialog},deleteEntry:function(t){this.removeEntry(t),this.toggleDialog()},handleClick:function(t){console.log("clicl",t),this.$router.push({path:"/history/details/",query:{id:t.internalId}})}})},s=n(22),c=Object(s.a)(l,r,[],!1,null,null,null);c.options.__file="src/components/HistoryTable/HistoryTable.vue";var u={name:"History",components:{HistoryTable:c.exports}},d=n(58),v=n.n(d),h=n(328),f=n.n(h),b={insert:"head",singleton:!1},y=(v()(f.a,b),f.a.locals,Object(s.a)(u,a,[],!1,null,null,null));y.options.__file="src/views/History/History.vue";e.default=y.exports},328:function(t,e,n){}}]);