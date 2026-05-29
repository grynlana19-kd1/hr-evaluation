'use client'

import React, { useMemo, useState } from 'react'
import {
  User,
  MessageSquare,
  Plus,
  Save,
  Copy,
  Brain,
  Sparkles,
  Trash2,
  ArrowLeft,
  BriefcaseBusiness,
  Info,
  CheckCircle2,
} from 'lucide-react'

const softSkills = [
  'Комунікація',
  'Проактивність та ініціативність',
  'Здатність до навчання',
  'Амбітність та розвиток',
  'Самостійність',
  'Відповідальність за результат',
  'Організованість і тайм-менеджмент',
  'Командна взаємодія',
]

const metaPrograms = [
  'Проактивність / реактивність',
  'Глобальність / детальність',
  'Внутрішня / зовнішня референція',
  'Процеси / результати',
  'Пошук можливостей / дотримання процедур',
]

const initialHardSkills = [
  'Розробка портрету кандидата та оцінка',
  'Написання вакансій',
  'Проведення телефонних інтерв’ю',
  'Проведення очних співбесід',
  'Онбординг новачків',
  'Аналітика рекрутингу',
]

const riskFields = [
  'Сильні сторони',
  'Ключові результати',
  'Зони розвитку',
  'Матеріальна мотивація',
  'Нематеріальна мотивація',
  'Кадровий резерв',
  'Ризики звільнення',
  'Відповідність корпоративній культурі',
]

type SkillData = {
  rating?: number
  redFlag?: boolean
  comment?: string
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
}

function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-50'
  const styles = {
    primary: 'bg-violet-600 text-white hover:bg-violet-700',
    outline: 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50',
    ghost: 'text-slate-700 hover:bg-slate-100',
  }

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>
}

function RatingButtons({ value, redFlag, onRatingChange, onRedFlagChange }: {
  value?: number
  redFlag?: boolean
  onRatingChange: (value: number) => void
  onRedFlagChange: (value: boolean) => void
}) {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onRedFlagChange(!redFlag)}
        className={`flex h-8 min-w-8 items-center justify-center rounded-full border text-xs font-medium transition ${
          redFlag
            ? 'border-red-500 bg-red-500 text-white shadow-sm shadow-red-200'
            : 'border-red-200 bg-red-50 text-red-500 hover:border-red-400'
        }`}
        title="Позначити тривожний сигнал"
      >
        ⚑
      </button>

      {values.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onRatingChange(item)}
          className={`flex h-8 min-w-8 items-center justify-center rounded-full border text-sm font-medium transition ${
            value === item
              ? 'border-violet-600 bg-violet-600 text-white shadow-sm shadow-violet-200'
              : 'border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-700'
          }`}
          title={`Оцінка ${item}`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function AutoTextArea({ value, onChange, placeholder = 'Введіть коментар...' }: {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <textarea
      rows={1}
      value={value || ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onInput={(e) => {
        e.currentTarget.style.height = 'auto'
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
      }}
      className="min-h-[42px] w-full overflow-hidden rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm leading-5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
    />
  )
}

function SkillRow({ title, data, onChange }: {
  title: string
  data: SkillData
  onChange: (value: SkillData) => void
}) {
  return (
    <div className="border-b border-slate-200 bg-white px-5 py-4 last:border-b-0">
      <div className="mb-3 text-base font-semibold text-slate-950">{title}</div>

      <div>
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Оцінка</div>
            <RatingButtons
              value={data?.rating}
              redFlag={Boolean(data?.redFlag)}
              onRatingChange={(rating) => onChange({ ...data, rating })}
              onRedFlagChange={(redFlag) => onChange({ ...data, redFlag })}
            />
          </div>

          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Коментар HR</div>
            <AutoTextArea value={data?.comment} onChange={(comment) => onChange({ ...data, comment })} />
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionShell({ icon: Icon, title, children, action }: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-700">
            <Icon className="h-4 w-4" />
          </div>
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export default function HRCandidateEvaluationPrototype() {
  const [active, setActive] = useState<'candidate' | 'skills'>('candidate')
  const [candidate, setCandidate] = useState({ position: 'HR-менеджер' })
  const [softData, setSoftData] = useState<Record<string, SkillData>>({})
  const [hardSkills, setHardSkills] = useState(initialHardSkills)
  const [hardData, setHardData] = useState<Record<string, SkillData>>({})
  const [riskData, setRiskData] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  const progress = useMemo(() => {
    const filled = [
      candidate.name,
      candidate.crm,
      candidate.salary,
      candidate.resume,
      ...Object.values(softData).map((item) => item?.comment || item?.rating || item?.redFlag),
      ...Object.values(hardData).map((item) => item?.comment || item?.rating || item?.redFlag),
      ...Object.values(riskData),
    ].filter(Boolean).length

    return Math.min(100, Math.round((filled / 28) * 100))
  }, [candidate, softData, hardData, riskData])

  const handleCopy = async () => {
    const text = riskData['Сильні сторони'] || ''
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1900px] flex-wrap items-center gap-4">
          <div className="mr-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <Brain className="h-4 w-4" />
            </div>
            <div className="text-lg font-bold">Оцінка кандидата</div>
          </div>

          <button
            type="button"
            onClick={() => setActive('candidate')}
            className={`relative px-3 py-3 text-sm font-medium transition ${
              active === 'candidate' ? 'text-violet-700' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Кандидат
            {active === 'candidate' && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-violet-600" />}
          </button>

          <button
            type="button"
            onClick={() => setActive('skills')}
            className={`relative px-3 py-3 text-sm font-medium transition ${
              active === 'skills' ? 'text-violet-700' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            Soft + Hard skills
            {active === 'skills' && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-violet-600" />}
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline">
              <Sparkles className="mr-2 h-4 w-4 text-violet-600" />
              AI-висновки
            </Button>

            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Зберегти
            </Button>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
              HR
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1900px] px-5 pb-24 pt-6">
        {active === 'candidate' && (
          <Card>
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-xl font-bold text-slate-950">Кандидат</h2>
            </div>

            <div className="grid gap-5 p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  placeholder="ПІБ кандидата"
                  value={candidate.name || ''}
                  onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />

                <select
                  value={candidate.position || 'HR-менеджер'}
                  onChange={(e) => setCandidate({ ...candidate, position: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                >
                  <option>HR-менеджер</option>
                </select>

                <input
                  placeholder="Посилання CRM"
                  value={candidate.crm || ''}
                  onChange={(e) => setCandidate({ ...candidate, crm: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />

                <input
                  placeholder="Очікувана зарплата"
                  value={candidate.salary || ''}
                  onChange={(e) => setCandidate({ ...candidate, salary: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <div>
                <div className="mb-2 text-sm font-medium">Текст резюме кандидата</div>
                <AutoTextArea
                  value={candidate.resume}
                  onChange={(resume) => setCandidate({ ...candidate, resume })}
                  placeholder="Вставте сюди текст резюме кандидата..."
                />
              </div>
            </div>
          </Card>
        )}

        {active === 'skills' && (
          <div className="space-y-8">
            <div className="grid gap-5 [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] items-start">
              <div className="min-w-0">
                <SectionShell icon={MessageSquare} title="Soft skills">
                  {softSkills.map((skill) => (
                    <SkillRow
                      key={skill}
                      title={skill}
                      data={softData[skill] || {}}
                      onChange={(value) => setSoftData({ ...softData, [skill]: value })}
                    />
                  ))}
                </SectionShell>
              </div>

              <div className="min-w-0">
                <SectionShell
                  icon={BriefcaseBusiness}
                  title="Hard skills"
                  action={
                    <button
                      type="button"
                      onClick={() => setHardSkills([...hardSkills, 'Новий hard skill'])}
                      className="flex items-center gap-1 text-sm font-medium text-violet-700 hover:text-violet-900"
                    >
                      <Plus className="h-4 w-4" />
                      Додати hard skill
                    </button>
                  }
                >
                  {hardSkills.map((skill, index) => (
                    <div key={`${skill}-${index}`} className="border-b border-slate-200 bg-white px-5 py-4 last:border-b-0">
                      <input
                        value={skill}
                        onChange={(e) => setHardSkills(hardSkills.map((s, i) => (i === index ? e.target.value : s)))}
                        className="mb-3 w-full rounded-xl border border-transparent bg-transparent p-0 text-base font-semibold text-slate-950 outline-none hover:border-slate-200 hover:bg-slate-50 focus:border-violet-300 focus:bg-white focus:p-2"
                      />

                      <div>
                        <div className="space-y-4">
                          <div>
                            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Оцінка</div>
                            <RatingButtons
                              value={hardData[skill]?.rating}
                              redFlag={Boolean(hardData[skill]?.redFlag)}
                              onRatingChange={(rating) => setHardData({ ...hardData, [skill]: { ...hardData[skill], rating } })}
                              onRedFlagChange={(redFlag) => setHardData({ ...hardData, [skill]: { ...hardData[skill], redFlag } })}
                            />
                          </div>

                          <div>
                            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Коментар HR</div>
                            <AutoTextArea
                              value={hardData[skill]?.comment}
                              onChange={(comment) => setHardData({ ...hardData, [skill]: { ...hardData[skill], comment } })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </SectionShell>
              </div>
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="text-xl font-bold text-slate-950">Ризики та зони росту</h2>
              </div>

              <div className="grid gap-5 p-5 md:grid-cols-2">
                {riskFields.map((field) => (
                  <div key={field}>
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">{field}</div>
                    <AutoTextArea
                      value={riskData[field]}
                      onChange={(value) => setRiskData({ ...riskData, [field]: value })}
                      placeholder="Опишіть коротко..."
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-950">AI-визначені метапрограми</h2>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
                <Button variant="outline" className="border-violet-200 text-violet-700">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Згенерувати AI-висновок
                </Button>
              </div>

              <div className="m-5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-800">
                Метапрограми будуть визначені AI на основі резюме, коментарів HR та транскрипції інтерв’ю.
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1900px] flex-wrap items-center gap-2">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад до кандидата
          </Button>

          <div className="mx-auto hidden items-center gap-2 text-xs text-slate-500 md:flex">
            <CheckCircle2 className="h-4 w-4" />
            Чернетка збережена. Прогрес: {progress}%
          </div>

          <Button variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Очистити
          </Button>

          <Button>
            <Save className="mr-2 h-4 w-4" />
            Зберегти оцінку
          </Button>
        </div>
      </footer>
    </div>
  )
}
