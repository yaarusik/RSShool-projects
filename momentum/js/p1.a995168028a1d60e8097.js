(()=>{var e={428:()=>{const e=document.querySelectorAll(".hidden__weather"),t=document.querySelector(".player"),o=document.querySelector(".weather"),n=document.querySelector(".greeting-container"),i=document.querySelector(".quotes"),s=document.querySelector(".change-quote"),a=document.querySelector(".date"),l=document.querySelector(".time"),r=document.querySelector(".todo");let c=[];function d(){this.classList.toggle("hidden"),c.includes(this.id)?c=c.filter((e=>e!=this.id)):c.push(this.id),function(e){localStorage.setItem("hide",JSON.stringify(e))}(c),this.classList.contains("hidden")?"weather"==this.id?o.classList.add("hid"):"time"==this.id?l.classList.add("hid"):"date"==this.id?a.classList.add("hid"):"audio"==this.id?t.classList.add("hid"):"quotes"==this.id?(i.classList.add("hid"),s.classList.add("hid")):"greeting"==this.id?n.classList.add("hid"):"todo"==this.id&&r.classList.add("hid"):"weather"==this.id?o.classList.remove("hid"):"time"==this.id?l.classList.remove("hid"):"date"==this.id?a.classList.remove("hid"):"audio"==this.id?t.classList.remove("hid"):"quotes"==this.id?(i.classList.remove("hid"),s.classList.remove("hid")):"greeting"==this.id?n.classList.remove("hid"):"todo"==this.id&&r.classList.remove("hid")}e.forEach((e=>{e.addEventListener("click",d)})),window.addEventListener("load",(()=>{localStorage.getItem("hide")&&(c=JSON.parse(localStorage.getItem("hide")),function(){for(let t=0;t<e.length;t++)for(let o=0;o<c.length;o++)e[t].id==c[o]&&e[t].classList.add("hidden")}(),e.forEach((e=>{e.classList.contains("hidden")&&("weather"==e.id?o.classList.add("hid"):"time"==e.id?l.classList.add("hid"):"date"==e.id?a.classList.add("hid"):"audio"==e.id?t.classList.add("hid"):"quotes"==e.id?(i.classList.add("hid"),s.classList.add("hid")):"greeting"==e.id?n.classList.add("hid"):"todo"==e.id&&r.classList.add("hid"))})))}))},660:()=>{const e=document.querySelector(".settings"),t=document.querySelector(".popup__close"),o=document.querySelector(".popup");e.addEventListener("click",(function(){o.classList.toggle("open")})),t.addEventListener("click",(function(){o.classList.remove("open")})),document.addEventListener("click",(t=>{o.contains(t.target)||e.contains(t.target)||o.classList.remove("open")}))},469:()=>{const e=document.querySelector(".inputField input"),t=document.querySelector(".inputField button"),o=document.querySelector(".todo__list"),n=document.querySelector(".pending__numb"),i=document.querySelector(".todo__footer button");function s(){let t=localStorage.getItem("Todo");listArr=t?JSON.parse(t):[],n.textContent=listArr.length,listArr.length>0?i.classList.add("active"):i.classList.remove("active");let a="";listArr.forEach(((e,t)=>{a+=`<li>${e} <span class="todo__delete"><i class="fa fa-trash"></i></span></li>`})),o.innerHTML=a,document.querySelectorAll(".todo__delete").forEach(((e,t)=>{e.addEventListener("click",(function(){!function(e){let t=localStorage.getItem("Todo");listArr=JSON.parse(t),listArr.splice(e,1),localStorage.setItem("Todo",JSON.stringify(listArr)),s()}(t)}))})),e.value=""}e.onkeyup=()=>{0!=e.value.trim()?t.classList.add("active"):t.classList.remove("active")},s(),t.onclick=()=>{let t=e.value,o=localStorage.getItem("Todo");listArr=o?JSON.parse(o):[],listArr.push(t),localStorage.setItem("Todo",JSON.stringify(listArr)),s()},i.addEventListener("click",(function(){listArr=[],localStorage.setItem("Todo",JSON.stringify(listArr)),s()}))}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,o),s.exports}(()=>{"use strict";let e=localStorage.getItem("lang")||"en";const t=document.querySelector(".time"),n=document.querySelector(".date"),i=document.querySelector(".greeting"),s=document.querySelector(".name");let a,l=["Good night","Good morning","Good afternoon","Good evening","[Enter name]"],r=["Доброй ночи","Доброе утро","Добрый день","Добрый вечер","[Введите имя]"],c=["Дабранач","Добрай раніцы","Добры дзень","Добры вечар","[Увядзіце імя]"],d=["en-US","ru-RU","be-Be"],u=new Date,m=["Студзень","Люты","Сакавiк","Красавiк","Май","Червень","Лiпень","Жнiвень","Верасень","Кастрычнiк","Лiстапад","Снежань"][u.getMonth()],h=u.getDate(),g=`${["","панядзелак","аўторак","серада","чацвер","пятніца","субота","нядзеля"][u.getDay()+1]}, ${h} ${m}`;const p=(t,o)=>{let n;return e=o,n="ru"==o?r:"en"==o?l:c,s.placeholder=n[4],0==t?n[0]:1==t?n[1]:2==t?n[2]:n[3]};window.addEventListener("beforeunload",(()=>{localStorage.setItem("name",s.value)})),window.addEventListener("load",(()=>{localStorage.getItem("name")&&(s.value=localStorage.getItem("name"))}));const y=()=>{const o=(new Date).toLocaleTimeString();t.textContent=o,((e="en")=>{if("en"==e)e=d[0],n.classList.remove("date-first");else{if("ru"!=e)return n.classList.add("date-first"),void(n.textContent=g);e=d[1],n.classList.add("date-first")}const t=(new Date).toLocaleDateString(e,{weekday:"long",day:"numeric",month:"long"});n.textContent=t})(e),(e=>{const t=(new Date).getHours();a=Math.floor(+t/6),i.textContent=p(a,e)})(e),setTimeout(y,400)};y();const f=document.querySelector("#tags"),S=e=>0==e?"night":1==e?"morning":2==e?"afternoon":"evening";let v=document.querySelector("body"),L=document.querySelector(".slide-next"),q=document.querySelector(".slide-prev");const _=document.querySelectorAll("input[name='foto']");let w=localStorage.getItem("url"),E=localStorage.getItem("sourse")||"git",k=Math.ceil(20*Math.random());function x(e,t,o="git",n){let i,s=String(t).padStart(2,"0");"git"==o?(i=`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${e}/${s}.jpg`,localStorage.setItem("url",i)):("unspl"==o||"flick"==o)&&(i=n,localStorage.setItem("url",i));const a=new Image;a.src=`${i}`,a.addEventListener("load",(()=>{v.style.backgroundImage=`url('${i}')`})),setTimeout((function(){L.disabled=!1,q.disabled=!1}),1e3)}async function C(e,t){const o=`https://api.unsplash.com/photos/random?orientation=landscape&query=${t}&client_id=gy1iVo2gyQUJrsG5heWiEn9fXVIvJjqUbG0Lc6Ed43Y`,n=await fetch(o),i=await n.json();try{w=i.urls.regular,x(t,k,E,w),f.placeholder=""}catch{f.value="",f.placeholder="такого тега нет"}}async function b(e,t){let o;o="night"==t?"72157720116678540":"morning"==t?"72157720063575314":"afternoon"==t?"72157720063552049":"72157720116708460";const n=`https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=e1c205a032712c88d65cd8f5b63fb482&gallery_id=${o}&extras=url_h&format=json&nojsoncallback=1`,i=await fetch(n),s=await i.json();w=s.photos.photo[k].url_h,x(t,k,E,w)}L.addEventListener("click",(function(){L.disabled||function(e,t){L.disabled=!0,k++,k>20&&(k=1),"unspl"!=e?"flick"!=e?x(t,k,E,w):b(0,t):C(0,t)}(E,S(a))})),q.addEventListener("click",(function(){q.disabled||function(e,t){q.disabled=!0,k--,k<1&&(k=20),"unspl"!=e?"flick"!=e?x(S(a),k,E,w):b(0,t):C(0,t)}(E,S(a))})),x(S(a),k,E,w),_.forEach((e=>{e.addEventListener("change",(function(){"git"==this.id?(E=this.id,localStorage.setItem("sourse",this.id),x(S(a),k,E)):"unspl"==this.id?(E=this.id,localStorage.setItem("sourse",this.id),C(0,S(a))):"flick"==this.id&&(E=this.id,localStorage.setItem("sourse",this.id),b(0,S(a)))}))}));let I=localStorage.sourse;I&&(document.getElementById(I).checked=!0),_.forEach((e=>{e.addEventListener("click",(function(){localStorage.sourse=this.id}))})),f.addEventListener("change",(function(){"unspl"==E?C(0,this.value):"flick"==E&&async function(e){const t=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e1c205a032712c88d65cd8f5b63fb482&tags=${e}&extras=url_h&format=json&nojsoncallback=1`,o=await fetch(t),n=await o.json();try{w=n.photos.photo[k].url_h,f.placeholder=""}catch{f.value="",f.placeholder="такого тега нет"}x(S(a),k,E,w)}(this.value)})),console.log("Flickr API ИНОГДА ДОЛГО ПОДГРУЖАЕТСЯ\n самооценка в pull request по ссылке по никнейму yaarusik в footer приложения(160/160)");const $=document.querySelector(".quote"),T=document.querySelector(".author"),A=document.querySelector(".change-quote");let M,j=localStorage.getItem("lang")||"en",N=()=>Math.ceil(24*Math.random());async function G(e,t){let o;j=t,o="ru"==t?"./json/quoteRu.json":"en"==t?"./json/quoteEn.json":"./json/quoteBe.json";const n=o,i=await fetch(n),s=await i.json();$.textContent=s[e].text,T.textContent=s[e].author}M=N(),G(M,j),A.addEventListener("click",(function(){M=N(),G(M,j)}));const J=document.querySelectorAll('input[name="language"]'),O=document.querySelectorAll(".weather__title"),B=document.querySelector(".foto__title"),D=document.querySelector(".popup__title"),W=document.querySelector(".blocks__title"),H=document.querySelector(".language__title"),R=document.querySelector(".foto__tags p"),F=document.querySelector(".todo__header"),U=document.querySelector(".inputField input"),Y=document.querySelector(".todo__footer button"),P=document.querySelector(".todo__footer span").childNodes;let Q=localStorage.getItem("lang")||"en";J.forEach((e=>{e.addEventListener("change",(function(){("ru"==this.id||"en"==this.id||"be"==this.id)&&function(e,t){let o=localStorage.getItem("weather");(e=>{localStorage.setItem("lang",e)})(t),p(e,t),de(o,t),G(5,t),Z(t)}(a,this.id)}))})),J.forEach((e=>{e.addEventListener("click",(function(){localStorage.lang=this.id}))}));let V=localStorage.lang;V&&(document.getElementById(V).checked=!0);let X=["Settings","Select the photo upload source","Show / Hide next blocks:","Weather","Time","Date","Audio","Quotes","Greeting","Select the application language:","TodoList","Tags for foto:","Add your new todo","Clear all","You have "," pending tasks"],z=["Настройки","Выберите источник загрузки фотографий","Показывать/Скрывать следующие блоки:","Погода","Время","Дата","Аудио","Цитаты","Приветствие","Выберите язык приложения:","Cписок дел","Теги для фото","Добавить новое задание","Очистить","У вас "," незавершенных задач"],K=["Наладжваньне","Выберыце крыніца загрузкі фатаграфій","Паказваць / хаваць наступныя блокі:","Надвор'е","Час","Дата","Аўдыё","Цытата","Прывітанне","Абярыце мову прыкладання:","Спіс спраў","Тэгі фота","Дадаць новае заданне","Ачысціць","У вас "," незавершаных задач"];function Z(e){let t;t="ru"==e?z:"en"==e?X:K,O[0].textContent=t[3],O[1].textContent=t[4],O[2].textContent=t[5],O[3].textContent=t[6],O[4].textContent=t[7],O[5].textContent=t[8],O[6].textContent=t[10],B.textContent=t[1],H.textContent=t[9],D.textContent=t[0],W.textContent=t[2],R.textContent=t[11],F.textContent=t[10],U.placeholder=t[12],Y.textContent=t[13],P[0].textContent=t[14],P[2].textContent=t[15]}Z(Q);const ee=document.querySelector(".weather-icon"),te=document.querySelector(".temperature"),oe=document.querySelector(".weather-description"),ne=document.querySelector(".wind"),ie=document.querySelector(".humidity"),se=document.querySelector(".city");let ae=localStorage.getItem("lang")||"en",le=["Wind speed","Humidity","m/s","Error! city not found for"],re=["Скорость ветра","Влажность","м/с","Ошибка! не найден город для "],ce=["Хуткасць ветру","Вільготнасць","м/с","Памылка! горад не знойдзены для"];async function de(e,t){let o;const n=`https://api.openweathermap.org/data/2.5/weather?q=${e}&lang=${t}&appid=e4d036bace916ea652d4d795631e466b&units=metric`,i=await fetch(n),s=await i.json();"ru"==t?(o=re,"Minsk"==se.value&&(se.value="Минск")):"en"==t?("Минск"==se.value&&(se.value="Minsk"),o=le):("Minsk"==se.value&&(se.value="Минск"),o=ce),"404"!=s.cod&&e.length?(ee.className="weather-icon owf",ee.classList.add(`owf-${s.weather[0].id}`),te.textContent=`${Math.trunc(+s.main.temp)}°C`,oe.textContent=s.weather[0].description,ne.textContent=`${o[0]}: ${Math.trunc(+s.wind.speed)}${o[2]}`,ie.textContent=`${o[1]}: ${s.main.humidity}%`):(te.textContent=`${o[3]} "${e}"!`,oe.textContent="",ne.textContent="",ie.textContent="")}se.addEventListener("change",(function(e){de(this.value,ae)})),window.addEventListener("beforeunload",(function(){localStorage.setItem("weather",se.value)})),window.addEventListener("load",void(localStorage.getItem("weather")?(se.value=localStorage.getItem("weather"),de(se.value,ae)):de(se.value,ae)));const ue=[{title:"Talking To The Moon",src:"./images/assets/sounds/BrunoMars_Talking_To_The_Moon.mp3",duration:"0:39"},{title:"Get Lucky",src:"./images/assets/sounds/HotGirlBum_Get_Lucky.mp3",duration:"0:37"},{title:"In The End",src:"./images/assets/sounds/MellenGiRemix_In_The_End.mp3",duration:"0:45"},{title:"Such a Whore",src:"./images/assets/sounds/StellularRemix_Such_a_Whore.mp3",duration:"0:32"},{title:"Call Me By Your Name",src:"./images/assets/sounds/MONTERO_Call_Me_By_Your_Name.mp3",duration:"0:32"}],me=document.querySelector(".play"),he=document.querySelector(".play-prev"),ge=document.querySelector(".play-next"),pe=document.querySelector(".play-list"),ye=pe.children,fe=document.querySelector(".progress-container"),Se=document.querySelector(".progress-bar"),ve=document.querySelector(".progress-duration"),Le=document.querySelector(".player-icon__volume"),qe=document.querySelector(".range"),_e=document.querySelector(".progress-title");let we=!1,Ee=0;const ke=new Audio;let xe;ke.src=ue[Ee].src,_e.textContent=ue[Ee].title,ke.volume=+qe.value/100,ve.textContent=`0:00 / ${ue[Ee].duration}`;const Ce=()=>{ke.src=ue[Ee].src,_e.textContent=ue[Ee].title,ke.currentTime=0,we?(ke.pause(),we=!1,me.classList.remove("pause"),Te[Ee].className="play-item"):(ke.play(),we=!0,me.classList.add("pause"),Ie(),Te[Ee].className="play-item change-item playlist-indicator")},be=()=>{Ae(),xe=Ee,Ee++,Ee>4&&(Ee=0),Ie(),we=!1,Ce()},Ie=()=>{ye[Ee].classList.add("playlist-indicator"),ye[xe]&&ye[xe].classList.remove("playlist-indicator")};function $e(e){e.style.background=`linear-gradient(to right, #c5b358 0%, #c5b358 ${e.value}%, #e4e9eb ${e.value}%, #e4e9eb 100%)`}me.addEventListener("click",Ce),he.addEventListener("click",(()=>{Ae(),xe=Ee,Ee--,Ee<0&&(Ee=4),Ie(),we=!1,Ce()})),ge.addEventListener("click",be),ue.forEach(((e,t)=>{const o=document.createElement("li");o.classList.add("play-item"),o.textContent=ue[t].title,pe.append(o)})),ke.addEventListener("ended",(function(){be(),Ae()})),ke.addEventListener("timeupdate",(e=>{const{duration:t,currentTime:o}=e.srcElement,n=o/t*100;Se.style.width=`${n}%`,ve.textContent=function(e){let t=Math.floor(e/60),o=Math.floor(e%60);return o<10&&(o="0"+o),`${t}:${o} / ${ue[Ee].duration}`}(o)})),fe.addEventListener("click",(function(e){const t=this.offsetWidth,o=e.offsetX,n=ke.duration;ke.currentTime=o/t*n})),Le.addEventListener("click",(function(){ke.muted=!ke.muted,ke.muted?Le.classList.add("mute"):Le.classList.remove("mute"),ke.muted?(Le.setAttribute("data-volume",qe.value),Le.classList.add("mute"),qe.value=0,$e(qe)):(qe.value=Le.dataset.volume,Le.classList.remove("mute"),$e(qe))})),qe.oninput=function(e){let t=this.value;return 0==t?(ke.muted=!0,Le.classList.add("mute")):(ke.volume=t/100,Le.classList.remove("mute"),ke.muted=!1),t},qe.addEventListener("input",(function(){const e=this.value;this.style.background=`linear-gradient(to right, #c5b358 0%, #c5b358 ${e}%, #e4e9eb ${e}%, #e4e9eb 100%)`}));const Te=document.querySelectorAll(".play-item");function Ae(e){Te.forEach((e=>{e.classList.contains("playlist-indicator")&&(e.classList.remove("playlist-indicator"),e.className="play-item")}))}Te.forEach(((e,t)=>{e.addEventListener("click",(function(){Ee=t,Ae(),Ce()}))})),o(469),o(660),o(428)})()})();