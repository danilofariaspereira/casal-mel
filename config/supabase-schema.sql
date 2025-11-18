CREATE TABLE IF NOT EXISTS eventos (
    id SERIAL PRIMARY KEY,
    titulo TEXT,
    data TEXT,
    dia_semana TEXT,
    local TEXT,
    descricao TEXT,
    whatsapp TEXT,
    imagem TEXT,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shows (
    id SERIAL PRIMARY KEY,
    titulo TEXT,
    data TEXT,
    dia_semana TEXT,
    local TEXT,
    descricao TEXT,
    whatsapp TEXT,
    imagem TEXT,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_eventos_ativo ON eventos(ativo);
CREATE INDEX IF NOT EXISTS idx_shows_ativo ON shows(ativo);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON eventos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shows_updated_at BEFORE UPDATE ON shows
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de eventos" ON eventos
    FOR SELECT USING (true);

CREATE POLICY "Permitir inserção pública de eventos" ON eventos
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização pública de eventos" ON eventos
    FOR UPDATE USING (true);

CREATE POLICY "Permitir deleção pública de eventos" ON eventos
    FOR DELETE USING (true);

CREATE POLICY "Permitir leitura pública de shows" ON shows
    FOR SELECT USING (true);

CREATE POLICY "Permitir inserção pública de shows" ON shows
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização pública de shows" ON shows
    FOR UPDATE USING (true);

CREATE POLICY "Permitir deleção pública de shows" ON shows
    FOR DELETE USING (true);
