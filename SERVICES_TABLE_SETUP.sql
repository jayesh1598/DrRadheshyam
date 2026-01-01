-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(512),
  icon VARCHAR(10),
  category VARCHAR(100) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_services_active ON services(active);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_created_at ON services(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read all services
CREATE POLICY "Anyone can read services"
  ON services FOR SELECT
  USING (true);

-- Create policy for authenticated admin users to insert/update/delete
CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON services TO authenticated;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER services_updated_at_trigger
BEFORE UPDATE ON services
FOR EACH ROW
EXECUTE FUNCTION update_services_updated_at();
