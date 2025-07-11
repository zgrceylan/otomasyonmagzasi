export interface Plan {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
  bots?: Bot[]
}

export interface Bot {
  id: string
  name: string
  description: string
  category: string
  workflow_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface PlanBot {
  id: string
  plan_id: string
  bot_id: string
  created_at: string
}

export interface UserPlan {
  id: string
  user_id: string
  plan_id: string
  status: 'active' | 'cancelled' | 'expired' | 'trial'
  subscription_start: string
  subscription_end?: string
  trial_end?: string
  created_at: string
  updated_at: string
  plan?: Plan
}

export interface UserBot {
  id: string
  user_id: string
  bot_id: string
  plan_id?: string
  status: 'active' | 'inactive' | 'expired'
  access_start: string
  access_end?: string
  created_at: string
  updated_at: string
  bot?: Bot
}

export interface Payment {
  id: string
  user_id: string
  plan_id?: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_method?: string
  transaction_id?: string
  created_at: string
  updated_at: string
  plan?: Plan
}

export interface BotLog {
  id: string
  user_id: string
  bot_id: string
  status: 'success' | 'error' | 'warning'
  message?: string
  details: Record<string, any>
  execution_time?: number
  created_at: string
  bot?: Bot
}

export interface AdminUser {
  id: string
  user_id: string
  role: 'admin' | 'super_admin'
  permissions: string[]
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      plans: {
        Row: Plan
        Insert: Omit<Plan, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Plan, 'id' | 'created_at' | 'updated_at'>>
      }
      bots: {
        Row: Bot
        Insert: Omit<Bot, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Bot, 'id' | 'created_at' | 'updated_at'>>
      }
      plan_bots: {
        Row: PlanBot
        Insert: Omit<PlanBot, 'id' | 'created_at'>
        Update: Partial<Omit<PlanBot, 'id' | 'created_at'>>
      }
      user_plans: {
        Row: UserPlan
        Insert: Omit<UserPlan, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserPlan, 'id' | 'created_at' | 'updated_at'>>
      }
      user_bots: {
        Row: UserBot
        Insert: Omit<UserBot, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserBot, 'id' | 'created_at' | 'updated_at'>>
      }
      payments: {
        Row: Payment
        Insert: Omit<Payment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Payment, 'id' | 'created_at' | 'updated_at'>>
      }
      bot_logs: {
        Row: BotLog
        Insert: Omit<BotLog, 'id' | 'created_at'>
        Update: Partial<Omit<BotLog, 'id' | 'created_at'>>
      }
      admin_users: {
        Row: AdminUser
        Insert: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}