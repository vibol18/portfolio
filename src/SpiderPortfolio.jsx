import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════════════════ */
const G = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{cursor:none!important;background:#04080f;overflow-x:hidden;font-family:'Rajdhani',sans-serif;}
    a,button,[data-c]{cursor:none!important;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:#04080f;}
    ::-webkit-scrollbar-thumb{background:linear-gradient(#c0121a,#f5c842);border-radius:2px;}

    :root{
      --r:#c0121a;--r2:#e01b24;
      --y:#f5c842;
      --b:#0d1b4b;--b2:#1a2d6e;
      --dk:#04080f;
      --wh:#f0f0f0;
    }

    .fb{font-family:'Bangers',cursive!important;}
    .fbn{font-family:'Bebas Neue',cursive!important;}
    .fr{font-family:'Rajdhani',sans-serif!important;}
    .fj{font-family:'JetBrains Mono',monospace!important;}

    /* ── cursor ── */
    #cd{position:fixed;width:14px;height:14px;border-radius:50%;background:var(--r2);pointer-events:none;z-index:99999;transform:translate(-50%,-50%);box-shadow:0 0 10px var(--r2),0 0 24px rgba(224,27,36,.3);transition:width .12s,height .12s,background .12s;}
    #cr{position:fixed;width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(245,200,66,.6);pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:width .15s,height .15s;}
    #cw{position:fixed;width:50px;height:50px;pointer-events:none;z-index:99997;transform:translate(-50%,-50%);opacity:0;transition:opacity .2s;}
    #cd.hov{width:28px;height:28px;background:var(--y);box-shadow:0 0 20px var(--y);}
    #cr.hov{width:52px;height:52px;border-color:rgba(245,200,66,.35);}
    #cw.hov{opacity:.5;}

    /* ── web bg pattern ── */
    .wp{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='6' stroke='rgba(255,255,255,.5)' stroke-width='.3' fill='none'/%3E%3Ccircle cx='50' cy='50' r='18' stroke='rgba(255,255,255,.4)' stroke-width='.3' fill='none'/%3E%3Ccircle cx='50' cy='50' r='32' stroke='rgba(255,255,255,.3)' stroke-width='.28' fill='none'/%3E%3Ccircle cx='50' cy='50' r='46' stroke='rgba(255,255,255,.2)' stroke-width='.25' fill='none'/%3E%3Cline x1='50' y1='4' x2='50' y2='96' stroke='rgba(255,255,255,.3)' stroke-width='.25'/%3E%3Cline x1='4' y1='50' x2='96' y2='50' stroke='rgba(255,255,255,.3)' stroke-width='.25'/%3E%3Cline x1='15' y1='15' x2='85' y2='85' stroke='rgba(255,255,255,.2)' stroke-width='.2'/%3E%3Cline x1='85' y1='15' x2='15' y2='85' stroke='rgba(255,255,255,.2)' stroke-width='.2'/%3E%3C/svg%3E");background-size:100px 100px;}

    /* ══ KEYFRAMES ══ */
    @keyframes slam   {from{transform:scale(.3) translateY(-90px) rotate(-6deg);opacity:0}to{transform:scale(1) translateY(0) rotate(0);opacity:1}}
    @keyframes fadeUp {from{transform:translateY(50px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes fadeIn {from{opacity:0}to{opacity:1}}
    @keyframes float  {0%,100%{transform:translateY(0) rotate(-1.2deg)}50%{transform:translateY(-18px) rotate(1.5deg)}}
    @keyframes swing  {0%,100%{transform:rotate(-26deg)}50%{transform:rotate(26deg)}}
    @keyframes pulseR {0%,100%{box-shadow:0 0 0 0 rgba(192,18,26,.55)}60%{box-shadow:0 0 0 18px rgba(192,18,26,0)}}
    @keyframes barFill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes navDrop{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes mobIn  {from{opacity:0;transform:translateY(-14px)}to{opacity:1;transform:translateY(0)}}
    @keyframes webDrop{0%{opacity:.55;top:-70px}100%{opacity:0;top:110vh}}
    @keyframes glR    {0%,91%,100%{clip-path:inset(100% 0 0 0)}92%{clip-path:inset(0 0 78% 0);transform:translateX(-5px)}95%{clip-path:inset(48% 0 32% 0);transform:translateX(4px)}}
    @keyframes glB    {0%,93%,100%{clip-path:inset(100% 0 0 0)}94%{clip-path:inset(18% 0 62% 0);transform:translateX(5px)}97%{clip-path:inset(74% 0 4% 0);transform:translateX(-3px)}}
    @keyframes scanP  {0%,100%{opacity:.03}50%{opacity:.07}}
    @keyframes winBlk {0%,100%{opacity:1}50%{opacity:.1}}
    @keyframes webSht {0%{stroke-dashoffset:400;opacity:1}100%{stroke-dashoffset:0;opacity:.25}}
    @keyframes thrPulse{0%,100%{opacity:.85}50%{opacity:1}}
    @keyframes ancPop {0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.45)}}
    @keyframes cardGlow{0%,100%{box-shadow:0 8px 30px rgba(0,0,0,.5)}50%{box-shadow:0 0 28px 5px rgba(192,18,26,.3),0 18px 50px rgba(0,0,0,.7)}}

    /* spider crawl */
    @keyframes lL1{0%,100%{transform:rotate(-26deg)}50%{transform:rotate(-58deg)}}
    @keyframes lL2{0%,100%{transform:rotate(-6deg)} 50%{transform:rotate(-38deg)}}
    @keyframes lL3{0%,100%{transform:rotate(14deg)} 50%{transform:rotate(-16deg)}}
    @keyframes lL4{0%,100%{transform:rotate(34deg)} 50%{transform:rotate(11deg)}}
    @keyframes lR1{0%,100%{transform:rotate(26deg)} 50%{transform:rotate(58deg)}}
    @keyframes lR2{0%,100%{transform:rotate(6deg)}  50%{transform:rotate(38deg)}}
    @keyframes lR3{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(16deg)}}
    @keyframes lR4{0%,100%{transform:rotate(-34deg)}50%{transform:rotate(-11deg)}}
    @keyframes bB  {0%,100%{transform:scaleY(1) scaleX(1)}50%{transform:scaleY(.92) scaleX(1.06)}}

    /* ── Spider-Man hero character ── */
    @keyframes spFloat {0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-22px) rotate(2deg)}}
    @keyframes spArmR  {0%,100%{transform:rotate(-18deg)}50%{transform:rotate(-62deg)}}
    @keyframes spArmL  {0%,100%{transform:rotate(14deg)} 50%{transform:rotate(48deg)}}
    @keyframes spLegR  {0%,100%{transform:rotate(-8deg)} 50%{transform:rotate(22deg)}}
    @keyframes spLegL  {0%,100%{transform:rotate(7deg)}  50%{transform:rotate(-24deg)}}
    @keyframes spWebL  {0%{stroke-dashoffset:110;opacity:0}18%{opacity:1}100%{stroke-dashoffset:0;opacity:.7}}
    @keyframes bubblePop{0%{transform:scale(0) rotate(-5deg);opacity:0}70%{transform:scale(1.08) rotate(1deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
    @keyframes bubbleWave{0%,100%{transform:scale(1) rotate(0deg)}25%{transform:scale(1.04) rotate(-.8deg)}75%{transform:scale(.97) rotate(.6deg)}}
    @keyframes typingDot{0%,80%,100%{opacity:0}40%{opacity:1}}
    @keyframes heroEntrance{from{transform:translateX(120px) rotate(8deg);opacity:0}to{transform:translateX(0) rotate(0);opacity:1}}
    @keyframes weblineGrow{from{stroke-dashoffset:300}to{stroke-dashoffset:0}}

    .sp-body{animation:spFloat 4.5s ease-in-out infinite;transform-origin:130px 200px;}
    .sp-arm-r{animation:spArmR 1.4s ease-in-out infinite;transform-origin:158px 170px;}
    .sp-arm-l{animation:spArmL 1.4s ease-in-out infinite .22s;transform-origin:102px 170px;}
    .sp-leg-r{animation:spLegR 1.4s ease-in-out infinite .12s;transform-origin:148px 310px;}
    .sp-leg-l{animation:spLegL 1.4s ease-in-out infinite .34s;transform-origin:112px 310px;}
    .sp-web  {animation:spWebL 2.4s ease-out infinite .8s;stroke-dasharray:110;stroke-dashoffset:110;}
    .hero-spman{animation:heroEntrance .9s cubic-bezier(.2,.9,.4,1.1) .3s both;}
    .bubble{animation:bubblePop .7s cubic-bezier(.2,.9,.4,1.15) 1.2s both;}
    .bubble-idle{animation:bubbleWave 3.5s ease-in-out infinite 2s;}
    .dot1{animation:typingDot 1.4s ease-in-out infinite .0s;}
    .dot2{animation:typingDot 1.4s ease-in-out infinite .2s;}
    .dot3{animation:typingDot 1.4s ease-in-out infinite .4s;}
    .hero-webline{stroke-dasharray:300;animation:weblineGrow 1.2s ease-out .4s both;}

    /* ── utility ── */
    .a-slam{animation:slam .65s cubic-bezier(.2,.9,.4,1.3) both;}
    .a-up  {animation:fadeUp .75s ease-out both;}
    .a-in  {animation:fadeIn .7s ease both;}
    .a-float{animation:float 3.8s ease-in-out infinite;}
    .a-swing{animation:swing 4s ease-in-out infinite;transform-origin:top center;}
    .a-nav {animation:navDrop .5s cubic-bezier(.4,0,.2,1) both;}
    .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.3s}
    .d4{animation-delay:.4s}.d5{animation-delay:.5s}.d6{animation-delay:.6s}
    .d7{animation-delay:.7s}.d8{animation-delay:.8s}

    /* ── glitch ── */
    .glitch{position:relative;isolation:isolate;}
    .glitch::before{content:attr(data-g);position:absolute;inset:0;color:var(--y);animation:glR 6s infinite;font-family:inherit;font-size:inherit;pointer-events:none;}
    .glitch::after {content:attr(data-g);position:absolute;inset:0;color:#243a8c;animation:glB 6s infinite;font-family:inherit;font-size:inherit;pointer-events:none;}

    /* ── reveal ── */
    .rv {opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease;}
    .rv.on{opacity:1;transform:translateY(0);}
    .rl {opacity:0;transform:translateX(-44px);transition:opacity .65s ease,transform .65s ease;}
    .rl.on{opacity:1;transform:translateX(0);}
    .rr {opacity:0;transform:translateX(44px);transition:opacity .65s ease,transform .65s ease;}
    .rr.on{opacity:1;transform:translateX(0);}

    /* ── skill bar ── */
    .bar{transform:scaleX(0);transform-origin:left;animation:barFill 1.3s cubic-bezier(.4,0,.2,1) forwards;}

    /* ── clips ── */
    .chex{clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);}
    .ccorn{clip-path:polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,18px 100%,0 calc(100% - 18px));}
    .ccsm{clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px));}

    /* ══ 180° FLIP CARD ══ */
    .flip-w{perspective:1100px;}
    .flip-i{
      position:relative; width:100%; height:100%;
      transform-style:preserve-3d;
      transition:transform .62s cubic-bezier(.4,0,.2,1);
    }
    .flip-w:hover .flip-i{transform:rotateY(180deg);}
    .flip-f,.flip-b{
      backface-visibility:hidden;-webkit-backface-visibility:hidden;
      position:absolute;inset:0;border-radius:10px;overflow:hidden;
    }
    .flip-b{transform:rotateY(180deg);}

    /* ── skill + proj cards glow on hover ── */
    .card-pro{transition:transform .28s ease;cursor:default;}
    .card-pro:hover{transform:translateY(-9px) scale(1.02);animation:cardGlow 1.6s ease-in-out infinite;}

    /* ── nav ── */
    .nav-a{position:relative;}
    .nav-a::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:var(--y);transform:scaleX(0);transform-origin:left;transition:transform .22s ease;}
    .nav-a.act::after,.nav-a:hover::after{transform:scaleX(1);}
    .nav-a.act{color:var(--y)!important;}

    /* ── timeline ── */
    .tl-line{position:absolute;left:22px;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,#c0121a,#1a2d6e,#c0121a);}

    /* ── web strands ── */
    .ws{position:fixed;pointer-events:none;z-index:9900;opacity:0;animation:webDrop 8s linear forwards;}

    /* ── scroll spider ── */
    #pg-spider{transition:top .1s linear;}
    #pg-thread{transition:height .1s linear;animation:thrPulse 2s ease-in-out infinite;}
    #pg-anchor{animation:ancPop 2s ease-in-out infinite;}
    #pg-spider .sl1{animation:lL1 .45s ease-in-out infinite;    transform-origin:22px 14px;}
    #pg-spider .sl2{animation:lL2 .45s ease-in-out infinite .07s;transform-origin:22px 17px;}
    #pg-spider .sl3{animation:lL3 .45s ease-in-out infinite .14s;transform-origin:22px 20px;}
    #pg-spider .sl4{animation:lL4 .45s ease-in-out infinite .22s;transform-origin:22px 23px;}
    #pg-spider .sr1{animation:lR1 .45s ease-in-out infinite .04s;transform-origin:22px 14px;}
    #pg-spider .sr2{animation:lR2 .45s ease-in-out infinite .11s;transform-origin:22px 17px;}
    #pg-spider .sr3{animation:lR3 .45s ease-in-out infinite .18s;transform-origin:22px 20px;}
    #pg-spider .sr4{animation:lR4 .45s ease-in-out infinite .26s;transform-origin:22px 23px;}
    #pg-spider .sb {animation:bB  .45s ease-in-out infinite;}
    .web-sht{stroke-dasharray:400;animation:webSht 1s ease-out forwards;}

    /* ── scanlines ── */
    .scanlines{background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.04) 2px,rgba(0,0,0,.04) 4px);animation:scanP 4s ease-in-out infinite;}

    /* ── divider ── */
    .divider{height:1px;background:linear-gradient(to right,transparent,rgba(192,18,26,.38),rgba(245,200,66,.26),rgba(192,18,26,.38),transparent);margin:0 48px;}

    /* ── tag ── */
    .tag{display:inline-flex;align-items:center;font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.04em;padding:3px 10px;border:1px solid rgba(192,18,26,.32);background:rgba(192,18,26,.07);color:rgba(240,240,240,.78);clip-path:polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);transition:background .2s,border-color .2s;}
    .tag:hover{background:rgba(192,18,26,.2);border-color:#c0121a;color:#f0f0f0;}

    /* ── mob ── */
    .mob-menu{animation:mobIn .28s ease-out;}

    @media(max-width:768px){.hm{display:none!important;}.sm{display:flex!important;}}
    @media(min-width:769px){.sm{display:none!important;}}
  `}</style>
);

/* ══════ EMBLEM ══════ */
const Emblem = ({ size = 100, className = "", style: s = {} }) => (
    <svg viewBox="0 0 130 90" width={size} height={size * .69} className={className} style={s} fill="none">
        <path d="M65 5L96 30L86 76L65 60L44 76L34 30Z" fill="#c0121a" opacity=".95" />
        <path d="M65 16C65 16 47 32 42 50L65 60L88 50C83 32 65 16 65 16Z" fill="#800b10" />
        <ellipse cx="65" cy="38" rx="14" ry="10" fill="#04080f" />
        <path d="M65 29C58 29 53 38 50 47L80 47C77 38 72 29 65 29Z" fill="#1a2d6e" opacity=".65" />
        <line x1="16" y1="30" x2="50" y2="42" stroke="#f5c842" strokeWidth="2" opacity=".8" />
        <line x1="10" y1="54" x2="46" y2="52" stroke="#f5c842" strokeWidth="2" opacity=".8" />
        <line x1="16" y1="74" x2="44" y2="62" stroke="#f5c842" strokeWidth="1.6" opacity=".6" />
        <line x1="114" y1="30" x2="80" y2="42" stroke="#f5c842" strokeWidth="2" opacity=".8" />
        <line x1="120" y1="54" x2="84" y2="52" stroke="#f5c842" strokeWidth="2" opacity=".8" />
        <line x1="114" y1="74" x2="86" y2="62" stroke="#f5c842" strokeWidth="1.6" opacity=".6" />
        <line x1="34" y1="7" x2="54" y2="30" stroke="#f5c842" strokeWidth="1.3" opacity=".5" />
        <line x1="96" y1="7" x2="76" y2="30" stroke="#f5c842" strokeWidth="1.3" opacity=".5" />
    </svg>
);

/* ══════════════════════════════════════════════════════════
   REAL DATA — from Chhorn Vibol's CV
══════════════════════════════════════════════════════════ */
const NAVS = ["HOME", "ABOUT", "SKILLS", "EDUCATION", "PROJECTS", "CONTACT"];

const SKILLS_DATA = [
    {
        icon: "🌐", cat: "Frontend", col: "#c0121a",
        items: [{ n: "HTML / CSS", p: 92 }, { n: "JavaScript", p: 85 }, { n: "React.js", p: 82 }, { n: "Bootstrap & Tailwind", p: 88 }]
    },
    {
        icon: "🎨", cat: "UI & Design", col: "#8a6f0a",
        items: [{ n: "Web Design", p: 80 }, { n: "Responsive Layout", p: 88 }, { n: "Front-end Dev", p: 84 }, { n: "UI Prototyping", p: 75 }]
    },
    {
        icon: "⚙️", cat: "Backend", col: "#1a2d6e",
        items: [{ n: "PHP / Laravel", p: 72 }, { n: "MySQL", p: 75 }, { n: "Ajax", p: 68 }, { n: "REST Concepts", p: 65 }]
    },
    {
        icon: "💻", cat: "Other Tech", col: "#0a5e3a",
        items: [{ n: "C / C++", p: 70 }, { n: "Java", p: 65 }, { n: "Git / GitHub", p: 78 }, { n: "Problem-Solving", p: 82 }]
    },
];

const EDU_DATA = [
    {
        yr: "2024–2025",
        deg: "Bachelor's Degree in ICT Management",
        sch: "Norton University",
        desc: "Currently enrolled. Focused on ICT management, systems thinking, and technology leadership. Actively building real-world front-end projects alongside coursework.",
        icon: "🎓",
        badge: "Current Student",
    },
    {
        yr: "2024–2025",
        deg: "Bachelor's Degree in Information Technology",
        sch: "ETEC Center",
        desc: "Hands-on program covering full-stack fundamentals including HTML, CSS, JavaScript, PHP, MySQL, and ReactJS development.",
        icon: "📐",
        badge: "Enrolled",
    },
];

const PROJ_DATA = [
    {
        n: "01", tag: "HTML · CSS · Bootstrap · Tailwind",
        title: "RESPONSIVE WEBSITES",
        sub: "Front-End Development",
        desc: "Designed and developed multiple responsive websites with clean, mobile-first layouts using Bootstrap and Tailwind CSS.",
        col: "#c0121a", bg: "rgba(192,18,26,.07)",
    },
    {
        n: "02", tag: "JavaScript · ReactJS",
        title: "INTERACTIVE UI",
        sub: "Dynamic Components",
        desc: "Built interactive front-end features including dynamic components, state management, and API-connected interfaces using JavaScript and ReactJS.",
        col: "#1a2d6e", bg: "rgba(26,45,110,.07)",
    },
    {
        n: "03", tag: "PHP · MySQL · Ajax",
        title: "BACKEND INTEGRATION",
        sub: "Full-Stack Connection",
        desc: "Connected front-end interfaces with backend systems using PHP, MySQL for database management, and Ajax for asynchronous data handling.",
        col: "#8a6f0a", bg: "rgba(138,111,10,.06)",
    },
    {
        n: "04", tag: "Git · GitHub · Teamwork",
        title: "TEAM PROJECT WORK",
        sub: "Collaboration & Problem-Solving",
        desc: "Practiced teamwork, debugging, and version control across collaborative academic projects — developing communication and problem-solving skills.",
        col: "#0a5e3a", bg: "rgba(10,94,58,.07)",
    },
];

const STATS_DATA = [
    { v: "2", l: "Universities" },
    { v: "7+", l: "Tech Skills" },
    { v: "4+", l: "Projects Built" },
    { v: "∞", l: "Eagerness to Learn" },
];

const QUALITIES = [
    { ic: "💪", q: "Hardworking", d: "Always putting in full effort to complete tasks and exceed expectations." },
    { ic: "📚", q: "Eager to Learn", d: "Continuously seeking new knowledge in technology and development." },
    { ic: "🎯", q: "Responsible & Punctual", d: "Committed to delivering work on time and taking ownership of tasks." },
    { ic: "🤝", q: "Team Player", d: "Works effectively both independently and within a collaborative team." },
];

const LANGS = [
    { name: "Khmer (Native)", pct: 98 },
    { name: "English", pct: 70 },
];

/* ══════ HOOKS ══════ */
const useReveal = () => {
    useEffect(() => {
        const io = new IntersectionObserver(
            es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }),
            { threshold: .1 }
        );
        document.querySelectorAll(".rv,.rl,.rr").forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);
};

const useActive = () => {
    const [act, setAct] = useState("HOME");
    useEffect(() => {
        const io = new IntersectionObserver(
            es => es.forEach(e => { if (e.isIntersecting) setAct(e.target.id.toUpperCase()); }),
            { threshold: .35 }
        );
        NAVS.forEach(n => { const el = document.getElementById(n.toLowerCase()); if (el) io.observe(el); });
        return () => io.disconnect();
    }, []);
    return act;
};

const useStrands = () => {
    useEffect(() => {
        const drop = () => {
            const d = document.createElement("div");
            d.className = "ws";
            d.style.cssText = `left:${Math.random() * window.innerWidth}px;top:-70px`;
            const h = 60 + Math.random() * 130;
            d.innerHTML = `<svg width="2" height="${h}"><line x1="1" y1="0" x2="1" y2="${h}" stroke="rgba(245,200,66,.26)" stroke-width="1.5"/></svg>`;
            document.body.appendChild(d);
            setTimeout(() => d.remove(), 8400);
        };
        const id = setInterval(drop, 3500);
        return () => clearInterval(id);
    }, []);
};

/* ══════ CURSOR ══════ */
const Cursor = () => {
    useEffect(() => {
        const cd = document.getElementById("cd");
        const cr = document.getElementById("cr");
        const cw = document.getElementById("cw");
        if (!cd) return;
        let ang = 0;
        const mv = e => {
            [cd, cr, cw].forEach(el => { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; });
            ang += 2;
            cw.style.transform = `translate(-50%,-50%) rotate(${ang}deg)`;
        };
        const on = () => [cd, cr, cw].forEach(el => el.classList.add("hov"));
        const off = () => [cd, cr, cw].forEach(el => el.classList.remove("hov"));
        window.addEventListener("mousemove", mv);
        document.querySelectorAll("a,button,[data-c]").forEach(el => {
            el.addEventListener("mouseenter", on);
            el.addEventListener("mouseleave", off);
        });
        return () => window.removeEventListener("mousemove", mv);
    }, []);
    return null;
};

/* ══════════════════════════════════════════════════════════
   SCROLL SPIDER — web shoot animation + progress ring
══════════════════════════════════════════════════════════ */
const ScrollSpider = () => {
    const [top, setTop] = useState(90);
    const [thH, setThH] = useState(0);
    const [vis, setVis] = useState(false);
    const [pct, setPct] = useState(0);
    const [webs, setWebs] = useState([]);
    const lastPct = useRef(0);
    const idRef = useRef(0);

    useEffect(() => {
        const fn = () => {
            const sy = window.scrollY;
            const max = document.body.scrollHeight - window.innerHeight;
            if (max <= 0) return;
            const p = sy / max;
            const t = 90 + p * (window.innerHeight - 180);
            setTop(t); setThH(Math.max(0, t - 90)); setVis(sy > 80); setPct(p);
            if (Math.floor(p * 16) > Math.floor(lastPct.current * 16)) {
                const nid = ++idRef.current;
                setWebs(w => [...w, { id: nid, y: t, len: 55 + Math.random() * 85 }]);
                setTimeout(() => setWebs(w => w.filter(x => x.id !== nid)), 1100);
            }
            lastPct.current = p;
        };
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    if (!vis) return null;

    return (
        <div style={{ position: "fixed", right: 14, top: 0, zIndex: 8500, pointerEvents: "none", width: 56 }}>
            {/* Web shoot lines */}
            {webs.map(w => (
                <svg key={w.id} style={{ position: "fixed", right: 58, top: w.y + 14, pointerEvents: "none", zIndex: 8400, overflow: "visible" }}
                    width={w.len} height="2" viewBox={`0 0 ${w.len} 2`}>
                    <line x1={w.len} y1="1" x2="0" y2="1"
                        stroke="#f5c842" strokeWidth="1.8" strokeLinecap="round"
                        className="web-sht"
                        style={{ strokeDasharray: w.len, strokeDashoffset: w.len }} />
                </svg>
            ))}
            {/* Progress ring */}
            <svg style={{ position: "absolute", top: 72, left: "50%", transform: "translateX(-50%)", overflow: "visible" }} width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(245,200,66,.14)" strokeWidth="2" />
                <circle cx="12" cy="12" r="10" fill="none" stroke="#f5c842" strokeWidth="2"
                    strokeDasharray={`${62.8 * pct} 62.8`} strokeLinecap="round"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "12px 12px", filter: "drop-shadow(0 0 4px #f5c842)" }} />
            </svg>
            {/* Anchor */}
            <div id="pg-anchor" style={{
                position: "absolute", top: 86, left: "50%", transform: "translateX(-50%)",
                width: 8, height: 8, borderRadius: "50%", background: "#f5c842",
                boxShadow: "0 0 10px #f5c842, 0 0 20px rgba(245,200,66,.5)"
            }} />
            {/* Thread */}
            <div id="pg-thread" style={{
                position: "absolute", top: 90, left: "50%", transform: "translateX(-50%)",
                width: 2, height: thH, background: "linear-gradient(to bottom,rgba(245,200,66,.9),rgba(245,200,66,.14))",
                boxShadow: "0 0 7px rgba(245,200,66,.38)", borderRadius: 1
            }} />
            {/* Spider */}
            <div id="pg-spider" style={{ position: "absolute", top: top, left: "50%", transform: "translateX(-50%)" }}>
                <div style={{
                    position: "absolute", inset: -12, borderRadius: "50%",
                    background: "radial-gradient(circle,rgba(192,18,26,.3),transparent 68%)", pointerEvents: "none"
                }} />
                <svg width="46" height="44" viewBox="0 0 46 44" fill="none">
                    <g className="sl1"><line x1="22" y1="14" x2="2" y2="4" stroke="#f5c842" strokeWidth="1.9" strokeLinecap="round" /></g>
                    <g className="sl2"><line x1="22" y1="17" x2="0" y2="17" stroke="#f5c842" strokeWidth="1.9" strokeLinecap="round" /></g>
                    <g className="sl3"><line x1="22" y1="20" x2="0" y2="27" stroke="#f5c842" strokeWidth="1.9" strokeLinecap="round" /></g>
                    <g className="sl4"><line x1="22" y1="23" x2="3" y2="37" stroke="#f5c842" strokeWidth="1.9" strokeLinecap="round" /></g>
                    <g className="sr1"><line x1="22" y1="14" x2="42" y2="4" stroke="#f5c842" strokeWidth="1.9" strokeLinecap="round" /></g>
                    <g className="sr2"><line x1="22" y1="17" x2="44" y2="17" stroke="#f5c842" strokeWidth="1.9" strokeLinecap="round" /></g>
                    <g className="sr3"><line x1="22" y1="20" x2="44" y2="27" stroke="#f5c842" strokeWidth="1.9" strokeLinecap="round" /></g>
                    <g className="sr4"><line x1="22" y1="23" x2="41" y2="37" stroke="#f5c842" strokeWidth="1.9" strokeLinecap="round" /></g>
                    <g className="sb">
                        <ellipse cx="22" cy="27" rx="9" ry="11" fill="#c0121a" stroke="#800b10" strokeWidth="1.3" />
                        <path d="M22 21L18 26L22 31L26 26Z" fill="#f5c842" opacity=".55" />
                        <line x1="22" y1="18" x2="22" y2="38" stroke="#800b10" strokeWidth=".8" opacity=".6" />
                        <line x1="13" y1="24" x2="31" y2="24" stroke="#800b10" strokeWidth=".8" opacity=".6" />
                        <line x1="15" y1="20" x2="29" y2="34" stroke="#800b10" strokeWidth=".55" opacity=".44" />
                        <line x1="29" y1="20" x2="15" y2="34" stroke="#800b10" strokeWidth=".55" opacity=".44" />
                        <ellipse cx="22" cy="13" rx="7" ry="6.5" fill="#c0121a" stroke="#800b10" strokeWidth="1.3" />
                        <ellipse cx="18.5" cy="11.5" rx="2.9" ry="2.3" fill="white" opacity=".93" />
                        <ellipse cx="25.5" cy="11.5" rx="2.9" ry="2.3" fill="white" opacity=".93" />
                        <ellipse cx="19" cy="11.5" rx="1.6" ry="1.6" fill="#04080f" />
                        <ellipse cx="26" cy="11.5" rx="1.6" ry="1.6" fill="#04080f" />
                        <circle cx="19.8" cy="10.7" r=".6" fill="white" opacity=".75" />
                        <circle cx="26.8" cy="10.7" r=".6" fill="white" opacity=".75" />
                    </g>
                </svg>
                <div className="fj" style={{
                    position: "absolute", left: "50%", bottom: -22, transform: "translateX(-50%)",
                    fontSize: ".56rem", letterSpacing: 1, color: "rgba(245,200,66,.72)",
                    whiteSpace: "nowrap", textShadow: "0 0 6px rgba(245,200,66,.5)"
                }}>
                    {Math.round(pct * 100)}%
                </div>
            </div>
        </div>
    );
};

/* ══════ NAVBAR ══════ */
const Nav = ({ act }) => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);
    const go = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

    return (
        <nav className="a-nav" style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 5000,
            background: scrolled ? "rgba(4,8,15,.97)" : "rgba(4,8,15,.82)",
            borderBottom: `1px solid rgba(192,18,26,${scrolled ? .45 : .22})`,
            backdropFilter: "blur(20px)", transition: "background .3s,border-color .3s",
        }}>
            <div style={{
                maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 66,
                display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Emblem size={34} className="a-float" style={{ animationDuration: "3.2s" }} />
                    <div>
                        <div className="fb" style={{ fontSize: "1.5rem", letterSpacing: 3, color: "#f5c842", lineHeight: 1, textShadow: "1px 1px 0 #c0121a" }}>
                            VIBOL<span style={{ color: "#c0121a" }}>.</span>DEV
                        </div>
                        <div className="fj" style={{ fontSize: ".55rem", letterSpacing: 4, color: "rgba(240,240,240,.3)", textTransform: "uppercase" }}>
                            SPIDER-MAN FAN
                        </div>
                    </div>
                </div>
                {/* Desktop links */}
                <ul className="hm" style={{ display: "flex", listStyle: "none", gap: 4, alignItems: "center" }}>
                    {NAVS.map(n => (
                        <li key={n}>
                            <a onClick={e => { e.preventDefault(); go(n) }} href={`#${n.toLowerCase()}`} data-c
                                className={`nav-a fr ${act === n ? "act" : ""}`}
                                style={{
                                    fontSize: ".8rem", fontWeight: 700, letterSpacing: 3,
                                    color: act === n ? "#f5c842" : "rgba(240,240,240,.7)",
                                    textDecoration: "none", padding: "6px 13px", textTransform: "uppercase",
                                    transition: "color .2s", display: "block"
                                }}>
                                {n}
                            </a>
                        </li>
                    ))}
                </ul>
                {/* CTA */}
                <a onClick={e => { e.preventDefault(); go("CONTACT") }} href="#contact" data-c
                    className="chex fb hm"
                    style={{
                        fontSize: ".85rem", letterSpacing: 3, padding: "9px 22px",
                        background: "#c0121a", color: "#fff", textDecoration: "none",
                        boxShadow: "0 4px 20px rgba(192,18,26,.4)",
                        transition: "transform .2s,box-shadow .2s", display: "inline-block"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(192,18,26,.6)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(192,18,26,.4)"; }}>
                    HIRE ME
                </a>
                {/* Hamburger */}
                <button className="sm" onClick={() => setOpen(o => !o)} data-c
                    style={{ background: "none", border: "none", padding: 8, flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
                    {[0, 1, 2].map(i => (
                        <span key={i} style={{
                            display: "block", height: 2, background: "#c0121a", borderRadius: 1,
                            width: i === 1 ? (open ? 24 : 16) : 24,
                            transform: open ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "",
                            transition: "all .25s"
                        }} />
                    ))}
                </button>
            </div>
            {open && (
                <div className="mob-menu sm" style={{
                    flexDirection: "column", background: "rgba(4,8,15,.98)",
                    borderTop: "1px solid rgba(192,18,26,.18)", padding: "6px 0 14px"
                }}>
                    {NAVS.map(n => (
                        <button key={n} onClick={() => go(n)} data-c className="fb"
                            style={{
                                background: "none", border: "none", width: "100%", textAlign: "left",
                                padding: "14px 28px", fontSize: "1.15rem", letterSpacing: 4,
                                color: act === n ? "#f5c842" : "rgba(240,240,240,.8)",
                                borderBottom: "1px solid rgba(192,18,26,.1)", transition: "color .15s"
                            }}>
                            {n}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};

/* ══════════════════════════════════════════════════════════
   SPIDER-MAN HERO CHARACTER — full body SVG with speech bubble
══════════════════════════════════════════════════════════ */
const SpiderManHero = () => {
    const [typed, setTyped] = useState("");
    const [showDots, setShowDots] = useState(true);
    const msg = "Hey there! I'm your friendly neighborhood Spider-Man! 🕷️ Welcome to Vibol's portfolio — this guy codes as fast as I swing! 😄";

    useEffect(() => {
        let i = 0;
        const pause = setTimeout(() => {
            setShowDots(false);
            const t = setInterval(() => {
                i++;
                setTyped(msg.slice(0, i));
                if (i >= msg.length) clearInterval(t);
            }, 38);
            return () => clearInterval(t);
        }, 1800);
        return () => clearTimeout(pause);
    }, []);

    return (
        <div className="hero-spman" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Speech bubble */}
            <div className="bubble bubble-idle" style={{
                position: "relative", maxWidth: 280, padding: "14px 18px",
                background: "white", borderRadius: "18px 18px 4px 18px",
                boxShadow: "0 8px 32px rgba(0,0,0,.45), 0 0 0 3px #c0121a",
                marginBottom: 8, zIndex: 10,
            }}>
                {/* Red stripe accent top */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 4, borderRadius: "18px 18px 0 0",
                    background: "linear-gradient(to right,#c0121a,#0d1b4b)"
                }} />
                <p style={{
                    fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: ".88rem",
                    lineHeight: 1.55, color: "#0a0a0b", minHeight: 60
                }}>
                    {showDots
                        ? <span>
                            <span className="dot1" style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#c0121a", margin: "0 2px" }} />
                            <span className="dot2" style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#c0121a", margin: "0 2px" }} />
                            <span className="dot3" style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#c0121a", margin: "0 2px" }} />
                        </span>
                        : typed
                    }
                    {!showDots && typed.length < msg.length && <span style={{ display: "inline-block", width: 2, height: "1em", background: "#c0121a", marginLeft: 2, verticalAlign: "middle", animation: "typingDot .7s ease-in-out infinite" }} />}
                </p>
                {/* Bubble tail */}
                <div style={{
                    position: "absolute", bottom: -14, right: 22, width: 0, height: 0,
                    borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
                    borderTop: "14px solid white"
                }} />
                <div style={{
                    position: "absolute", bottom: -18, right: 20, width: 0, height: 0,
                    borderLeft: "10px solid transparent", borderRight: "10px solid transparent",
                    borderTop: "16px solid #c0121a", zIndex: -1
                }} />
            </div>

            {/* Spider-Man SVG */}
            <svg viewBox="0 0 260 480" width="min(320px,42vw)" height="auto"
                style={{ filter: "drop-shadow(0 0 48px rgba(192,18,26,.65)) drop-shadow(0 0 18px rgba(192,18,26,.3))", overflow: "visible" }}>
                <defs>
                    <linearGradient id="gRed" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#e74c3c" />
                        <stop offset="60%" stopColor="#c0121a" />
                        <stop offset="100%" stopColor="#8b0000" />
                    </linearGradient>
                    <linearGradient id="gBlue" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2c3e8a" />
                        <stop offset="100%" stopColor="#0d1b4b" />
                    </linearGradient>
                    <linearGradient id="gRedV" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e74c3c" />
                        <stop offset="100%" stopColor="#8b0000" />
                    </linearGradient>
                    <linearGradient id="gBlueV" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2c3e8a" />
                        <stop offset="100%" stopColor="#0a1240" />
                    </linearGradient>
                    <radialGradient id="gEye" cx="35%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="60%" stopColor="#d0ecff" />
                        <stop offset="100%" stopColor="#9ecfee" />
                    </radialGradient>
                    <filter id="spGlow" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="3" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="spGlowS" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="5" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* Web line from hand to top */}
                <line className="sp-web hero-webline" x1="197" y1="138" x2="310" y2="-20"
                    stroke="#f5c842" strokeWidth="2" strokeLinecap="round" filter="url(#spGlowS)" />
                <line className="sp-web" x1="197" y1="138" x2="305" y2="-12"
                    stroke="rgba(245,200,66,.3)" strokeWidth="1" strokeLinecap="round"
                    style={{ animationDelay: ".15s" }} />

                <g className="sp-body">
                    {/* ── LEFT LEG ── */}
                    <g className="sp-leg-l">
                        <path d="M 104 318 Q 90 365 83 408" fill="none" stroke="url(#gBlueV)" strokeWidth="26" strokeLinecap="round" />
                        <path d="M 83 408 Q 75 452 80 478" fill="none" stroke="url(#gRedV)" strokeWidth="20" strokeLinecap="round" />
                        <ellipse cx="78" cy="482" rx="18" ry="9" fill="#c0121a" />
                        {/* shoe sole */}
                        <path d="M 60 482 Q 78 488 96 482" fill="none" stroke="#8b0000" strokeWidth="3" strokeLinecap="round" />
                    </g>
                    {/* ── RIGHT LEG ── */}
                    <g className="sp-leg-r">
                        <path d="M 156 318 Q 170 363 177 406" fill="none" stroke="url(#gBlueV)" strokeWidth="26" strokeLinecap="round" />
                        <path d="M 177 406 Q 185 450 180 476" fill="none" stroke="url(#gRedV)" strokeWidth="20" strokeLinecap="round" />
                        <ellipse cx="181" cy="480" rx="18" ry="9" fill="#c0121a" />
                        <path d="M 163 480 Q 181 486 199 480" fill="none" stroke="#8b0000" strokeWidth="3" strokeLinecap="round" />
                    </g>

                    {/* ── TORSO ── */}
                    <path d="M 96 178 Q 80 225 82 318 L 178 318 Q 180 225 164 178 Z" fill="url(#gBlue)" />
                    {/* Red chest stripe */}
                    <path d="M 108 182 Q 102 228 104 308 L 156 308 Q 158 228 152 182 Z" fill="url(#gRed)" />

                    {/* Torso web lines */}
                    <g stroke="rgba(0,0,0,.28)" strokeWidth=".9" fill="none">
                        {[[-22, -52], [-12, -58], [0, -62], [12, -58], [22, -52], [30, -42], [34, -30], [32, -18], [-32, -18], [-34, -30], [-30, -42]].map(([dx, dy], i) => (
                            <line key={i} x1="130" y1="248" x2={130 + dx * 1.6} y2={248 + dy * 1.3} />
                        ))}
                        <ellipse cx="130" cy="248" rx="18" ry="12" />
                        <ellipse cx="130" cy="248" rx="35" ry="22" />
                        <ellipse cx="130" cy="248" rx="52" ry="35" />
                    </g>

                    {/* Spider emblem on chest */}
                    <g transform="translate(108,228)" filter="url(#spGlow)" opacity=".82">
                        <path d="M22 2 L35 14 L31 40 L22 30 L13 40 L9 14 Z" fill="black" />
                        <line x1="6" y1="13" x2="22" y2="20" stroke="black" strokeWidth="2" />
                        <line x1="4" y1="24" x2="20" y2="24" stroke="black" strokeWidth="2" />
                        <line x1="8" y1="35" x2="20" y2="28" stroke="black" strokeWidth="1.6" />
                        <line x1="38" y1="13" x2="22" y2="20" stroke="black" strokeWidth="2" />
                        <line x1="40" y1="24" x2="24" y2="24" stroke="black" strokeWidth="2" />
                        <line x1="36" y1="35" x2="24" y2="28" stroke="black" strokeWidth="1.6" />
                    </g>

                    {/* ── RIGHT ARM (web hand) ── */}
                    <g className="sp-arm-r">
                        <path d="M 160 182 Q 190 158 205 138" fill="none" stroke="url(#gRed)" strokeWidth="23" strokeLinecap="round" />
                        <path d="M 205 138 Q 218 122 202 132" fill="none" stroke="url(#gRed)" strokeWidth="18" strokeLinecap="round" />
                        {/* web-shooting hand */}
                        <ellipse cx="197" cy="138" rx="14" ry="10" fill="#9b0e16" transform="rotate(-22 197 138)" />
                        {/* fingers extended for web */}
                        <line x1="192" y1="130" x2="200" y2="120" stroke="#9b0e16" strokeWidth="4" strokeLinecap="round" />
                        <line x1="198" y1="128" x2="208" y2="120" stroke="#9b0e16" strokeWidth="4" strokeLinecap="round" />
                        <line x1="203" y1="132" x2="211" y2="126" stroke="#9b0e16" strokeWidth="3" strokeLinecap="round" />
                        {/* web flash */}
                        <circle cx="200" cy="126" r="5" fill="rgba(245,200,66,.6)" filter="url(#spGlowS)"
                            style={{ animation: "typingDot .9s ease-in-out infinite" }} />
                    </g>

                    {/* ── LEFT ARM ── */}
                    <g className="sp-arm-l">
                        <path d="M 100 182 Q 72 205 57 228" fill="none" stroke="url(#gBlue)" strokeWidth="23" strokeLinecap="round" />
                        <path d="M 57 228 Q 42 252 49 268" fill="none" stroke="url(#gBlue)" strokeWidth="18" strokeLinecap="round" />
                        <ellipse cx="48" cy="268" rx="13" ry="9" fill="#0d1b4b" transform="rotate(16 48 268)" />
                    </g>

                    {/* ── NECK ── */}
                    <rect x="120" y="162" width="20" height="24" rx="4" fill="url(#gRed)" />

                    {/* ── HEAD ── */}
                    <ellipse cx="130" cy="128" rx="46" ry="52" fill="url(#gRed)" />
                    {/* Head shading */}
                    <ellipse cx="130" cy="128" rx="46" ry="52" fill="rgba(0,0,0,.12)" />

                    {/* Blue side panels on head */}
                    <path d="M 84 120 Q 80 140 88 160 Q 102 170 122 164 Q 110 148 110 128 Q 110 110 115 98 Q 97 106 84 120Z" fill="url(#gBlue)" />
                    <path d="M 176 120 Q 180 140 172 160 Q 158 170 138 164 Q 150 148 150 128 Q 150 110 145 98 Q 163 106 176 120Z" fill="url(#gBlue)" />

                    {/* Head web lines */}
                    <g stroke="rgba(0,0,0,.22)" strokeWidth=".9" fill="none">
                        <path d="M 130 78 Q 152 98 165 124 Q 172 148 164 166" />
                        <path d="M 130 78 Q 108 98 95 124 Q 88 148 96 166" />
                        <path d="M 130 78 L 130 180" />
                        <ellipse cx="130" cy="128" rx="24" ry="26" />
                        <ellipse cx="130" cy="128" rx="40" ry="44" />
                    </g>

                    {/* ── EYES (large white lenses) ── */}
                    <path d="M 90 116 Q 84 102 98 96 Q 116 88 123 103 Q 126 118 116 126 Q 102 133 90 116 Z"
                        fill="url(#gEye)" filter="url(#spGlow)" />
                    {/* Eye highlight */}
                    <ellipse cx="101" cy="103" rx="5" ry="3.5" fill="white" opacity=".85" />
                    <path d="M 170 116 Q 176 102 162 96 Q 144 88 137 103 Q 134 118 144 126 Q 158 133 170 116 Z"
                        fill="url(#gEye)" filter="url(#spGlow)" />
                    <ellipse cx="159" cy="103" rx="5" ry="3.5" fill="white" opacity=".85" />

                    {/* ── eye outline ── */}
                    <path d="M 90 116 Q 84 102 98 96 Q 116 88 123 103 Q 126 118 116 126 Q 102 133 90 116 Z"
                        fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="1.2" />
                    <path d="M 170 116 Q 176 102 162 96 Q 144 88 137 103 Q 134 118 144 126 Q 158 133 170 116 Z"
                        fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="1.2" />
                </g>
            </svg>

            {/* Ground shadow */}
            <div style={{
                width: 180, height: 16, borderRadius: "50%",
                background: "radial-gradient(ellipse,rgba(192,18,26,.35),transparent 70%)",
                marginTop: -12, filter: "blur(6px)"
            }} />
        </div>
    );
};

/* ══════ CITY ══════ */
const City = () => {
    const B = [{ w: 40, h: 108 }, { w: 56, h: 172 }, { w: 34, h: 128 }, { w: 72, h: 228 }, { w: 28, h: 96 }, { w: 50, h: 162 }, { w: 42, h: 192 }, { w: 66, h: 252 }, { w: 46, h: 142 }, { w: 88, h: 298 }, { w: 36, h: 172 }, { w: 60, h: 212 }, { w: 32, h: 106 }, { w: 70, h: 240 }, { w: 52, h: 188 }, { w: 44, h: 126 }, { w: 76, h: 226 }, { w: 30, h: 90 }, { w: 54, h: 198 }, { w: 48, h: 156 }, { w: 36, h: 112 }, { w: 64, h: 218 }, { w: 32, h: 94 }, { w: 80, h: 244 }, { w: 42, h: 132 }];
    return (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1, pointerEvents: "none", display: "flex", alignItems: "flex-end", gap: 3, padding: "0 4px" }}>
            {B.map((b, i) => (
                <div key={i} style={{
                    position: "relative", flexShrink: 0, width: b.w, height: b.h,
                    background: "linear-gradient(to top,#07101e,#0d1b4b)", borderTop: "2px solid rgba(255,255,255,.04)"
                }}>
                    {[...Array(Math.floor(Math.random() * 5) + 2)].map((_, j) => (
                        <div key={j} style={{
                            position: "absolute", width: 4, height: 5,
                            background: `rgba(245,200,66,${.38 + Math.random() * .55})`,
                            boxShadow: "0 0 6px rgba(245,200,66,.5)",
                            left: Math.random() * (b.w - 12) + 4, top: Math.random() * (b.h - 24) + 12,
                            animation: `winBlk ${2.5 + Math.random() * 3}s ease-in-out ${Math.random() * 4}s infinite`
                        }} />
                    ))}
                </div>
            ))}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#04080f 0%,transparent 52%)" }} />
        </div>
    );
};

/* ══════ HERO ══════ */
const Hero = () => (
    <section id="home" style={{
        position: "relative", minHeight: "100vh", display: "flex",
        alignItems: "center", overflow: "hidden", paddingTop: 66
    }}>
        <div className="wp" style={{ position: "absolute", inset: 0, opacity: .042, pointerEvents: "none" }} />
        <div className="scanlines" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }} />
        <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 60% at 30% 50%,rgba(13,27,75,.65) 0%,transparent 70%)"
        }} />
        <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 55% 60% at 80% 55%,rgba(192,18,26,.13) 0%,transparent 65%)"
        }} />
        <City />

        {/* Main hero grid — LEFT: text | RIGHT: Spider-Man */}
        <div style={{
            position: "relative", zIndex: 5, width: "100%", maxWidth: 1280, margin: "0 auto",
            padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr",
            alignItems: "center", gap: 24, minHeight: "calc(100vh - 66px)"
        }}>

            {/* ── LEFT: Portfolio text ── */}
            <div style={{ padding: "20px 0" }}>
                <p className="fj a-up d1" style={{
                    fontSize: ".68rem", letterSpacing: 8,
                    color: "rgba(245,200,66,.82)", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 10
                }}>
                    <span style={{ display: "inline-block", width: 30, height: 1, background: "#f5c842", opacity: .6 }} />
                    Phnom Penh, Cambodia
                </p>

                <Emblem size={72} className="a-float d1" style={{ marginBottom: 10, display: "block" }} />

                <h1 className="fb glitch a-slam d2" data-g="CHHORN VIBOL" style={{
                    fontSize: "clamp(2.6rem,8vw,6.5rem)", lineHeight: .88, letterSpacing: 4, color: "#f0f0f0",
                    textShadow: "4px 4px 0 #c0121a, 8px 8px 0 #0d1b4b, 0 0 50px rgba(192,18,26,.2)",
                    marginBottom: 14
                }}>
                    CHHORN<br /><span style={{ color: "#f5c842" }}>VIBOL</span>
                </h1>

                <p className="fbn a-up d4" style={{
                    fontSize: "clamp(.85rem,2.5vw,1.2rem)", letterSpacing: 6,
                    color: "rgba(245,200,66,.85)", marginBottom: 28, textTransform: "uppercase"
                }}>
                    Front-End Developer · ICT Student · Spider-Man Fan
                </p>

                {/* Stats grid */}
                <div className="a-up d5" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 30 }}>
                    {STATS_DATA.map((s, i) => (
                        <div key={i} className="chex" style={{
                            padding: "11px 6px",
                            background: "rgba(13,27,75,.28)", border: "1px solid rgba(192,18,26,.3)",
                            textAlign: "center"
                        }}>
                            <div className="fb" style={{ fontSize: "clamp(1.1rem,3vw,1.7rem)", letterSpacing: 3, color: "#f5c842" }}>{s.v}</div>
                            <div className="fj" style={{ fontSize: ".55rem", letterSpacing: 2, color: "rgba(240,240,240,.4)", textTransform: "uppercase", marginTop: 2 }}>{s.l}</div>
                        </div>
                    ))}
                </div>

                {/* CTAs */}
                <div className="a-up d6" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} data-c className="chex fb"
                        style={{
                            fontSize: "1rem", letterSpacing: 4, padding: "14px 32px", background: "#c0121a",
                            color: "#fff", border: "none", boxShadow: "0 6px 28px rgba(192,18,26,.45)",
                            animation: "pulseR 2.5s ease-in-out infinite", transition: "transform .22s"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
                        VIEW MY WORK
                    </button>
                    <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} data-c className="fb"
                        style={{
                            fontSize: "1rem", letterSpacing: 4, padding: "13px 28px", background: "transparent",
                            color: "#f5c842", border: "2px solid #f5c842",
                            boxShadow: "0 6px 28px rgba(245,200,66,.15)", transition: "all .22s"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,200,66,.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = ""; }}>
                        CONTACT ME
                    </button>
                </div>
            </div>

            {/* ── RIGHT: Spider-Man character ── */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                paddingBottom: 40, paddingTop: 20
            }}>
                <SpiderManHero />
            </div>

        </div>{/* end grid */}

        {/* Scroll nudge */}
        <div className="a-in d8" style={{
            position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 7, zIndex: 5
        }}>
            <div className="fj" style={{ fontSize: ".6rem", letterSpacing: 6, color: "rgba(240,240,240,.2)", textTransform: "uppercase" }}>scroll</div>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c0121a", animation: "pulseR 1.8s ease-in-out infinite" }} />
        </div>

        {/* Responsive: stack on mobile */}
        <style>{`@media(max-width:768px){#home>div:nth-child(6){grid-template-columns:1fr!important;}}`}</style>
    </section>
);

/* ══════ SECTION TITLE ══════ */
const ST = ({ pre, acc, post = "" }) => (
    <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div className="fj rv" style={{ fontSize: ".66rem", letterSpacing: 8, color: "rgba(245,200,66,.5)", textTransform: "uppercase", marginBottom: 8 }}>── PORTFOLIO ──</div>
        <h2 className="fb rv" style={{ fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: 5, color: "#f0f0f0", textShadow: "2px 2px 0 rgba(4,8,15,.9)" }}>
            {pre} <span style={{ color: "#c0121a", textShadow: "2px 2px 0 #0d1b4b" }}>{acc}</span>{post && " " + post}
        </h2>
        <div style={{
            width: 80, height: 3, margin: "12px auto 0", borderRadius: 2,
            background: "linear-gradient(to right,#c0121a,#f5c842,#c0121a)",
            boxShadow: "0 0 16px rgba(192,18,26,.55)"
        }} />
    </div>
);

/* ══════════════════════════════════════════════════════════
   ABOUT — 180° FLIP CARD
══════════════════════════════════════════════════════════ */
const LangBar = ({ name, pct }) => {
    const ref = useRef();
    const [w, setW] = useState(0);
    useEffect(() => {
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setW(pct); io.disconnect(); } }, { threshold: .3 });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, [pct]);
    return (
        <div ref={ref} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span className="fj" style={{ fontSize: ".68rem", color: "rgba(240,240,240,.6)", letterSpacing: 1 }}>{name}</span>
                <span className="fj" style={{ fontSize: ".68rem", color: "#f5c842" }}>{pct}%</span>
            </div>
            <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,.07)", overflow: "hidden" }}>
                <div style={{
                    height: "100%", width: w + "%", borderRadius: 2,
                    background: "linear-gradient(to right,#c0121a,#f5c842)",
                    boxShadow: "0 0 8px rgba(192,18,26,.5)",
                    transition: "width 1.3s cubic-bezier(.4,0,.2,1)"
                }} />
            </div>
        </div>
    );
};

const About = () => (
    <section id="about" style={{ position: "relative", zIndex: 10, padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <ST pre="THE" acc="DEVELOPER" post="" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 60, alignItems: "center" }}>

            {/* 180° Flip Card */}
            <div className="rl flip-w" style={{ width: 300, height: 440, margin: "0 auto", position: "relative" }}>
                <div className="flip-i">
                    {/* FRONT */}
                    <div className="flip-f" style={{
                        border: "2px solid rgba(192,18,26,.55)",
                        boxShadow: "0 0 0 5px rgba(192,18,26,.07),0 24px 60px rgba(0,0,0,.6)"
                    }}>
                        <div style={{
                            width: "100%", height: "100%", display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", position: "relative",
                            background: "linear-gradient(160deg,#0c1428 0%,#0d1b4b 40%,#6b0a0f 80%,#c0121a 100%)"
                        }}>
                            <div className="wp" style={{ position: "absolute", inset: 0, opacity: .1 }} />
                            {/* Avatar placeholder with spider */}
                            <div style={{
                                width: 120, height: 120, borderRadius: "50%", border: "3px solid #f5c842",
                                background: "linear-gradient(135deg,#1a2d6e,#c0121a)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "4rem", marginBottom: 16, zIndex: 1,
                                boxShadow: "0 0 24px rgba(192,18,26,.6)"
                            }}>
                                🕷️
                            </div>
                            <div className="fb" style={{ fontSize: "1.6rem", letterSpacing: 3, color: "#f0f0f0", zIndex: 1 }}>CHHORN VIBOL</div>
                            <div className="fbn" style={{ fontSize: ".9rem", letterSpacing: 5, color: "#f5c842", marginTop: 4, zIndex: 1 }}>FRONT-END DEVELOPER</div>
                            <div className="fj" style={{ fontSize: ".6rem", letterSpacing: 4, color: "rgba(240,240,240,.4)", marginTop: 6, textTransform: "uppercase", zIndex: 1 }}>Hover to flip ↻</div>
                            <div style={{
                                position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                                background: "linear-gradient(to top,rgba(4,8,15,.85),transparent)"
                            }} />
                            {/* corner web */}
                            <div style={{ position: "absolute", top: 0, left: 0, width: 55, height: 55, opacity: .28 }}>
                                <svg viewBox="0 0 55 55"><path d="M0 0L55 0L0 55" fill="none" stroke="#f5c842" strokeWidth=".8" /><line x1="0" y1="0" x2="27" y2="27" stroke="#f5c842" strokeWidth=".5" /></svg>
                            </div>
                        </div>
                    </div>
                    {/* BACK */}
                    <div className="flip-b" style={{
                        border: "2px solid rgba(245,200,66,.45)",
                        background: "linear-gradient(160deg,#c0121a 0%,#0d1b4b 100%)",
                        display: "flex", flexDirection: "column", alignItems: "center",
                        justifyContent: "center", padding: 26, textAlign: "center"
                    }}>
                        <div style={{ fontSize: "2.8rem", marginBottom: 10 }}>👨‍💻</div>
                        <div className="fb" style={{ fontSize: "1.3rem", letterSpacing: 4, color: "#f5c842", marginBottom: 8 }}>ICT MANAGEMENT</div>
                        <div className="fj" style={{ fontSize: ".62rem", letterSpacing: 3, color: "rgba(255,255,255,.5)", marginBottom: 12, textTransform: "uppercase" }}>
                            📍 Phnom Penh, Cambodia
                        </div>
                        <p className="fr" style={{ fontSize: ".86rem", lineHeight: 1.7, color: "rgba(255,255,255,.88)", marginBottom: 14 }}>
                            Motivated ICT student passionate about Front-End Development. Skilled in HTML, CSS, JavaScript & ReactJS.
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                            {["⚡ React", "🎨 CSS", "🕸 JS", "🐘 PHP", "🗄 MySQL"].map(t => (
                                <span key={t} className="tag">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bio text */}
            <div className="rr">
                <div className="fj" style={{ fontSize: ".66rem", letterSpacing: 6, color: "rgba(245,200,66,.75)", textTransform: "uppercase", marginBottom: 8 }}>PROFILE</div>
                <h2 className="fb" style={{
                    fontSize: "clamp(2.2rem,5vw,3.4rem)", letterSpacing: 4, color: "#c0121a",
                    textShadow: "3px 3px 0 #0d1b4b, 0 0 24px rgba(192,18,26,.3)", marginBottom: 6
                }}>
                    CHHORN VIBOL
                </h2>
                <div className="fbn" style={{ fontSize: ".95rem", letterSpacing: 5, color: "rgba(240,240,240,.45)", marginBottom: 22, textTransform: "uppercase" }}>
                    Front-End Dev · ICT Student · Phnom Penh
                </div>
                <p className="fr" style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(240,240,240,.82)", marginBottom: 16 }}>
                    Motivated ICT Management student with a strong interest in Web Development, especially Front-End Development. Skilled in HTML, CSS, JavaScript, and ReactJS, with hands-on experience through academic and personal projects.
                </p>
                <p className="fr" style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(240,240,240,.62)", marginBottom: 20 }}>
                    Eager to gain real-world experience, improve technical skills, and contribute to innovative IT solutions — one line of code at a time.
                </p>
                <blockquote style={{ borderLeft: "3px solid #c0121a", paddingLeft: 16, marginBottom: 22, fontStyle: "italic" }} className="fr">
                    <span style={{ color: "#f5c842", fontSize: "1rem" }}>"With great power comes great responsibility."</span>
                </blockquote>

                {/* Languages */}
                <div style={{ marginBottom: 20 }}>
                    <div className="fj" style={{ fontSize: ".64rem", letterSpacing: 5, color: "rgba(192,18,26,.9)", textTransform: "uppercase", marginBottom: 12 }}>Languages</div>
                    {LANGS.map(l => <LangBar key={l.name} name={l.name} pct={l.pct} />)}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {["HTML", "CSS", "JavaScript", "React.js", "Bootstrap", "Tailwind", "PHP", "MySQL", "C/C++", "Ajax", "Laravel", "Git"].map(t => (
                        <span key={t} className="tag">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

/* ══════════════════════════════════════════════════════════
   SKILLS — 180° flip cards
══════════════════════════════════════════════════════════ */
const SkillCard = ({ s, si }) => {
    const ref = useRef();
    const [triggered, setTriggered] = useState(false);
    useEffect(() => {
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTriggered(true); io.disconnect(); } }, { threshold: .2 });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={ref} className="rv flip-w" style={{ animationDelay: si * .1 + "s", height: 260 }}>
            <div className="flip-i">
                {/* FRONT */}
                <div className="flip-f ccorn" style={{
                    padding: "26px 22px",
                    background: "linear-gradient(135deg,rgba(13,27,75,.3),rgba(4,8,15,.75))",
                    border: "1px solid rgba(192,18,26,.2)", borderTop: `3px solid ${s.col}`
                }}>
                    <div style={{ fontSize: "2rem", marginBottom: 10 }}>{s.icon}</div>
                    <div className="fb" style={{ fontSize: "1.25rem", letterSpacing: 4, color: "#f5c842", marginBottom: 16 }}>{s.cat}</div>
                    {s.items.map(it => (
                        <div key={it.n} style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                <span className="fj" style={{ fontSize: ".65rem", color: "rgba(240,240,240,.56)", letterSpacing: 1 }}>{it.n}</span>
                                <span className="fj" style={{ fontSize: ".65rem", color: "#f5c842" }}>{it.p}%</span>
                            </div>
                            <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,.07)", overflow: "hidden" }}>
                                {triggered && (
                                    <div className="bar" style={{
                                        height: "100%", width: it.p + "%", borderRadius: 2,
                                        background: `linear-gradient(to right,${s.col},#f5c842)`,
                                        boxShadow: `0 0 8px ${s.col}70`, animationDelay: si * .1 + "s"
                                    }} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* BACK */}
                <div className="flip-b ccorn" style={{
                    background: `linear-gradient(135deg,${s.col}28,#04080f)`,
                    border: `2px solid ${s.col}`,
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", padding: 22, textAlign: "center"
                }}>
                    <div style={{ fontSize: "3rem", marginBottom: 12, filter: `drop-shadow(0 0 12px ${s.col})` }}>{s.icon}</div>
                    <div className="fb" style={{
                        fontSize: "1.5rem", letterSpacing: 4, color: "#f5c842", marginBottom: 8,
                        textShadow: `0 0 14px ${s.col}`
                    }}>{s.cat}</div>
                    <div style={{ width: 36, height: 2, background: `linear-gradient(to right,transparent,${s.col},transparent)`, margin: "0 auto 12px" }} />
                    {s.items.map(it => (
                        <div key={it.n} className="fj" style={{ fontSize: ".7rem", letterSpacing: 2, color: "rgba(240,240,240,.72)", marginBottom: 5 }}>
                            {it.n} <span style={{ color: "#f5c842" }}>·</span> <span style={{ color: "#f5c842" }}>{it.p}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Skills = () => (
    <section id="skills" style={{
        position: "relative", zIndex: 10, padding: "100px 24px",
        background: "linear-gradient(to bottom,transparent,rgba(13,27,75,.05),transparent)"
    }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ST pre="MY" acc="SKILLS" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 20 }}>
                {SKILLS_DATA.map((s, si) => <SkillCard key={s.cat} s={s} si={si} />)}
            </div>
        </div>
    </section>
);

/* ══════ EDUCATION ══════ */
const Education = () => (
    <section id="education" style={{ position: "relative", zIndex: 10, padding: "100px 24px", maxWidth: 860, margin: "0 auto" }}>
        <ST pre="ACADEMIC" acc="ORIGINS" />
        <div style={{ position: "relative", paddingLeft: 58 }}>
            <div className="tl-line" />
            {EDU_DATA.map((e, i) => (
                <div key={i} className="rv" style={{ position: "relative", marginBottom: i < EDU_DATA.length - 1 ? 34 : 0, animationDelay: i * .14 + "s" }}>
                    <div style={{
                        position: "absolute", left: -58, top: 16, width: 44, height: 44, borderRadius: "50%",
                        background: "linear-gradient(135deg,#c0121a,#0d1b4b)", border: "2px solid #f5c842",
                        boxShadow: "0 0 18px rgba(192,18,26,.5)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem"
                    }}>
                        {e.icon}
                    </div>
                    <div className="ccsm card-pro" style={{
                        padding: "22px 26px",
                        background: "linear-gradient(135deg,rgba(13,27,75,.2),rgba(4,8,15,.72))",
                        border: "1px solid rgba(192,18,26,.2)", borderLeft: "3px solid #c0121a"
                    }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                            <span className="fj tag">{e.yr}</span>
                            <span className="tag" style={{ borderColor: "rgba(245,200,66,.28)", background: "rgba(245,200,66,.06)", color: "#f5c842" }}>{e.badge}</span>
                        </div>
                        <div className="fb" style={{ fontSize: "1.3rem", letterSpacing: 3, color: "#f0f0f0", marginBottom: 4 }}>{e.deg}</div>
                        <div className="fbn" style={{ fontSize: ".9rem", letterSpacing: 4, color: "#c0121a", marginBottom: 10 }}>{e.sch}</div>
                        <p className="fr" style={{ fontSize: ".9rem", lineHeight: 1.75, color: "rgba(240,240,240,.62)" }}>{e.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

/* ══════════════════════════════════════════════════════════
   PROJECTS — 180° flip cards
══════════════════════════════════════════════════════════ */
const ProjCard = ({ p, i }) => (
    <div className="rv flip-w" style={{ animationDelay: i * .1 + "s", height: 290 }}>
        <div className="flip-i">
            {/* FRONT */}
            <div className="flip-f ccorn" style={{
                overflow: "hidden",
                background: `linear-gradient(140deg,${p.bg},rgba(4,8,15,.85))`,
                border: `1px solid ${p.col}28`, padding: "26px 24px"
            }}>
                <div style={{
                    position: "absolute", top: 0, right: 0, width: 0, height: 0,
                    borderLeft: "18px solid transparent", borderTop: `18px solid ${p.col}`, opacity: .65
                }} />
                <div className="fb" style={{
                    position: "absolute", top: 6, right: 18, fontSize: "4.5rem",
                    lineHeight: 1, color: `${p.col}12`, pointerEvents: "none", userSelect: "none"
                }}>{p.n}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.col, boxShadow: `0 0 8px ${p.col}` }} />
                    <span className="fj tag" style={{ borderColor: `${p.col}38`, background: `${p.col}0d`, color: "rgba(240,240,240,.6)" }}>{p.tag}</span>
                </div>
                <div className="fb" style={{ fontSize: "1.45rem", letterSpacing: 3, color: "#f0f0f0", marginBottom: 3 }}>{p.title}</div>
                <div className="fbn" style={{ fontSize: ".85rem", letterSpacing: 4, color: p.col, marginBottom: 10, opacity: .85 }}>{p.sub}</div>
                <p className="fr" style={{ fontSize: ".88rem", lineHeight: 1.7, color: "rgba(240,240,240,.6)", marginBottom: 16 }}>{p.desc}</p>
                <div className="fj" style={{ fontSize: ".64rem", letterSpacing: 3, color: "rgba(240,240,240,.3)" }}>Hover to flip ↻</div>
            </div>
            {/* BACK */}
            <div className="flip-b ccorn" style={{
                background: `linear-gradient(135deg,${p.col}30,#04080f)`,
                border: `2px solid ${p.col}`,
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", padding: 26, textAlign: "center"
            }}>
                <div className="fj" style={{ fontSize: ".62rem", letterSpacing: 4, color: p.col, textTransform: "uppercase", marginBottom: 10, opacity: .8 }}>// PROJECT {p.n}</div>
                <div className="fb" style={{
                    fontSize: "1.8rem", letterSpacing: 4, color: "#f0f0f0", marginBottom: 6,
                    textShadow: `0 0 20px ${p.col}`
                }}>{p.title}</div>
                <div className="fbn" style={{ fontSize: ".85rem", letterSpacing: 4, color: "#f5c842", marginBottom: 14 }}>{p.sub}</div>
                <div style={{ width: 44, height: 2, background: `linear-gradient(to right,transparent,${p.col},transparent)`, margin: "0 auto 14px" }} />
                <p className="fr" style={{ fontSize: ".86rem", lineHeight: 1.7, color: "rgba(240,240,240,.8)", marginBottom: 18 }}>{p.desc}</p>
                <a href="#" data-c className="fj chex"
                    style={{
                        fontSize: ".7rem", letterSpacing: 3, padding: "8px 20px",
                        background: p.col, color: "#fff", textDecoration: "none", display: "inline-block"
                    }}>
                    VIEW PROJECT →
                </a>
            </div>
        </div>
    </div>
);

const Projects = () => (
    <section id="projects" style={{ position: "relative", zIndex: 10, padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <ST pre="ACADEMIC" acc="PROJECTS" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
            {PROJ_DATA.map((p, i) => <ProjCard key={p.n} p={p} i={i} />)}
        </div>
    </section>
);

/* ══════ QUALITIES ══════ */
const Qualities = () => (
    <section style={{
        position: "relative", zIndex: 10, padding: "100px 24px",
        background: "linear-gradient(to bottom,transparent,rgba(13,27,75,.05),transparent)"
    }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <ST pre="PERSONAL" acc="QUALITIES" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
                {QUALITIES.map((q, i) => (
                    <div key={i} className="rv card-pro ccsm" style={{
                        padding: "26px 22px", animationDelay: i * .1 + "s",
                        background: "linear-gradient(135deg,rgba(13,27,75,.28),rgba(4,8,15,.72))",
                        border: "1px solid rgba(192,18,26,.2)", borderTop: "3px solid #c0121a",
                    }}>
                        <div style={{ fontSize: "2.2rem", marginBottom: 10 }}>{q.ic}</div>
                        <div className="fb" style={{ fontSize: "1.15rem", letterSpacing: 3, color: "#f5c842", marginBottom: 8 }}>{q.q}</div>
                        <p className="fr" style={{ fontSize: ".9rem", lineHeight: 1.7, color: "rgba(240,240,240,.62)" }}>{q.d}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ══════ CONTACT ══════ */
const Contact = () => (
    <section id="contact" style={{
        position: "relative", zIndex: 10, padding: "100px 24px", textAlign: "center",
        background: "linear-gradient(to bottom,transparent,rgba(13,27,75,.05),transparent)"
    }}>
        <ST pre="GET IN" acc="TOUCH" />
        <div className="rv" style={{ maxWidth: 640, margin: "0 auto" }}>
            <Emblem size={68} style={{ margin: "0 auto 18px", display: "block", opacity: .58 }} className="a-float" />
            <p className="fr" style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(240,240,240,.62)", marginBottom: 36 }}>
                Looking for a motivated front-end developer passionate about building great web experiences? My spider-sense is tingling — let's connect!
            </p>

            {/* Real contact info */}
            <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 1,
                background: "rgba(192,18,26,.1)", border: "1px solid rgba(192,18,26,.2)",
                marginBottom: 32, textAlign: "left"
            }}>
                {[
                    { lb: "📞 Phone", val: "+855 96-6051-926" },
                    { lb: "📧 Email", val: "chhornvibol19@gmail.com" },
                    { lb: "🐙 GitHub", val: "github.com/vibol18" },
                    { lb: "📍 Location", val: "Phnom Penh, Cambodia" },
                ].map(s => (
                    <div key={s.lb} style={{ padding: "16px 20px", borderBottom: "1px solid rgba(192,18,26,.15)" }}>
                        <div className="fj" style={{ fontSize: ".62rem", letterSpacing: 3, color: "rgba(192,18,26,.9)", textTransform: "uppercase", marginBottom: 4 }}>{s.lb}</div>
                        <div className="fr" style={{ fontSize: ".95rem", color: "rgba(240,240,240,.82)", letterSpacing: 1 }}>{s.val}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 36 }}>
                {[
                    { ic: "📧", lb: "EMAIL", href: "mailto:chhornvibol19@gmail.com" },
                    { ic: "🐙", lb: "GITHUB", href: "https://github.com/vibol18" },
                    { ic: "📞", lb: "CALL", href: "tel:+85596605192" },
                ].map(s => (
                    <a key={s.lb} href={s.href} data-c className="fb chex"
                        style={{
                            fontSize: ".82rem", letterSpacing: 3, padding: "10px 22px",
                            background: "linear-gradient(135deg,rgba(13,27,75,.48),rgba(4,8,15,.8))",
                            border: "1px solid rgba(192,18,26,.25)", color: "#f0f0f0",
                            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all .22s"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(192,18,26,.22)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg,rgba(13,27,75,.48),rgba(4,8,15,.8))"; e.currentTarget.style.transform = ""; }}>
                        {s.ic} {s.lb}
                    </a>
                ))}
            </div>

            <button data-c className="chex fb"
                style={{
                    fontSize: "1rem", letterSpacing: 5, padding: "16px 44px", background: "#c0121a",
                    color: "#fff", border: "none", boxShadow: "0 6px 32px rgba(192,18,26,.5)",
                    animation: "pulseR 2.5s ease-in-out infinite", transition: "transform .22s"
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; }}>
                🕷 HIRE ME NOW
            </button>
        </div>
    </section>
);

/* ══════ FOOTER ══════ */
const Footer = () => (
    <footer style={{ position: "relative", zIndex: 10, borderTop: "1px solid rgba(192,18,26,.16)", padding: "30px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 7, flexWrap: "wrap" }}>
            <Emblem size={24} />
            <span className="fb" style={{ letterSpacing: 4, fontSize: ".82rem", color: "rgba(240,240,240,.25)" }}>
                CRAFTED BY <span style={{ color: "#c0121a" }}>CHHORN VIBOL</span> · THE FRIENDLY NEIGHBORHOOD DEVELOPER · © 2025
            </span>
        </div>
        <div className="fj" style={{ fontSize: ".6rem", letterSpacing: 4, color: "rgba(240,240,240,.16)", textTransform: "uppercase" }}>
            "With great power comes great responsibility" · Phnom Penh, Cambodia
        </div>
    </footer>
);

/* ══════ APP ══════ */
export default function App() {
    const act = useActive();
    useStrands();
    useReveal();

    return (
        <>
            <G />
            <div id="cd" /><div id="cr" />
            <div id="cw">
                <svg viewBox="0 0 50 50" width="50" height="50">
                    {[6, 14, 22].map(r => <circle key={r} cx="25" cy="25" r={r} stroke="rgba(245,200,66,.7)" strokeWidth=".6" fill="none" />)}
                    {[0, 45, 90, 135].map(a => <line key={a} x1="25" y1="3" x2="25" y2="47" stroke="rgba(245,200,66,.5)" strokeWidth=".5" style={{ transform: `rotate(${a}deg)`, transformOrigin: "25px 25px" }} />)}
                </svg>
            </div>
            <Cursor />
            <ScrollSpider />

            <div className="fr" style={{ background: "#04080f", color: "#f0f0f0", minHeight: "100vh", overflowX: "hidden" }}>
                <Nav act={act} />
                <Hero />
                <div className="divider" />
                <About />
                <div className="divider" />
                <Skills />
                <div className="divider" />
                <Education />
                <div className="divider" />
                <Projects />
                <div className="divider" />
                <Qualities />
                <div className="divider" />
                <Contact />
                <Footer />
            </div>
        </>
    );
}