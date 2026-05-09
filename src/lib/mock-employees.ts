export type EmployeeRole = 'Corretor' | 'Gerente' | 'Assistente' | 'Coordenador'
export type ContractType = 'CLT' | 'PJ' | 'Autônomo'
export type EmployeeStatus = 'Ativo' | 'Inativo' | 'Férias' | 'Desligado'

export interface Payment {
  id: string
  month: number
  year: number
  baseSalary: number
  commissionEarned: number
  bonus: number
  deductions: number
  netTotal: number
  status: 'Pago' | 'Pendente' | 'Cancelado'
  paidAt?: string
  notes?: string
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  photo: string
  role: EmployeeRole
  contractType: ContractType
  status: EmployeeStatus
  hireDate: string
  creci?: string
  baseSalary: number
  commissionSalePercent: number
  commissionRentalPercent: number
  propertiesSold: number
  propertiesRented: number
  totalRevenueGenerated: number
  totalCommissionEarned: number
  leadsAttended: number
  payments: Payment[]
}

export const mockEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Carlos Mendes',
    email: 'carlos@imovelprime.com.br',
    phone: '(11) 99123-4567',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    role: 'Corretor',
    contractType: 'CLT',
    status: 'Ativo',
    hireDate: '2021-03-15',
    creci: 'CRECI-SP 45.231',
    baseSalary: 3500,
    commissionSalePercent: 1.5,
    commissionRentalPercent: 8,
    propertiesSold: 34,
    propertiesRented: 18,
    totalRevenueGenerated: 5_800_000,
    totalCommissionEarned: 87_000,
    leadsAttended: 142,
    payments: [
      {
        id: 'pay-1-5',
        month: 5,
        year: 2026,
        baseSalary: 3500,
        commissionEarned: 8400,
        bonus: 500,
        deductions: 420,
        netTotal: 11980,
        status: 'Pendente',
      },
      {
        id: 'pay-1-4',
        month: 4,
        year: 2026,
        baseSalary: 3500,
        commissionEarned: 6200,
        bonus: 0,
        deductions: 420,
        netTotal: 9280,
        status: 'Pago',
        paidAt: '2026-05-05',
      },
      {
        id: 'pay-1-3',
        month: 3,
        year: 2026,
        baseSalary: 3500,
        commissionEarned: 9800,
        bonus: 1000,
        deductions: 420,
        netTotal: 13880,
        status: 'Pago',
        paidAt: '2026-04-05',
      },
      {
        id: 'pay-1-2',
        month: 2,
        year: 2026,
        baseSalary: 3500,
        commissionEarned: 4500,
        bonus: 0,
        deductions: 420,
        netTotal: 7580,
        status: 'Pago',
        paidAt: '2026-03-05',
      },
      {
        id: 'pay-1-1',
        month: 1,
        year: 2026,
        baseSalary: 3500,
        commissionEarned: 7200,
        bonus: 500,
        deductions: 420,
        netTotal: 10780,
        status: 'Pago',
        paidAt: '2026-02-05',
      },
    ],
  },
  {
    id: 'emp-2',
    name: 'Ana Lima',
    email: 'ana@imovelprime.com.br',
    phone: '(11) 98765-4321',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
    role: 'Gerente',
    contractType: 'CLT',
    status: 'Ativo',
    hireDate: '2019-07-01',
    creci: 'CRECI-SP 38.104',
    baseSalary: 6500,
    commissionSalePercent: 1.2,
    commissionRentalPercent: 6,
    propertiesSold: 58,
    propertiesRented: 31,
    totalRevenueGenerated: 11_200_000,
    totalCommissionEarned: 134_400,
    leadsAttended: 312,
    payments: [
      {
        id: 'pay-2-5',
        month: 5,
        year: 2026,
        baseSalary: 6500,
        commissionEarned: 12000,
        bonus: 2000,
        deductions: 780,
        netTotal: 19720,
        status: 'Pendente',
      },
      {
        id: 'pay-2-4',
        month: 4,
        year: 2026,
        baseSalary: 6500,
        commissionEarned: 9600,
        bonus: 0,
        deductions: 780,
        netTotal: 15320,
        status: 'Pago',
        paidAt: '2026-05-05',
      },
      {
        id: 'pay-2-3',
        month: 3,
        year: 2026,
        baseSalary: 6500,
        commissionEarned: 14400,
        bonus: 3000,
        deductions: 780,
        netTotal: 23120,
        status: 'Pago',
        paidAt: '2026-04-05',
      },
    ],
  },
  {
    id: 'emp-3',
    name: 'Pedro Costa',
    email: 'pedro@imovelprime.com.br',
    phone: '(11) 97654-3210',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
    role: 'Corretor',
    contractType: 'PJ',
    status: 'Férias',
    hireDate: '2022-01-10',
    creci: 'CRECI-SP 51.887',
    baseSalary: 0,
    commissionSalePercent: 2,
    commissionRentalPercent: 10,
    propertiesSold: 21,
    propertiesRented: 9,
    totalRevenueGenerated: 3_900_000,
    totalCommissionEarned: 78_000,
    leadsAttended: 89,
    payments: [
      {
        id: 'pay-3-5',
        month: 5,
        year: 2026,
        baseSalary: 0,
        commissionEarned: 0,
        bonus: 0,
        deductions: 0,
        netTotal: 0,
        status: 'Pendente',
        notes: 'Funcionário em férias',
      },
      {
        id: 'pay-3-4',
        month: 4,
        year: 2026,
        baseSalary: 0,
        commissionEarned: 5800,
        bonus: 0,
        deductions: 0,
        netTotal: 5800,
        status: 'Pago',
        paidAt: '2026-05-05',
      },
    ],
  },
  {
    id: 'emp-4',
    name: 'Juliana Ferreira',
    email: 'juliana@imovelprime.com.br',
    phone: '(11) 96543-2109',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
    role: 'Assistente',
    contractType: 'CLT',
    status: 'Ativo',
    hireDate: '2023-05-20',
    baseSalary: 2800,
    commissionSalePercent: 0,
    commissionRentalPercent: 0,
    propertiesSold: 0,
    propertiesRented: 0,
    totalRevenueGenerated: 0,
    totalCommissionEarned: 0,
    leadsAttended: 0,
    payments: [
      {
        id: 'pay-4-5',
        month: 5,
        year: 2026,
        baseSalary: 2800,
        commissionEarned: 0,
        bonus: 0,
        deductions: 336,
        netTotal: 2464,
        status: 'Pendente',
      },
      {
        id: 'pay-4-4',
        month: 4,
        year: 2026,
        baseSalary: 2800,
        commissionEarned: 0,
        bonus: 0,
        deductions: 336,
        netTotal: 2464,
        status: 'Pago',
        paidAt: '2026-05-05',
      },
    ],
  },
  {
    id: 'emp-5',
    name: 'Roberto Alves',
    email: 'roberto.alves@imovelprime.com.br',
    phone: '(11) 95432-1098',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
    role: 'Coordenador',
    contractType: 'CLT',
    status: 'Inativo',
    hireDate: '2018-11-01',
    creci: 'CRECI-SP 29.456',
    baseSalary: 5200,
    commissionSalePercent: 1,
    commissionRentalPercent: 5,
    propertiesSold: 82,
    propertiesRented: 44,
    totalRevenueGenerated: 16_400_000,
    totalCommissionEarned: 164_000,
    leadsAttended: 421,
    payments: [],
  },
]

export const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]
