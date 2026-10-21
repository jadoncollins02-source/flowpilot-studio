const chat = document.querySelector('#chat');
const actions = document.querySelector('#quick-actions');
const form = document.querySelector('#reply-form');
const input = document.querySelector('#reply-input');
const send = document.querySelector('#send');
let stage = 'menu';
let selectedService = '';
let details = {};
const services = [
  ['Telegram bot','Custom commands, enquiry capture, alerts and integrations.'],
  ['AI chatbot','FAQ assistants, customer support flows and lead qualification.'],
  ['Website or landing page','Responsive pages for a product, service or business.'],
  ['Automation / API','Connect tools, automate repetitive work or integrate APIs.'],
  ['Custom software','A small web app, script, dashboard or tailored tool.']
];
function bubble(text, who='bot') { const el=document.createElement('div'); el.className=`bubble ${who}`; el.textContent=text; if(who==='user'){const time=document.createElement('small');time.textContent='demo';el.appendChild(time)} chat.appendChild(el); chat.scrollTop=chat.scrollHeight; }
function setButtons(items) { actions.innerHTML=''; items.forEach(item=>{const b=document.createElement('button');b.type='button';b.textContent=item.label;b.addEventListener('click',()=>item.run());actions.appendChild(b)}); }
function askText(placeholder) { input.disabled=false;send.disabled=false;input.placeholder=placeholder;input.value='';input.focus(); }
function stopText(placeholder='Choose an option above…') {input.disabled=true;send.disabled=true;input.value='';input.placeholder=placeholder;}
function start() {chat.innerHTML='<div class="date-pill">TODAY · DEMO</div>';stage='menu';selectedService='';details={};stopText();bubble('Hi there! 👋 Welcome to FlowPilot Studio. I can help you explore a service or prepare a sample project enquiry. What would you like to build?');setButtons([{label:'Explore services',run:showServices},{label:'How it works',run:howItWorks},{label:'Contact the team',run:contact}]);}
function showServices(){bubble('Explore services','user');bubble('Pick the service closest to your idea. If it is not listed, choose Custom software and tell us what you need.');stage='service';setButtons(services.map(([name])=>({label:name,run:()=>chooseService(name)})).concat([{label:'↻ Start over',run:start}]));}
function chooseService(name){selectedService=name;bubble(name,'user');const found=services.find(s=>s[0]===name);bubble(`${found?found[1]:'We can review your idea and suggest a suitable approach.'}\n\nWant to create a sample enquiry?`);stage='confirm';setButtons([{label:'Start project enquiry',run:beginEnquiry},{label:'Choose another service',run:showServices},{label:'Back to menu',run:start}]);}
function beginEnquiry(){bubble('Start project enquiry','user');stage='name';bubble('Great. First, what name should we put on the sample enquiry?');setButtons([]);askText('Enter a name (demo only)…');}
function acceptText(value){const v=value.trim();if(!v)return;bubble(v,'user');if(stage==='name'){details.name=v;stage='email';bubble('Thanks! What email should the team reply to? Use a fictional address for this demo.');askText('name@example.com');}else if(stage==='email'){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){bubble('That email format does not look right. Please try something like alex@example.com.');askText('name@example.com');return;}details.email=v;stage='brief';bubble('Last question: briefly describe what you want the bot or service to do.');askText('Describe your project…');}else if(stage==='brief'){details.brief=v;stopText('Enquiry preview ready');bubble(`Here is your sample enquiry:\n\nService: ${selectedService}\nName: ${details.name}\nEmail: ${details.email}\nProject: ${details.brief}\n\nThis is only a local demo. Nothing has been sent or saved. In the real bot, this information can be sent to the business team after the customer consents.`);stage='done';setButtons([{label:'Prepare email draft',run:prepareEmail},{label:'Try another enquiry',run:start},{label:'Explore more services',run:showServices}]);}}
function prepareEmail(){const subject=encodeURIComponent(`FlowPilot Studio demo enquiry — ${selectedService}`);const body=encodeURIComponent(`SAMPLE DEMO ENQUIRY — please verify before treating as a real lead\n\nService: ${selectedService}\nName: ${details.name}\nEmail: ${details.email}\nProject: ${details.brief}\n\nThis draft was prepared from the browser demo.`);bubble('Prepare email draft','user');bubble('Your email app may open with a draft. Review it before sending. This demo will not transmit the details automatically.');window.location.href=`mailto:flowpilotstudio0@gmail.com?subject=${subject}&body=${body}`;setButtons([{label:'Restart demo',run:start}]);}
function howItWorks(){bubble('How it works','user');bubble('1. Choose a service\n2. Answer a few short questions\n3. Review the enquiry summary\n4. In a live deployment, the bot can forward a consented enquiry to the team.\n\nThis preview runs in your browser only.');setButtons([{label:'Explore services',run:showServices},{label:'Back to menu',run:start}]);}
function contact(){bubble('Contact the team','user');bubble('Email: flowpilotstudio0@gmail.com\n\nThis demo does not send chat messages to the team.');setButtons([{label:'Explore services',run:showServices},{label:'Back to menu',run:start}]);}
form.addEventListener('submit',e=>{e.preventDefault();acceptText(input.value);});document.querySelector('#reset').addEventListener('click',start);document.querySelector('#year').textContent=new Date().getFullYear();start();
