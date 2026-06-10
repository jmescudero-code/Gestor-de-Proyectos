'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Mic, MicOff, Save } from 'lucide-react';
import styles from './ProgressForm.module.css';

export default function ProgressForm({ onSave, defaultPercentage = 0, defaultStatus = 'En curso' }) {
  const [text, setText] = useState('');
  const [percentage, setPercentage] = useState(defaultPercentage);
  const [status, setStatus] = useState(defaultStatus);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAudioToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      
      // Mock de procesamiento con Gemini IA (luego se integrará con @google/generative-ai)
      setTimeout(() => {
        setText('El texto original grabado ha sido transcrito y mejorado por IA para mayor claridad: Se revisó la entrega BCN y se identificaron bloqueos en la aduana. Siguiente paso: llamar al proveedor.');
        setIsProcessing(false);
      }, 1500);
    } else {
      setIsRecording(true);
      setText('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({ text, percentage, status });
    }
    alert('Avance guardado con éxito (Mock)');
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Registro de Avance</label>
        
        <button 
          type="button" 
          className={`${styles.audioButton} ${isRecording ? styles.audioRecording : ''}`}
          onClick={handleAudioToggle}
        >
          {isRecording ? (
            <><MicOff size={18} /> Detener Grabación</>
          ) : (
            <><Mic size={18} /> Dictar Avance (Mejorado con Gemini IA)</>
          )}
        </button>

        {isProcessing && <div style={{ fontSize: '0.875rem', color: 'var(--color-light-blue)' }}>Procesando audio con IA...</div>}

        <textarea 
          className={styles.textarea} 
          placeholder="Escribe el avance aquí o revisa la transcripción de IA..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Estado Actual</label>
          <select 
            className={styles.select} 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="No iniciada">No iniciada</option>
            <option value="En curso">En curso</option>
            <option value="Pausado">Pausado</option>
            <option value="Listo">Listo</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Porcentaje de Avance (%)</label>
          <input 
            type="number" 
            min="0" 
            max="100" 
            className={styles.input} 
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outline">Cancelar</Button>
        <Button type="submit"><Save size={16} /> Guardar Avance</Button>
      </div>
    </form>
  );
}
