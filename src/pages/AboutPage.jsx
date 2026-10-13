import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Exact Framer Vector Icons for Credentials
const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="M9.343 18.576q-.06.03-.13.062a.6.6 0 0 1-.275.055.8.8 0 0 1-.276-.055 9.29 9.29 0 0 1-5.568-8.511V6.359c0-.268.158-.515.405-.625l5.157-2.345a.7.7 0 0 1 .57 0l5.156 2.345c.248.11.406.357.406.625v1.238c.227-.02.454-.035.688-.035.59 0 1.168.083 1.718.214V4.813a.69.69 0 0 0-.405-.626L9.219.749a.7.7 0 0 0-.57 0L1.093 4.187a.69.69 0 0 0-.405.625v5.315a11.67 11.67 0 0 0 7.115 10.76l.866.37q.136.054.268.055a.7.7 0 0 0 .269-.055l.866-.37q.474-.209.928-.448a7.3 7.3 0 0 1-1.657-1.863"
    />
    <path
      fill="currentColor"
      d="M13.406 7.865V6.806L8.937 4.778 4.47 6.806v3.321a7.9 7.9 0 0 0 4.166 6.964 7.2 7.2 0 0 1-.385-2.31c0-3.265 2.18-6.022 5.156-6.916"
    />
    <path
      fill="currentColor"
      d="M15.469 8.938a5.85 5.85 0 0 0-5.844 5.843 5.85 5.85 0 0 0 5.844 5.844 5.85 5.85 0 0 0 5.844-5.844 5.85 5.85 0 0 0-5.844-5.844m2.77 4.901-2.825 2.853a.687.687 0 0 1-.976.007l-1.74-1.739a.693.693 0 0 1 0-.976.693.693 0 0 1 .976 0l1.252 1.251 2.337-2.358a.68.68 0 0 1 .97 0 .68.68 0 0 1 0 .97z"
    />
  </svg>
);

const MedalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="m14.254 6.995-2.25-.327-1.006-2.04-1.006 2.04-2.25.327L9.37 8.582l-.384 2.24 2.012-1.058 2.013 1.059-.385-2.241z"
    />
    <path
      fill="currentColor"
      d="M19.05 8.053C19.05 3.613 15.439 0 10.999 0S2.945 3.612 2.945 8.053c0 4.44 3.613 8.052 8.053 8.052s8.053-3.612 8.053-8.052m-8.052 3.168-3.725 1.958.712-4.147-3.013-2.937 4.164-.606 1.862-3.773L12.86 5.49l4.164.605-3.013 2.937.711 4.147zm7.514 2.388-.004.002a9.26 9.26 0 0 1-4.648 3.335l-.01.007 3.509 4.829.677-3.948L22 18.41zm-15.021.003-.004-.003L0 18.409l3.964-.575.677 3.948 3.508-4.829-.01-.007a9.26 9.26 0 0 1-4.647-3.335"
    />
  </svg>
);

const CertificateIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M18.075 4.714h3.465L17.29.464v3.464a.785.785 0 0 0 .785.786" />
    <path
      fill="currentColor"
      d="M18.068 6.286a2.357 2.357 0 0 1-2.357-2.357V0H7.068a2.357 2.357 0 0 0-2.357 2.357v2.357a6.286 6.286 0 0 1 4.714 10.427v6.073c.001.269-.047.535-.141.786H19.64a2.357 2.357 0 0 0 2.357-2.357V6.286zM10.211 5.5a.786.786 0 0 1 .786-.786h2.357a.786.786 0 0 1 0 1.572h-2.357a.786.786 0 0 1-.786-.786m7.857 12.571h-6.286a.786.786 0 1 1 0-1.571h6.286a.786.786 0 0 1 0 1.571m0-3.928h-4.714a.786.786 0 0 1 0-1.572h4.714a.786.786 0 0 1 0 1.572m0-3.929h-4.714a.786.786 0 0 1 0-1.571h4.714a.786.786 0 0 1 0 1.571"
    />
    <path
      fill="currentColor"
      d="M1.57 16.437v4.777a.785.785 0 0 0 .487.723.79.79 0 0 0 .857-.165l1.8-1.807 1.798 1.807a.786.786 0 0 0 1.21-.123.8.8 0 0 0 .134-.435v-4.777a6.25 6.25 0 0 1-6.286 0m3.144-.723a4.714 4.714 0 1 0 0-9.428 4.714 4.714 0 0 0 0 9.428"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="M14.963 11q-.001-1.077-.074-2.074a2.17 2.17 0 0 1-1.66-1.483H7.255a28.7 28.7 0 0 0-.136 5.799c.78.155 1.412.73 1.646 1.48h5.954c.157-1.143.245-2.391.245-3.722m.568-6.355a2.17 2.17 0 0 1 1.839 1.51h3.505A11.05 11.05 0 0 0 13.68.33c.436.585.834 1.321 1.181 2.199.258.65.482 1.36.67 2.116M5.84 13.38a30 30 0 0 1 .119-5.937H.59A11 11 0 0 0 0 11c0 1.306.23 2.559.649 3.722H4.63a2.18 2.18 0 0 1 1.208-1.343m.677 4.145a2.17 2.17 0 0 1-1.882-1.513H1.21a11.05 11.05 0 0 0 7.113 5.659c-.436-.585-.834-1.321-1.182-2.199a17 17 0 0 1-.627-1.947M7.46 6.155h5.774c.168-.54.543-.99 1.031-1.257C13.494 1.857 12.203 0 11.001 0 9.64 0 8.168 2.376 7.46 6.155M4.92 2.266a2.168 2.168 0 0 1-2.691 2.102 11 11 0 0 0-1.104 1.786h5.024c.235-1.332.568-2.56.99-3.625C7.487 1.65 7.884.915 8.321.33a11 11 0 0 0-3.44 1.532q.038.197.038.404m12.162 17.467a2.168 2.168 0 0 1 2.691-2.1 11 11 0 0 0 1.02-1.622h-4.97c-.234 1.268-.556 2.439-.96 3.46-.348.878-.746 1.614-1.182 2.199a11 11 0 0 0 3.44-1.532 2 2 0 0 1-.039-.405m-2.572-3.722H8.768a2.18 2.18 0 0 1-.995 1.236C8.55 20.2 9.817 22 11.001 22c1.34 0 2.79-2.307 3.508-5.989m6.845-1.289c.42-1.163.649-2.416.649-3.722 0-1.244-.208-2.44-.59-3.557h-4.041a2.18 2.18 0 0 1-1.196 1.338 30 30 0 0 1-.153 5.941zm-6.055-7.046a.878.878 0 0 0 0-1.754.878.878 0 0 0 0 1.754m-8.602 8.568a.877.877 0 1 0 0-1.754.877.877 0 0 0 0 1.754M2.752 3.143a.877.877 0 1 0 0-1.753.877.877 0 0 0 0 1.753m16.492 15.713a.878.878 0 0 0 0 1.754.878.878 0 0 0 0-1.754"
    />
  </svg>
);

// Exact Framer Vector Icons for Trust Timeline
const ClipboardCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="M17.612-.017H4.392a3.305 3.305 0 0 0-3.306 3.305v16.305a2.203 2.203 0 0 0 3.15 1.994c.265-.132.497-.275.739-.418a2.6 2.6 0 0 1 1.62-.518 2.62 2.62 0 0 1 1.63.518 4.73 4.73 0 0 0 2.776.848 4.7 4.7 0 0 0 2.777-.848 2.6 2.6 0 0 1 1.63-.518 2.57 2.57 0 0 1 1.62.518q.358.224.738.407a2.203 2.203 0 0 0 3.15-1.983V3.288a3.305 3.305 0 0 0-3.304-3.305m-6.61 15.424H6.594a1.102 1.102 0 0 1 0-2.204H11a1.102 1.102 0 0 1 0 2.204M15.407 11H6.595a1.102 1.102 0 0 1 0-2.204h8.813a1.102 1.102 0 0 1 0 2.204m0-4.407H6.595a1.102 1.102 0 1 1 0-2.203h8.813a1.102 1.102 0 0 1 0 2.203"
    />
  </svg>
);

const HandshakeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="m11.513 1.031.098.006h3.448l.08-.004a5.6 5.6 0 0 1 1.285.009 3.76 3.76 0 0 1 1.63.462 5.54 5.54 0 0 1 2.361 2.023 5.48 5.48 0 0 1 .22 5.627l-4.829-4.88a.75.75 0 0 0-.534-.222h-1.999a.75.75 0 0 0-.453.151L9.594 6.642a1.677 1.677 0 0 1-2.515-.6 1.64 1.64 0 0 1 .49-2.028zM5.511 14.304l-.02.02-1.147 1.139-.02.018a.902.902 0 0 1-1.516-.65.88.88 0 0 1 .265-.63l1.147-1.138a.9.9 0 0 1 1.272 0 .885.885 0 0 1 .02 1.24m-.121 2.233c-.33.35-.325.9.02 1.241a.9.9 0 0 0 1.271 0l1.147-1.137a.888.888 0 0 0-.14-1.373.9.9 0 0 0-1.11.093l-.022.02-1.145 1.137zm-2.706-5.324a.884.884 0 0 1 0 1.26L1.537 13.61A.902.902 0 0 1 0 12.981a.88.88 0 0 1 .264-.63l1.148-1.14a.9.9 0 0 1 1.272 0m7.48 6.485a.884.884 0 0 1 0 1.26l-1.146 1.14a.902.902 0 0 1-1.53-.526.9.9 0 0 1 .127-.572l.005-.006a1 1 0 0 1 .126-.159l1.147-1.137a.9.9 0 0 1 1.272 0M2.357 3.115a7.15 7.15 0 0 1 6.463-1.93L6.661 2.82A3.145 3.145 0 0 0 5.52 6.132c.107.4.291.776.544 1.105a3.18 3.18 0 0 0 4.439.6l3.024-2.287h1.365l2.91 2.886.006-.008 2.415 2.442.036.035 1.299 1.296a1.527 1.527 0 0 1-.971 2.599c-.39.03-.778-.09-1.082-.336l-.11-.108-.08-.07-1.277-1.274a.752.752 0 0 0-1.283.53.75.75 0 0 0 .22.53l1.354 1.352q.078.075.158.145l.045.045a1.035 1.035 0 0 1-.733 1.769 1.04 1.04 0 0 1-.734-.303l-.2-.198a.75.75 0 0 0-1.28.54.75.75 0 0 0 .218.544l.263.262a.947.947 0 1 1-1.34 1.338l-.134-.134a3 3 0 0 0-.143-.155l-.245-.244a.752.752 0 0 0-1.272.532.75.75 0 0 0 .21.528l.184.182q.034.045.075.089l.073.072A.97.97 0 0 1 12.69 22a.97.97 0 0 1-.658-.27l-1.299-1.22.499-.495a2.373 2.373 0 0 0 0-3.373 2.4 2.4 0 0 0-1.634-.698 2.37 2.37 0 0 0-.703-1.62 2.4 2.4 0 0 0-1.632-.698 2.404 2.404 0 0 0-2.86-2.277A2.4 2.4 0 0 0 2.17 9.462a2.42 2.42 0 0 0-1.642.535 7.02 7.02 0 0 1 1.832-6.88"
    />
  </svg>
);

const ReceiptIcon = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="M20 10h-3V4c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v13c0 1.65 1.35 3 3 3h14c1.65 0 3-1.35 3-3v-6c0-.55-.45-1-1-1m-7 6h-3v-2h3zm0-4H5v-2h8zm0-4H5V6h8zm6 9c0 .55-.45 1-1 1s-1-.45-1-1v-5h2z"
    />
  </svg>
);

const ShieldCleanIcon = () => (
  <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="currentColor"
      d="M10.25 1.073c-.606.113-1.318.357-2.412.732L7.265 2c-3.007 1.03-4.51 1.544-4.887 2.082C2.008 4.608 2 6.15 2 9.21l8.25-2.75zm0 6.967L2 10.79v.201c0 5.638 4.239 8.374 6.899 9.536.51.223.84.367 1.351.432zm1.5 12.92V8.04L20 10.79v.201c0 5.638-4.239 8.374-6.899 9.536-.51.223-.84.368-1.351.433m0-14.5V1.072c.606.113 1.318.357 2.412.732l.573.196c3.007 1.029 4.51 1.543 4.887 2.081.37.526.378 2.068.378 5.127z"
    />
  </svg>
);

const GoldStar = () => (
  <svg width="15" height="15" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 8.5 12.859 L 13.753 16 L 12.359 10.08 L 17 6.097 L 10.889 5.583 L 8.5 0 L 6.112 5.583 L 0 6.097 L 4.641 10.08 L 3.247 16 Z"
      fill="#b48d5c"
    />
  </svg>
);

export default function AboutPage({ onOpenEstimate, lang = 'en' }) {
  const isSq = lang === 'sq';

  const credentials = [
    {
      icon: <ShieldCheckIcon />,
      title: isSq ? 'Regjistrimi i Biznesit' : 'Business Registration',
      desc: isSq ? '[NIPT-i dhe të dhënat e regjistrimit — për t’u konfirmuar.]' : '[NIPT and registration details — to be confirmed.]',
    },
    {
      icon: <MedalIcon />,
      title: isSq ? 'Licencat' : 'Licences',
      desc: isSq ? '[Licencat ose kategoritë e ndërtimit që zotëron Forest-Al — për t’u konfirmuar.]' : '[Construction licences or categories held by Forest-Al — to be confirmed.]',
    },
    {
      icon: <CertificateIcon />,
      title: isSq ? 'Kualifikimet' : 'Qualifications',
      desc: isSq ? '[Kualifikimet për punimet elektrike, hidraulike dhe mekanike — për t’u konfirmuar.]' : '[Qualifications for electrical, plumbing and mechanical work — to be confirmed.]',
    },
    {
      icon: <GlobeIcon />,
      title: isSq ? 'Sigurimi' : 'Insurance',
      desc: isSq ? '[Mbulimi i sigurimit — për t’u konfirmuar.]' : '[Insurance cover — to be confirmed.]',
    },
  ];

  // Team placeholders: replace names and photos with real Forest-Al team members (with their consent).
  const team = [
    {
      name: isSq ? '[Emër Mbiemër]' : '[Name Surname]',
      role: isSq ? 'Ndërtim dhe Konstruksione Metalike' : 'Construction & Metal Structures',
      image: 'https://framerusercontent.com/images/82CL4DRDof6jznstEEYytk8ykU.png?width=600',
    },
    {
      name: isSq ? '[Emër Mbiemër]' : '[Name Surname]',
      role: isSq ? 'Gips dhe Përfundime' : 'Drywall & Finishing',
      image: 'https://framerusercontent.com/images/OYMeMnFoiKRceb5bM7QXUQmTzbk.png?width=600',
    },
    {
      name: isSq ? '[Emër Mbiemër]' : '[Name Surname]',
      role: isSq ? 'Shërbime Mirëmbajtjeje' : 'Maintenance Services',
      image: 'https://framerusercontent.com/images/1zY2K2RHslQJ51df7A99t1fIY.png?width=600',
    },
    {
      name: isSq ? '[Emër Mbiemër]' : '[Name Surname]',
      role: isSq ? 'Komunikimi me Klientët' : 'Client Communication',
      image: 'https://framerusercontent.com/images/8IpOyde2K3YaYfBJnRJfIrHtd60.png?width=600',
    },
  ];

  const trustTimeline = [
    {
      icon: <ClipboardCheckIcon />,
      title: isSq ? 'Objekt pune i qartë.' : 'A clear scope before we start.',
      desc: isSq
        ? 'Biem dakord për çfarë do të bëhet, me çfarë materialesh dhe me çfarë radhe, para se të fillojë puna.'
        : 'We agree what will be done, with which materials and in what order, before any work begins.',
    },
    {
      icon: <HandshakeIcon />,
      title: isSq ? 'Një ekip, disa fusha pune.' : 'One team, several trades.',
      desc: isSq
        ? 'Ndërtimi, gipsi dhe mirëmbajtja kryhen nga i njëjti ekip, që punët të lidhen mirë me njëra-tjetrën.'
        : 'Construction, drywall and maintenance are handled by the same team, so the work fits together.',
    },
    {
      icon: <ReceiptIcon />,
      title: isSq ? 'Preventiv sipas punës reale.' : 'Quotations based on the actual work.',
      desc: isSq
        ? 'Çmimin e japim pasi kuptojmë punën, dhe ju shpjegojmë çfarë përfshihet në të.'
        : 'We price the job once we understand it, and explain what the quotation includes.',
    },
    {
      icon: <ShieldCleanIcon />,
      title: isSq ? 'Respekt për pronën tuaj.' : 'Respect for your property.',
      desc: isSq
        ? 'Mbrojmë zonat ku punojmë, e mbajmë kantierin të rregullt dhe e lëmë ambientin të pastër.'
        : 'We protect the areas we work in, keep the site tidy and leave the space clean.',
    },
  ];

  // Review placeholders until Forest-Al supplies verified reviews (with each client's permission).
  const reviews = [
    {
      stars: 5,
      quote: isSq ? '[Vlerësim i verifikuar klienti për t’u shtuar, i publikuar vetëm me lejen e klientit.]' : '[Verified client review to be added, published only with the client’s permission.]',
      name: isSq ? '[Emri i klientit]' : '[Client name]',
      meta: isSq ? '[Vendndodhja / lloji i punës]' : '[Location / type of work]',
      avatar: 'https://framerusercontent.com/images/wWs7pops9JNLjD9lxYQLOMbqDMw.png?width=150&height=150',
    },
    {
      stars: 5,
      quote: isSq ? '[Vlerësim i verifikuar klienti për t’u shtuar, i publikuar vetëm me lejen e klientit.]' : '[Verified client review to be added, published only with the client’s permission.]',
      name: isSq ? '[Emri i klientit]' : '[Client name]',
      meta: isSq ? '[Vendndodhja / lloji i punës]' : '[Location / type of work]',
      avatar: 'https://framerusercontent.com/images/ieg3GvFPHfhg2GSuRRpo0z4tnE.png?width=150&height=150',
    },
    {
      stars: 5,
      quote: isSq ? '[Vlerësim i verifikuar klienti për t’u shtuar, i publikuar vetëm me lejen e klientit.]' : '[Verified client review to be added, published only with the client’s permission.]',
      name: isSq ? '[Emri i klientit]' : '[Client name]',
      meta: isSq ? '[Vendndodhja / lloji i punës]' : '[Location / type of work]',
      avatar: 'https://framerusercontent.com/images/RekeT62yXkhsxSsRJeja7ru4eM.png?width=150&height=150',
    },
  ];

  return (
    <div className="about-page-wrapper">
      {/* ========================================================
          1. HERO BANNER (1:1 RenovateHub Reference Layout)
          ======================================================== */}
      <section className="about-hero-section">
        <div className="about-hero-card">
          <img
            src="https://framerusercontent.com/images/6B0WaHhRjTKJ4lktYRNZV3Yg.png?width=1920"
            alt={isSq ? 'Ekipi i Forest-Al në punë' : 'Forest-Al at work'}
            className="about-hero-bg"
          />
          <div className="about-hero-scrim-top" />
          <div className="about-hero-scrim-bottom" />

          <div className="about-hero-container">
            <div className="about-hero-row">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="about-hero-left"
              >
                <div className="about-tag">{isSq ? '// Rreth Nesh' : '// About'}</div>
                <h1 className="about-hero-h1">
                  {isSq ? (
                    <>
                      Ndërtim dhe mirëmbajtje,<br />
                      të kryera me kujdes.
                    </>
                  ) : (
                    <>
                      Construction and maintenance,<br />
                      done with care.
                    </>
                  )}
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="about-hero-right"
              >
                <p className="about-hero-p">
                  {isSq
                    ? 'Forest-Al është një kompani ndërtimi dhe mirëmbajtjeje pronash në Shqipëri. Punojmë me konstruksione metalike dhe pllaka gipsi, dhe kujdesemi për mirëmbajtjen elektrike, hidraulike, mekanike dhe ndërtimore të çdo lloj aseti.'
                    : 'Forest-Al is a construction and property maintenance company in Albania. We work with metal structures and drywall systems, and look after the electrical, plumbing, mechanical and building maintenance of every type of property.'}
                </p>

                <motion.button
                  onClick={onOpenEstimate}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="framer-cta-pill primary"
                  aria-label={isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}
                >
                  <span>{isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}</span>
                  <div className="framer-cta-arrow-circle">
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. OUR STORY & FOUNDER FEATURE ("How it started.")
          ======================================================== */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-grid">
            {/* Left Story Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="about-story-left"
            >
              <div className="section-tag">{isSq ? '// Historia Jonë //' : '// Our Story //'}</div>
              <h2 className="about-story-title">{isSq ? 'Kush jemi.' : 'Who we are.'}</h2>
              <p className="about-story-text">
                {isSq
                  ? 'Forest-Al kryen punime në fushën e ndërtimit me konstruksione metalike dhe veshje me pllaka gipsi. Ofrojmë gjithashtu shërbime dhe punime për çdo lloj aseti, përfshirë mirëmbajtjen elektrike, hidraulike, mekanike dhe ndërtimore. [Viti i themelimit dhe historia e kompanisë — për t’u konfirmuar.]'
                  : 'Forest-Al carries out construction work with metal structures and plasterboard (drywall) linings. We also provide services and works for every type of asset, including electrical, plumbing, mechanical and building maintenance. [Founding year and company history — to be confirmed.]'}
              </p>
              <p className="about-story-text">
                {isSq ? (
                  <>
                    Misioni ynë është t’i ndihmojmë pronarët të planifikojnë dhe të kryejnë punën që kërkojnë objektet e tyre, me <strong>komunikim të qartë</strong> dhe <strong>punë të kujdesshme</strong>, sipas objektit, buxhetit dhe afateve të rëna dakord.
                  </>
                ) : (
                  <>
                    Our mission is to help property owners plan and carry out the work their buildings need, with <strong>clear communication</strong> and <strong>careful workmanship</strong>, while respecting the agreed scope, budget and timeline.
                  </>
                )}
              </p>
            </motion.div>

            {/* Right Founder Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="about-founder-card"
            >
              <div className="about-founder-photo-wrap">
                <img
                  src="https://framerusercontent.com/images/82CL4DRDof6jznstEEYytk8ykU.png?width=600"
                  alt={isSq ? 'Ekipi i Forest-Al' : 'The Forest-Al team'}
                  className="about-founder-photo"
                />
                <div className="about-founder-photo-gradient">
                  <div className="about-founder-name">Forest-Al</div>
                  <div className="about-founder-role">
                    {isSq ? 'Ndërtim dhe Mirëmbajtje Pronash' : 'Construction & Property Maintenance'}
                  </div>
                </div>
              </div>

              <div className="about-founder-body">
                <p className="about-founder-quote">
                  {isSq
                    ? 'Çdo projekt fillon me kuptimin e pronës dhe me rënien dakord për një objekt pune të qartë. Prej aty planifikojmë hapat, ju mbajmë të informuar dhe e përfundojmë punën si duhet. [Mesazh nga themeluesi ose drejtuesi — opsional, për t’u shtuar nga Forest-Al.]'
                    : 'Every project starts with understanding the property and agreeing a clear scope of work. From there, we plan the steps, keep you informed and finish the job properly. [Message from the founder or manager — optional, to be added by Forest-Al.]'}
                </p>

                <div className="about-founder-stats">
                  <div className="about-stat-col">
                    <div className="about-stat-val">9</div>
                    <div className="about-stat-lbl">{isSq ? 'Shërbime' : 'Services'}</div>
                  </div>
                  <div className="about-stat-col">
                    <div className="about-stat-val">3</div>
                    <div className="about-stat-lbl">{isSq ? 'Fusha pune' : 'Areas of work'}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. CREDENTIALS SECTION ("Licensed, insured, and accountable.")
          ======================================================== */}
      <section className="about-credentials-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-credentials-box"
          >
            <div className="about-credentials-header">
              <div className="about-credentials-tag">{isSq ? '// Kualifikimet //' : '// Credentials //'}</div>
              <h2 className="about-credentials-title">
                {isSq ? 'Kualifikimet dhe dokumentacioni.' : 'Credentials and qualifications.'}
              </h2>
            </div>

            <div className="about-credentials-grid">
              {credentials.map((c, i) => (
                <div key={i} className="about-cred-col">
                  <div className="about-cred-icon-box">{c.icon}</div>
                  <div className="about-cred-divider" />
                  <div className="about-cred-name">{c.title}</div>
                  <p className="about-cred-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          4. TEAM SECTION ("Meet the team.")
          ======================================================== */}
      <section className="about-team-section">
        <div className="container">
          <div className="about-team-header">
            <div>
              <div className="section-tag">{isSq ? '// Ekipi //' : '// Team //'}</div>
              <h2 className="about-team-title">{isSq ? 'Njihuni me ekipin.' : 'Meet the team.'}</h2>
            </div>
            <p className="about-team-intro">
              {isSq
                ? 'Ekipi ynë bashkon aftësi në ndërtim, gips dhe mirëmbajtje, që çdo punë të kryhet nga njerëz që e njohin fushën. [Emrat, rolet dhe fotot e ekipit — për t’u dhënë nga Forest-Al.]'
                : 'Our team brings together construction, drywall and maintenance skills, so each job is done by people who know the trade. [Team names, roles and photos — to be provided by Forest-Al.]'}
            </p>
          </div>

          <div className="about-team-grid">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="about-team-card"
              >
                <img src={member.image} alt={member.name} className="about-team-img" />
                <div className="about-team-overlay">
                  <div className="about-team-name">{member.name}</div>
                  <div className="about-team-role">{member.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. TRUST SECTION ("Why homeowners trust us with their homes.")
          ======================================================== */}
      <section className="about-trust-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-trust-box"
          >
            <div className="about-trust-grid">
              {/* Left Column: Heading + Shaking Hands Card */}
              <div className="about-trust-left">
                <div className="about-credentials-tag">{isSq ? '// Besimi //' : '// Trust //'}</div>
                <h2 className="about-trust-title">
                  {isSq ? (
                    <>
                      Si punojmë<br />
                      me klientët tanë.
                    </>
                  ) : (
                    <>
                      How we work<br />
                      with our clients.
                    </>
                  )}
                </h2>

                <div className="about-trust-photo-card">
                  <img
                    src="https://framerusercontent.com/images/orXrl6xfc1nYs37rFZqagf6nGI.png?width=800"
                    alt={isSq ? 'Klient dhe kontraktor duke shtrënguar duart' : 'Client and contractor shaking hands'}
                    className="about-trust-photo"
                  />
                  <div className="about-trust-rating-pill">
                    <div className="about-trust-rating-score">6</div>
                    <div className="about-trust-rating-label">
                      {isSq ? 'Hapa nga konsulta te dorëzimi' : 'Steps from consultation to handover'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Connected Timeline */}
              <div className="about-timeline-wrap">
                <div className="about-timeline-line" />
                {trustTimeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="about-timeline-item"
                  >
                    <div className="about-timeline-node" />
                    <div className="about-timeline-icon-box">{item.icon}</div>
                    <div className="about-timeline-text">
                      <div className="about-timeline-title">{item.title}</div>
                      <p className="about-timeline-desc">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          6. REVIEWS SECTION ("Homeowners love the results.")
          ======================================================== */}
      <section className="about-reviews-section">
        <div className="container">
          <div className="about-reviews-header">
            <div>
              <div className="section-tag">{isSq ? '// Vlerësimet //' : '// Reviews //'}</div>
              <h2 className="about-reviews-title">
                {isSq ? 'Çfarë thonë klientët tanë.' : 'What our clients say.'}
              </h2>
            </div>

            <div className="about-reviews-badge">
              <div className="about-reviews-avatars">
                <div className="about-reviews-avatar-circle">
                  <img src="https://framerusercontent.com/images/wWs7pops9JNLjD9lxYQLOMbqDMw.png?width=50&height=50" alt="" />
                </div>
                <div className="about-reviews-avatar-circle">
                  <img src="https://framerusercontent.com/images/ieg3GvFPHfhg2GSuRRpo0z4tnE.png?width=50&height=50" alt="" />
                </div>
                <div className="about-reviews-avatar-circle">
                  <img src="https://framerusercontent.com/images/RekeT62yXkhsxSsRJeja7ru4eM.png?width=50&height=50" alt="" />
                </div>
              </div>
              <div className="about-reviews-stars-wrap">
                <div className="about-reviews-stars-row">
                  {[...Array(5)].map((_, i) => (
                    <GoldStar key={i} />
                  ))}
                </div>
                <div className="about-reviews-score">
                  {isSq ? 'Vlerësimet e verifikuara së shpejti' : 'Verified reviews coming soon'}
                </div>
              </div>
            </div>
          </div>

          <div className="about-reviews-grid">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="about-review-card"
              >
                <div className="about-review-card-top">
                  <div className="about-reviews-stars-row">
                    {[...Array(r.stars)].map((_, s) => (
                      <GoldStar key={s} />
                    ))}
                  </div>
                </div>

                <p className="about-review-quote">{r.quote}</p>

                <div className="about-review-author">
                  <img src={r.avatar} alt="" className="about-review-author-img" />
                  <div className="about-review-author-info">
                    <div className="about-review-author-name">{r.name}</div>
                    <div className="about-review-author-meta">{r.meta}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. PRE-FOOTER CTA CARD ("Ready to transform your home?")
          ======================================================== */}
      <section className="about-cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-cta-banner"
          >
            <div>
              <div className="about-cta-tag">{isSq ? '// Le të Fillojmë //' : "// Let's Begin //"}</div>
              <h2 className="about-cta-title">
                {isSq ? (
                  <>
                    Gati të diskutoni<br />
                    projektin tuaj?
                  </>
                ) : (
                  <>
                    Ready to discuss<br />
                    your project?
                  </>
                )}
              </h2>
            </div>

            <div className="about-cta-right">
              <p className="about-cta-desc">
                {isSq
                  ? 'Na tregoni çfarë i nevojitet pronës suaj. Do ta shohim punën, do t’ju shpjegojmë hapat e radhës dhe do t’ju përgatisim një preventiv.'
                  : 'Tell us what your property needs. We will look at the work, explain the next steps and prepare a quotation for you.'}
              </p>

              <motion.button
                onClick={onOpenEstimate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="about-cta-btn"
                aria-label={isSq ? 'Kërkoni një Preventiv' : 'Request an Estimate'}
              >
                <span>{isSq ? 'Kërkoni një Preventiv' : 'Request an Estimate'}</span>
                <div className="about-cta-btn-arrow">
                  <ArrowRight size={15} strokeWidth={2.5} />
                </div>
              </motion.button>

              <div className="about-cta-sub">
                {isSq
                  ? 'Konsultë falas • Pa detyrime • Hapa të qartë'
                  : 'Free consultation • No obligation • Clear next steps'}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
