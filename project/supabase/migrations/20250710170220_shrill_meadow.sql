/*
  # Otomasyon Mağazası - İlk Veritabanı Şeması

  1. Yeni Tablolar
    - `plans` - Abonelik planları (id, name, description, price, features, bots, is_active)
    - `bots` - Mevcut botlar (id, name, description, category, is_active)
    - `plan_bots` - Plan-bot ilişkileri (plan_id, bot_id)
    - `user_plans` - Kullanıcı abonelikleri (user_id, plan_id, status, dates)
    - `user_bots` - Kullanıcı bot erişimleri (user_id, bot_id, plan_id, status)
    - `payments` - Ödeme kayıtları (user_id, plan_id, amount, status)
    - `bot_logs` - Bot çalışma günlükleri (user_id, bot_id, status, details)

  2. Güvenlik
    - Tüm tablolarda RLS etkin
    - Kullanıcılar sadece kendi verilerine erişebilir
    - Admin kullanıcıları tüm verilere erişebilir
*/

-- Planlar tablosu
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Botlar tablosu
CREATE TABLE IF NOT EXISTS bots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text,
  workflow_id text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Plan-Bot ilişkileri tablosu
CREATE TABLE IF NOT EXISTS plan_bots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES plans(id) ON DELETE CASCADE,
  bot_id uuid REFERENCES bots(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(plan_id, bot_id)
);

-- Kullanıcı planları tablosu
CREATE TABLE IF NOT EXISTS user_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES plans(id) ON DELETE CASCADE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  subscription_start timestamptz DEFAULT now(),
  subscription_end timestamptz,
  trial_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Kullanıcı botları tablosu
CREATE TABLE IF NOT EXISTS user_bots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  bot_id uuid REFERENCES bots(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES plans(id) ON DELETE SET NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  access_start timestamptz DEFAULT now(),
  access_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, bot_id)
);

-- Ödemeler tablosu
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid REFERENCES plans(id) ON DELETE SET NULL,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'TRY',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text,
  transaction_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bot günlükleri tablosu
CREATE TABLE IF NOT EXISTS bot_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  bot_id uuid REFERENCES bots(id) ON DELETE CASCADE,
  status text DEFAULT 'success' CHECK (status IN ('success', 'error', 'warning')),
  message text,
  details jsonb DEFAULT '{}'::jsonb,
  execution_time integer, -- milliseconds
  created_at timestamptz DEFAULT now()
);

-- Admin kullanıcıları tablosu
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  permissions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS Politikaları

-- Plans tablosu - herkes okuyabilir, sadece admin yazabilir
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plans are viewable by everyone"
  ON plans FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Plans are manageable by admins"
  ON plans FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Bots tablosu - herkes okuyabilir, sadece admin yazabilir
ALTER TABLE bots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bots are viewable by everyone"
  ON bots FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Bots are manageable by admins"
  ON bots FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Plan-Bots tablosu
ALTER TABLE plan_bots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plan bots are viewable by everyone"
  ON plan_bots FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Plan bots are manageable by admins"
  ON plan_bots FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- User Plans tablosu - kullanıcılar sadece kendi planlarını görebilir
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own plans"
  ON user_plans FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own plans"
  ON user_plans FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own plans"
  ON user_plans FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all plans"
  ON user_plans FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- User Bots tablosu - kullanıcılar sadece kendi botlarını görebilir
ALTER TABLE user_bots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bots"
  ON user_bots FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own bots"
  ON user_bots FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own bots"
  ON user_bots FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all user bots"
  ON user_bots FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Payments tablosu
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all payments"
  ON payments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Bot Logs tablosu
ALTER TABLE bot_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bot logs"
  ON bot_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own bot logs"
  ON bot_logs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all bot logs"
  ON bot_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Admin Users tablosu
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Super admins can manage admin users"
  ON admin_users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Fonksiyonlar

-- Updated_at otomatik güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Updated_at trigger'ları
CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bots_updated_at BEFORE UPDATE ON bots
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_plans_updated_at BEFORE UPDATE ON user_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_bots_updated_at BEFORE UPDATE ON user_bots
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();