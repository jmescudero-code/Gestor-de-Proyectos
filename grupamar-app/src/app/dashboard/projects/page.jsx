'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Plus, Filter, Search, ChevronRight, ChevronDown } from 'lucide-react';
import styles from './page.module.css';

// Datos estáticos mockeados para el MVP
const MOCK_DATA = [
  {
    id: 'g1',
    type: 'group',
    name: 'Pendiente Procesos',
    expanded: true,
    children: [
      {
        id: 'p1',
        type: 'project',
        code: '1',
        name: 'Planificador de Rutas',
        status: 'En curso',
        progress: 45,
        responsible: 'Juan Pérez',
        expanded: true,
        children: [
          {
            id: 'a1',
            type: 'action',
            code: '1.1',
            name: 'Limpieza de base de datos',
            status: 'Listo',
            progress: 100,
            responsible: 'María López',
            expanded: false,
            children: []
          },
          {
            id: 'a2',
            type: 'action',
            code: '1.6',
            name: 'Entrega BCN',
            status: 'En curso',
            progress: 20,
            responsible: 'Juan Pérez',
            expanded: true,
            children: [
              {
                id: 's1',
                type: 'subtask',
                code: '1.6.1',
                name: 'Limpieza fichero receptores BCN',
                status: 'En curso',
                progress: 50,
                responsible: 'Ana García'
              },
              {
                id: 's2',
                type: 'subtask',
                code: '1.6.2',
                name: 'Revisión datos delegación Palma',
                status: 'No iniciada',
                progress: 0,
                responsible: 'Carlos Ruiz'
              }
            ]
          }
        ]
      }
    ]
  }
];

export default function ProjectsPage() {
  const [data, setData] = useState(MOCK_DATA);

  const toggleExpand = (idToToggle, currentData) => {
    return currentData.map(item => {
      if (item.id === idToToggle) {
        return { ...item, expanded: !item.expanded };
      }
      if (item.children) {
        return { ...item, children: toggleExpand(idToToggle, item.children) };
      }
      return item;
    });
  };

  const handleToggle = (id) => {
    setData(toggleExpand(id, data));
  };

  const renderStatus = (status) => {
    let statusClass = styles.statusNoIniciada;
    if (status === 'En curso') statusClass = styles.statusEnCurso;
    if (status === 'Listo') statusClass = styles.statusListo;

    return <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>;
  };

  const renderProgress = (progress) => {
    return (
      <div style={{ width: '100px' }}>
        <div style={{ fontSize: '0.75rem', textAlign: 'right', fontWeight: 600 }}>{progress}%</div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };

  const renderRows = (items, level = 0) => {
    let rows = [];
    items.forEach(item => {
      const paddingLeft = `${level * 2 + 1}rem`;
      const isExpandable = item.children && item.children.length > 0;
      
      let rowClass = styles.rowProject;
      if (item.type === 'group') rowClass = styles.rowGroup;
      else if (item.type === 'action') rowClass = styles.rowAction;
      else if (item.type === 'subtask') rowClass = styles.rowSubtask;

      rows.push(
        <tr key={item.id} className={rowClass}>
          <td style={{ paddingLeft }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isExpandable ? (
                <button 
                  onClick={() => handleToggle(item.id)} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {item.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              ) : (
                <span style={{ width: 16 }}></span>
              )}
              {item.code && <span style={{ fontWeight: item.type === 'project' ? 700 : 500, color: 'var(--color-dark-blue)' }}>{item.code}</span>}
              <span style={{ fontWeight: item.type === 'group' ? 700 : 400 }}>{item.name}</span>
            </div>
          </td>
          <td>{item.status && renderStatus(item.status)}</td>
          <td>{item.progress !== undefined && renderProgress(item.progress)}</td>
          <td>{item.responsible}</td>
          <td>
            {item.type !== 'group' && (
               <Button variant="outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Ver Detalle</Button>
            )}
          </td>
        </tr>
      );

      if (item.expanded && isExpandable) {
        rows = rows.concat(renderRows(item.children, level + 1));
      }
    });
    return rows;
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="outline"><Filter size={16}/> Filtrar</Button>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 10, top: 12, color: '#666' }} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              style={{ padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>
        <Button><Plus size={16} /> Nuevo Proyecto</Button>
      </div>

      <Card>
        <CardContent style={{ padding: 0 }}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Nombre / Código</th>
                  <th>Estado</th>
                  <th>Avance</th>
                  <th>Responsable</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {renderRows(data)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
