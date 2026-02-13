'use client';

import React, { useEffect, useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { supabase } from '@/lib/database';
import styles from '@/styles/contact.module.css';

interface Profile {
  email: string;
  phone: string;
  location: string;
}

const Contact = () => {
  // --- Profile Logic (Column 1) ---
  const [profile, setProfile] = useState<Profile | null>(null);

  // --- Form Logic (Column 2) ---
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'System Architecture',
    message: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profile')
        .select('email, phone, location')
        .single();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. Relational Identity Upsert
      const { data: contact, error: contactError } = await supabase
        .from('contacts')
        .upsert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null
        }, { onConflict: 'email' })
        .select()
        .single();

      if (contactError) throw contactError;

      // 2. Project Context Insert
      const { error: inquiryError } = await supabase
        .from('inquiries')
        .insert([{
          contact_id: contact.id,
          subject: formData.subject,
          message: formData.message
        }]);

      if (inquiryError) throw inquiryError;

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: 'System Architecture', message: '' });
    } catch (err) {
      console.error("Discovery Sync Failed:", err);
      const errorMsg = err instanceof Error ? err.message : 'System error. Please verify network connection.';
      setErrorMessage(errorMsg);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={styles.section}>
      {/* Animated Background Shapes */}
      <div className={styles.shape1}></div>
      <div className={styles.shape2}></div>
      <div className={styles.shape3}></div>

      <div className={styles.container}>

        {/* COLUMN 1: IDENTITY & HANDSHAKE */}
        <div className={styles.infoColumn}>
          <h2 className={styles.headline}>
            Let&apos;s Build <br />
            <span className={styles.highlight}>Something Real.</span>
          </h2>
          <p className={styles.subtext}>
            Currently based in {profile?.location || 'Monrovia, Liberia'}, managing digital infrastructure and program lifecycles. Synchronize with my system to initiate a new project.
          </p>

          <div className={styles.detailsList}>
            <div className={styles.detailCard}>
              <div className={styles.iconBox}><Mail size={22} /></div>
              <div>
                <span className={styles.label}>Direct Connection</span>
                <p className={styles.value}>{profile?.email || 'mulubahzumu@gmail.com'}</p>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.iconBox}><Phone size={22} /></div>
              <div>
                <span className={styles.label}>Secure Line</span>
                <p className={styles.value}>{profile?.phone || '+231 886 678 786'}</p>
              </div>
            </div>

            <div className={styles.detailCard}>
              <div className={styles.iconBox}><MapPin size={22} /></div>
              <div>
                <span className={styles.label}>HQ Operations</span>
                <p className={styles.value}>{profile?.location || 'Monrovia, Liberia'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: THE DISCOVERY PROTOCOL */}
        <div className={styles.formColumn}>
          {status === 'success' ? (
            <div className={styles.successState}>
              <CheckCircle size={60} className={styles.successIcon} />
              <h3>Protocol Initialized</h3>
              <p>Your inquiry has been successfully logged. Reviewing requirements for system compatibility. Expect a response within 24 hours.</p>
              <button onClick={() => setStatus('idle')} className={styles.resetBtn}>New Discovery Session</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formBadge}>
                <ShieldCheck size={16} />
                <span>Secure Discovery Protocol</span>
              </div>

              <div className={styles.field}>
                <label>Name / Organization <span>*</span></label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Christopher B. Jones or LLC"
                  disabled={status === 'loading'}
                />
              </div>

              <div className={styles.field}>
                <label>Work Email <span>*</span></label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="name@organization.com"
                  disabled={status === 'loading'}
                />
              </div>

              <div className={styles.field}>
                <label>Service Area <span>*</span></label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  disabled={status === 'loading'}
                >
                  <option>System Architecture</option>
                  <option>Full-Stack Rails Development</option>
                  <option>Hotwire Native (Mobile)</option>
                  <option>Technical Program Management</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Project Brief <span>*</span></label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Define requirements, bottlenecks, or program goals..."
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'error' && (
                <div className={styles.errorBox}>
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <Loader2 className={styles.spinner} />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Initialize Synchronization</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default Contact;