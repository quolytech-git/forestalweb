import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteData, timelineOptions } from '../data/siteData';
import FaqSection from '../components/FaqSection';

export default function ContactPage({ lang = 'en' }) {
  const isSq = lang === 'sq';
  const [service, setService] = useState(siteData.services[0].title);
  const [timeline, setTimeline] = useState(timelineOptions[0].value);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // The success message only confirms receipt once the form is connected to a real inbox/backend.
  const isConnected = siteData.forms.connected;
  const selectedService = siteData.services.find((s) => s.title === service);
  const serviceLabel = selectedService ? (isSq ? selectedService.titleSq : selectedService.title) : service;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isConnected) return;
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b48d5c', '#ead9be', '#1a1a17', '#ffffff'],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      <section className="subpage-banner">
        <div className="container">
          <div className="section-tag">{isSq ? '// Na Kontaktoni //' : '// Contact Us //'}</div>
          <h1>{isSq ? 'Kërkoni një preventiv falas.' : 'Request a free estimate.'}</h1>
          <p>
            {isSq
              ? 'Na tregoni për punën e ndërtimit, rinovimit ose mirëmbajtjes që ju nevojitet. Do t’ju kthejmë përgjigje me hapat e radhës dhe, kur nevojitet, do të caktojmë një vizitë në objekt.'
              : 'Tell us about the construction, renovation or maintenance work you need. We will reply with the next steps and, where needed, arrange a site visit.'}
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div
            className="contact-layout-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            {/* Form Column */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(28px, 4vw, 44px)',
                border: '1px solid var(--border-card)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
                    {isSq ? 'Na tregoni për projektin tuaj' : 'Tell us about your project'}
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>
                    {isSq
                      ? 'Fushat me * janë të detyrueshme. Sa më shumë detaje të ndani, aq më saktë mund t’ju përgjigjemi. Duke dërguar formularin, pranoni që t’i përdorim këto të dhëna për t’iu përgjigjur, sipas Politikës sonë të Privatësisë.'
                      : 'Fields marked * are required. The more detail you share, the more accurately we can respond. By sending this form, you agree that we use these details to reply to you, as described in our Privacy Policy.'}
                  </p>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-service">{isSq ? 'Çfarë shërbimi ju nevojitet?' : 'What service do you need?'}</label>
                    <select
                      id="contact-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="form-select"
                    >
                      {siteData.services.map((s) => (
                        <option key={s.id} value={s.title}>{isSq ? s.titleSq : s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-timeline">{isSq ? 'Kur dëshironi të nisni?' : 'When would you like to start?'}</label>
                    <select
                      id="contact-timeline"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="form-select"
                    >
                      {timelineOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{isSq ? opt.sq : opt.en}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">{isSq ? 'Emri dhe mbiemri *' : 'Full name *'}</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder={isSq ? 'Emri juaj i plotë' : 'Your full name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">{isSq ? 'Email *' : 'Email address *'}</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder={isSq ? 'emri@shembull.com' : 'name@example.com'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">{isSq ? 'Numri i telefonit' : 'Phone number'}</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+355 6X XXX XXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-location">{isSq ? 'Adresa ose vendndodhja e pronës' : 'Property address or location'}</label>
                      <input
                        id="contact-location"
                        type="text"
                        placeholder={isSq ? 'p.sh. Tiranë, Durrës' : 'e.g. Tirana, Durrës'}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-details">{isSq ? 'Përshkrimi i projektit' : 'Project description'}</label>
                    <textarea
                      id="contact-details"
                      rows={4}
                      placeholder={
                        isSq
                          ? 'Përshkruani punën, llojin e pronës, sipërfaqen e përafërt dhe çdo pyetje që keni...'
                          : 'Describe the work, the type of property, the approximate size and any questions you have...'
                      }
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="form-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary-dark btn-primary"
                    style={{ width: '100%', marginTop: '12px' }}
                  >
                    <span>{isSq ? 'Kërkoni një Preventiv Falas' : 'Request a Free Estimate'}</span>
                    <div className="btn-icon-circle">
                      <ArrowRight size={16} />
                    </div>
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-full)',
                      background: '#ecfdf5',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 style={{ fontSize: '26px', marginBottom: '12px' }}>
                    {isConnected
                      ? isSq ? 'Kërkesa u dërgua' : 'Request sent'
                      : isSq ? `Faleminderit, ${name}` : `Thank you, ${name}`}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                    {isConnected ? (
                      isSq ? (
                        <>Faleminderit, <strong>{name}</strong>. Kërkesën tuaj për <strong>{serviceLabel}</strong> e morëm. Do ta shqyrtojmë dhe do t’ju kontaktojmë me hapat e radhës.</>
                      ) : (
                        <>Thank you, <strong>{name}</strong>. We have received your request for <strong>{serviceLabel}</strong>. We will review it and contact you with the next steps.</>
                      )
                    ) : isSq ? (
                      <>Kërkesat online nuk janë ende aktive, prandaj kjo kërkesë <strong>nuk është dërguar</strong>. Ju lutemi na kontaktoni drejtpërdrejt në <strong>{siteData.brand.phone}</strong> ose <strong>{siteData.brand.email}</strong>.</>
                    ) : (
                      <>Online requests are not active yet, so this request <strong>has not been sent</strong>. Please contact us directly on <strong>{siteData.brand.phone}</strong> or at <strong>{siteData.brand.email}</strong>.</>
                    )}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary-dark btn-secondary"
                  >
                    {isSq ? 'Kthehu te Formulari' : 'Back to the Form'}
                  </button>
                </div>
              )}
            </div>

            {/* Direct Contact Info Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div
                style={{
                  background: 'var(--bg-dark)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  padding: '36px',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div className="section-tag section-tag-dark" style={{ marginBottom: '14px' }}>
                  {isSq ? '// Preferoni të flisni? //' : '// Prefer to talk? //'}
                </div>
                <h3 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '24px' }}>
                  {isSq ? 'Na kontaktoni drejtpërdrejt' : 'Contact us directly'}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={16} color="var(--accent-sand)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light-muted)', textTransform: 'uppercase' }}>{isSq ? 'Telefon' : 'Phone'}</div>
                      <a href={`tel:${siteData.brand.phone.replace(/\s+/g, '')}`} style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                        {siteData.brand.phone}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={16} color="var(--accent-sand)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light-muted)', textTransform: 'uppercase' }}>Email</div>
                      <a href={`mailto:${siteData.brand.email}`} style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>
                        {siteData.brand.email}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={16} color="var(--accent-sand)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light-muted)', textTransform: 'uppercase' }}>{isSq ? 'Zyra' : 'Office'}</div>
                      <div style={{ fontSize: '15px', color: '#ffffff' }}>
                        {isSq ? siteData.brand.addressSq : siteData.brand.address}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={16} color="var(--accent-sand)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-light-muted)', textTransform: 'uppercase' }}>{isSq ? 'Orari' : 'Opening hours'}</div>
                      <div style={{ fontSize: '15px', color: '#ffffff' }}>
                        {isSq ? siteData.brand.hoursSq : siteData.brand.hours}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge Card */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  padding: '28px',
                  border: '1px solid var(--border-card)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-full)', background: 'var(--bg-card-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={28} color="var(--accent-gold)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>{isSq ? 'Objekt pune i qartë' : 'A clear scope of work'}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {isSq
                      ? 'Para fillimit biem dakord me ju për objektin e punës dhe preventivin, që të dini saktë çfarë do të bëhet.'
                      : 'We agree the scope of work and the quotation with you before work starts, so you know exactly what will be done.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection lang={lang} />
    </div>
  );
}
