-- Script para crear las tablas en Supabase (PostgreSQL)

-- Tabla: roles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

-- Insertar roles iniciales
INSERT INTO roles (name, description) VALUES ('admin', 'Administrador'), ('editor', 'Editor'), ('viewer', 'Visualizador');

-- Tabla: users (extiende la tabla de auth de supabase)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role_id UUID REFERENCES roles(id),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- Tabla: groups
CREATE TABLE groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES groups(id),
    code INTEGER UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'No iniciada',
    progress_percentage INTEGER DEFAULT 0,
    priority VARCHAR(50) DEFAULT 'Media',
    main_responsible_id UUID REFERENCES users(id),
    planned_start_date DATE,
    planned_end_date DATE,
    real_start_date DATE,
    real_end_date DATE,
    active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: actions
CREATE TABLE actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id),
    code VARCHAR(50) UNIQUE NOT NULL,
    topic VARCHAR(255),
    description TEXT,
    status VARCHAR(50) DEFAULT 'No iniciada',
    progress_percentage INTEGER DEFAULT 0,
    priority VARCHAR(50) DEFAULT 'Media',
    main_responsible_id UUID REFERENCES users(id),
    planned_start_date DATE,
    planned_end_date DATE,
    real_start_date DATE,
    real_end_date DATE,
    active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: subtasks
CREATE TABLE subtasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action_id UUID REFERENCES actions(id),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'No iniciada',
    progress_percentage INTEGER DEFAULT 0,
    priority VARCHAR(50) DEFAULT 'Media',
    responsible_id UUID REFERENCES users(id),
    planned_start_date DATE,
    planned_end_date DATE,
    real_start_date DATE,
    real_end_date DATE,
    active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla: work_logs
CREATE TABLE work_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL, -- 'project', 'action', 'subtask'
    entity_id UUID NOT NULL,
    user_id UUID REFERENCES users(id),
    work_date DATE NOT NULL,
    week_number INTEGER,
    month INTEGER,
    year INTEGER,
    original_text TEXT,
    ai_improved_text TEXT,
    final_text TEXT NOT NULL,
    previous_status VARCHAR(50),
    new_status VARCHAR(50),
    previous_progress_percentage INTEGER,
    new_progress_percentage INTEGER,
    blockers TEXT,
    next_steps TEXT,
    pending_decisions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
