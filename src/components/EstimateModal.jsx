import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteData, timelineOptions } from '../data/siteData';

// Six grouped choices keep the popup the same size as before.
const SERVICE_CHOICES = [
  { value: 'Metal Structures', en: 'Metal Structures', sq: 'Konstruksione Metalike' },
  { value: 'Partitions & Ceilings', en: 'Partitions & Ceilings', sq: 'Ndarje dhe Tavane' },
  { value: 'Construction', en: 'Construction', sq: 'Ndërtim' },
  { value: 'Renovation', en: 'Renovation', sq: 'Rinovim' },
  { value: 'Maintenance', en: 'Maintenance & Repairs', sq: 'Mirëmbajtje dhe Riparime' },
  { value: 'Other / Not sure', en: 'Something else / Not sure yet', sq: 'Diçka tjetër / Nuk jam ende i sigurt' },
];

export default function EstimateModal({ isOpen, onClose, initialService, lang = 'en' }) {
  const isSq = lang === 'sq';
  const [selectedService, setSelectedService] = useState(initialService || SERVICE_CHOICES[0].value);
  const [timeline, setTimeline] = useState(timelineOptions[0].value);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // The success message only confirms receipt once the form is connected to a real inbox/backend.
  const isConnected = siteData.forms.connected;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert(
        isSq
          ? 'Ju lutemi shkruani emrin dhe adresën e email-it që t’ju kontaktojmë.'
          : 'Please enter your name and email address so we can contact you.'
      );
      return;
    }

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
      console.log('Confetti trigger:', err);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="modal-close-btn" aria-label={isSq ? 'Mbyll' : 'Close'}>
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div className="section-tag">{isSq ? '// Preventiv Falas //' : '// Free Estimate //'}</div>
              <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
                {isSq ? 'Na tregoni për projektin tuaj' : 'Tell us about your project'}
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                {isSq
                  ? 'Përshkruani punën që ju nevojitet. Punët e vogla shpesh i vlerësojmë nga një përshkrim dhe disa foto; për të tjerat vijmë në vend para se t’ju japim preventivin.'
                  : 'Describe the work you need. Smaller jobs can often be priced from a description and a few photos; for others we visit before giving you a quote.'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Service Selection */}
              <div className="form-group">
                <label className="form-label">{isSq ? 'Çfarë shërbimi ju nevojitet?' : 'What do you need help with?'}</label>
                <div className="service-choice-pills">
                  {SERVICE_CHOICES.map((service) => (
                    <button
                      type="button"
                      key={service.value}
                      onClick={() => setSelectedService(service.value)}
                      className={`service-choice-btn ${selectedService === service.value ? 'selected' : ''}`}
                    >
                      <span>{isSq ? service.sq : service.en}</span>
                      {selectedService === service.value && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Preference */}
              <div className="form-group">
                <label className="form-label" htmlFor="estimate-timeline">{isSq ? 'Kur dëshironi të nisni?' : 'When would you like to start?'}</label>
                <select
                  id="estimate-timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="form-select"
                >
                  {timelineOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{isSq ? opt.sq : opt.en}</option>
                  ))}
                </select>
              </div>

              {/* Contact Information */}
              <div className="form-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="estimate-name">{isSq ? 'Emri dhe mbiemri *' : 'Full name *'}</label>
                  <input
                    id="estimate-name"
                    type="text"
                    required
                    placeholder={isSq ? 'Emri juaj i plotë' : 'Your full name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="estimate-email">{isSq ? 'Email *' : 'Email address *'}</label>
                  <input
                    id="estimate-email"
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
                  <label className="form-label" htmlFor="estimate-phone">{isSq ? 'Numri i telefonit' : 'Phone number'}</label>
                  <input
                    id="estimate-phone"
                    type="tel"
                    placeholder="+355 6X XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="estimate-location">{isSq ? 'Qyteti ose vendndodhja e pronës' : 'City or property location'}</label>
                  <input
                    id="estimate-location"
                    type="text"
                    placeholder={isSq ? 'p.sh. Tiranë, Durrës' : 'e.g. Tirana, Durrës'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="estimate-notes">{isSq ? 'Përshkrimi i punës (opsionale)' : 'Description of the work (optional)'}</label>
                <textarea
                  id="estimate-notes"
                  rows={3}
                  placeholder={
                    isSq
                      ? 'p.sh. lloji i pronës, sipërfaqja përafërsisht, çfarë duhet ndërtuar, rinovuar ose riparuar...'
                      : 'e.g. type of property, approximate size, what needs to be built, renovated or repaired...'
                  }
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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

              <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                {isSq
                  ? '🔒 Të dhënat tuaja përdoren vetëm për t’iu përgjigjur kërkesës. Shihni Politikën e Privatësisë.'
                  : '🔒 Your details are used only to respond to your request. See our Privacy Policy.'}
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: 'var(--radius-full)',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle2 size={40} />
            </motion.div>

            <h2 style={{ fontSize: '30px', marginBottom: '12px' }}>
              {isConnected
                ? isSq ? 'Kërkesa u dërgua' : 'Request sent'
                : isSq ? `Faleminderit, ${name}` : `Thank you, ${name}`}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
              {isConnected ? (
                isSq ? (
                  <>Faleminderit, <strong>{name}</strong>. Kërkesën tuaj e morëm dhe do t’ju kontaktojmë në <strong>{email}</strong> me hapat e radhës.</>
                ) : (
                  <>Thank you, <strong>{name}</strong>. We have received your request and will contact you at <strong>{email}</strong> with the next steps.</>
                )
              ) : isSq ? (
                <>Kërkesat online nuk janë ende aktive, prandaj kjo kërkesë <strong>nuk është dërguar</strong>. Ju lutemi na kontaktoni drejtpërdrejt në <strong>{siteData.brand.phone}</strong> ose <strong>{siteData.brand.email}</strong>.</>
              ) : (
                <>Online requests are not active yet, so this request <strong>has not been sent</strong>. Please contact us directly on <strong>{siteData.brand.phone}</strong> or at <strong>{siteData.brand.email}</strong>.</>
              )}
            </p>

            <div style={{ background: 'var(--bg-card-warm)', borderRadius: 'var(--radius-md)', padding: '16px 20px', textAlign: 'left', marginBottom: '28px', fontSize: '14px' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px' }}>{isSq ? 'Si vazhdon procesi:' : 'What happens next:'}</div>
              <ul style={{ paddingLeft: '18px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                <li>{isSq ? '1. Shqyrtojmë kërkesën dhe, nëse duhet, ju kërkojmë foto ose detaje.' : '1. We review the request and, if needed, ask for photos or details.'}</li>
                <li>{isSq ? '2. Kur nevojitet, caktojmë një vizitë në objekt.' : '2. Where needed, we arrange a site visit.'}</li>
                <li>{isSq ? '3. Ju dërgojmë një preventiv bazuar në objektin e punës.' : '3. We send you a quotation based on the scope of work.'}</li>
              </ul>
            </div>

            <button
              onClick={handleReset}
              className="btn-primary-dark btn-primary"
              style={{ margin: '0 auto' }}
            >
              <span>{isSq ? 'Kthehu te Faqja' : 'Back to the Website'}</span>
              <div className="btn-icon-circle">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
