'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FaqItem = {
  id: string
  question: string
  answer: string
  bullets?: string[]
}

type FaqCategory = {
  title: string
  items: FaqItem[]
}

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id)

  return (
    <div className='faq-root'>
      {categories.map((cat) => (
        <div key={cat.title} className='faq-category'>
          <h3 className='faq-category-title'>{cat.title}</h3>
          <div className='faq-list'>
            {cat.items.map((item) => {
              const isOpen = openId === item.id
              return (
                <div key={item.id} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                  <button
                    className='faq-question'
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    type='button'
                  >
                    <span className='faq-question-text'>{item.question}</span>
                    <ChevronDown className='faq-chevron' size={20} strokeWidth={2.5} />
                  </button>
                  <div className='faq-answer-wrap'>
                    <div className='faq-answer'>
                      <p>{item.answer}</p>
                      {item.bullets && (
                        <ul className='faq-bullets'>
                          {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
