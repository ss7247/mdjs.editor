function Toast(){$("body").append('<div class="toast_bg"><div id="toast" class="toast_bd"></div></div>'),this.view=$("#toast")}function LIOEvent(){}function checkMdName(t){for(var e=t.toLowerCase(),i=0;i<lio.nlimit.length&&e.slice(-lio.nlimit[i].length)!=lio.nlimit[i];i++);return 2>i}function loadMd(t,e){return t.size>lio.slimit?void LIOEvent.onError("你选择的文件过大,无法打开!"):checkMdName(t.name)?void lio.r.readAsText(t,e):void LIOEvent.onError("你选择的文件不是Markdown文件")}function saveMd(t,e){try{var i=new Blob([t],{type:"application/octet-stream"}),n=n||webkitURL||window;console.clear();var s=n.createObjectURL(i),r=document.getElementById("filesave");r.href=s,r.download=e,r.click(),n.revokeObjectURL(s)}catch(o){console.error(o)}}function Export(){this.template=["<html>","<head>",'<meta charset="utf-8">',"<title>${fname}</title>",'<link rel="stylesheet" type="text/css" href="${csspath}"/>',"</head>","<body>",'<div class="md">',"${content}","</div>","</body>","</html>"]}function EdHistory(t){this.inn=[],this.q=0,this.maxUndo=t,this.maxSize=3*this.maxUndo>>1}function initShortcut(){document.onkeydown=function(t){return!t.ctrlKey||t.shiftKey||t.altKey?!0:void 0==shortcutMap[t.which]?!0:(shortcutMap[t.which](),!1)}}function initMenuButton(){$("#menu a").each(function(){var t=$(this),which=t.attr("data-op");if(which){var e=eval("onMenu_"+which),sc=t.attr("data-sc");t.click(e),sc&&(sc=sc.length>1?parseInt(sc):sc.toUpperCase().charCodeAt(0),shortcutMap[sc]=e)}})}function onMenu_new(){showDialog("newdlg")}function onMenu_open(){$("#filedlg").click()}function onMenu_save(){saveMd(inputView.val(),nowFile.name)}function onMenu_export(){var t=nowFile.name;t=t.slice(0,t.lastIndexOf("."));var e=H5S.getValue("epcss"),i=Exporter.exportHTML(outputView.html(),t,e?e:"http://git.oschina.net/voyageliu/mdjs/raw/master/mdcss.css");saveMd(i,t+".html")}function onMenu_help(){showIframeDlg("帮助关于","help.html")}function onMenu_settings(){showIframeDlg("设置选项","settings.html")}function showIframeDlg(t,e){dlg_title.text(t),dlg_iframe.height(editorView.height()-50).attr("src",e),dlg_bd.slideToggle(500)}function onFileClick(t){}function onFileSelect(t){var e=filedlg[0].files;e.length>0&&(loadingFile=e[0],loadMd(e[0]))}function onFileDropping(t){var e=t.dataTransfer.files;if(0!=e.length){if(t.preventDefault(),!checkMdName(e[0].name))return void Toast.err("拖入的不是Markdown文件",2e3);loadingFile=e[0],loadMd(e[0])}}function showNewFileDlg(){hideDialog("newdlg");var t=$("#text_newname");t.val(t.attr("data-value")),showDialog("newnamedlg"),t.focus().select()}function showModiNameDlg(){var t=$("#text_modiname");t.val(nowFile.name),showDialog("modinamedlg"),t.focus().select(),t[0].selectionEnd=nowFile.name.length-3}function onNewFileDlgDone(){_modiName($("#text_newname").val().trim()),inputView.val("").focus(),hideDialog()}function onModiNameDlgDone(){_modiName($("#text_modiname").val().trim()),hideDialog()}function _modiName(t){return checkMdName(t)?void fileStatusChange(t):void Toast.err("请输入有效的Markdown文件名",2e3)}function showDialog(t){$(".dialog_bg").show(),$("#"+t).slideDown(500)}function hideDialog(t){return t?void $("#"+t).slideUp(500):hideDialogAll()}function hideDialogAll(){$(".dialog").slideUp(500),setTimeout($(".dialog_bg").hide,500)}function fileStatusChange(t){"string"==typeof t&&(t={name:t}),nowFile=t,H5S.getValue("ebls")&&(H5S.title=t.name),filenameView.text(t.name)}function onReadMdError(t){Toast.err(t,2e3)}function onReadMdAbort(){Toast.warn("读取被中断",2e3)}function onReadMdDone(t){fileStatusChange(loadingFile),inputView.val(t).focus().scrollTop(0),outputView.html(Mdjs.md2html(t)),H5S.getValue("ebls")&&(H5S.content=t),Toast.text("读取文件("+loadingFile.name+")成功!",2e3)}function cEvent(t,e,i,n){return t.ctrlKey==e&&t.shiftKey==i&&t.altKey==n}function preview(){var t=inputView.val();H5S.getValue("ebls")&&(H5S.content=t),outputView.html(Mdjs.md2html(t))}function resizeEditor(){var t=editorView.width()-30,e=$(window).height()-52;return inputView.width(.5*t).height(e),outputView.width(.48*t).height(e),!0}Toast.prototype.text=function(t,e){this.setStyle("#dff0d8","#3c763d","#d6e9c6"),this.show(t,e)},Toast.prototype.warn=function(t,e){this.setStyle("#fcf8e3","#8a6d3b","#faebcc"),this.show(t,e)},Toast.prototype.err=function(t,e){this.setStyle("#f2dede","#a94442","#ebccd1"),this.show(t,e)},Toast.prototype.setStyle=function(t,e,i){this.view.css({"background-color":t,color:e,"border-color":i,"box-shadow":"0 0 20px "+i,"-webkit-box-shadow":"0 0 20px "+i})},Toast.prototype.show=function(t,e){this._show(t),e&&setTimeout(Toast._hide,e)},Toast.prototype._show=function(t){var e=Toast.view;"none"!=e.css("display")&&this._hide(),e.html(t);try{e.fadeIn(500)}catch(i){e.show()}},Toast.prototype._hide=function(){var t=Toast.view;try{t.fadeOut(500)}catch(e){t.hide()}},window.Toast=new Toast,window.Mdjs={regs:{ul:/^[\*\-\+] +\S*/g,ol:/^\d+\. +\S*/g,delHTML:/<\/?[^<>]+>/g,url:/^\w+:\/{2,3}\S+$/g,email:/^[\w-]+@[\w-]+\.[\w\.-]+$/g},tbAlign:["left","mid","right"],tag:{tBlock:["<blockquote><p>","</p></blockquote>\n"],tCode:['<pre><code data-lang="$lang">',"</code></pre>\n"],tList:["<li>","<ol>","<ul>","</li>\n","</ol>\n","</ul>\n"],tP:["<p>","</p>"],tToc:['<div class="md_toc">\n',"<ol>\n",'<a href="#$href"><li>',"</li></a>","</ol>","</div>\n"],tFoot:['<div class="md_foot">\n<ol>\n','<li name="%s" id="%s" >',"</li>","</ol></div>\n"],tA:['<a href="mailto:','<a href="','">',"</a>"],tTable:['<table class="md_table">\n<thead>\n',"</thead>\n<tbody>\n","</tbody>\n</table>\n","<tr>","</tr>\n",'<th class="$align">',"</th>",'<td class="$align">',"</td>","md_table_"]},inlineTag:{tStrong:["<strong>","</strong>"],tEm:["<em>","</em>"],tCode:["<code>","</code>"],tSupStr:'<sup><a title="%s" href="%s">%s</a></sup>',tAStr:'<a title="%s" href="%s">%s</a>',tImgStr:'<img alt="%s" title="%s" src="%s" />'},initILT:function(){var t=Mdjs.inlineTag;t.tSup=t.tSupStr.split("%s"),t.tA=t.tAStr.split("%s"),t.tImg=t.tImgStr.split("%s")},_meaning:"#`*[]()-_{}+.!|\\",_inArray:function(t,e){for(var i=0;i<e.length;i++)if(t==e[i])return 1;return 0},_startWith:function(t,e){return t.length<e.length?!1:t.slice(0,e.length)==e},_endWith:function(t,e){return t.length<e.length?!1:t.slice(-e.length)==e},_isHr:function(t){var e=t[0];if("="!=e&&"-"!=e&&"_"!=e&&"*"!=e)return!1;for(var i=0,n=0;i<t.length;i++)if(" "!=t[i]&&"	"!=t[i]){if(t[i]!=e)return!1;n++}return n>=3},_isAList:function(t){return this._isHr(t)?0:-1!=t.search(this.regs.ol)?1:-1!=t.search(this.regs.ul)?2:0},_leftSpace:function(t){for(var e=0,i=0;i<t.length;i++)if(" "==t[i])e++;else{if("	"!=t[i])break;e+=4}return e},_genSpace:function(t){if(!this.gss){this.gss=" ";for(var e=0;10>e;e++)this.gss+=this.gss}return 0>=t?"":this.gss.slice(0,t)},_htmlSafer:function(t){var t=t.replace(/&/g,"&gt;");return t.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"&nbsp;").replace(/\'/g,"&#39;").replace(/\"/g,"&quot;").replace(/\n/g,"</br>")},_matchHref:function(t){for(var e={},i=0,n=0;i<t.length;i++)if(n){if("'"==t[i]||'"'==t[i]||"("==t[i]){e.title=t.slice(i+1,-1);break}}else" "!=t[i]&&"	"!=t[i]||(e.url=t.slice(0,i),n=1);return e.url||(e.url=t),e.title||(e.title=""),e},_matchRefer:function(t){t=t.trim();var e,i,n;return"["!=t[0]?0:-1==(e=t.indexOf("]:",1))?0:" "!=t[e+2]&&"	"!=t[e+2]?0:(i=t.slice(1,e),"^"==i[0]?(n={id:this.sup_record(i),title:i.slice(1),content:t.slice(e+3)},n.url="#md_f_"+n.id):n=this._matchHref(t.slice(e+3).trim()),this.refer_set(i,n),1)},_inn:[],_inn2:[],_innLen:0,_iTop:function(){return 0==this._innLen?-1:this._inn[this._innLen-1]},_iTop2:function(){return this._inn2[this._innLen-1]},_iPush:function(t,e){this._inn[this._innLen]=t,this._inn2[this._innLen++]=e},_iPop:function(){return 0==this._innLen?!1:(this._innLen--,!0)},refer_init:function(){this.rfMan={},this.rfSup=[]},refer_set:function(t,e){this.rfMan[t.toLowerCase()]=e},refer_get:function(t){return this.rfMan[t.toLowerCase()]},sup_record:function(t){return this.rfSup.push(t)},md2html:function(t,e){try{Mdjs.initILT(),Mdjs.refer_init();for(var i=[],n=null,s=0,r=0,o=t.length;o>s;s++,n=null)"\r"==t[s]?(n=t.slice(r,s),s+="\n"==t[s+1]?1:0):"\n"==t[s]&&(n=t.slice(r,s)),null!=n&&(Mdjs._matchRefer(n)||i.push(n),r=s+1);return o>r&&(n=t.slice(r),Mdjs._matchRefer(n)||i.push(n)),Mdjs.handlerLines(i)+Mdjs.handlerFoot()}catch(a){Toast.err("Mdjs运行时错误:<br/><strong>"+a+'</strong><br />欢迎来此报告错误:<br />(下面两个链接任意一个均可)<br /><a target="_blank" href="http://git.oschina.net/voyageliu/mdjs/issues">Git@OSC</a><br /><a target="_blank" href="http://git.oschina.net/voyageliu/mdjs/issues">Github</a>')}},handlerLines:function(t,e){for(var i="",n=0,s="",r=0,o=[],a=[],l=-1,h=[],c=[],d=0,u=-2,f="",g=0;g<t.length;g++)if(s=t[g].trim(),n>0){if("```"==s){n=0,i+=this.tag.tCode[1];continue}i+=(1==n?"":"\n")+this._htmlSafer(t[g]),n++}else{r=this._leftSpace(t[g]);var p=this._isAList(s);if(0==p)if(i+=this.handlerListEnd(),0!=s.length){if(4>r){if("```"==s.slice(0,3)){lang=s.slice(3).trim(),i+=this.tag.tCode[0].replace("$lang",lang),n=1;continue}for(var m=0;m<s.length&&"#"==s[m];m++);if(0!=m){for(var v=s.length-1;v>m&&"#"==s[v];v--);var w=s.slice(m,v+1),_=w=this.handlerInline(w,0);c[d]=m,h[d++]=_=_.trim().replace(this.regs.delHTML,""),i+="<h"+m+' id="'+_+'" name="'+_+'">'+w+"</h"+m+">\n";continue}if(">"==s[0]&&s.length>1){var b=[];b.push(s.slice(1));for(var S=g+1;S<t.length&&(f=t[S].trim(),0!=f.length);S++){if(">"==f[0])f=f.slice(1);else if(e)break;b.push(f)}i+=this.tag.tBlock[0]+this.handlerLines(b,!0)+this.tag.tBlock[1],g=S-1;continue}if(this._isHr(s)){i+="<hr />";continue}if("[TOC]"==s){l=i.length;continue}if(0!=(o=this.handlerTbLine(s))&&g<t.length-1&&0!=(a=this.handlerTbFmt(t[g+1].trim(),o.length))){i+=this.tag.tTable[0]+this.tag.tTable[3]+this.genTbTr(o,a,!0)+this.tag.tTable[4],i+=this.tag.tTable[1];for(var m=g+2;m<t.length&&0!=(o=this.handlerTbLine(t[m].trim()));m++)i+=this.tag.tTable[3]+this.genTbTr(o,a,!1)+this.tag.tTable[4];g=m-1,i+=this.tag.tTable[2];continue}}else if(0==g||0==t[g-1].trim().length){i+=this.tag.tCode[0].replace("$lang","");for(var T,k="",y=g,m=g;m<t.length;m++)if(0!=t[m].trim().length){if((T=this._leftSpace(t[m]))<4)break;i+=k+(m==g?"":"\n")+this._genSpace(T-2)+this._htmlSafer(t[m].trim()),k="",y=m}else k+="\n";i+=this.tag.tCode[1],g=y;continue}if(g+1<t.length&&(f=t[g+1].trim(),this._isHr(f))){var L=3;"="==f[0]?L=1:"-"==f[0]&&(L=2);var _=w=this.handlerInline(s,0);c[d]=L,h[d++]=_=_.trim().replace(this.regs.delHTML,""),i+="<h"+L+' id="'+_+'" name="'+_+'">'+w+"</h"+L+">\n",g++}else f=this.handlerInline(s,0).trim(),i+=this._startWith(f,"<img ")&&this._endWith(f,"/>")&&-1==f.indexOf("<img ",1)?f:this.tag.tP[0]+f+this.tag.tP[1]}else u!=g-1&&(i+="<br />\n"),u=g;else i+=this.handlerList(r,p,s)}if(-1!=l){var E=i.slice(0,l);i=i.slice(l),i=E+this.handlerTOC(h,c,d)+i}return i},handlerFoot:function(){if(0==this.rfSup.length)return"";for(var t=this.tag.tFoot,e=t[0],i=0;i<this.rfSup.length;i++){var n=this.refer_get(this.rfSup[i]);e+=t[1].replace(/%s/g,n.url.slice(1))+this.handlerInline(n.content,0)+t[2]}return e+t[3]},handlerTOC:function(t,e,i){for(var n,s=this.tag.tToc[0],r=[],o=0,a=0;i>a;a++)n=this.tag.tToc[2].replace("$href",t[a])+t[a]+this.tag.tToc[3],0==o||e[a]>r[o-1]?(s+=this.tag.tToc[1]+n,r[o++]=e[a]):e[a]==r[o-1]?s+=n:(s+=this.tag.tToc[4],o--,a--);for(;o-- >0;)s+=this.tag.tToc[4];return s+this.tag.tToc[5]},handlerListEnd:function(){for(var t="";-1!=this._iTop();)t+=1==this._iTop2()?this.tag.tList[4]:this.tag.tList[5],this._iPop();return t},handlerList:function(t,e,i){var n=this._iTop(),s=this.tag.tList[0]+this.handlerInline(i,i.indexOf(" "),0)+this.tag.tList[3],r="";if(t>n)return this._iPush(t,e),this.tag.tList[e]+s;if(t==n)return s;for(;n>t;)r+=1==this._iTop2()?this.tag.tList[4]:this.tag.tList[5],this._iPop(),n=this._iTop();return-1==n?(this._iPush(t,e),r+this.tag.tList[e]+s):r+s},genTbTr:function(t,e,i){for(var n="",s=0;s<t.length;s++)n+=this.tag.tTable[i?5:7].replace("$align",this.tag.tTable[9]+this.tbAlign[e[s]])+this.handlerInline(t[s],0)+this.tag.tTable[i?6:8];return n},handlerTbFmt:function(t,e){var i=this.handlerTbLine(t,!0),n=[],s=0,r=0;if(0==i)return!1;for(var o=i.length;o>s;s++,r=0)i[s].length<=1?n[s]=0:(":"==i[s][i[s].length-1]&&(r=":"==i[s][0]?1:2),n[s]=r);for(;e>s;s++)n[s]=0;return n},handlerTbLine:function(t,e){var i=[],n=t.length,s="";void 0==e&&(e=!1);for(var r="|"==t[0]?1:0;n>r;r++){switch(t[r]){case"\\":if(e)return!1;s+="\\","|"==t[r+1]&&(s+="|",r++);continue;case"|":if(s=s.trim(),e&&0==s.length)return!1;i.push(s),s="";continue}if(e&&":"!=t[r]&&"-"!=t[r]&&" "!=t[r]&&"	"!=t[r])return!1;s+=t[r]}return 0==i.length&&"|"!=t[0]?!1:(s=s.trim(),0!=s.length&&i.push(s),i)},handlerInline:function(t,e){for(var i,n,s,r,o,a,l,h,c,d,u=t.length,f=[],g="",p=-1,m=-1,v=-1,w=-1,_=-1,b="*",S="*",T=this.inlineTag,k=e?e:0;u>k;k++)switch(t[k]){case"\\":this._inArray(t[k+1],this._meaning)&&(p=f.length,m=++k),g+=t[k];break;case"`":l="`"==t[k+1]?"``":"`",h=l.length,-1==(i=t.indexOf(l,k+h))?g+=l:(g+=T.tCode[0]+this._htmlSafer(t.slice(k+h,i))+T.tCode[1],k=i),k+=h-1;break;case"~":"~"==t[k+1]?(_>=0?""==g?f[_]+="~~":(f[_]+="<del>",g+="</del>",_=-1):(_=f.push(g)-1,g=""),k++):g+="~";break;case"*":case"_":if(!(" "!=t[k+1]&&"	"!=t[k+1]||" "!=t[k-1]&&"	"!=t[k-1])){g+=t[k];break}if(t[k+1]==t[k]){if(v>=0){if(b!=t[k]){g+=t[k++]+t[k];break}f[v]+=T.tStrong[0],g+=T.tStrong[1],v=-1}else t[k+2]==t[k]&&t[k+3]==t[k]&&(g+=t[k++]+t[k++]),v=f.push(g)-1,g="",b=t[k];k++}else if(w>=0){if(S!=t[k]){g+=t[k];break}f[w]+=T.tEm[0],g+=T.tEm[1],w=-1}else w=f.push(g)-1,g="",S=t[k];break;case">":g+=k>=2&&"--"==t.slice(k-2,k)?"-->":">";break;case"<":if("!--"==t.slice(k+1,k+4)){g+="<!--";break}for(d=1,i=k+1;u>i&&">"!=t[i];i++)" "!=t[i]&&"	"!=t[i]||(d=0);if(i>=u){g+="&lt;";break}if(l=t.slice(k+1,i),d){if(this.regs.url.test(l)){g+=this.tag.tA[1]+l+this.tag.tA[2]+l+this.tag.tA[3],k=i;break}if(this.regs.email.test(l)){g+=this.tag.tA[0]+l+this.tag.tA[2]+l+this.tag.tA[3],k=i;break}}g+="<";break;case"!":"["!=t[k+1]&&(g+="!");break;case"[":n="!"!=t[k-1]||p==f.length&&m==k-1?"^"==t[k+1]?"s":"":"i";for(var y=0,L=k+1,E=0;u>L;L++)switch(t[L]){case"!":if("["!=t[L+1])break;""!=n?L=u:(y=1,L++);break;case"`":l="`"==t[L+1]?"``":"`",h=l.length,-1==(i=t.indexOf(l,L+h))?L+=h-1:L=i+h-1;break;case"[":L=u;break;case"]":if(s=t.slice(k+1,L),"s"==n){c=this.refer_get(s),c&&(g+=T.tSup[0]+c.title+T.tSup[1]+c.url+T.tSup[2]+c.id+T.tSup[3],E=1,k=L,L=u);break}l=t[L+1];var M;if("("==l)M=")";else{if("["!=l&&(" "!=l||"["!=t[L+2])){L=u;break}M="]"}if(h=" "==l?L+3:L+2,-1!=(i=t.indexOf(M,h))){if(y){y=0;break}if(r=t.slice(h,i).trim(),"]"==M){if(0==r.length&&(r=s),c=this.refer_get(r),!c){L=u;break}}else c=this._matchHref(r);o=c.url,a=c.title,g+="i"==n?T.tImg[0]+this._htmlSafer(s)+T.tImg[1]+this._htmlSafer(a)+T.tImg[2]+encodeURI(o)+T.tImg[3]:T.tA[0]+this._htmlSafer(a)+T.tA[1]+encodeURI(o)+T.tA[2]+this.handlerInline(s,0)+T.tA[3],E=1,k=i}L=u}if(!E&&L>=u)switch(n){case"s":g+="[^",k++;break;case"i":g+="![";break;default:g+="["}break;default:g+=t[k]}return f.push(g),-1!=_&&(f[_]+="~~"),-1!=v&&(f[v]+=b+b),-1!=w&&(f[w]+=S),f.join("")}},LIOEvent.prototype.onDone=function(t){console.log("LocalIO读取成功,长度:"+t.length)},LIOEvent.prototype.onError=function(t){console.error(t)},LIOEvent.prototype.onAbort=function(){console.warn("LocalIO读取被中断!")},window.LIOEvent=new LIOEvent,window.lio={},lio.r=new FileReader,lio.r.onload=function(t){LIOEvent.onDone(t.target.result)},lio.r.onerror=function(t){LIOEvent.onError(t.target.error)},lio.r.onabort=function(t){LIOEvent.onAbort()},lio.nlimit=[".md",".markdown"],lio.slimit=5242880,window.H5S={get content(){return this.ct.content},set content(t){this.ct.content=t,this._set()},get title(){return this.ct.title},set title(t){this.ct.title=t,this._set()},get settings(){return localStorage.mdjset_st?this.sCache=JSON.parse(localStorage.mdjset_st):this.sCache={}},set settings(t){localStorage.mdjset_st=JSON.stringify(t)},getValue:function(t){if(void 0==this.sCache){this.settings}return this.sCache[t]},_get:function(){localStorage.mdjset_ct?this.ct=JSON.parse(localStorage.mdjset_ct):this.ct={title:"Untitled.md",content:""}},_set:function(){localStorage.mdjset_ct=JSON.stringify(this.ct)}},H5S._get(),Export.prototype.exportHTML=function(t,e,i){var n="";e||(e=""),i||(i="");for(var s=0,r=this.template.length;r>s;s++)n+=this.template[s].replace("${fname}",e).replace("${csspath}",i).replace("${content}",t)+"\n";return n},window.Exporter=new Export,EdHistory.prototype.into=function(t){this.inn[this.q]?(this.inn[++this.q]=t,this.inn.length=this.q+1):(this.inn[this.q++]=t,this.inn.length=this.q);var e=this.inn.length;if(e>=this.maxSize){for(var i=e-this.maxUndo,n=0;n<this.maxUndo;n++)this.inn[n]=this.inn[n+i];this.inn.length=this.maxUndo}},EdHistory.prototype.undo=function(){return this.q--,this.q<0&&(this.q=0),this.inn[this.q]},EdHistory.prototype.redo=function(){return this.inn[this.q]?this.inn[this.q++]:void 0},$.fn.initHistory=function(t){this.his=new EdHistory(t),this.dom=this[0],this.arDelay=0,this.arLenCmp=0},$.fn.autoRecord=function(t){this.arDelay++;var e=this.val().length;t.ctrlKey||t.altKey||(this.firstUndo=!0),8!=this.lastKC&&8==t.which?this.record():8!=this.lastKC&&13!=this.lastKC||t.which==this.lastKC?this.arDelay>=16&&Math.abs(e-this.arLenCmp)>=16&&(this.arLenCmp=e,this.record()):this.record(),this.lastKC=t.which},$.fn.record=function(){this.his.into([this.val(),this.dom.selectionStart,this.dom.selectionEnd]),this.arDelay=0,this.firstUndo=!0},$.fn.undo=function(){this.firstUndo&&(this.record(),this.his.undo(),this.firstUndo=!1);var t=this.his.undo();t&&(this.val(t[0]),this.dom.selectionStart=t[1],this.dom.selectionEnd=t[2],this.arDelay=0)},$.fn.redo=function(){var t=this.his.redo();t&&(this.val(t[0]),this.dom.selectionStart=t[1],this.dom.selectionEnd=t[2],this.arDelay=0)},filedlg=$("#filedlg"),editorView=$("#editor"),inputView=$("#input"),outputView=$("#output"),filenameView=$("#filename span"),dlg_title=$("#helpset_title span"),dlg_iframe=$("#helpset_dlg iframe"),dlg_bd=$("#helpset_dlg"),window.nowFile=null,window.loadingFile=null,fileStatusChange(H5S.getValue("ebls")?H5S.title:"Untitled.md"),LIOEvent.onDone=onReadMdDone,LIOEvent.onError=onReadMdError,LIOEvent.onAbort=onReadMdAbort,window.shortcutMap=[],initMenuButton(),$(window).on("resize",resizeEditor),$(function(){initShortcut(),resizeEditor(),setTimeout(resizeEditor,500),inputView.initHistory(128),inputView.val(H5S.getValue("ebls")?H5S.content:""),inputView.record(),outputView.html(Mdjs.md2html(inputView.val()))}),inputView.keydown(function(t){var e=this.selectionStart,i=this.selectionEnd;this.mustRecord?(this.mustRecord=!1,inputView.record()):inputView.autoRecord(t);var n,s,r,o;if(9==t.which||13==t.which||cEvent(t,1,0,0))var n=this.value,s=n.slice(0,e),r=n.slice(e,i),o=n.slice(i);if(9==t.which){if(cEvent(t,0,0,0)){if(e==i)this.value=s+"	"+o,this.selectionStart=this.selectionEnd=i+1;else{var a=s.lastIndexOf("\n");s=-1==a?"	"+s:s.slice(0,a+1)+"	"+s.slice(a+1),a=r.length,r=r.replace(/\n/g,"\n	"),this.value=s+r+o,this.selectionStart=this.selectionEnd=i+r.length-a+1}preview(),t.preventDefault()}if(cEvent(t,0,1,0)){var l=0,a=s.lastIndexOf("\n");"	"==s[a+1]&&(s=s.slice(0,a+1)+s.slice(a+2),l=1),a=r.length,r=r.replace(/\n\t/g,"\n"),this.value=s+r+o,this.selectionStart=this.selectionEnd=i+a-r.length-l,preview(),t.preventDefault()}return void(this.mustRecord=!0)}if(13==t.which){var a=s.lastIndexOf("\n"),h="";for(a++;a<s.length;a++){if("\n"==s[a]){h="";break}if(" "!=s[a]&&"	"!=s[a])break;h+=s[a]}return a==s.length&&(h=""),this.value=s+"\n"+h+o,this.selectionStart=this.selectionEnd=i-r.length+h.length+1,preview(),void t.preventDefault()}if(cEvent(t,1,0,0)){switch(t.which){case 66:var c=s.length;if(("*"==s[c-1]||"_"==s[c-1])&&s[c-2]==s[c-1]&&o[0]==s[c-1]&&o[0]==o[1]){this.value=s.slice(0,-2)+r+o.slice(2),this.selectionStart=e-2,this.selectionEnd=i-2;break}this.value=s+"**"+r+"**"+o,this.selectionStart=e+2,this.selectionEnd=i+2,this.mustRecord=!0;break;case 73:var c=s.length;if(("*"==s[c-1]||"_"==s[c-1])&&o[0]==s[c-1]){this.value=s.slice(0,-1)+r+o.slice(1),this.selectionStart=e-1,this.selectionEnd=i-1;break}this.value=s+"*"+r+"*"+o,this.selectionStart=e+1,this.selectionEnd=i+1,this.mustRecord=!0;break;case 72:var a=s.lastIndexOf("\n"),d="#"==s[a+1]?"#":"# ";s=s.slice(0,a+1)+d+s.slice(a+1),this.value=s+r+o,this.selectionStart=this.selectionEnd=i+d.length,this.mustRecord=!0;break;case 86:return void(this.mustRecord=!0);case 90:inputView.undo();break;case 89:inputView.redo();break;default:return}preview(),t.preventDefault()}}).bind("input",preview).scroll(function(){var t=inputView[0].scrollHeight-inputView.height(),e=outputView[0].scrollHeight-outputView.height(),i=this.scrollTop;outputView[0].scrollTop=i/t*e});