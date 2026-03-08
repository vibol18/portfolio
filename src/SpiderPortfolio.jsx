import { useState, useEffect, useRef } from "react";
import { FaCode, FaPalette, FaServer, FaTools, FaCloud } from "react-icons/fa";
const G = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    :root {
      --ink:#0a0a0b; --red:#c0392b; --red2:#e74c3c; --gold:#d4af72;
      --dim:#1c1c1f; --mid:#2e2e33; --muted:#5a5a62; --soft:#a0a0a8;
      --light:#e8e8ec; --white:#f5f4f0;
      --ff-head:'Bebas Neue','Arial Narrow',sans-serif;
      --ff-body:'Cormorant Garamond',Georgia,serif;
      --ff-mono:'DM Mono',monospace;
    }
    body { background:var(--ink); color:var(--light); font-family:var(--ff-body); -webkit-font-smoothing:antialiased; overflow-x:hidden; }

    /* Cursor */
    #cur-dot { position:fixed; width:7px; height:7px; border-radius:50%; background:var(--red); pointer-events:none; z-index:9999; transform:translate(-50%,-50%); transition:width .2s,height .2s,background .2s; }
    #cur-ring { position:fixed; width:28px; height:28px; border-radius:50%; border:1px solid rgba(192,57,43,.45); pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition:left .06s,top .06s,width .25s,height .25s; }
    #cur-dot.hover { width:12px; height:12px; background:var(--gold); }
    #cur-ring.hover { width:42px; height:42px; border-color:rgba(212,175,114,.35); }

    /* NAV */
    .nav-wrap { position:fixed; top:0; left:0; right:0; z-index:500; padding:0 3vw; display:flex; align-items:center; justify-content:space-between; height:52px; transition:background .4s,border-color .4s; }
    .nav-wrap.scrolled { background:rgba(10,10,11,.94); backdrop-filter:blur(18px); border-bottom:1px solid var(--dim); }
    .nav-logo { font-family:var(--ff-head); font-size:16px; letter-spacing:3px; color:var(--white); display:flex; align-items:center; gap:7px; }
    .nav-logo span { color:var(--red); }
    .nav-links { display:flex; gap:24px; list-style:none; }
    .nav-links button { font-family:var(--ff-mono); font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); background:transparent; border:none; cursor:pointer; transition:color .2s; padding:3px 0; position:relative; }
    .nav-links button::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:var(--red); transition:width .25s; }
    .nav-links button:hover,.nav-links button.active { color:var(--light); }
    .nav-links button:hover::after,.nav-links button.active::after { width:100%; }
    .nav-cta { font-family:var(--ff-mono); font-size:9px; letter-spacing:.18em; text-transform:uppercase; padding:7px 18px; border:1px solid var(--red); color:var(--red); background:transparent; cursor:pointer; transition:all .2s; }
    .nav-cta:hover { background:var(--red); color:var(--white); }
    .hamburger { display:none; flex-direction:column; gap:4px; background:transparent; border:none; cursor:pointer; padding:4px; }
    .hamburger span { display:block; width:18px; height:1px; background:var(--light); transition:all .3s; }
    .mobile-nav { display:none; position:fixed; inset:0; z-index:490; background:var(--ink); flex-direction:column; align-items:center; justify-content:center; gap:28px; }
    .mobile-nav.open { display:flex; animation:fadeIn .3s ease; }
    .mobile-nav button { font-family:var(--ff-head); font-size:40px; letter-spacing:5px; color:var(--light); background:transparent; border:none; cursor:pointer; transition:color .2s; }
    .mobile-nav button:hover { color:var(--red); }

    /* Hero */
    .hero { min-height:100vh; position:relative; overflow:hidden; display:flex; align-items:center; padding:0 5vw; padding-top:52px; }
    .hero-bg { position:absolute; inset:0; z-index:0; pointer-events:none; }
    .hero-overlay { position:absolute; inset:0; z-index:1; pointer-events:none; background:linear-gradient(105deg,rgba(10,10,11,.93) 0%,rgba(10,10,11,.78) 38%,rgba(10,10,11,.28) 62%,rgba(10,10,11,.08) 100%); }
    .hero-glow { position:absolute; right:2%; top:50%; transform:translateY(-50%); width:54vw; height:85vh; border-radius:50%; z-index:2; pointer-events:none; background:radial-gradient(ellipse at center,rgba(192,57,43,.22) 0%,transparent 68%); filter:blur(50px); }
    .hero-inner { position:relative; z-index:3; display:grid; grid-template-columns:1fr 1fr; width:100%; align-items:center; }
    .hero-left { padding-right:3vw; }
    .hero-eyebrow { font-family:var(--ff-mono); font-size:10px; letter-spacing:.3em; color:var(--gold); text-transform:uppercase; margin-bottom:22px; display:flex; align-items:center; gap:10px; }
    .hero-eyebrow::before { content:''; flex:1; max-width:36px; height:1px; background:var(--gold); }
    .hero-name { font-family:var(--ff-head); font-size:clamp(58px,8.5vw,128px); line-height:.92; letter-spacing:2px; color:var(--white); margin-bottom:8px; }
    .hero-name em { color:var(--red); font-style:normal; display:block; }
    .hero-role { font-family:var(--ff-body); font-size:clamp(16px,1.7vw,22px); font-weight:300; font-style:italic; color:var(--soft); margin-bottom:38px; line-height:1.5; }
    .hero-btns { display:flex; gap:14px; flex-wrap:wrap; }
    .btn-primary { font-family:var(--ff-mono); font-size:10px; letter-spacing:.2em; text-transform:uppercase; padding:13px 28px; background:var(--red); color:var(--white); border:none; cursor:pointer; transition:all .2s; }
    .btn-primary:hover { background:var(--red2); transform:translateY(-2px); box-shadow:0 12px 32px rgba(192,57,43,.35); }
    .btn-ghost { font-family:var(--ff-mono); font-size:10px; letter-spacing:.2em; text-transform:uppercase; padding:12px 28px; background:transparent; color:var(--light); border:1px solid var(--mid); cursor:pointer; transition:all .2s; }
    .btn-ghost:hover { border-color:var(--soft); transform:translateY(-2px); }
    .hero-right { position:relative; height:calc(100vh - 52px); display:flex; align-items:flex-end; justify-content:center; }
    .hero-stats { position:absolute; bottom:72px; left:5vw; z-index:4; display:grid; grid-template-columns:repeat(4,1fr); gap:0; border:1px solid rgba(255,255,255,.07); background:rgba(10,10,11,.55); backdrop-filter:blur(12px); }
    .hero-stat { padding:16px 22px; border-right:1px solid rgba(255,255,255,.07); }
    .hero-stat:last-child { border-right:none; }
    .hero-stat-num { font-family:var(--ff-head); font-size:28px; letter-spacing:2px; color:var(--white); line-height:1; }
    .hero-stat-label { font-family:var(--ff-mono); font-size:8px; letter-spacing:.2em; color:var(--muted); text-transform:uppercase; margin-top:4px; }
    .hero-scroll { position:absolute; right:3vw; bottom:72px; z-index:4; display:flex; flex-direction:column; align-items:center; gap:10px; }
    .hero-scroll span { font-family:var(--ff-mono); font-size:8px; letter-spacing:.25em; color:var(--muted); text-transform:uppercase; writing-mode:vertical-rl; }
    .hero-scroll-line { width:1px; height:56px; background:linear-gradient(to bottom,var(--red),transparent); animation:scrollPulse 2s ease-in-out infinite; }

    /* Sections */
    section { padding:110px 4vw; }
    .section-header { display:flex; align-items:flex-end; gap:28px; margin-bottom:60px; }
    .section-num { font-family:var(--ff-head); font-size:100px; color:var(--dim); line-height:1; letter-spacing:-2px; user-select:none; flex-shrink:0; }
    .section-label { font-family:var(--ff-mono); font-size:10px; letter-spacing:.3em; color:var(--red); text-transform:uppercase; margin-bottom:8px; }
    .section-title { font-family:var(--ff-head); font-size:clamp(36px,5vw,72px); letter-spacing:3px; color:var(--white); line-height:1; }
    .section-line { width:100%; height:1px; background:var(--dim); margin-bottom:64px; }

    /* About */
    .about-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:64px; align-items:start; }
    .about-img-card { aspect-ratio:.75; background:var(--dim); display:flex; align-items:center; justify-content:center; overflow:hidden; border:1px solid var(--mid); position:relative; }
    .about-img-inner { font-size:100px; filter:drop-shadow(0 0 40px rgba(192,57,43,.5)); animation:levitate 5s ease-in-out infinite; }
    .about-img-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(10,10,11,.8) 0%,transparent 50%); }
    .about-img-tag { position:absolute; bottom:20px; left:20px; font-family:var(--ff-mono); font-size:9px; letter-spacing:.2em; color:var(--gold); text-transform:uppercase; }
    .about-accent { position:absolute; top:-1px; left:-1px; width:36px; height:3px; background:var(--red); }
    .about-intro { font-size:clamp(18px,2.4vw,29px); font-weight:300; font-style:italic; color:var(--white); line-height:1.45; margin-bottom:22px; }
    .about-body { font-size:16px; color:var(--soft); line-height:1.8; margin-bottom:16px; }
    .about-quote { border-left:2px solid var(--red); padding-left:22px; margin:30px 0; font-style:italic; font-size:17px; color:var(--gold); line-height:1.6; }
    .about-tags { display:flex; flex-wrap:wrap; gap:7px; margin-top:26px; }
    .tag { font-family:var(--ff-mono); font-size:9px; letter-spacing:.13em; text-transform:uppercase; padding:6px 12px; border:1px solid var(--mid); color:var(--muted); transition:all .2s; }
    .tag:hover { border-color:var(--red); color:var(--light); }

    /* Skills */
    .skills-bg { background:var(--dim); }
    .skills-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--mid); border:1px solid var(--mid); }
    .skill-card { background:var(--dim); padding:32px 26px; transition:background .2s; }
    .skill-card:hover { background:#212126; }
    .skill-icon { font-size:22px; margin-bottom:14px; }
    .skill-title { font-family:var(--ff-head); font-size:22px; letter-spacing:3px; color:var(--white); margin-bottom:20px; }
    .skill-item { margin-bottom:15px; }
    .skill-item-top { display:flex; justify-content:space-between; font-family:var(--ff-mono); font-size:9px; letter-spacing:.1em; color:var(--muted); margin-bottom:7px; }
    .skill-item-top span:last-child { color:var(--gold); }
    .skill-bar-bg { height:1px; background:var(--mid); position:relative; }
    .skill-bar-fill { position:absolute; top:0; left:0; height:100%; background:var(--red); transition:width 1.4s cubic-bezier(.25,.46,.45,.94); }

    /* Education */
    .edu-item { display:grid; grid-template-columns:150px 1px 1fr; gap:0 34px; align-items:start; padding:40px 0; border-bottom:1px solid var(--dim); }
    .edu-item:first-child { border-top:1px solid var(--dim); }
    .edu-year { font-family:var(--ff-head); font-size:14px; letter-spacing:3px; color:var(--muted); padding-top:4px; }
    .edu-line { background:var(--dim); position:relative; }
    .edu-dot { width:8px; height:8px; border-radius:50%; background:var(--red); position:absolute; top:4px; left:-4px; box-shadow:0 0 10px rgba(192,57,43,.5); }
    .edu-degree { font-family:var(--ff-head); font-size:clamp(18px,2.5vw,30px); letter-spacing:2px; color:var(--white); margin-bottom:4px; line-height:1.1; }
    .edu-school { font-family:var(--ff-mono); font-size:10px; letter-spacing:.2em; color:var(--red); text-transform:uppercase; margin-bottom:12px; }
    .edu-desc { font-size:15px; color:var(--soft); line-height:1.75; }
    .edu-icon { font-size:18px; margin-bottom:10px; }

    /* Experience */
    .exp-item { padding:40px 0; border-bottom:1px solid var(--dim); }
    .exp-item:first-child { border-top:1px solid var(--dim); }
    .exp-title { font-family:var(--ff-head); font-size:clamp(20px,2.8vw,34px); letter-spacing:2px; color:var(--white); margin-bottom:6px; }
    .exp-sub { font-family:var(--ff-mono); font-size:10px; letter-spacing:.2em; color:var(--gold); text-transform:uppercase; margin-bottom:18px; }
    .exp-list { list-style:none; display:flex; flex-direction:column; gap:10px; }
    .exp-list li { font-size:15px; color:var(--soft); line-height:1.7; padding-left:16px; position:relative; }
    .exp-list li::before { content:'→'; position:absolute; left:0; color:var(--red); font-size:12px; top:3px; }

    /* Projects */
    .proj-row { display:grid; grid-template-columns:64px 1fr 180px 110px; align-items:center; gap:26px; padding:24px 0; border-bottom:1px solid var(--dim); cursor:pointer; transition:padding-left .25s; position:relative; }
    .proj-row::before { content:''; position:absolute; left:0; top:0; bottom:0; width:0; background:var(--red); transition:width .25s; }
    .proj-row:hover { padding-left:14px; }
    .proj-row:hover::before { width:3px; }
    .proj-num { font-family:var(--ff-head); font-size:13px; letter-spacing:3px; color:var(--muted); }
    .proj-title { font-family:var(--ff-head); font-size:clamp(18px,2vw,26px); letter-spacing:2px; color:var(--white); margin-bottom:4px; transition:color .2s; }
    .proj-row:hover .proj-title { color:var(--gold); }
    .proj-desc { font-family:var(--ff-body); font-size:13px; color:var(--muted); }
    .proj-tags { display:flex; flex-wrap:wrap; gap:5px; }
    .proj-tag { font-family:var(--ff-mono); font-size:8px; letter-spacing:.13em; color:var(--muted); border:1px solid var(--dim); padding:3px 8px; }
    .proj-arrow { font-family:var(--ff-mono); font-size:10px; color:var(--red); text-align:right; opacity:0; transition:opacity .2s,transform .2s; }
    .proj-row:hover .proj-arrow { opacity:1; transform:translateX(4px); }
    .proj-expand { display:none; padding:18px 64px 26px; border-bottom:1px solid var(--dim); background:#0e0e10; }
    .proj-expand.open { display:block; animation:slideDown .25s ease; }
    .proj-expand p { font-size:15px; color:var(--soft); line-height:1.75; max-width:560px; }

    /* Contact */
    .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
    .contact-big { font-family:var(--ff-head); font-size:clamp(50px,8vw,118px); letter-spacing:2px; color:var(--white); line-height:.92; margin-bottom:20px; }
    .contact-big span { color:var(--red); }
    .contact-sub { font-size:16px; font-style:italic; color:var(--soft); line-height:1.7; max-width:420px; }
    .contact-links { margin-top:30px; display:flex; flex-direction:column; gap:1px; }
    .contact-link { display:flex; align-items:center; justify-content:space-between; padding:14px 0; border-bottom:1px solid var(--dim); font-family:var(--ff-mono); font-size:10px; letter-spacing:.13em; color:var(--muted); text-transform:uppercase; transition:color .2s; background:transparent; border-top:none; border-left:none; border-right:none; width:100%; cursor:pointer; }
    .contact-link:hover { color:var(--light); }
    .contact-link span:last-child { color:var(--red); }
    .contact-form-label { font-family:var(--ff-mono); font-size:8px; letter-spacing:.25em; color:var(--muted); text-transform:uppercase; margin-bottom:7px; display:block; }
    .contact-input { width:100%; background:transparent; border:none; border-bottom:1px solid var(--mid); padding:10px 0; font-family:var(--ff-body); font-size:16px; color:var(--light); outline:none; transition:border-color .2s; margin-bottom:26px; }
    .contact-input:focus { border-color:var(--red); }
    .contact-textarea { resize:none; min-height:100px; }

    /* Language bars */
    .lang-item { margin-bottom:18px; }
    .lang-top { display:flex; justify-content:space-between; font-family:var(--ff-mono); font-size:9px; letter-spacing:.1em; color:var(--muted); margin-bottom:7px; }
    .lang-top span:last-child { color:var(--gold); }
    .lang-bar-bg { height:1px; background:var(--mid); position:relative; }
    .lang-bar-fill { position:absolute; top:0; left:0; height:100%; background:linear-gradient(to right,var(--red),var(--gold)); transition:width 1.4s cubic-bezier(.25,.46,.45,.94); }

    /* Footer */
    .footer { padding:32px 4vw; border-top:1px solid var(--dim); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:14px; }
    .footer-logo { font-family:var(--ff-head); font-size:15px; letter-spacing:4px; color:var(--muted); }
    .footer-copy { font-family:var(--ff-mono); font-size:9px; letter-spacing:.14em; color:var(--muted); }
    .footer-quote { font-family:var(--ff-body); font-style:italic; font-size:12px; color:var(--muted); }

    /* Scroll Spider */
    #sc-spider { position:fixed; right:20px; z-index:600; pointer-events:none; transition:top .1s linear; }
    .sc-thread { position:fixed; right:33px; top:52px; width:1px; background:linear-gradient(to bottom,rgba(212,175,114,.5),rgba(212,175,114,.1)); z-index:599; pointer-events:none; transition:height .1s linear; }

    /* Reveal */
    .reveal { opacity:0; transform:translateY(22px); transition:opacity .8s ease,transform .8s ease; }
    .reveal.in { opacity:1; transform:none; }

    /* Keyframes */
    @keyframes levitate    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
    @keyframes scrollPulse { 0%,100%{opacity:.3} 50%{opacity:1} }
    @keyframes fadeIn      { from{opacity:0} to{opacity:1} }
    @keyframes slideDown   { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
    @keyframes heroFloat   { 0%,100%{transform:translateY(0) rotate(-1.2deg)} 50%{transform:translateY(-18px) rotate(1.8deg)} }
    @keyframes windowBlink { 0%,100%{opacity:.85} 46%{opacity:.12} 50%{opacity:.85} }
    @keyframes neonFlicker { 0%,100%{opacity:1} 91%{opacity:1} 92%{opacity:.25} 93%{opacity:1} 97%{opacity:.5} 98%{opacity:1} }

    /* Responsive */
    @media(max-width:900px){
      .hero-inner{grid-template-columns:1fr}
      .hero-right{height:260px}
      .hero-stats{position:static;margin-top:36px;grid-template-columns:repeat(2,1fr)}
      .hero-scroll{display:none}
      .about-grid{grid-template-columns:1fr}
      .skills-grid{grid-template-columns:repeat(2,1fr)}
      .contact-grid{grid-template-columns:1fr}
      .proj-row{grid-template-columns:44px 1fr}
      .proj-tags,.proj-arrow{display:none}
      .nav-links,.nav-cta{display:none}
      .hamburger{display:flex}
      .section-num{font-size:64px}
      .edu-item{grid-template-columns:88px 1px 1fr;gap:0 18px}
    }
    @media(max-width:600px){
      section{padding:70px 5vw}
      .hero{padding:80px 5vw 56px}
      .skills-grid{grid-template-columns:1fr}
    }
  `}</style>
);

/* ── ANIME CITY ── */
const AnimeCity = () => (
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        preserveAspectRatio="xMidYMid slice">
        <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#060814" /><stop offset="40%" stopColor="#0c0e1f" /><stop offset="100%" stopColor="#0a0a0b" /></linearGradient>
            <radialGradient id="sg1" cx="72%" cy="28%" r="38%"><stop offset="0%" stopColor="rgba(160,30,20,.32)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
            <radialGradient id="sg2" cx="22%" cy="48%" r="28%"><stop offset="0%" stopColor="rgba(30,40,140,.22)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
            <linearGradient id="bA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#14182e" /><stop offset="100%" stopColor="#0c0e1a" /></linearGradient>
            <linearGradient id="bB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a1026" /><stop offset="100%" stopColor="#0e0c18" /></linearGradient>
            <linearGradient id="bC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0e1420" /><stop offset="100%" stopColor="#090c14" /></linearGradient>
            <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="transparent" /><stop offset="55%" stopColor="rgba(10,12,26,.45)" /><stop offset="100%" stopColor="rgba(10,10,11,.92)" /></linearGradient>
            <filter id="neon" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="neonS" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <rect width="1440" height="900" fill="url(#sky)" />
        <rect width="1440" height="900" fill="url(#sg1)" />
        <rect width="1440" height="900" fill="url(#sg2)" />
        {[[80, 40], [155, 88], [235, 24], [345, 58], [425, 34], [505, 82], [608, 20], [705, 54], [802, 30], [904, 68], [1002, 38], [1104, 84], [1202, 28], [1304, 58], [1382, 44], [1052, 14], [952, 48], [652, 74], [452, 14], [252, 68]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? .9 : .5} fill="white" opacity=".35" />
        ))}
        {[[0, 60, 220], [55, 80, 280], [130, 50, 200], [175, 90, 310], [260, 55, 240], [310, 70, 260], [375, 45, 190], [415, 85, 320], [495, 60, 250], [550, 100, 350], [645, 55, 220], [695, 80, 290], [770, 65, 270], [830, 90, 330], [915, 50, 210], [960, 75, 275], [1030, 95, 340], [1120, 55, 230], [1170, 80, 300], [1245, 60, 250], [1300, 85, 310], [1380, 65, 260]].map(([x, w, h], i) => (
            <rect key={i} x={x} y={900 - h} width={w} height={h} fill="#0d1020" opacity=".65" />
        ))}
        <rect x="0" y="320" width="108" height="580" fill="url(#bA)" />
        <rect x="48" y="278" width="4" height="26" fill="#c0392b" opacity=".8" />
        {[340, 380, 420, 460, 500, 540, 580, 620, 660, 700, 740].map((y, i) => [10, 30, 50, 70, 88].map((x, j) => (
            <rect key={`b1-${i}-${j}`} x={x} y={y} width="12" height="14" fill={((i + j) % 3 === 0) ? "#d4af72" : "#1e2340"} opacity=".6" style={{ animation: `windowBlink ${2.5 + ((i * j) % 4)}s ease-in-out ${(i + j) % 3}s infinite` }} />
        )))}
        <rect x="100" y="195" width="178" height="705" fill="url(#bB)" />
        <rect x="125" y="428" width="128" height="26" rx="2" fill="none" stroke="#c0392b" strokeWidth="1.5" style={{ animation: "neonFlicker 6s linear infinite", filter: "url(#neon)" }} />
        <text x="189" y="446" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#e74c3c" style={{ animation: "neonFlicker 6s linear infinite .3s", filter: "url(#neon)" }}>NORTON UNIV</text>
        {[218, 258, 298, 338, 378, 418, 458, 498, 538, 578, 618, 658, 698, 738, 778, 818, 858].map((y, i) => [115, 140, 165, 190, 215, 243].map((x, j) => (
            <rect key={`b2-${i}-${j}`} x={x} y={y} width="15" height="18" fill={((i * 3 + j) % 4 === 0) ? "#d4af72" : "#201840"} opacity=".58" style={{ animation: `windowBlink ${2 + ((i + j * 2) % 5)}s ease-in-out ${(i * j) % 4}s infinite` }} />
        )))}
        <rect x="268" y="98" width="68" height="802" fill="url(#bC)" />
        <rect x="301" y="38" width="4" height="43" fill="#c0392b" opacity=".9" />
        <rect x="266" y="120" width="3" height="200" fill="#1a2d6e" opacity=".7" style={{ filter: "url(#neon)" }} />
        {[120, 158, 196, 234, 272, 310, 348, 388, 428, 468, 508, 548, 588, 628, 668, 708, 748].map((y, i) => [276, 297, 318].map((x, j) => (
            <rect key={`b3-${i}-${j}`} x={x} y={y} width="11" height="16" fill={((i + j) % 3 === 0) ? "#d4af72" : "#181e38"} opacity=".58" style={{ animation: `windowBlink ${3 + (i % 3)}s ease-in-out ${j * 1.2}s infinite` }} />
        )))}
        <rect x="328" y="248" width="148" height="652" fill="url(#bA)" />
        <rect x="343" y="498" width="118" height="22" rx="1" fill="none" stroke="#1a2d6e" strokeWidth="1.5" style={{ animation: "neonFlicker 8s linear infinite 1s", filter: "url(#neon)" }} />
        <text x="402" y="514" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#3a5fc8" style={{ animation: "neonFlicker 8s linear infinite 1.4s", filter: "url(#neon)" }}>ETEC CENTER</text>
        {[268, 308, 348, 388, 428, 468, 508, 548, 588, 628, 668, 708, 748].map((y, i) => [340, 363, 386, 413, 443].map((x, j) => (
            <rect key={`b4-${i}-${j}`} x={x} y={y} width="13" height="16" fill={((i + j * 2) % 4 === 0) ? "#c9a84c" : "#1c2040"} opacity=".55" style={{ animation: `windowBlink ${2.2 + (i % 4)}s ease-in-out ${(j + i * .5) % 3.5}s infinite` }} />
        )))}
        <rect x="468" y="58" width="128" height="842" fill="url(#bB)" />
        <rect x="532" y="8" width="4" height="38" fill="#e74c3c" opacity=".95" />
        <rect x="476" y="348" width="116" height="30" rx="2" fill="none" stroke="#c0392b" strokeWidth="2" style={{ animation: "neonFlicker 5s linear infinite", filter: "url(#neonS)" }} />
        <text x="534" y="369" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#e74c3c" style={{ animation: "neonFlicker 5s linear infinite .2s", filter: "url(#neonS)" }}>VIBOL.DEV</text>
        {[78, 118, 158, 198, 238, 278, 318, 358, 398, 438, 478, 518, 558, 598, 638, 678, 718, 758, 798].map((y, i) => [478, 501, 524, 551, 576].map((x, j) => (
            <rect key={`b5-${i}-${j}`} x={x} y={y} width="14" height="18" fill={((i * 2 + j) % 4 === 0) ? "#d4af72" : "#1c1840"} opacity=".58" style={{ animation: `windowBlink ${1.8 + (i % 5)}s ease-in-out ${(i + j) % 4}s infinite` }} />
        )))}
        <rect x="588" y="178" width="158" height="722" fill="url(#bC)" />
        <rect x="601" y="558" width="138" height="24" rx="1" fill="none" stroke="#d4af72" strokeWidth="1.5" style={{ animation: "neonFlicker 7s linear infinite 2s", filter: "url(#neon)" }} />
        <text x="670" y="575" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#c9a84c" style={{ animation: "neonFlicker 7s linear infinite 2.3s", filter: "url(#neon)" }}>PHNOM PENH</text>
        {[198, 238, 278, 318, 358, 398, 438, 478, 518, 558, 598, 638, 678, 718, 758].map((y, i) => [598, 623, 650, 678, 708, 733].map((x, j) => (
            <rect key={`b6-${i}-${j}`} x={x} y={y} width="13" height="16" fill={((i + j * 3) % 4 === 0) ? "#d4af72" : "#1a1e3c"} opacity=".52" style={{ animation: `windowBlink ${2.5 + (i % 3)}s ease-in-out ${j * .8}s infinite` }} />
        )))}
        <rect x="738" y="138" width="88" height="762" fill="url(#bA)" />
        <rect x="736" y="143" width="2" height="280" fill="#c0392b" opacity=".65" style={{ filter: "url(#neon)" }} />
        {[158, 198, 238, 278, 318, 358, 398, 438, 478, 518, 558, 598, 638, 678, 718, 758].map((y, i) => [746, 766, 788, 810].map((x, j) => (
            <rect key={`b7-${i}-${j}`} x={x} y={y} width="12" height="15" fill={((i * j) % 4 === 0) ? "#c9a84c" : "#181e38"} opacity=".52" style={{ animation: `windowBlink ${2 + (i % 4)}s ease-in-out ${(i + j) % 4}s infinite` }} />
        )))}
        <rect x="818" y="218" width="198" height="682" fill="url(#bB)" />
        <rect x="830" y="418" width="170" height="28" rx="2" fill="none" stroke="#c0392b" strokeWidth="2" style={{ animation: "neonFlicker 4.5s linear infinite .5s", filter: "url(#neonS)" }} />
        <text x="915" y="438" textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="#e74c3c" style={{ animation: "neonFlicker 4.5s linear infinite .8s", filter: "url(#neonS)" }}>REACTJS · HTML · CSS</text>
        {[238, 278, 318, 358, 398, 438, 478, 518, 558, 598, 638, 678, 718, 758].map((y, i) => [828, 858, 890, 922, 954, 983].map((x, j) => (
            <rect key={`b8-${i}-${j}`} x={x} y={y} width="15" height="18" fill={((i + j) % 4 === 0) ? "#d4af72" : "#1c1840"} opacity=".55" style={{ animation: `windowBlink ${2.2 + (i % 5)}s ease-in-out ${(i * j) % 4}s infinite` }} />
        )))}
        <rect x="1008" y="88" width="118" height="812" fill="url(#bC)" />
        <rect x="1067" y="32" width="4" height="44" fill="#c0392b" opacity=".9" />
        {[108, 148, 188, 228, 268, 308, 348, 388, 428, 468, 508, 548, 588, 628, 668, 708, 748, 788, 828].map((y, i) => [1016, 1038, 1062, 1088].map((x, j) => (
            <rect key={`b9-${i}-${j}`} x={x} y={y} width="12" height="16" fill={((i * 2 + j) % 4 === 0) ? "#d4af72" : "#181e38"} opacity=".55" style={{ animation: `windowBlink ${2 + (i % 5)}s ease-in-out ${j * 1.1}s infinite` }} />
        )))}
        <rect x="1118" y="158" width="138" height="742" fill="url(#bA)" />
        <rect x="1128" y="638" width="118" height="24" rx="1" fill="none" stroke="#1a2d6e" strokeWidth="1.5" style={{ animation: "neonFlicker 9s linear infinite 3s", filter: "url(#neon)" }} />
        <text x="1187" y="655" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#3a5fc8" style={{ animation: "neonFlicker 9s linear infinite 3.3s", filter: "url(#neon)" }}>JAVASCRIPT</text>
        {[178, 218, 258, 298, 338, 378, 418, 458, 498, 538, 578, 618, 658, 698, 738, 778].map((y, i) => [1126, 1150, 1178, 1208, 1234].map((x, j) => (
            <rect key={`b10-${i}-${j}`} x={x} y={y} width="13" height="16" fill={((i + j * 2) % 4 === 0) ? "#c9a84c" : "#1c2040"} opacity=".52" style={{ animation: `windowBlink ${2.5 + (i % 4)}s ease-in-out ${(j + i * .6) % 3.5}s infinite` }} />
        )))}
        <rect x="1248" y="198" width="98" height="702" fill="url(#bB)" />
        <rect x="1338" y="128" width="102" height="772" fill="url(#bC)" />
        <path d="M 55 305 Q 185 378 268 290" fill="none" stroke="rgba(245,200,66,.18)" strokeWidth="1.2" />
        <path d="M 268 95 Q 398 158 468 58" fill="none" stroke="rgba(245,200,66,.16)" strokeWidth="1" />
        <path d="M 338 245 Q 448 308 588 175" fill="none" stroke="rgba(245,200,66,.18)" strokeWidth="1.1" />
        <path d="M 588 175 Q 698 228 738 135" fill="none" stroke="rgba(245,200,66,.16)" strokeWidth="1" />
        <path d="M 738 135 Q 868 198 1008 85" fill="none" stroke="rgba(245,200,66,.20)" strokeWidth="1.2" />
        <path d="M 1008 85 Q 1098 138 1118 153" fill="none" stroke="rgba(245,200,66,.14)" strokeWidth="1" />
        <path d="M 1118 153 Q 1228 198 1338 123" fill="none" stroke="rgba(245,200,66,.16)" strokeWidth="1.1" />
        <line x1="268" y1="95" x2="268" y2="0" stroke="rgba(245,200,66,.14)" strokeWidth=".8" />
        <line x1="532" y1="8" x2="532" y2="0" stroke="rgba(245,200,66,.18)" strokeWidth="1" />
        <line x1="738" y1="135" x2="738" y2="0" stroke="rgba(245,200,66,.14)" strokeWidth=".8" />
        <circle cx="1298" cy="78" r="36" fill="#f0e8d0" opacity=".20" />
        <circle cx="1298" cy="78" r="30" fill="#f5f0e0" opacity=".26" />
        <circle cx="1298" cy="78" r="72" fill="rgba(240,232,210,.04)" />
        <rect width="1440" height="900" fill="url(#fog)" opacity=".58" />
        <rect y="752" width="1440" height="148" fill="rgba(10,10,14,.68)" opacity=".8" />
    </svg>
);

/* ── ANIME SPIDER-MAN ── */
const AnimeSpiderMan = ({ style = {} }) => (
    <svg viewBox="0 0 260 520" xmlns="http://www.w3.org/2000/svg"
        style={{ ...style, filter: "drop-shadow(0 0 44px rgba(192,57,43,.6)) drop-shadow(0 0 14px rgba(192,57,43,.28))" }}>
        <defs>
            <linearGradient id="bRed" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e74c3c" /><stop offset="60%" stopColor="#c0392b" /><stop offset="100%" stopColor="#96281b" /></linearGradient>
            <linearGradient id="bBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2c3e8a" /><stop offset="100%" stopColor="#1a2460" /></linearGradient>
            <linearGradient id="shR" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(0,0,0,0)" /><stop offset="100%" stopColor="rgba(0,0,0,.3)" /></linearGradient>
            <linearGradient id="shB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(0,0,0,0)" /><stop offset="100%" stopColor="rgba(0,0,0,.35)" /></linearGradient>
            <radialGradient id="eyeG" cx="35%" cy="35%" r="60%"><stop offset="0%" stopColor="#ffffff" /><stop offset="70%" stopColor="#e0f0ff" /><stop offset="100%" stopColor="#b8d8f0" /></radialGradient>
            <filter id="spG" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <style>{`
      .spBody{animation:spFloat 4.5s ease-in-out infinite;transform-origin:130px 260px}
      .spAR{animation:spArmR 1.3s ease-in-out infinite;transform-origin:158px 192px}
      .spAL{animation:spArmL 1.3s ease-in-out infinite .2s;transform-origin:102px 192px}
      .spLR{animation:spLegR 1.3s ease-in-out infinite .12s;transform-origin:145px 350px}
      .spLL{animation:spLegL 1.3s ease-in-out infinite .32s;transform-origin:115px 350px}
      .spWeb{animation:spWL 2.2s ease-out infinite .7s;stroke-dasharray:95;stroke-dashoffset:95}
      @keyframes spFloat{0%,100%{transform:translateY(0) rotate(-1.2deg)}50%{transform:translateY(-16px) rotate(1.8deg)}}
      @keyframes spArmR{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(-52deg)}}
      @keyframes spArmL{0%,100%{transform:rotate(12deg)}50%{transform:rotate(42deg)}}
      @keyframes spLegR{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(20deg)}}
      @keyframes spLegL{0%,100%{transform:rotate(6deg)}50%{transform:rotate(-22deg)}}
      @keyframes spWL{0%{stroke-dashoffset:95;opacity:0}18%{opacity:1}100%{stroke-dashoffset:0;opacity:.65}}
    `}</style>
        <line className="spWeb" x1="197" y1="150" x2="325" y2="18" stroke="#d4af72" strokeWidth="1.5" strokeLinecap="round" filter="url(#spG)" />
        <line className="spWeb" x1="197" y1="150" x2="316" y2="8" stroke="rgba(212,175,114,.35)" strokeWidth=".8" strokeLinecap="round" style={{ animationDelay: ".12s" }} />
        <g className="spBody">
            <g className="spLL"><path d="M 108 342 Q 94 382 87 422" fill="none" stroke="url(#bBlue)" strokeWidth="25" strokeLinecap="round" /><path d="M 87 422 Q 79 462 84 492" fill="none" stroke="url(#bRed)" strokeWidth="19" strokeLinecap="round" /><ellipse cx="82" cy="496" rx="17" ry="9" fill="#c0392b" /></g>
            <g className="spLR"><path d="M 152 342 Q 166 380 173 420" fill="none" stroke="url(#bBlue)" strokeWidth="25" strokeLinecap="round" /><path d="M 173 420 Q 181 460 176 490" fill="none" stroke="url(#bRed)" strokeWidth="19" strokeLinecap="round" /><ellipse cx="177" cy="494" rx="17" ry="9" fill="#c0392b" /></g>
            <path d="M 95 197 Q 80 242 85 342 L 175 342 Q 180 242 165 197 Z" fill="url(#bBlue)" />
            <path d="M 95 197 Q 80 242 85 342 L 175 342 Q 180 242 165 197 Z" fill="url(#shB)" opacity=".5" />
            <path d="M 107 202 Q 101 242 103 332 L 157 332 Q 159 242 153 202 Z" fill="url(#bRed)" />
            <path d="M 107 202 Q 101 242 103 332 L 157 332 Q 159 242 153 202 Z" fill="url(#shR)" opacity=".5" />
            <g stroke="rgba(0,0,0,.3)" strokeWidth=".75" fill="none">
                {[[-19, -58], [-9, -63], [0, -66], [9, -63], [19, -58], [27, -48], [31, -36], [29, -24], [-29, -24], [-31, -36], [-27, -48]].map(([dx, dy], i) => (
                    <line key={i} x1="130" y1="266" x2={130 + dx * 1.7} y2={266 + dy * 1.35} />
                ))}
                <ellipse cx="130" cy="266" rx="17" ry="11" /><ellipse cx="130" cy="266" rx="33" ry="21" /><ellipse cx="130" cy="266" rx="49" ry="33" />
            </g>
            <g transform="translate(108,249)" filter="url(#spG)">
                <path d="M22 3 L34 14 L30 38 L22 30 L14 38 L10 14 Z" fill="black" opacity=".78" />
                <line x1="7" y1="14" x2="22" y2="20" stroke="black" strokeWidth="1.7" opacity=".75" />
                <line x1="5" y1="25" x2="20" y2="24" stroke="black" strokeWidth="1.7" opacity=".75" />
                <line x1="9" y1="36" x2="21" y2="28" stroke="black" strokeWidth="1.4" opacity=".65" />
                <line x1="37" y1="14" x2="22" y2="20" stroke="black" strokeWidth="1.7" opacity=".75" />
                <line x1="39" y1="25" x2="24" y2="24" stroke="black" strokeWidth="1.7" opacity=".75" />
                <line x1="35" y1="36" x2="23" y2="28" stroke="black" strokeWidth="1.4" opacity=".65" />
            </g>
            <g className="spAR"><path d="M 158 202 Q 186 177 201 157" fill="none" stroke="url(#bRed)" strokeWidth="21" strokeLinecap="round" /><path d="M 201 157 Q 211 140 197 150" fill="none" stroke="url(#bRed)" strokeWidth="17" strokeLinecap="round" /><ellipse cx="197" cy="150" rx="13" ry="9" fill="#96281b" transform="rotate(-20 197 150)" /><ellipse cx="194" cy="146" rx="3.5" ry="2.8" fill="#e74c3c" opacity=".9" transform="rotate(-20 194 146)" style={{ filter: "url(#spG)" }} /></g>
            <g className="spAL"><path d="M 102 202 Q 74 222 61 244" fill="none" stroke="url(#bBlue)" strokeWidth="21" strokeLinecap="round" /><path d="M 61 244 Q 47 264 54 280" fill="none" stroke="url(#bBlue)" strokeWidth="17" strokeLinecap="round" /><ellipse cx="53" cy="280" rx="12" ry="9" fill="#1a2460" transform="rotate(15 53 280)" /></g>
            <rect x="119" y="172" width="22" height="28" rx="5" fill="url(#bRed)" />
            <ellipse cx="130" cy="149" rx="43" ry="49" fill="url(#bRed)" />
            <ellipse cx="130" cy="149" rx="43" ry="49" fill="url(#shR)" opacity=".38" />
            <path d="M 87 141 Q 83 161 89 179 Q 101 187 119 181 Q 109 166 109 149 Q 109 133 113 121 Q 97 129 87 141Z" fill="url(#bBlue)" />
            <path d="M 173 141 Q 177 161 171 179 Q 159 187 141 181 Q 151 166 151 149 Q 151 133 147 121 Q 163 129 173 141Z" fill="url(#bBlue)" />
            <g stroke="rgba(0,0,0,.26)" strokeWidth=".85" fill="none">
                <path d="M 130 100 Q 150 117 162 142 Q 170 164 162 180" />
                <path d="M 130 100 Q 110 117 98 142 Q 90 164 98 180" />
                <path d="M 130 100 L 130 198" />
                <ellipse cx="130" cy="149" rx="21" ry="23" />
                <ellipse cx="130" cy="149" rx="37" ry="41" />
            </g>
            <path d="M 95 137 Q 89 125 101 119 Q 117 113 123 125 Q 125 137 117 143 Q 105 149 95 137 Z" fill="url(#eyeG)" style={{ filter: "url(#spG)" }} />
            <ellipse cx="105" cy="127" rx="3.8" ry="2.8" fill="white" opacity=".82" />
            <path d="M 165 137 Q 171 125 159 119 Q 143 113 137 125 Q 135 137 143 143 Q 155 149 165 137 Z" fill="url(#eyeG)" style={{ filter: "url(#spG)" }} />
            <ellipse cx="155" cy="127" rx="3.8" ry="2.8" fill="white" opacity=".82" />
        </g>
    </svg>
);

/* ── DATA — Vibol's real info ── */
const NAV = ["HOME", "ABOUT", "SKILLS", "EDUCATION", "PROJECTS", "CONTACT"];

const SKILLS_DATA = [
    { icon: FaCode, title: "Frontend", items: [{ n: "HTML / CSS", p: 92 }, { n: "JavaScript", p: 85 }, { n: "React.js", p: 82 }] },
    { icon: "", title: "UI / CSS", items: [{ n: "Bootstrap", p: 88 }, { n: "Tailwind CSS", p: 85 }, { n: "Web Design", p: 80 }] },
    { icon: "⚙️", title: "Backend", items: [{ n: "PHP / Laravel", p: 72 }, { n: "MySQL", p: 75 }, { n: "Ajax", p: 68 }] },
    { icon: "💻", title: "Other", items: [{ n: "C / C++", p: 70 }, { n: "Java", p: 65 }, { n: "Git / GitHub", p: 78 }] },
    {
        icon: FaServer,
        title: "Server / Backend",
        items: [
            { n: "PHP / Laravel", p: 72 },
            { n: "MySQL", p: 75 },
            { n: "REST API", p: 70 }
        ]
    },
    {
        icon: FaCloud,
        title: "DevOps",
        items: [
            { n: "Docker", p: 60 },
            { n: "Linux Server", p: 70 },
            { n: "CI/CD", p: 55 }
        ]
    },
    {
        icon: FaTools,
        title: "Tools",
        items: [
            { n: "Git / GitHub", p: 78 },
            { n: "Postman", p: 75 },
            { n: "VS Code", p: 90 }
        ]
    }
];

const EDU = [
    { year: "2024–2025", icon: "🎓", degree: "Bachelor's in ICT Management", school: "Norton University", desc: "Currently enrolled. Focused on ICT management, systems thinking, and technology leadership. Actively building real-world front-end projects alongside coursework." },
    { year: "2024–2025", icon: "📐", degree: "Bachelor's in Information Technology", school: "ETEC Center", desc: "Hands-on program covering full-stack fundamentals including HTML, CSS, JavaScript, PHP, MySQL, and ReactJS development." },
];

const PROJECTS_DATA = [
    { num: "01", tag: "Frontend", title: "RESPONSIVE WEBSITES", tech: ["HTML", "CSS", "Bootstrap", "Tailwind"], desc: "Designed and developed multiple responsive websites with clean layouts and mobile-first design principles using Bootstrap and Tailwind CSS." },
    { num: "02", tag: "JavaScript", title: "INTERACTIVE UI", tech: ["JavaScript", "ReactJS"], desc: "Built interactive front-end features including dynamic components, state management, and API-connected interfaces using JavaScript and ReactJS." },
    { num: "03", tag: "Full-Stack", title: "BACKEND INTEGRATION", tech: ["PHP", "MySQL", "Ajax"], desc: "Connected front-end interfaces with backend systems using PHP, MySQL for database management, and Ajax for asynchronous data handling." },
    { num: "04", tag: "Teamwork", title: "TEAM PROJECT WORK", tech: ["Git", "GitHub", "Problem-Solving"], desc: "Practiced teamwork, debugging, and version control across collaborative academic projects — developing communication and problem-solving skills." },
];

const STATS = [
    { v: "1", l: "Universities" },
    { v: "4+", l: "Tech Skills" },
    { v: "2", l: "Languages" },
    { v: "∞", l: "Eagerness" },
];

const LANGS = [{ name: "English", pct: 70 }, { name: "Khmer", pct: 95 }];

/* ── Hooks ── */
const Cursor = () => {
    useEffect(() => {
        const dot = document.getElementById("cur-dot"), ring = document.getElementById("cur-ring");
        if (!dot || !ring) return;
        const move = e => { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; ring.style.left = e.clientX + "px"; ring.style.top = e.clientY + "px"; };
        window.addEventListener("mousemove", move);
        const on = () => { dot.classList.add("hover"); ring.classList.add("hover"); };
        const off = () => { dot.classList.remove("hover"); ring.classList.remove("hover"); };
        document.querySelectorAll("button,a,[data-h]").forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
        return () => window.removeEventListener("mousemove", move);
    }, []);
    return null;
};
const useReveal = () => {
    useEffect(() => {
        const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }), { threshold: .1 });
        document.querySelectorAll(".reveal").forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);
};
const useActive = () => {
    const [active, setActive] = useState("HOME");
    useEffect(() => {
        const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.toUpperCase()); }), { threshold: .35 });
        NAV.forEach(n => { const el = document.getElementById(n.toLowerCase()); if (el) io.observe(el); });
        return () => io.disconnect();
    }, []);
    return active;
};

/* ── Scroll Spider ── */
const ScrollSpider = () => {
    const [pos, setPos] = useState(80), [thH, setThH] = useState(0), [vis, setVis] = useState(false);
    useEffect(() => {
        const fn = () => { const s = window.scrollY, t = document.body.scrollHeight - window.innerHeight; if (!t) return; const p = s / t, top = 52 + p * (window.innerHeight * .76); setPos(top); setThH(top - 52); setVis(s > 100); };
        window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn);
    }, []);
    if (!vis) return null;
    return (
        <>
            <div className="sc-thread" style={{ height: thH }} />
            <div id="sc-spider" style={{ top: pos }}>
                <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
                    <style>{`
            .sl1{animation:sla .44s ease-in-out infinite;transform-origin:top right}.sl2{animation:slb .44s ease-in-out infinite .07s;transform-origin:top right}.sl3{animation:slc .44s ease-in-out infinite .14s;transform-origin:top right}.sl4{animation:sld .44s ease-in-out infinite .21s;transform-origin:top right}.sr1{animation:sra .44s ease-in-out infinite .03s;transform-origin:top left}.sr2{animation:srb .44s ease-in-out infinite .10s;transform-origin:top left}.sr3{animation:src .44s ease-in-out infinite .17s;transform-origin:top left}.sr4{animation:srd .44s ease-in-out infinite .24s;transform-origin:top left}
            @keyframes sla{0%,100%{transform:rotate(-27deg)}50%{transform:rotate(-50deg)}}@keyframes slb{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(-30deg)}}@keyframes slc{0%,100%{transform:rotate(10deg)}50%{transform:rotate(-13deg)}}@keyframes sld{0%,100%{transform:rotate(25deg)}50%{transform:rotate(5deg)}}@keyframes sra{0%,100%{transform:rotate(27deg)}50%{transform:rotate(50deg)}}@keyframes srb{0%,100%{transform:rotate(7deg)}50%{transform:rotate(30deg)}}@keyframes src{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(13deg)}}@keyframes srd{0%,100%{transform:rotate(-25deg)}50%{transform:rotate(-5deg)}}
          `}</style>
                    <g className="sl1"><line x1="16" y1="10" x2="2" y2="4" stroke="#d4af72" strokeWidth="1.1" strokeLinecap="round" /></g>
                    <g className="sl2"><line x1="16" y1="13" x2="0" y2="12" stroke="#d4af72" strokeWidth="1.1" strokeLinecap="round" /></g>
                    <g className="sl3"><line x1="16" y1="16" x2="0" y2="20" stroke="#d4af72" strokeWidth="1.1" strokeLinecap="round" /></g>
                    <g className="sl4"><line x1="16" y1="19" x2="3" y2="26" stroke="#d4af72" strokeWidth="1.1" strokeLinecap="round" /></g>
                    <g className="sr1"><line x1="16" y1="10" x2="30" y2="4" stroke="#d4af72" strokeWidth="1.1" strokeLinecap="round" /></g>
                    <g className="sr2"><line x1="16" y1="13" x2="32" y2="12" stroke="#d4af72" strokeWidth="1.1" strokeLinecap="round" /></g>
                    <g className="sr3"><line x1="16" y1="16" x2="32" y2="20" stroke="#d4af72" strokeWidth="1.1" strokeLinecap="round" /></g>
                    <g className="sr4"><line x1="16" y1="19" x2="29" y2="26" stroke="#d4af72" strokeWidth="1.1" strokeLinecap="round" /></g>
                    <ellipse cx="16" cy="20" rx="5.5" ry="7.5" fill="#c0392b" />
                    <ellipse cx="16" cy="9" rx="5" ry="4.5" fill="#c0392b" />
                    <path d="M 10 9 Q 8 5 13 4 Q 19 3 21 7 Q 23 5 19 4 Q 13 3 10 9Z" fill="white" opacity=".88" />
                    <path d="M 22 9 Q 24 5 19 4 Q 13 3 11 7 Q 9 5 13 4 Q 19 3 22 9Z" fill="white" opacity=".88" />
                </svg>
            </div>
        </>
    );
};

/* ── Navbar ── */
const Navbar = ({ active }) => {
    const [scrolled, setScrolled] = useState(false), [mOpen, setMOpen] = useState(false);
    useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
    const go = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMOpen(false); };
    return (
        <>
            <nav className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
                <div className="nav-logo">🕷 <span>VIBOL</span>.DEV</div>
                <ul className="nav-links">{NAV.map(n => <li key={n}><button className={active === n ? "active" : ""} onClick={() => go(n)} data-h>{n}</button></li>)}</ul>
                <button className="nav-cta" onClick={() => go("CONTACT")} data-h>Hire Me</button>
                <button className="hamburger" onClick={() => setMOpen(o => !o)} data-h>
                    {[0, 1, 2].map(i => <span key={i} style={{ transform: mOpen ? (i === 0 ? "rotate(45deg) translate(3px,4px)" : i === 2 ? "rotate(-45deg) translate(3px,-4px)" : "scaleX(0)") : "" }} />)}
                </button>
            </nav>
            <div className={`mobile-nav${mOpen ? " open" : ""}`}>{NAV.map(n => <button key={n} onClick={() => go(n)} data-h>{n}</button>)}</div>
        </>
    );
};

/* ── Hero ── */
const Hero = () => (
    <section id="home" className="hero">
        <div className="hero-bg"><AnimeCity /></div>
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-inner">
            <div className="hero-left">
                <p className="hero-eyebrow">Front-End Developer · Phnom Penh</p>
                <h1 className="hero-name">CHHORN<em>VIBOL.</em></h1>
                <p className="hero-role">Motivated ICT student building responsive,<br />interactive web experiences with React & JS.</p>
                <div className="hero-btns">
                    <button className="btn-primary" onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })} data-h>View Projects</button>
                    <button className="btn-ghost" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })} data-h>Contact Me</button>
                </div>
            </div>
            <div className="hero-right">
                <AnimeSpiderMan style={{ width: "min(88%,390px)", height: "auto", animation: "heroFloat 5s ease-in-out infinite", transformOrigin: "center bottom" }} />
            </div>
        </div>
        <div className="hero-stats">
            {STATS.map(s => <div className="hero-stat" key={s.l}><div className="hero-stat-num">{s.v}</div><div className="hero-stat-label">{s.l}</div></div>)}
        </div>
        <div className="hero-scroll"><div className="hero-scroll-line" /><span>Scroll</span></div>
    </section>
);

/* ── About ── */
const About = () => (
    <section id="about">
        <div className="section-header reveal"><span className="section-num">01</span><div><p className="section-label">About</p><h2 className="section-title">THE DEVELOPER</h2></div></div>
        <div className="section-line" />
        <div className="about-grid">
            <div className="reveal">
                <div className="about-img-card">
                    <div className="about-accent" />
                    <div className="about-img-inner">🕷️</div>
                    <div className="about-img-overlay" />
                    <div className="about-img-tag">Phnom Penh, Cambodia</div>
                </div>
            </div>
            <div className="reveal" style={{ paddingTop: 20 }}>
                <p className="about-intro">Motivated ICT student with a passion for front-end development and a drive to build impactful digital solutions.</p>
                <p className="about-body">I'm Chhorn Vibol, currently studying ICT Management at Norton University and Information Technology at ETEC Center. I specialize in HTML, CSS, JavaScript, and ReactJS, with hands-on experience through academic and personal projects.</p>
                <p className="about-body">I'm eager to gain real-world experience, improve my technical skills, and contribute to innovative IT solutions — one line of code at a time.</p>
                <blockquote className="about-quote">"With great power comes great responsibility."</blockquote>

                {/* Languages */}
                <div style={{ marginTop: 28 }}>
                    <p style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: ".25em", color: "var(--red)", textTransform: "uppercase", marginBottom: 16 }}>Languages</p>
                    {LANGS.map(l => (
                        <LangBar key={l.name} name={l.name} pct={l.pct} />
                    ))}
                </div>

                <div className="about-tags">{["HTML", "CSS", "JavaScript", "React.js", "Bootstrap", "Tailwind", "PHP", "MySQL", "C/C++", "Ajax", "Laravel", "Git"].map(t => <span className="tag" key={t}>{t}</span>)}</div>
            </div>
        </div>
    </section>
);

/* ── LangBar ── */
const LangBar = ({ name, pct }) => {
    const ref = useRef(); const [w, setW] = useState(0);
    useEffect(() => { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setW(pct); io.disconnect(); } }, { threshold: .3 }); if (ref.current) io.observe(ref.current); return () => io.disconnect(); }, [pct]);
    return (
        <div className="lang-item" ref={ref}>
            <div className="lang-top"><span>{name}</span><span>{pct}%</span></div>
            <div className="lang-bar-bg"><div className="lang-bar-fill" style={{ width: `${w}%` }} /></div>
        </div>
    );
};

/* ── Skills ── */
const SkillBar = ({ pct }) => {
    const ref = useRef(); const [w, setW] = useState(0);
    useEffect(() => { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setW(pct); io.disconnect(); } }, { threshold: .3 }); if (ref.current) io.observe(ref.current); return () => io.disconnect(); }, [pct]);
    return <div className="skill-bar-bg" ref={ref}><div className="skill-bar-fill" style={{ width: `${w}%` }} /></div>;
};
const Skills = () => (
    <section id="skills" className="skills-bg">
        <div className="section-header reveal"><span className="section-num">02</span><div><p className="section-label">Skills</p><h2 className="section-title">CAPABILITIES</h2></div></div>
        <div className="section-line" />
        <div className="skills-grid">
            {SKILLS_DATA.map((s, i) => (
                <div className="skill-card reveal" key={s.title} style={{ animationDelay: `${i * .1}s` }}>
                    <div className="skill-icon">{s.icon}</div><div className="skill-title">{s.title}</div>
                    {s.items.map(it => (
                        <div className="skill-item" key={it.n}>
                            <div className="skill-item-top"><span>{it.n}</span><span>{it.p}%</span></div>
                            <SkillBar pct={it.p} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </section>
);

/* ── Education ── */
const Education = () => (
    <section id="education">
        <div className="section-header reveal"><span className="section-num">03</span><div><p className="section-label">Education</p><h2 className="section-title">ORIGINS</h2></div></div>
        <div className="section-line" />
        <div>
            {EDU.map((e, i) => (
                <div className="edu-item reveal" key={i} style={{ animationDelay: `${i * .12}s` }}>
                    <div className="edu-year">{e.year}</div>
                    <div className="edu-line"><div className="edu-dot" /></div>
                    <div><div className="edu-icon">{e.icon}</div><div className="edu-degree">{e.degree}</div><div className="edu-school">{e.school}</div><div className="edu-desc">{e.desc}</div></div>
                </div>
            ))}
        </div>
    </section>
);

/* ── Projects (Experience) ── */
const Projects = () => {
    const [open, setOpen] = useState(null);
    return (
        <section id="projects" style={{ background: "var(--dim)" }}>
            <div className="section-header reveal"><span className="section-num">04</span><div><p className="section-label">Projects & Experience</p><h2 className="section-title">MY WORK</h2></div></div>
            <div style={{ height: 1, background: "var(--mid)", marginBottom: 0 }} />
            <div>
                {PROJECTS_DATA.map((p, i) => (
                    <div key={i}>
                        <div className="proj-row reveal" onClick={() => setOpen(o => o === i ? null : i)} data-h>
                            <div className="proj-num">{p.num}</div>
                            <div><div className="proj-title">{p.title}</div><div className="proj-desc">{p.tag}</div></div>
                            <div className="proj-tags">{p.tech.map(t => <span className="proj-tag" key={t}>{t}</span>)}</div>
                            <div className="proj-arrow">{open === i ? "↑ Close" : "→ Details"}</div>
                        </div>
                        <div className={`proj-expand${open === i ? " open" : ""}`}><p>{p.desc}</p></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

/* ── Personal Qualities ── */
const Qualities = () => (
    <section style={{ background: "var(--ink)" }}>
        <div className="section-header reveal"><span className="section-num">05</span><div><p className="section-label">Character</p><h2 className="section-title">PERSONAL QUALITIES</h2></div></div>
        <div className="section-line" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 1, background: "var(--mid)", border: "1px solid var(--mid)" }}>
            {[
                { icon: "💪", q: "Hardworking", d: "Always putting in full effort to complete tasks and exceed expectations." },
                { icon: "📚", q: "Eager to Learn", d: "Continuously seeking new knowledge in technology and development." },
                { icon: "🎯", q: "Responsible & Punctual", d: "Committed to delivering work on time and taking ownership of tasks." },
                { icon: "🤝", q: "Team Player", d: "Able to work effectively both independently and within a collaborative team." },
            ].map(({ icon, q, d }, i) => (
                <div className="reveal skill-card" key={i} style={{ animationDelay: `${i * .1}s` }}>
                    <div className="skill-icon">{icon}</div>
                    <div className="skill-title" style={{ fontSize: 18 }}>{q}</div>
                    <p style={{ fontFamily: "var(--ff-body)", fontSize: 15, color: "var(--soft)", lineHeight: 1.7, marginTop: 8 }}>{d}</p>
                </div>
            ))}
        </div>
    </section>
);

/* ── Contact ── */
const Contact = () => (
    <section id="contact" style={{ background: "var(--dim)" }}>
        <div className="section-header reveal"><span className="section-num">06</span><div><p className="section-label">Contact</p><h2 className="section-title">GET IN TOUCH</h2></div></div>
        <div className="section-line" />
        <div className="contact-grid">
            <div className="reveal">
                <div className="contact-big">HIRE<span> ME</span><br />NOW.</div>
                <p className="contact-sub">Looking for a motivated front-end developer who is passionate about building great web experiences? Let's connect.</p>
                <div className="contact-links">
                    {[
                        { l: "Phone", v: "+855 96-6051-926" },
                        { l: "Email", v: "chhornvibol19@gmail.com" },
                        { l: "GitHub", v: "github.com/vibol18" },
                        { l: "Location", v: "Phnom Penh, Cambodia" },
                    ].map(s => (
                        <button className="contact-link" key={s.l} data-h onClick={() => { }}><span>{s.l}</span><span style={{ fontFamily: "var(--ff-mono)", fontSize: 9, letterSpacing: ".1em", color: "var(--gold)" }}>{s.v}</span></button>
                    ))}
                </div>
            </div>
            {/* <div className="reveal">
                <label className="contact-form-label">Your Name</label><input className="contact-input" placeholder="Your name" />
                <label className="contact-form-label">Your Email</label><input className="contact-input" placeholder="your@email.com" />
                <label className="contact-form-label">Message</label><textarea className="contact-input contact-textarea" placeholder="Tell me about your project or opportunity..." />
                <button className="btn-primary" data-h style={{ marginTop: 8 }}>Send Message →</button>
            </div> */}
        </div>
    </section>
);

/* ── Footer ── */
const Footer = () => (
    <footer className="footer">
        <div className="footer-logo">🕷 <span style={{ color: "var(--red)" }}>VIBOL</span>.DEV</div>
        <div className="footer-quote">"With great power comes great responsibility."</div>
        <div className="footer-copy">© 2025 Chhorn Vibol · Phnom Penh, Cambodia</div>
    </footer>
);

/* ── App ── */
export default function VibollPortfolio() {
    const active = useActive(); useReveal();
    return (
        <><G />
            <div id="cur-dot" /><div id="cur-ring" />
            <Cursor /><ScrollSpider />
            <Navbar active={active} />
            <Hero /><About /><Skills /><Education /><Projects /><Qualities /><Contact /><Footer />
        </>
    );
}